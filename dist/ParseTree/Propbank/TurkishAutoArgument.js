(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./AutoArgument", "nlptoolkit-propbank/dist/ArgumentType", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishAutoArgument = void 0;
    const AutoArgument_1 = require("./AutoArgument");
    const ArgumentType_1 = require("nlptoolkit-propbank/dist/ArgumentType");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class TurkishAutoArgument extends AutoArgument_1.AutoArgument {
        /**
         * Sets the language.
         */
        constructor() {
            super(ViewLayerType_1.ViewLayerType.TURKISH_WORD);
        }
        /**
         * Checks all ancestors of the current parse node, until an ancestor has a tag of given name, or the ancestor is
         * null. Returns the ancestor with the given tag, or null.
         * @param parseNode Parse node to start checking ancestors.
         * @param name Tag to check.
         * @return The ancestor of the given parse node with the given tag, if such ancestor does not exist, returns null.
         */
        checkAncestors(parseNode, name) {
            while (parseNode != null) {
                if (parseNode.getData().getName() == name) {
                    return true;
                }
                parseNode = parseNode.getParent();
            }
            return false;
        }
        /**
         * Checks all ancestors of the current parse node, until an ancestor has a tag with the given, or the ancestor is
         * null. Returns the ancestor with the tag having the given suffix, or null.
         * @param parseNode Parse node to start checking ancestors.
         * @param suffix Suffix of the tag to check.
         * @return The ancestor of the given parse node with the tag having the given suffix, if such ancestor does not
         * exist, returns null.
         */
        checkAncestorsUntil(parseNode, suffix) {
            while (parseNode != null) {
                if (parseNode.getData().getName().includes("-" + suffix)) {
                    return true;
                }
                parseNode = parseNode.getParent();
            }
            return false;
        }
        /**
         * The method tries to set the argument of the given parse node to the given argument type automatically. If the
         * argument type condition matches the parse node, it returns true, otherwise it returns false.
         * @param parseNode Parse node to check for semantic role.
         * @param argumentType Semantic role to check.
         * @return True, if the argument type condition matches the parse node, false otherwise.
         */
        autoDetectArgument(parseNode, argumentType) {
            let parent = parseNode.getParent();
            switch (argumentType) {
                case ArgumentType_1.ArgumentType.ARG0:
                    if (this.checkAncestorsUntil(parent, "SBJ")) {
                        return true;
                    }
                    break;
                case ArgumentType_1.ArgumentType.ARG1:
                    if (this.checkAncestorsUntil(parent, "OBJ")) {
                        return true;
                    }
                    break;
                case ArgumentType_1.ArgumentType.ARGMADV:
                    if (this.checkAncestorsUntil(parent, "ADV")) {
                        return true;
                    }
                    break;
                case ArgumentType_1.ArgumentType.ARGMTMP:
                    if (this.checkAncestorsUntil(parent, "TMP")) {
                        return true;
                    }
                    break;
                case ArgumentType_1.ArgumentType.ARGMMNR:
                    if (this.checkAncestorsUntil(parent, "MNR")) {
                        return true;
                    }
                    break;
                case ArgumentType_1.ArgumentType.ARGMLOC:
                    if (this.checkAncestorsUntil(parent, "LOC")) {
                        return true;
                    }
                    break;
                case ArgumentType_1.ArgumentType.ARGMDIR:
                    if (this.checkAncestorsUntil(parent, "DIR")) {
                        return true;
                    }
                    break;
                case ArgumentType_1.ArgumentType.ARGMDIS:
                    if (this.checkAncestors(parent, "CC")) {
                        return true;
                    }
                    break;
                case ArgumentType_1.ArgumentType.ARGMEXT:
                    if (this.checkAncestorsUntil(parent, "EXT")) {
                        return true;
                    }
                    break;
            }
            return false;
        }
    }
    exports.TurkishAutoArgument = TurkishAutoArgument;
});
//# sourceMappingURL=TurkishAutoArgument.js.map