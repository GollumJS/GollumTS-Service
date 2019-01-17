"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("../App");
function Service(name, containerName) {
    if (name === void 0) { name = null; }
    if (containerName === void 0) { containerName = App_1.App.DEFAULT_CONTAINER_NAME; }
    return function (target, propertyKey, descriptor) {
        if (propertyKey === void 0) { propertyKey = null; }
        if (descriptor === void 0) { descriptor = null; }
        name = name ? name : propertyKey;
        name = name[0] == '_' ? name.substr(1) : name;
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return App_1.App.getInstance(containerName).get(name);
            }
        });
    };
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map