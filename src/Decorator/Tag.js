"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("../App");
function Tag(tagName, containerName) {
    if (tagName === void 0) { tagName = null; }
    if (containerName === void 0) { containerName = App_1.App.DEFAULT_CONTAINER_NAME; }
    return function (target, propertyKey, descriptor) {
        if (propertyKey === void 0) { propertyKey = null; }
        if (descriptor === void 0) { descriptor = null; }
        tagName = tagName ? tagName : propertyKey;
        tagName = tagName[0] == '_' ? tagName.substr(1) : tagName;
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return App_1.App.getInstance(containerName).getsByTag(tagName);
            }
        });
    };
}
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map