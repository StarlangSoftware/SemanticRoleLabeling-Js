(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SentenceAutoPredicate"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishSentenceAutoPredicate = void 0;
    const SentenceAutoPredicate_1 = require("./SentenceAutoPredicate");
    class TurkishSentenceAutoPredicate extends SentenceAutoPredicate_1.SentenceAutoPredicate {
        /**
         * Constructor for {@link TurkishSentenceAutoPredicate}. Gets the FrameSets as input from the user, and sets
         * the corresponding attribute.
         * @param framesetList FramesetList containing the Turkish propbank frames.
         */
        constructor(framesetList) {
            super();
            this.framesetList = framesetList;
        }
        /**
         * The method uses predicateCandidates method to predict possible predicates. For each candidate, it sets for that
         * word PREDICATE tag.
         * @param sentence The sentence for which predicates will be determined automatically.
         * @return If at least one word has been tagged, true; false otherwise.
         */
        autoPredicate(sentence) {
            let candidateList = sentence.predicateCandidates(this.framesetList);
            for (let word of candidateList) {
                word.setArgumentList("PREDICATE$" + word.getSemantic());
            }
            if (candidateList.length > 0) {
                return true;
            }
            return false;
        }
    }
    exports.TurkishSentenceAutoPredicate = TurkishSentenceAutoPredicate;
});
//# sourceMappingURL=TurkishSentenceAutoPredicate.js.map