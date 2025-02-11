(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SentenceAutoFramePredicate"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishSentenceAutoFramePredicate = void 0;
    const SentenceAutoFramePredicate_1 = require("./SentenceAutoFramePredicate");
    class TurkishSentenceAutoFramePredicate extends SentenceAutoFramePredicate_1.SentenceAutoFramePredicate {
        /**
         * Constructor for {@link TurkishSentenceAutoFramePredicate}. Gets the FrameSets as input from the user, and sets
         * the corresponding attribute.
         * @param frameNet FrameNet containing the Turkish frames.
         */
        constructor(frameNet) {
            super();
            this.frameNet = frameNet;
        }
        /**
         * Checks all possible frame predicates and annotate them.
         * @param sentence The sentence for which frame predicates will be determined automatically.
         * @return True, if at least one frame predicate is annotated, false otherwise.
         */
        autoPredicate(sentence) {
            let candidateList = sentence.predicateFrameCandidates(this.frameNet);
            for (let word of candidateList) {
                word.setFrameElementList("PREDICATE$NONE$" + word.getSemantic());
            }
            if (candidateList.length > 0) {
                return true;
            }
            return false;
        }
    }
    exports.TurkishSentenceAutoFramePredicate = TurkishSentenceAutoFramePredicate;
});
//# sourceMappingURL=TurkishSentenceAutoFramePredicate.js.map