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
    exports.SentenceAutoPredicate = void 0;
    class SentenceAutoPredicate {
    }
    exports.SentenceAutoPredicate = SentenceAutoPredicate;
});
//# sourceMappingURL=SentenceAutoPredicate.js.map