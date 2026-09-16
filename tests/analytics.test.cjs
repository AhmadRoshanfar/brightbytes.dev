const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
function setup({
  host = "brightbytes.dev",
  stored = null,
  disabled = false,
  blockedStorage = false,
} = {}) {
  const scripts = [];
  const writes = [];
  const storage = new Map(stored ? [["bb-analytics", stored]] : []);
  const window = {
    location: {
      origin: `https://${host}`,
      hostname: host,
      pathname: "/blog/example/",
    },
    dispatchEvent() {},
  };
  const document = {
    title: "Example article",
    referrer: "https://example.org/?private=value",
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
  };
  Object.defineProperty(document, "cookie", {
    get: () => "_ga=123; preference=keep",
    set: (value) => writes.push(value),
  });
  const context = vm.createContext({
    window,
    document,
    URL,
    Event: class Event {},
    localStorage: {
      getItem: (key) => {
        if (blockedStorage) throw Error();
        return storage.get(key) || null;
      },
      setItem: (key, value) => {
        if (blockedStorage) throw Error();
        storage.set(key, value);
      },
    },
    site: {
      siteUrl: "https://brightbytes.dev",
      gaMeasurementId: "G-F8YJQXQ4L5",
    },
    process: {
      env: {
        NODE_ENV: "production",
        ...(disabled ? { GATSBY_GA_MEASUREMENT_ID: "" } : {}),
      },
    },
  });
  const source = fs
    .readFileSync("src/lib/analytics.js", "utf8")
    .replace(/^import .*;\n/m, "")
    .replace(/export /g, "");
  vm.runInContext(source, context);
  return {
    context,
    window,
    scripts,
    writes,
    events: () =>
      (window.dataLayer || [])
        .map((args) => Array.from(args))
        .filter((row) => row[0] === "event"),
  };
}
test("no analytics script or events before consent", () => {
  const s = setup();
  s.context.startAnalytics();
  s.context.trackPage();
  assert.equal(s.scripts.length, 0);
  assert.equal(s.events().length, 0);
});
test("consent loads one script and records navigation once per pathname", () => {
  const s = setup();
  s.context.setConsent("accepted");
  s.context.trackPage();
  s.context.startAnalytics();
  assert.equal(s.scripts.length, 1);
  assert.equal(s.events().length, 1);
  assert.equal(
    s.events()[0][2].page_location,
    "https://brightbytes.dev/blog/example/",
  );
  s.context.trackPage("/about/");
  s.context.trackPage("/about/");
  s.context.trackPage("/blog/example/");
  assert.equal(s.events().length, 3);
  const config = Array.from(s.window.dataLayer[1]);
  assert.equal(config[2].send_page_view, false);
  assert.equal(config[2].page_referrer, "https://example.org");
});
test("revoking consent blocks future events and removes only analytics cookies", () => {
  const s = setup();
  s.context.setConsent("accepted");
  s.context.setConsent("declined");
  s.context.track("copy_code");
  s.context.trackPage("/about/");
  assert.equal(s.events().length, 1);
  assert.equal(s.window["ga-disable-G-F8YJQXQ4L5"], true);
  assert.ok(s.writes.every((value) => value.startsWith("_ga=")));
  s.context.setConsent("accepted");
  assert.equal(s.scripts.length, 1);
  assert.equal(s.events().length, 2);
});
test("local previews and a disabled ID never send production analytics", () => {
  for (const options of [{ host: "127.0.0.1" }, { disabled: true }]) {
    const s = setup(options);
    s.context.setConsent("accepted");
    assert.equal(s.scripts.length, 0);
    assert.equal(s.events().length, 0);
  }
});
test("analytics choice still works when browser storage is blocked", () => {
  const s = setup({ blockedStorage: true });
  s.context.setConsent("accepted");
  assert.equal(s.events().length, 1);
  s.context.setConsent("declined");
  s.context.track("copy_code");
  assert.equal(s.events().length, 1);
});
