(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SentenceAutoArgument = void 0;
    class SentenceAutoArgument {
    }
    exports.SentenceAutoArgument = SentenceAutoArgument;
});
//# sourceMappingURL=SentenceAutoArgument.js.map