"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App = (function () {
    function App(name) {
        if (name === void 0) { name = App.DEFAULT_CONTAINER_NAME; }
        this._container = {};
        this._containerName = name;
        App._instances[name] = this;
        this.set('app', this);
    }
    App.getInstance = function (name) {
        if (name === void 0) { name = App.DEFAULT_CONTAINER_NAME; }
        return this._instances[name];
    };
    App.prototype.set = function (name, value) {
        name = name.toLowerCase();
        this._container[name] = {
            clazz: value.constructor,
            instance: value,
        };
    };
    App.prototype.has = function (name) {
        name = name.toLowerCase();
        return !!this._container[name];
    };
    App.prototype.declare = function (name, clazz, args) {
        if (args === void 0) { args = []; }
        name = name.toLowerCase();
        this._container[name] = {
            clazz: clazz,
            instance: null,
            args: args,
        };
    };
    App.prototype.get = function (name) {
        var _a;
        name = name.toLowerCase();
        var target = this._container[name];
        if (!target) {
            throw new Error('Service not found: \'' + this._containerName + ':' + name + '\'');
        }
        if (!target.instance) {
            target.instance = new ((_a = (target.clazz)).bind.apply(_a, [void 0].concat(target.args)))();
        }
        return target.instance;
    };
    App.DEFAULT_CONTAINER_NAME = 'default';
    App._instances = {};
    return App;
}());
exports.App = App;
//# sourceMappingURL=App.js.map