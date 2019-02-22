Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="declarations.d.ts"/>
var observable = require("tns-core-modules/data/observable");
var observableArray = require("tns-core-modules/data/observable-array");
var http = require("tns-core-modules/http");
var platform = require("tns-core-modules/platform");
var frameModule = require("tns-core-modules/ui/frame");
var stopProcess = require("./stop-process");
function enableSocketIoDebugging() {
    console.log('enabling socket.io debugging');
    global.localStorage = {
        debug: "*"
    };
    global.window = global;
}
var config = require('./config');
config.options = config.options || {};
if (!config.options.appDirectoryRelativePath) {
    config.options.appDirectoryRelativePath = "app";
}
var TestBrokerViewModel = /** @class */ (function (_super) {
    __extends(TestBrokerViewModel, _super);
    function TestBrokerViewModel() {
        var _this = _super.call(this) || this;
        global.__karma__ = _this;
        if (config.options.debugTransport) {
            enableSocketIoDebugging();
        }
        //debugger;
        _this.testResults = new observableArray.ObservableArray();
        _this.set('testResults', _this.testResults);
        _this.set('serverInfo', 'disconnected');
        _this.set('goToTestsText', 'Run Tests');
        _this.set('isConnected', false);
        _this.set('testsPassed', '-');
        _this.set('testsFailed', '-');
        _this.set('testsRan', 0);
        _this.set('testsTotal', 0);
        _this.startEmitted = false;
        _this.networkConfig = config;
        _this.resolveKarmaHost()
            .then(function () {
            if (_this.networkConfig.reachableIp) {
                _this.connectToKarma();
            }
        }).catch(function (e) { return console.log(e.toString()); });
        return _this;
    }
    TestBrokerViewModel.prototype.resolveKarmaHost = function () {
        var _this = this;
        var successfulResolution = new Promise(function (resolve, reject) {
            var foundKarma = false;
            var resolvers = config.ips.map(function (ip) {
                var karmaClientUrl = 'http://' + ip + ':' + config.port + '/context.json';
                console.log('NSUTR: fetching ' + karmaClientUrl);
                return http.getString({
                    url: karmaClientUrl,
                    method: 'GET',
                    timeout: 3000,
                }).then(function () {
                    console.log('NSUTR: found karma at ' + ip);
                    if (!foundKarma) {
                        foundKarma = true;
                        resolve(ip);
                    }
                }, function () { return undefined; });
            });
            Promise.all(resolvers)
                .then(function () {
                if (!foundKarma) {
                    resolve(null);
                }
            });
        });
        return successfulResolution
            .then(function (result) {
            if (result) {
                _this.set('serverInfo', 'found karma at ' + result);
                _this.networkConfig.reachableIp = result;
            }
            else {
                _this.set('serverInfo', 'no reachable hosts');
            }
        });
    };
    TestBrokerViewModel.prototype.updateBanner = function (message) {
        var _this = this;
        return function (err) {
            _this.set('serverInfo', message);
            if (err) {
                console.log('NSUTR-socket.io: ' + err.toString());
            }
        };
    };
    TestBrokerViewModel.prototype.connectToKarma = function () {
        var _this = this;
        this.baseUrl = 'http://' + this.networkConfig.reachableIp + ':' + this.networkConfig.port;
        console.log('NSUTR: connecting to karma at ' + this.baseUrl);
        // shims for engine.io-parser
        global.navigator = {
            userAgent: 'nativescript',
        };
        global.document = {
            documentElement: {
                style: {}
            }
        };
        var io = require('./socket.io');
        this.set('serverInfo', 'connecting to ' + this.baseUrl);
        var socket = this.socket = io.connect(this.baseUrl, {
            forceBase64: true
        });
        function formatName() {
            return "NativeScript / " + platform.device.sdkVersion + " (" + platform.device.osVersion + "; " + platform.device.model + ")";
        }
        var connected = this.updateBanner('connected');
        socket.on('connect', function (err) {
            console.log('NSUTR: successfully connected to karma');
            delete global.navigator;
            delete global.document;
            connected();
            _this.set('isConnected', true);
            socket.emit('register', {
                id: 'NativeScriptUnit-' + (0 | (Math.random() * 10000)),
                name: formatName(),
            });
        });
        socket.on('disconnect', this.updateBanner('disconnected'));
        socket.on('reconnecting', this.updateBanner('reconnecting in $ ms...'));
        socket.on('reconnect', connected);
        socket.on('reconnect_failed', this.updateBanner('failed to reconnect'));
        socket.on('info', this.updateBrowsersInfo.bind(this));
        socket.on('connect_failed', this.updateBanner('connection failed'));
        socket.on('disconnect', function () { return _this.updateBrowsersInfo([]); });
        socket.on('connect_error', function (data) { return console.log('NSUTR: socket.io error on connect: ' + data); });
        socket.on('execute', this.onKarmaExecute.bind(this));
    };
    TestBrokerViewModel.prototype.viewTestRunDetails = function () {
        frameModule.getFrameById('root-frame').navigate('run-details');
    };
    TestBrokerViewModel.prototype.beginLocalRun = function () {
        this.config = this.config || { args: [] };
        frameModule.getFrameById('root-frame').navigate('tns_modules/nativescript-unit-test-runner/test-run-page');
    };
    TestBrokerViewModel.prototype.onKarmaExecute = function (cfg) {
        this.karmaRequestedRun = true;
        this.config = cfg;
        this.beginLocalRun();
    };
    TestBrokerViewModel.prototype.executeTestRun = function () {
        var _this = this;
        if (this.executed) {
            console.log('NSUTR: disregarding second execution');
            return;
        }
        this.executed = true;
        this.set('goToTestsText', 'View Test Run');
        this.startEmitted = false;
        this.hasError = false;
        var contextUrl = this.baseUrl + '/context.json';
        console.log("NSUTR: downloading " + contextUrl);
        http.getString(contextUrl)
            .then(function (content) {
            var parsedContent = JSON.parse(content);
            return parsedContent.files;
        })
            .then(function (scriptUrls) {
            return Promise.all(scriptUrls.map(function (url) {
                var appPrefix = "/base/" + config.options.appDirectoryRelativePath + "/";
                if (url.startsWith(appPrefix)) {
                    var paramsStart = url.indexOf('?');
                    var relativePath = url.substring(appPrefix.length, paramsStart);
                    return Promise.resolve({
                        url: url,
                        localPath: '../../' + relativePath,
                    });
                }
                else {
                    return http.getString(_this.baseUrl + url)
                        .then(function (contents) {
                        return {
                            url: url,
                            contents: contents,
                        };
                    });
                }
            }));
        })
            .then(function (scriptsContents) { return setTimeout(function () { return _this.runTests(scriptsContents); }, 0); });
    };
    TestBrokerViewModel.prototype.runTests = function (testScripts) {
        var _this = this;
        testScripts
            .filter(function (script) { return _this.isTestScript(script.url); })
            .forEach(function (script) {
            try {
                if (script.localPath) {
                    console.log('NSUTR: require script ' + script.url + ' from ' + script.localPath);
                    require(script.localPath);
                }
                else {
                    console.log('NSUTR: eval script ' + script.url);
                    _this.loadShim(script.url);
                    //call eval indirectly to execute the scripts in the global scope
                    var geval = eval;
                    geval(script.contents);
                    _this.completeLoading(script.url);
                }
            }
            catch (err) {
                _this.error(err.toString(), script.localPath || script.url, err.lineNumber || 0);
            }
        });
        if (!this.hasError) {
            console.log('NSUTR: beginning test run');
            if (config.options.debugBrk) {
                /// HINT: If you need to place breakpoints in your tests, navigate to your test files in the Sources panel.
                /// Hit the 'Resume script execution' button or F8 to continue to your tests.
                debugger;
            }
            this.start(this.config);
        }
    };
    TestBrokerViewModel.prototype.isTestScript = function (url) {
        return url.startsWith("/base/" + config.options.appDirectoryRelativePath + "/tests/") || !url.startsWith("/base/" + config.options.appDirectoryRelativePath + "/");
    };
    TestBrokerViewModel.prototype.updateBrowsersInfo = function (browsers) {
    };
    TestBrokerViewModel.prototype.start = function (cfg) {
        this.error("You need to include a test adapter for the testing framework you're using");
    };
    TestBrokerViewModel.prototype.info = function (data) {
        if (!this.startEmitted) {
            this.socketEmit('start', data);
            this.startEmitted = true;
        }
        else {
            this.socketEmit('info', data);
        }
        this.set('testsRunning', true);
        this.set('testsPassed', 0);
        this.set('testsFailed', 0);
        this.set('testsRan', 0);
        this.set('testsTotal', data.total);
    };
    TestBrokerViewModel.prototype.result = function (data) {
        if (!this.startEmitted) {
            this.socketEmit('start', { total: null });
            this.startEmitted = true;
        }
        this.socketEmit('result', data);
        var countVar = data.success ? 'testsPassed' : 'testsFailed';
        this.set(countVar, this.get(countVar) + 1);
        this.set('testsRan', this.get('testsRan') + 1);
        this.testResults.push(data);
    };
    TestBrokerViewModel.prototype.complete = function (data) {
        var _this = this;
        console.log("NSUTR: completed test run.");
        this.set('testsRunning', false);
        delete this.start;
        this.socketEmit('complete', data || {}, function () {
            console.log('NSUTR: completeAck');
            _this.socketEmit('disconnect');
            setTimeout(function () { return stopProcess(); }, 500);
        });
    };
    TestBrokerViewModel.prototype.error = function (msg, url, line) {
        this.hasError = true;
        var fullMsg = url ? msg + '\nat ' + url + (line ? ':' + line : '') : msg;
        console.log("NSUTR: this.error: " + fullMsg);
        this.result({
            id: url,
            description: url + " at line " + line || "",
            log: [msg],
            time: 0,
            success: false,
            suite: [],
        });
        this.complete();
        return false;
    };
    TestBrokerViewModel.prototype.socketEmit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.karmaRequestedRun) {
            this.socket.emit.apply(this.socket, arguments);
        }
    };
    TestBrokerViewModel.prototype.loadShim = function (url) {
        if (url.indexOf('mocha') !== -1) {
            global.window = global;
            global.location = { href: '/' };
            global.document = {
                getElementById: function (id) { return null; }
            };
        }
        else if (url.indexOf('chai') !== -1) {
            global.__shim_require = global.require;
            // global.require = function () {
            //     throw Error();
            // }
            global.window = global;
        }
        else if (url.indexOf('qunit.js') !== -1) {
            global.define = function (factory) {
                global.QUnit = factory();
            };
            global.define.amd = true;
        }
    };
    TestBrokerViewModel.prototype.completeLoading = function (url) {
        if (url.indexOf('mocha') !== -1) {
            delete global.window;
            //delete global.location;
            delete global.document;
        }
        if (url.indexOf('chai') !== -1) {
            delete global.window;
            // global.require = global.__shim_require;
            delete global.__shim_require;
        }
        else if (url.indexOf('qunit.js') !== -1) {
            delete global.define;
        }
    };
    return TestBrokerViewModel;
}(observable.Observable));
exports.TestBrokerViewModel = TestBrokerViewModel;
exports.mainViewModel = new TestBrokerViewModel();
require('application').onUncaughtError = function (error) {
    console.log("NSUTR: uncaught error");
    exports.mainViewModel.error(error.message);
};
