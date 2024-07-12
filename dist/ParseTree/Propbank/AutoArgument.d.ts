import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { ParseNodeDrawable } from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import { ArgumentType } from "nlptoolkit-propbank/dist/ArgumentType";
import { ParseTreeDrawable } from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import { Frameset } from "nlptoolkit-propbank/dist/Frameset";
export declare abstract class AutoArgument {
    protected secondLanguage: ViewLayerType;
    protected abstract autoDetectArgument(parseNode: ParseNodeDrawable, argumentType: ArgumentType): boolean;
    protected constructor(secondLanguage: ViewLayerType);
    /**
     * Given the parse tree and the frame net, the method collects all leaf nodes and tries to set a propbank argument
     * label to them. Specifically it tries all possible argument types one by one ARG0 first, then ARG1, then ARG2 etc.
     * Each argument type has a special function to accept. The special function checks basically if there is a specific
     * type of ancestor (specific to the argument, for example SUBJ for ARG0), or not.
     * @param parseTree Parse tree for semantic role labeling
     * @param frameset Frame net used in labeling.
     */
    autoArgument(parseTree: ParseTreeDrawable, frameset: Frameset): void;
}
