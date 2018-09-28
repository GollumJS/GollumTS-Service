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
    App.prototype.declare = function (name, clazz) {
        name = name.toLowerCase();
        this._container[name] = {
            clazz: clazz,
            instance: null,
        };
    };
    App.prototype.get = function (name) {
        name = name.toLowerCase();
        if (!this._container[name]) {
            throw new Error('Service not found: \'' + this._containerName + ':' + name + '\'');
        }
        if (!this._container[name].instance) {
            this._container[name].instance = new (this._container[name].clazz)();
        }
        return this._container[name].instance;
    };
    App.DEFAULT_CONTAINER_NAME = 'default';
    App._instances = {};
    return App;
}());
exports.App = App;
//# sourceMappingURL=App.js.map