(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "nlptoolkit-propbank/dist/ArgumentType", "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector", "nlptoolkit-dictionary/dist/Dictionary/Word", "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTransferable", "nlptoolkit-propbank/dist/ArgumentTypeStatic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AutoArgument = void 0;
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const ArgumentType_1 = require("nlptoolkit-propbank/dist/ArgumentType");
    const NodeDrawableCollector_1 = require("nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    const IsTransferable_1 = require("nlptoolkit-annotatedtree/dist/Processor/Condition/IsTransferable");
    const ArgumentTypeStatic_1 = require("nlptoolkit-propbank/dist/ArgumentTypeStatic");
    class AutoArgument {
        constructor(secondLanguage) {
            this.secondLanguage = secondLanguage;
        }
        /**
         * Given the parse tree and the frame net, the method collects all leaf nodes and tries to set a propbank argument
         * label to them. Specifically it tries all possible argument types one by one ARG0 first, then ARG1, then ARG2 etc.
         * Each argument type has a special function to accept. The special function checks basically if there is a specific
         * type of ancestor (specific to the argument, for example SUBJ for ARG0), or not.
         * @param parseTree Parse tree for semantic role labeling
         * @param frameset Frame net used in labeling.
         */
        autoArgument(parseTree, frameset) {
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTransferable_1.IsTransferable(this.secondLanguage));
            let leafList = nodeDrawableCollector.collect();
            for (let parseNode of leafList) {
                if (parseNode.getLayerData(ViewLayerType_1.ViewLayerType.PROPBANK) == null) {
                    for (let argumentType in ArgumentType_1.ArgumentType) {
                        if (frameset.containsArgument(ArgumentTypeStatic_1.ArgumentTypeStatic.getArguments(argumentType)) &&
                            this.autoDetectArgument(parseNode, ArgumentTypeStatic_1.ArgumentTypeStatic.getArguments(argumentType))) {
                            parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.PROPBANK, argumentType);
                        }
                    }
                    if (Word_1.Word.isPunctuation(parseNode.getLayerData(this.secondLanguage))) {
                        parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.PROPBANK, "NONE");
                    }
                }
            }
        }
    }
    exports.AutoArgument = AutoArgument;
});
//# sourceMappingURL=AutoArgument.js.map