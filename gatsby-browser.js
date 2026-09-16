import "./src/styles/global.css";
import { startAnalytics, trackPage } from "./src/lib/analytics";
let pageTimer;
export const onClientEntry = () => startAnalytics();
export const onRouteUpdate = ({ location, prevLocation }) => {
  clearTimeout(pageTimer);
  if (!prevLocation || location.pathname !== prevLocation.pathname) {
    pageTimer = window.setTimeout(() => trackPage(location.pathname), 100);
  }
};
