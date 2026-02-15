import { AutoArgument } from "./AutoArgument";
import { ParseNodeDrawable } from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import { ArgumentType } from "nlptoolkit-propbank/dist/ArgumentType";
export declare class TurkishAutoArgument extends AutoArgument {
    /**
     * Sets the language.
     */
    constructor();
    /**
     * Checks all ancestors of the current parse node, until an ancestor has a tag of given name, or the ancestor is
     * null. Returns the ancestor with the given tag, or null.
     * @param parseNode Parse node to start checking ancestors.
     * @param name Tag to check.
     * @return The ancestor of the given parse node with the given tag, if such ancestor does not exist, returns null.
     */
    private checkAncestors;
    /**
     * Checks all ancestors of the current parse node, until an ancestor has a tag with the given, or the ancestor is
     * null. Returns the ancestor with the tag having the given suffix, or null.
     * @param parseNode Parse node to start checking ancestors.
     * @param suffix Suffix of the tag to check.
     * @return The ancestor of the given parse node with the tag having the given suffix, if such ancestor does not
     * exist, returns null.
     */
    private checkAncestorsUntil;
    /**
     * The method tries to set the argument of the given parse node to the given argument type automatically. If the
     * argument type condition matches the parse node, it returns true, otherwise it returns false.
     * @param parseNode Parse node to check for semantic role.
     * @param argumentType Semantic role to check.
     * @return True, if the argument type condition matches the parse node, false otherwise.
     */
    protected autoDetectArgument(parseNode: ParseNodeDrawable, argumentType: ArgumentType): boolean;
}
