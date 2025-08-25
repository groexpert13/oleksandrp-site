"use strict";
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
exports.id = "app/manifest.webmanifest/route";
exports.ids = ["app/manifest.webmanifest/route"];
exports.modules = {

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.webmanifest%2Froute&page=%2Fmanifest.webmanifest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.webmanifest&appDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.webmanifest%2Froute&page=%2Fmanifest.webmanifest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.webmanifest&appDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_metadata_route_loader_filePath_2FUsers_2Foleksandrp_2FDesktop_2Foleksandrp_2Fapp_2Fmanifest_webmanifest_isDynamicRouteExtension_0_next_metadata_route___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-metadata-route-loader?filePath=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp%2Fmanifest.webmanifest&isDynamicRouteExtension=0!?__next_metadata_route__ */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp%2Fmanifest.webmanifest&isDynamicRouteExtension=0!?__next_metadata_route__\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/manifest.webmanifest/route\",\n        pathname: \"/manifest.webmanifest\",\n        filename: \"manifest\",\n        bundlePath: \"app/manifest.webmanifest/route\"\n    },\n    resolvedPagePath: \"next-metadata-route-loader?filePath=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp%2Fmanifest.webmanifest&isDynamicRouteExtension=0!?__next_metadata_route__\",\n    nextConfigOutput,\n    userland: next_metadata_route_loader_filePath_2FUsers_2Foleksandrp_2FDesktop_2Foleksandrp_2Fapp_2Fmanifest_webmanifest_isDynamicRouteExtension_0_next_metadata_route___WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZtYW5pZmVzdC53ZWJtYW5pZmVzdCUyRnJvdXRlJnBhZ2U9JTJGbWFuaWZlc3Qud2VibWFuaWZlc3QlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZtYW5pZmVzdC53ZWJtYW5pZmVzdCZhcHBEaXI9JTJGVXNlcnMlMkZvbGVrc2FuZHJwJTJGRGVza3RvcCUyRm9sZWtzYW5kcnAlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGb2xla3NhbmRycCUyRkRlc2t0b3AlMkZvbGVrc2FuZHJwJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNnSDtBQUM3TDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwibmV4dC1tZXRhZGF0YS1yb3V0ZS1sb2FkZXI/ZmlsZVBhdGg9JTJGVXNlcnMlMkZvbGVrc2FuZHJwJTJGRGVza3RvcCUyRm9sZWtzYW5kcnAlMkZhcHAlMkZtYW5pZmVzdC53ZWJtYW5pZmVzdCZpc0R5bmFtaWNSb3V0ZUV4dGVuc2lvbj0wIT9fX25leHRfbWV0YWRhdGFfcm91dGVfX1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9tYW5pZmVzdC53ZWJtYW5pZmVzdC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvbWFuaWZlc3Qud2VibWFuaWZlc3RcIixcbiAgICAgICAgZmlsZW5hbWU6IFwibWFuaWZlc3RcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvbWFuaWZlc3Qud2VibWFuaWZlc3Qvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJuZXh0LW1ldGFkYXRhLXJvdXRlLWxvYWRlcj9maWxlUGF0aD0lMkZVc2VycyUyRm9sZWtzYW5kcnAlMkZEZXNrdG9wJTJGb2xla3NhbmRycCUyRmFwcCUyRm1hbmlmZXN0LndlYm1hbmlmZXN0JmlzRHluYW1pY1JvdXRlRXh0ZW5zaW9uPTAhP19fbmV4dF9tZXRhZGF0YV9yb3V0ZV9fXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.webmanifest%2Froute&page=%2Fmanifest.webmanifest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.webmanifest&appDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp%2Fmanifest.webmanifest&isDynamicRouteExtension=0!?__next_metadata_route__":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp%2Fmanifest.webmanifest&isDynamicRouteExtension=0!?__next_metadata_route__ ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* static asset route */\n\n\nconst contentType = \"application/manifest+json\"\nconst buffer = Buffer.from(\"ewogICJuYW1lIjogIm9sZWtzYW5kcnAiLAogICJzaG9ydF9uYW1lIjogIm9sZWtzYW5kcnAiLAogICJpY29ucyI6IFsKICAgIHsKICAgICAgInNyYyI6ICIvb2xla3NhbmRycF9sb2dvLndlYnAiLAogICAgICAic2l6ZXMiOiAiMTkyeDE5MiIsCiAgICAgICJ0eXBlIjogImltYWdlL3dlYnAiCiAgICB9CiAgXSwKICAic3RhcnRfdXJsIjogIi8iLAogICJkaXNwbGF5IjogInN0YW5kYWxvbmUiLAogICJiYWNrZ3JvdW5kX2NvbG9yIjogIiMwMDAwMDAiLAogICJ0aGVtZV9jb2xvciI6ICIjMDAwMDAwIgp9CgoK\", 'base64'\n  )\n\nif (false) {}\n\nfunction GET() {\n  return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(buffer, {\n    headers: {\n      'Content-Type': contentType,\n      'Cache-Control': \"no-cache, no-store\",\n    },\n  })\n}\n\nconst dynamic = 'force-static'\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LW1ldGFkYXRhLXJvdXRlLWxvYWRlci5qcz9maWxlUGF0aD0lMkZVc2VycyUyRm9sZWtzYW5kcnAlMkZEZXNrdG9wJTJGb2xla3NhbmRycCUyRmFwcCUyRm1hbmlmZXN0LndlYm1hbmlmZXN0JmlzRHluYW1pY1JvdXRlRXh0ZW5zaW9uPTAhP19fbmV4dF9tZXRhZGF0YV9yb3V0ZV9fIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQzBDOztBQUUxQztBQUNBO0FBQ0E7O0FBRUEsSUFBSSxLQUFLLEVBQUUsRUFTVjs7QUFFTTtBQUNQLGFBQWEscURBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFTyIsInNvdXJjZXMiOlsiP19fbmV4dF9tZXRhZGF0YV9yb3V0ZV9fIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIHN0YXRpYyBhc3NldCByb3V0ZSAqL1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5cbmNvbnN0IGNvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9tYW5pZmVzdCtqc29uXCJcbmNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKFwiZXdvZ0lDSnVZVzFsSWpvZ0ltOXNaV3R6WVc1a2NuQWlMQW9nSUNKemFHOXlkRjl1WVcxbElqb2dJbTlzWld0ellXNWtjbkFpTEFvZ0lDSnBZMjl1Y3lJNklGc0tJQ0FnSUhzS0lDQWdJQ0FnSW5OeVl5STZJQ0l2YjJ4bGEzTmhibVJ5Y0Y5c2IyZHZMbmRsWW5BaUxBb2dJQ0FnSUNBaWMybDZaWE1pT2lBaU1Ua3llREU1TWlJc0NpQWdJQ0FnSUNKMGVYQmxJam9nSW1sdFlXZGxMM2RsWW5BaUNpQWdJQ0I5Q2lBZ1hTd0tJQ0FpYzNSaGNuUmZkWEpzSWpvZ0lpOGlMQW9nSUNKa2FYTndiR0Y1SWpvZ0luTjBZVzVrWVd4dmJtVWlMQW9nSUNKaVlXTnJaM0p2ZFc1a1gyTnZiRzl5SWpvZ0lpTXdNREF3TURBaUxBb2dJQ0owYUdWdFpWOWpiMnh2Y2lJNklDSWpNREF3TURBd0lncDlDZ29LXCIsICdiYXNlNjQnXG4gIClcblxuaWYgKGZhbHNlKSB7XG4gIGNvbnN0IGZpbGVTaXplSW5NQiA9IGJ1ZmZlci5ieXRlTGVuZ3RoIC8gMTAyNCAvIDEwMjRcbiAgaWYgKGZpbGVTaXplSW5NQiA+IDgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpbGUgc2l6ZSBmb3IgT3BlbiBHcmFwaCBpbWFnZSBcIi9Vc2Vycy9vbGVrc2FuZHJwL0Rlc2t0b3Avb2xla3NhbmRycC9hcHAvbWFuaWZlc3Qud2VibWFuaWZlc3RcIiBleGNlZWRzIDhNQi4gJyArXG4gICAgYChDdXJyZW50OiAke2ZpbGVTaXplSW5NQi50b0ZpeGVkKDIpfU1CKVxuYCArXG4gICAgJ1JlYWQgbW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvYXBwL2FwaS1yZWZlcmVuY2UvZmlsZS1jb252ZW50aW9ucy9tZXRhZGF0YS9vcGVuZ3JhcGgtaW1hZ2UjaW1hZ2UtZmlsZXMtanBnLXBuZy1naWYnXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHRVQoKSB7XG4gIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKGJ1ZmZlciwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiBjb250ZW50VHlwZSxcbiAgICAgICdDYWNoZS1Db250cm9sJzogXCJuby1jYWNoZSwgbm8tc3RvcmVcIixcbiAgICB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZHluYW1pYyA9ICdmb3JjZS1zdGF0aWMnXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp%2Fmanifest.webmanifest&isDynamicRouteExtension=0!?__next_metadata_route__\n");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.webmanifest%2Froute&page=%2Fmanifest.webmanifest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.webmanifest&appDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foleksandrp%2FDesktop%2Foleksandrp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();