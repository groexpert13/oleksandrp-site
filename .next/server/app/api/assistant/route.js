/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/assistant/route";
exports.ids = ["app/api/assistant/route"];
exports.modules = {

/***/ "(rsc)/./app/api/assistant/route.ts":
/*!************************************!*\
  !*** ./app/api/assistant/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\nasync function POST(req) {\n    try {\n        let message = \"\";\n        let persona = \"advisor\";\n        if (req.headers.get(\"content-type\")?.includes(\"multipart/form-data\")) {\n            const form = await req.formData();\n            message = String(form.get(\"message\") || \"\");\n            persona = String(form.get(\"persona\") || \"advisor\");\n        // Files are available via form.getAll(\"file{i}\") if needed\n        } else {\n            const body = await req.json();\n            message = body?.message || \"\";\n            persona = body?.persona || \"advisor\";\n        }\n        // Placeholder echo logic; integrate real OpenAI or other LLM here.\n        const reply = message ? `(${persona}) Got it. Here's how I can help with \"${message}\": I can propose AI/automation options, estimate scope, and outline next steps.` : `(${persona}) Hello! Ask me about AI, automation, or your project.`;\n        return new Response(JSON.stringify({\n            reply\n        }), {\n            status: 200,\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    } catch (e) {\n        return new Response(JSON.stringify({\n            reply: \"Sorry, something went wrong.\"\n        }), {\n            status: 500,\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Fzc2lzdGFudC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7O0FBRU8sZUFBZUEsS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLElBQUlDLFVBQVU7UUFDZCxJQUFJQyxVQUFVO1FBQ2QsSUFBSUYsSUFBSUcsT0FBTyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCQyxTQUFTLHdCQUF3QjtZQUNwRSxNQUFNQyxPQUFPLE1BQU1OLElBQUlPLFFBQVE7WUFDL0JOLFVBQVVPLE9BQU9GLEtBQUtGLEdBQUcsQ0FBQyxjQUFjO1lBQ3hDRixVQUFVTSxPQUFPRixLQUFLRixHQUFHLENBQUMsY0FBYztRQUN4QywyREFBMkQ7UUFDN0QsT0FBTztZQUNMLE1BQU1LLE9BQU8sTUFBTVQsSUFBSVUsSUFBSTtZQUMzQlQsVUFBVVEsTUFBTVIsV0FBVztZQUMzQkMsVUFBVU8sTUFBTVAsV0FBVztRQUM3QjtRQUNBLG1FQUFtRTtRQUNuRSxNQUFNUyxRQUFRVixVQUNWLENBQUMsQ0FBQyxFQUFFQyxRQUFRLHNDQUFzQyxFQUFFRCxRQUFRLCtFQUErRSxDQUFDLEdBQzVJLENBQUMsQ0FBQyxFQUFFQyxRQUFRLHNEQUFzRCxDQUFDO1FBRXZFLE9BQU8sSUFBSVUsU0FBU0MsS0FBS0MsU0FBUyxDQUFDO1lBQUVIO1FBQU0sSUFBSTtZQUM3Q0ksUUFBUTtZQUNSWixTQUFTO2dCQUFFLGdCQUFnQjtZQUFtQjtRQUNoRDtJQUNGLEVBQUUsT0FBT2EsR0FBRztRQUNWLE9BQU8sSUFBSUosU0FBU0MsS0FBS0MsU0FBUyxDQUFDO1lBQUVILE9BQU87UUFBK0IsSUFBSTtZQUM3RUksUUFBUTtZQUNSWixTQUFTO2dCQUFFLGdCQUFnQjtZQUFtQjtRQUNoRDtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9vbGVrc2FuZHJwL0Rlc2t0b3Avb2xla3NhbmRycC9hcHAvYXBpL2Fzc2lzdGFudC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCB9IGZyb20gXCJuZXh0L3NlcnZlclwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBsZXQgbWVzc2FnZSA9IFwiXCJcbiAgICBsZXQgcGVyc29uYSA9IFwiYWR2aXNvclwiXG4gICAgaWYgKHJlcS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKT8uaW5jbHVkZXMoXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpKSB7XG4gICAgICBjb25zdCBmb3JtID0gYXdhaXQgcmVxLmZvcm1EYXRhKClcbiAgICAgIG1lc3NhZ2UgPSBTdHJpbmcoZm9ybS5nZXQoXCJtZXNzYWdlXCIpIHx8IFwiXCIpXG4gICAgICBwZXJzb25hID0gU3RyaW5nKGZvcm0uZ2V0KFwicGVyc29uYVwiKSB8fCBcImFkdmlzb3JcIilcbiAgICAgIC8vIEZpbGVzIGFyZSBhdmFpbGFibGUgdmlhIGZvcm0uZ2V0QWxsKFwiZmlsZXtpfVwiKSBpZiBuZWVkZWRcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKClcbiAgICAgIG1lc3NhZ2UgPSBib2R5Py5tZXNzYWdlIHx8IFwiXCJcbiAgICAgIHBlcnNvbmEgPSBib2R5Py5wZXJzb25hIHx8IFwiYWR2aXNvclwiXG4gICAgfVxuICAgIC8vIFBsYWNlaG9sZGVyIGVjaG8gbG9naWM7IGludGVncmF0ZSByZWFsIE9wZW5BSSBvciBvdGhlciBMTE0gaGVyZS5cbiAgICBjb25zdCByZXBseSA9IG1lc3NhZ2VcbiAgICAgID8gYCgke3BlcnNvbmF9KSBHb3QgaXQuIEhlcmUncyBob3cgSSBjYW4gaGVscCB3aXRoIFwiJHttZXNzYWdlfVwiOiBJIGNhbiBwcm9wb3NlIEFJL2F1dG9tYXRpb24gb3B0aW9ucywgZXN0aW1hdGUgc2NvcGUsIGFuZCBvdXRsaW5lIG5leHQgc3RlcHMuYFxuICAgICAgOiBgKCR7cGVyc29uYX0pIEhlbGxvISBBc2sgbWUgYWJvdXQgQUksIGF1dG9tYXRpb24sIG9yIHlvdXIgcHJvamVjdC5gXG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgcmVwbHkgfSksIHtcbiAgICAgIHN0YXR1czogMjAwLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgcmVwbHk6IFwiU29ycnksIHNvbWV0aGluZyB3ZW50IHdyb25nLlwiIH0pLCB7XG4gICAgICBzdGF0dXM6IDUwMCxcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICB9KVxuICB9XG59XG5cblxuIl0sIm5hbWVzIjpbIlBPU1QiLCJyZXEiLCJtZXNzYWdlIiwicGVyc29uYSIsImhlYWRlcnMiLCJnZXQiLCJpbmNsdWRlcyIsImZvcm0iLCJmb3JtRGF0YSIsIlN0cmluZyIsImJvZHkiLCJqc29uIiwicmVwbHkiLCJSZXNwb25zZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdGF0dXMiLCJlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/assistant/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fassistant%2Froute&page=%2Fapi%2Fassistant%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fassistant%2Froute.ts&appDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fassistant%2Froute&page=%2Fapi%2Fassistant%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fassistant%2Froute.ts&appDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_oleksandrp_Desktop_oleksandrp_app_api_assistant_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/assistant/route.ts */ \"(rsc)/./app/api/assistant/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/assistant/route\",\n        pathname: \"/api/assistant\",\n        filename: \"route\",\n        bundlePath: \"app/api/assistant/route\"\n    },\n    resolvedPagePath: \"/Users/oleksandrp/Desktop/oleksandrp/app/api/assistant/route.ts\",\n    nextConfigOutput,\n    userland: _Users_oleksandrp_Desktop_oleksandrp_app_api_assistant_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhc3Npc3RhbnQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFzc2lzdGFudCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFzc2lzdGFudCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm9sZWtzYW5kcnAlMkZEZXNrdG9wJTJGb2xla3NhbmRycCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZvbGVrc2FuZHJwJTJGRGVza3RvcCUyRm9sZWtzYW5kcnAmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2U7QUFDNUY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9vbGVrc2FuZHJwL0Rlc2t0b3Avb2xla3NhbmRycC9hcHAvYXBpL2Fzc2lzdGFudC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXNzaXN0YW50L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXNzaXN0YW50XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hc3Npc3RhbnQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvb2xla3NhbmRycC9EZXNrdG9wL29sZWtzYW5kcnAvYXBwL2FwaS9hc3Npc3RhbnQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fassistant%2Froute&page=%2Fapi%2Fassistant%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fassistant%2Froute.ts&appDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fassistant%2Froute&page=%2Fapi%2Fassistant%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fassistant%2Froute.ts&appDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();