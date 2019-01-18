"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Tagged(tagName) {
    return function (target, propertyKey, descriptor) {
        if (propertyKey === void 0) { propertyKey = null; }
        if (descriptor === void 0) { descriptor = null; }
        if (!target.__gollumts_service_tagged__) {
            target.__gollumts_service_tagged__ = [];
        }
        if (target.__gollumts_service_tagged__.indexOf(tagName) === -1) {
            target.__gollumts_service_tagged__.push(tagName);
        }
    };
}
exports.Tagged = Tagged;
//# sourceMappingURL=Tagged.js.map