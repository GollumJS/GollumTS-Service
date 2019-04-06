"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("../App");
function ServiceName() {
    return function (target, propertyKey, descriptor) {
        if (propertyKey === void 0) { propertyKey = null; }
        if (descriptor === void 0) { descriptor = null; }
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this[App_1.App.SERVICE_NAME_PROPERTY];
            }
        });
    };
}
exports.ServiceName = ServiceName;
//# sourceMappingURL=ServiceName.js.map