if(!self.define){let e,a={};const s=(s,t)=>(s=new URL(s+".js",t).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let n={};const r=e=>s(e,c),l={module:{uri:c},exports:n,require:r};a[c]=Promise.all(t.map((e=>l[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-3c9d0171"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/N7aB8BeZfedwQtlbl_QY-/_buildManifest.js",revision:"666fff665a4730dd98acccbd4b5adc62"},{url:"/_next/static/N7aB8BeZfedwQtlbl_QY-/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0686a050-223476160313b301.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/1047-9199549431a45410.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/1079-d1149c9248fdb494.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/123-5d33e8361b6d7c7c.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/1250-82bf6e2452f52871.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/1396-c3e74d36fa34e4fe.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/1754-6723953314f3b91f.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/2558-a8ad19b1cea83bbe.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/3055-d1de15554f0992b7.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/3084.dd544a5e92931d97.js",revision:"dd544a5e92931d97"},{url:"/_next/static/chunks/3444-0f7ba95892875019.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/3668-b9299d3dd0a84d8b.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/3825-eaadeae31ea3eb1f.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/3965-5bf718f4ee5b1cbe.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/498-4ff815287b4e6486.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/559-5864f3a82eb52756.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/5977.39173176d271b6a4.js",revision:"39173176d271b6a4"},{url:"/_next/static/chunks/70d46f48-6ab8315466591563.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/7101-558c552b3834ab41.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/7449-bd172cb388137aaf.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/7798-35788154d42b9c4c.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/8863-fec7825dda7ae096.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/9034-a05eaf9431f1e6ef.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/9871-4b1f057ffbe915b6.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/9ae566a6-e8e545ecbec5e316.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/%5Bp404%5D/page-bbeb05a73258c558.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/character/%5Buid_cid%5D/page-197d0423e2f1ec31.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/error-c78789d5fa0bbd30.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/layout-de3960d8ba993637.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/library/book-mp/%5Buid_bid%5D/page-dc3facb1efb05310.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/library/book-mp/page-4ed4278bce5d2227.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/library/book/%5Buid_bid%5D/page-144fb85ba1a90ee8.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/library/book/page-dd529cbddcaea1cb.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/library/page-4aa35df9488012b9.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/multiplayer/create/page-0e1cdfca5d5a0bbd.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/multiplayer/game/page-c9c519773b0a438f.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/multiplayer/join/page-9c2c37ba17931e85.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/multiplayer/layout-c704e42f1cdd9882.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/multiplayer/lobby/page-ad8aecbbcfe410cf.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/multiplayer/page-c2a3f253e47942db.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/new-character/page-677c88d0f14c8fa8.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/page-b611dcf8fe4bc17f.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/story/page-ac1367a7b5f0e7d8.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/tutorial/page-78f64e19745fa3f4.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/%5Blocale%5D/user/page-0e5bb2f7c291e941.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/_not-found/page-f0de98c1ae1c15ab.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/layout-87988b635e0a74fd.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/not-found-25f71e981ad8bda0.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/app/page-35063308f889d73c.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/framework-63a5d844a3662ade.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/main-4d4a5216b4c2198b.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/main-app-244177c5a4cf5ae6.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/pages/_app-49c0f66638a868e9.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/pages/_error-25613170296df85a.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/reactPlayerDailyMotion.63010bc2c1a77bc5.js",revision:"63010bc2c1a77bc5"},{url:"/_next/static/chunks/reactPlayerFacebook.ad3736f793e52a82.js",revision:"ad3736f793e52a82"},{url:"/_next/static/chunks/reactPlayerFilePlayer.9868260150a8c505.js",revision:"9868260150a8c505"},{url:"/_next/static/chunks/reactPlayerKaltura.88ba9f92b7a31d50.js",revision:"88ba9f92b7a31d50"},{url:"/_next/static/chunks/reactPlayerMixcloud.b391a1a486b51476.js",revision:"b391a1a486b51476"},{url:"/_next/static/chunks/reactPlayerMux.e5e2e46a789445d3.js",revision:"e5e2e46a789445d3"},{url:"/_next/static/chunks/reactPlayerPreview.8a953c06d7907c39.js",revision:"8a953c06d7907c39"},{url:"/_next/static/chunks/reactPlayerSoundCloud.5873b91edec4ff4c.js",revision:"5873b91edec4ff4c"},{url:"/_next/static/chunks/reactPlayerStreamable.b18cfdb57b65c285.js",revision:"b18cfdb57b65c285"},{url:"/_next/static/chunks/reactPlayerTwitch.bdf4be00b55539a6.js",revision:"bdf4be00b55539a6"},{url:"/_next/static/chunks/reactPlayerVidyard.a30b192d53d6fda7.js",revision:"a30b192d53d6fda7"},{url:"/_next/static/chunks/reactPlayerVimeo.194017c0d8eee0e7.js",revision:"194017c0d8eee0e7"},{url:"/_next/static/chunks/reactPlayerWistia.45ff352af1c5c3b9.js",revision:"45ff352af1c5c3b9"},{url:"/_next/static/chunks/reactPlayerYouTube.9a4f8fd19758bc59.js",revision:"9a4f8fd19758bc59"},{url:"/_next/static/chunks/webpack-957a44300e24a603.js",revision:"N7aB8BeZfedwQtlbl_QY-"},{url:"/_next/static/css/11de82f43005734b.css",revision:"11de82f43005734b"},{url:"/_next/static/css/5cbcc290cbb1675c.css",revision:"5cbcc290cbb1675c"},{url:"/_next/static/media/634216363f5c73c1-s.woff2",revision:"4a1bf14c88bdef173c2a39c5c60e65ce"},{url:"/_next/static/media/88325a2c1fede2f4-s.woff2",revision:"93131c3ec4fe9782c2c40a708db9b0b6"},{url:"/_next/static/media/aec774cbe1963439-s.woff2",revision:"37f8885214448afc8f3b3678db525598"},{url:"/_next/static/media/android-chrome-512x512.82a7b679.png",revision:"12ace550ed8dab2d8edc67045463bc8b"},{url:"/_next/static/media/create-game.8bee6a1b.jpeg",revision:"00c0498bfe0fe98738a2c2b8d528e9b6"},{url:"/_next/static/media/d83fe381bb17eb77-s.woff2",revision:"215b11e73137fdb7d9a773e0211c29d6"},{url:"/_next/static/media/e1c529c04de64b40-s.p.woff2",revision:"e88b1871ed8eef59b7df05a91a6f2157"},{url:"/_next/static/media/gmai.8fc54462.png",revision:"0cd7236a1fca9beba8f44436e9d203a9"},{url:"/_next/static/media/join-game.385a138c.jpeg",revision:"2baa7f2bc4164df39cd195e34f1b6bb7"},{url:"/android-chrome-192x192.png",revision:"2ff4c1daaebfd7e07d54c8e75493b41e"},{url:"/android-chrome-512x512.png",revision:"12ace550ed8dab2d8edc67045463bc8b"},{url:"/apple-touch-icon.png",revision:"d7c89fb542bcd13f5d265c7f72da08fd"},{url:"/favicon-16x16.png",revision:"cdad86db227c0227734e751724952054"},{url:"/favicon-32x32.png",revision:"48dbc71edc3c55005b8a8466bcc9f0b5"},{url:"/gmai.png",revision:"0cd7236a1fca9beba8f44436e9d203a9"},{url:"/gmai_desk.png",revision:"daad77b99a7532c7762f14b334040539"},{url:"/gmai_phone.png",revision:"60e2caeec55a4ac805f1e15c948f12e6"},{url:"/img/create-game.jpeg",revision:"00c0498bfe0fe98738a2c2b8d528e9b6"},{url:"/img/join-game.jpeg",revision:"2baa7f2bc4164df39cd195e34f1b6bb7"},{url:"/manifest_en.json",revision:"24a25ebddb1d761b0ea3c8e360e729e8"},{url:"/manifest_es.json",revision:"423d7faf2da619162ff75c9b4bec4499"},{url:"/mstile-150x150.png",revision:"be0b19e7ab00671dd3fa8fc28352fdb7"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/video/tutorial/gmai-tutorial-en.srt",revision:"69301317cea382c1eb7df9d9094f9f34"},{url:"/video/tutorial/gmai-tutorial-en.vtt",revision:"9cdb66c228e32119231a4ecd54719da0"},{url:"/video/tutorial/gmai-tutorial-es.srt",revision:"55624db214ebbce661f69d43cbdff3ca"},{url:"/video/tutorial/gmai-tutorial-es.vtt",revision:"f0906817dfda9701987c50889ef6e142"},{url:"/video/tutorial/gmai-tutorial.mp4",revision:"b1028aff129979e9f45685a856fe82eb"},{url:"/video/tutorial/thumbnail.png",revision:"46b3ff7632296286ba4b14b34b5f69d9"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
