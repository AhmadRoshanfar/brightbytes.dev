"use strict";(self.webpackChunkbrightbytes_dev=self.webpackChunkbrightbytes_dev||[]).push([[79],{2899:function(e,t,n){n.r(t),n.d(t,{Head:function(){return s},default:function(){return u}});var a=n(1151),r=n(7294);function l(e){const t=Object.assign({h1:"h1",h3:"h3",p:"p",a:"a",pre:"pre",code:"code"},(0,a.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(t.h1,null,"Installation"),"\n",r.createElement(t.h3,null,"Install Qt’s MQTT Library"),"\n",r.createElement(t.p,null,r.createElement(t.a,{href:"https://code.qt.io/cgit/qt/qtmqtt.git/"},"https://code.qt.io/cgit/qt/qtmqtt.git/")),"\n",r.createElement(t.p,null,r.createElement(t.a,{href:"https://www.youtube.com/watch?v=DGB0GfFRqPo"},"Getting Started with MQTT using Qt #mqtt #qt")),"\n",r.createElement("aside",null,r.createElement(t.p,null,"⚠️ Not working with 6.5 version. Currently using 6.2.4 version as mentioned in the above video.”")),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-bash"},'#Qt_Environment.sh created in qmqtt folder\n\nexport QT_VERSION="6.2.4"\nexport QT_INSTALL_DIR="/home/ahmad/Qt5/"\nexport CMAKE_BIN_DIR="${QT_INSTALL_DIR}/Tools/CMake/bin"\nexport QMAKE_BIN_DIR="${QT_INSTALL_DIR}/${QT_VERSION}/gcc_64/bin"\nexport CMAKE_PREFIX_PATH="${QT_INSTALL_DIR}/${QT_VERSION}/gcc_64/lib/cmake"\nexport NINJA_DIR="${QT_INSTALL_DIR}/Tools/Ninja"\nexport PATH="${PATH}:${CMAKE_BIN_DIR}:${QMAKE_BIN_DIR}:${NINJA_DIR}"\n')),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-bash"},"git clone -b 6.2.4 git://code.qt.io/qt/qtmqtt.git \ncd qtmqtt\nmkdir build && cd build\nsource ../Qt_Environment.sh \n<QT_Installation_Path>/6.5.0/gcc_64/bin/qt-configure-module ..\n<QT_Installation_Path>/Tools/CMake/bin/cmake --build .   \n<QT_Installation_Path>/Tools/CMake/bin/cmake --install . --verbose\n")),"\n",r.createElement(t.h3,null,"Adding MQTT to the project"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-c"},"find_package(Qt6 REQUIRED COMPONENTS Mqtt)\ntarget_link_libraries(mytarget PRIVATE Qt6::Mqtt)\n")))}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?r.createElement(t,e,r.createElement(l,e)):l(e)},o=n(2176),m=n(2719);const i=e=>{let{data:t,children:n}=e;const l=t.mdx.frontmatter.tags||[];return r.createElement(r.Fragment,null,r.createElement(a.Zo,{components:{}},r.createElement(o.Z,null,r.createElement(m.Z,{data:t,tags:l}),n)))},s=e=>{let{data:t}=e;return r.createElement("title",null,t.mdx.frontmatter.title)};function u(e){return r.createElement(i,e,r.createElement(c,e))}},2719:function(e,t,n){n.d(t,{Z:function(){return i}});var a=n(8032),r=n(7294),l=n(1883),c=n(1804),o=n.n(c);var m=e=>{let{tags:t}=e;return r.createElement("div",{className:"flex flex-row h-full justify-center items-center"},t.map((e=>r.createElement(l.Link,{to:`/tags/${o()(e)}/`,className:"flex mx-1 my-2 bg-gray-200 py-1 px-2 text-sm rounded\t"},e))))};var i=e=>{let{data:t,tags:n}=e;return r.createElement(r.Fragment,null,r.createElement(a.G,{className:"rounded-lg m-5 w-full ",image:(0,a.c)(t.mdx.frontmatter.featuredImage.childImageSharp.gatsbyImageData),imgStyle:{objectFit:"contain"}}),r.createElement("div",{className:"flex justify-center items-center"},r.createElement("div",{className:"inline-block"},r.createElement("h1",{className:"text-center text-4xl font-bold mt-8"},t.mdx.frontmatter.title),r.createElement("div",{className:"flex justify-start text-center pb-6 "},r.createElement("p",{className:"flex items-start text-center"},t.mdx.frontmatter.date),r.createElement(m,{tags:n})))))}},1151:function(e,t,n){n.d(t,{Zo:function(){return o},ah:function(){return l}});var a=n(7294);const r=a.createContext({});function l(e){const t=a.useContext(r);return a.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const c={};function o({components:e,children:t,disableParentContext:n}){let o;return o=n?"function"==typeof e?e({}):e||c:l(e),a.createElement(r.Provider,{value:o},t)}}}]);
//# sourceMappingURL=component---src-pages-blog-mdx-frontmatter-slug-js-content-file-path-home-ahmad-documents-blog-brightbytes-dev-blog-installation-index-mdx-707195b973608844d6aa.js.map