module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./app.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app-root.xml": "./app-root.xml",
	"./home/home-page.js": "./home/home-page.js",
	"./home/home-page.xml": "./home/home-page.xml"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$";

/***/ }),

/***/ "./app-root.xml":
/***/ (function(module, exports, __webpack_require__) {


module.exports = "<Frame defaultPage=\"home/home-page\"></Frame>\r\n";
    if (false) {}


/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__("../node_modules/css-loader/index.js?!../node_modules/nativescript-theme-core/css/core.light.css"), "");

// module
exports.push([module.i, "/*\r\nIn NativeScript, the app.css file is where you place CSS rules that\r\nyou would like to apply to your entire application. Check out\r\nhttp://docs.nativescript.org/ui/styling for a full list of the CSS\r\nselectors and properties you can use to style UI components.\r\n\r\n/*\r\nFor example, the following CSS rule changes the font size of all UI\r\ncomponents that have the btn class name.\r\n*/\r\n.btn {\r\n    font-size: 18;\r\n}\r\n\r\n/*\r\nIn many cases you may want to use the NativeScript core theme instead\r\nof writing your own CSS rules. For a full list of class names in the theme\r\nrefer to http://docs.nativescript.org/ui/theme.\r\n*/\r\n\r\n.home-panel{\r\n    vertical-align: center;\r\n    font-size: 20;\r\n    margin: 15;\r\n}\r\n\r\n.action-bar {\r\n    color: blue;\r\n}\r\n\r\n.gcdocs_logo {\r\n    width: 100;\r\n}\r\n\r\n.text_item label{\r\n    margin: 10;\r\n    text-decoration: underline;\r\n}\r\n\r\n.action-image {\r\n    width: 80;\r\n    height: 40;\r\n    vertical-align: center;\r\n}\r\n\r\n.description-label{\r\n    margin-bottom: 15;\r\n}\r\n\r\n.list-group-item-icon {\r\n   font-family: 'icomoon';\r\n   font-size: 45;\r\n}\r\n\r\n.list-group-item label {\r\n    margin-right: 15;\r\n}\r\n\r\n.list-group-item-heading {\r\n    width: 100%;\r\n    text-decoration: underline;\r\n}\r\n.footer-group-item{\r\n    margin-top: 20;\r\n}\r\n.footer-group-item-heading{\r\n   font-size: 13;\r\n   text-decoration: underline;\r\n    \r\n}\r\n\r\n.footer-group-icon {\r\n   font-family: 'icomoon';\r\n   font-size: 15;\r\n   margin-right: 10;\r\n}\r\n\r\n.gov-logo {\r\n    margin-top: 30;\r\n    width: 100%;\r\n}", ""]);

// exports
;
    if (false) {}


/***/ }),

/***/ "./app.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
            if (false) {}
        
            const context = __webpack_require__("./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$");
            global.registerWebpackModules(context);
            
        __webpack_require__("tns-core-modules/bundle-entry-points");
        /*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

let application = __webpack_require__("tns-core-modules/application");

application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/

    
        
        
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./home/home-page.js":
/***/ (function(module, exports, __webpack_require__) {

/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/
var frameModule = __webpack_require__("tns-core-modules/ui/frame");
var HomeViewModel = __webpack_require__("./home/home-view-model.js");

var homeViewModel = new HomeViewModel();

function pageLoaded(args) {
  /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
  var page = args.object;

  /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
  page.bindingContext = homeViewModel;
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the pageLoaded
function here makes the pageLoaded="pageLoaded" binding in this page’s XML
file work.
*/
exports.pageLoaded = pageLoaded;
;
    if (false) {}


/***/ }),

/***/ "./home/home-page.xml":
/***/ (function(module, exports, __webpack_require__) {


module.exports = "<Page loaded=\"pageLoaded\" class=\"page\" xmlns=\"http://www.nativescript.org/tns.xsd\">\r\n\r\n    <ActionBar title=\"\" class=\"action-bar\">\r\n        <ActionItem tap=\"\" class=\"logo_item\" ios.position=\"left\"\r\n            android.position=\"actionBar\">\r\n            <StackLayout orientation=\"horizontal\">\r\n                <Image src=\"~/images/gcdocs-logo.png\" class=\"gcdocs_logo\" />\r\n            </StackLayout>\r\n        </ActionItem>\r\n        <ActionItem tap=\"\" class=\"text_item\" ios.position=\"right\"\r\n            android.position=\"actionBar\">\r\n            <StackLayout orientation=\"horizontal\">\r\n                <Label text=\"Menu\" class=\"action-label-Home\"></Label>\r\n                <Label text=\"FR\" class=\"action-label-FR\"></Label>\r\n            </StackLayout>\r\n        </ActionItem>\r\n        <ActionItem tap=\"\" class=\"search_item\" ios.systemIcon=\"12\"\r\n            ios.position=\"right\" android.position=\"right\"></ActionItem>\r\n    </ActionBar>\r\n    <ScrollView>\r\n        <StackLayout class=\"home-panel\">\r\n            <Label textWrap=\"true\" text=\"My Favorites\" class=\"h1 description-label\" />\r\n            <ListView class=\"list-group\" items=\"{{ icons }}\" itemTap=\"{{ onItemTap }}\"\r\n                style=\"height:1450px\">\r\n                <ListView.itemTemplate>\r\n                    <FlexboxLayout flexDirection=\"row\" class=\"list-group-item\">\r\n                        <Label text=\"{{ icon }}\" class=\"list-group-item-icon\" />\r\n                        <Label text=\"{{ name }}\" class=\"list-group-item-heading\"\r\n                            verticalAlignment=\"center\" color=\"blue\" />\r\n                    </FlexboxLayout>\r\n                </ListView.itemTemplate>\r\n            </ListView>\r\n            <StackLayout class=\"footer-group\" ios:horizontalAlignment=\"left\">\r\n                <FlexboxLayout flexDirection=\"row\" class=\"footer-group-item\">\r\n                    <Label text=\"{{ footer_icon }}\" class=\"footer-group-icon\" />\r\n                    <Label text=\"Help and Support\" class=\"footer-group-item-heading\"\r\n                        verticalAlignment=\"center\" color=\"blue\" />\r\n                </FlexboxLayout>\r\n                <Image src=\"~/images/sig-pspc-en.jpg\" class=\"gov-logo\" />\r\n            </StackLayout>\r\n        </StackLayout>\r\n    </ScrollView>\r\n\r\n\r\n</Page>";
    if (false) {}


/***/ }),

/***/ "./home/home-view-model.js":
/***/ (function(module, exports, __webpack_require__) {

var observableModule = __webpack_require__("tns-core-modules/data/observable");

function HomeViewModel() {
  var viewModel = observableModule.fromObject({

    footer_icon : String.fromCharCode(0xeA0A),

    icons: [
      { name: "Change Request", icon: String.fromCharCode(0xe933) },
      { name: "GCdocs 16 - Gold Build Configuration", icon: String.fromCharCode(0xe92A) },
      { name: "OTDS FAQ", icon: String.fromCharCode(0xe92A) },
      { name: "Product and Features Analysis", icon: String.fromCharCode(0xe933) },
      { name: "GCdocs Technical FAQ", icon: String.fromCharCode(0xe92A) },
      { name: "Mobility Enhancement", icon: String.fromCharCode(0xe933) },
      { name: "Promotional Material", icon: String.fromCharCode(0xe933) },
      { name: "Business Case Scenarios", icon: String.fromCharCode(0xe9cb) },
    ],

    onItemTap: function (args) {
      console.log('Item with index: ' + args.index + ' tapped');
    },


  });

  return viewModel;
}

module.exports = HomeViewModel;


/***/ }),

/***/ "tns-core-modules/application":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/application");

/***/ }),

/***/ "tns-core-modules/bundle-entry-points":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/bundle-entry-points");

/***/ }),

/***/ "tns-core-modules/data/observable":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/data/observable");

/***/ }),

/***/ "tns-core-modules/ui/frame":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame");

/***/ }),

/***/ "tns-core-modules/ui/styling/style-scope":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/styling/style-scope");

/***/ })

/******/ });