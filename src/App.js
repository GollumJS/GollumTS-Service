"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App = (function () {
    function App(name) {
        if (name === void 0) { name = App.DEFAULT_CONTAINER_NAME; }
        this._container = {};
        this._taggedServices = {};
        this._containerName = name;
        App._instances[name] = this;
        this.set('app', this);
    }
    App.getInstance = function (name) {
        if (name === void 0) { name = App.DEFAULT_CONTAINER_NAME; }
        var container = this._instances[name];
        if (!container) {
            throw new Error('Container ' + name + ' not found.');
        }
        return container;
    };
    App.prototype.set = function (name, value, options) {
        if (options === void 0) { options = {}; }
        name = name.toLowerCase();
        var service = {
            clazz: value.constructor,
            instance: value,
            options: options
        };
        this.resetTaggedCache(service);
        this._container[name] = service;
    };
    App.prototype.has = function (name) {
        name = name.toLowerCase();
        return !!this._container[name];
    };
    App.prototype.declare = function (name, clazz, options) {
        if (options === void 0) { options = {}; }
        name = name.toLowerCase();
        var service = {
            clazz: clazz,
            instance: null,
            options: options,
        };
        this.resetTaggedCache(service);
        this._container[name] = service;
    };
    App.prototype.resetTaggedCache = function (service) {
        var _this = this;
        service.options.tags = service.options.tags ? service.options.tags : [];
        if (service.clazz && service.clazz.__gollumts_service_tagged__) {
            service.options.tags = service.options.tags.concat(service.clazz.__gollumts_service_tagged__);
        }
        service.options.tags = service.options.tags.filter(function (value, index, self) { return self.indexOf(value) === index; });
        if (service.options.tags) {
            service.options.tags.forEach(function (tagName) {
                if (_this._taggedServices[tagName])
                    delete _this._taggedServices[tagName];
            });
        }
    };
    App.prototype.get = function (name) {
        var _a;
        name = name.toLowerCase();
        var target = this._container[name];
        if (!target) {
            throw new Error('Service not found: \'' + this._containerName + ':' + name + '\'');
        }
        if (!target.instance) {
            var args = target.options && target.options.args ? target.options.args : [];
            target.instance = new ((_a = (target.clazz)).bind.apply(_a, [void 0].concat(args)))();
            target[App.SERVICE_NAME_PROPERTY] = name;
        }
        return target.instance;
    };
    App.prototype.getsByTag = function (tagName) {
        var _this = this;
        if (!this._taggedServices[tagName]) {
            this._taggedServices[tagName] = Object.keys(this._container)
                .filter(function (name) {
                var service = _this._container[name];
                return service.options && service.options.tags && service.options.tags.indexOf(tagName) !== -1;
            })
                .map(function (name) { return _this.get(name); });
        }
        return this._taggedServices[tagName];
    };
    App.DEFAULT_CONTAINER_NAME = 'default';
    App.SERVICE_NAME_PROPERTY = '__gts_sarvicename__';
    App._instances = {};
    return App;
}());
exports.App = App;
//# sourceMappingURL=App.js.map