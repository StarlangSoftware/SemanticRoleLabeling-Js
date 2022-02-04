(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SentenceAutoArgument", "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalTag"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishSentenceAutoArgument = void 0;
    const SentenceAutoArgument_1 = require("./SentenceAutoArgument");
    const MorphologicalTag_1 = require("nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalTag");
    class TurkishSentenceAutoArgument extends SentenceAutoArgument_1.SentenceAutoArgument {
        /**
         * Given the sentence for which the predicate(s) were determined before, this method automatically assigns
         * semantic role labels to some/all words in the sentence. The method first finds the first predicate, then assuming
         * that the shallow parse tags were preassigned, assigns ÖZNE tagged words ARG0; NESNE tagged words ARG1. If the
         * verb is in passive form, ÖZNE tagged words are assigned as ARG1.
         * @param sentence The sentence for which semantic roles will be determined automatically.
         * @return If the method assigned at least one word a semantic role label, the method returns true; false otherwise.
         */
        autoArgument(sentence) {
            let modified = false;
            let predicateId = null;
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                if (word.getArgument() != null && word.getArgument().getArgumentType() == "PREDICATE") {
                    predicateId = word.getArgument().getId();
                    break;
                }
            }
            if (predicateId != null) {
                for (let i = 0; i < sentence.wordCount(); i++) {
                    let word = sentence.getWord(i);
                    if (word.getArgument() == null) {
                        if (word.getShallowParse() != null && word.getShallowParse() == "ÖZNE") {
                            if (word.getParse() != null && word.getParse().containsTag(MorphologicalTag_1.MorphologicalTag.PASSIVE)) {
                                word.setArgument("ARG1$" + predicateId);
                            }
                            else {
                                word.setArgument("ARG0$" + predicateId);
                            }
                            modified = true;
                        }
                        else {
                            if (word.getShallowParse() != null && word.getShallowParse() == "NESNE") {
                                word.setArgument("ARG1$" + predicateId);
                                modified = true;
                            }
                        }
                    }
                }
            }
            return modified;
        }
    }
    exports.TurkishSentenceAutoArgument = TurkishSentenceAutoArgument;
});
//# sourceMappingURL=TurkishSentenceAutoArgument.js.map