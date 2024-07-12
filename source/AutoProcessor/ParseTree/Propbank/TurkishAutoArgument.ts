import {AutoArgument} from "./AutoArgument";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {ArgumentType} from "nlptoolkit-propbank/dist/ArgumentType";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {ParseNode} from "nlptoolkit-parsetree/dist/ParseNode";

export class TurkishAutoArgument extends AutoArgument{

    /**
     * Sets the language.
     */
    constructor() {
        super(ViewLayerType.TURKISH_WORD);
    }

    /**
     * Checks all ancestors of the current parse node, until an ancestor has a tag of given name, or the ancestor is
     * null. Returns the ancestor with the given tag, or null.
     * @param parseNode Parse node to start checking ancestors.
     * @param name Tag to check.
     * @return The ancestor of the given parse node with the given tag, if such ancestor does not exist, returns null.
     */
    private checkAncestors(parseNode: ParseNode, name: string): boolean{
        while (parseNode != null){
            if (parseNode.getData().getName() == name){
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
    private checkAncestorsUntil(parseNode: ParseNode, suffix: string): boolean{
        while (parseNode != null){
            if (parseNode.getData().getName().includes("-" + suffix)){
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
    protected autoDetectArgument(parseNode: ParseNodeDrawable, argumentType: ArgumentType): boolean {
        let parent = parseNode.getParent();
        switch (argumentType){
            case ArgumentType.ARG0:
                if (this.checkAncestorsUntil(parent, "SBJ")){
                    return true;
                }
                break;
            case ArgumentType.ARG1:
                if (this.checkAncestorsUntil(parent, "OBJ")){
                    return true;
                }
                break;
            case ArgumentType.ARGMADV:
                if (this.checkAncestorsUntil(parent, "ADV")){
                    return true;
                }
                break;
            case ArgumentType.ARGMTMP:
                if (this.checkAncestorsUntil(parent, "TMP")){
                    return true;
                }
                break;
            case ArgumentType.ARGMMNR:
                if (this.checkAncestorsUntil(parent, "MNR")){
                    return true;
                }
                break;
            case ArgumentType.ARGMLOC:
                if (this.checkAncestorsUntil(parent, "LOC")){
                    return true;
                }
                break;
            case ArgumentType.ARGMDIR:
                if (this.checkAncestorsUntil(parent, "DIR")){
                    return true;
                }
                break;
            case ArgumentType.ARGMDIS:
                if (this.checkAncestors(parent, "CC")){
                    return true;
                }
                break;
            case ArgumentType.ARGMEXT:
                if (this.checkAncestorsUntil(parent, "EXT")){
                    return true;
                }
                break;
        }
        return false;
    }

}