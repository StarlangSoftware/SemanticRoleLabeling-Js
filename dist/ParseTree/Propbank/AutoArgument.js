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