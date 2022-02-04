import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { ParseNodeDrawable } from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import { ArgumentType } from "nlptoolkit-propbank/dist/ArgumentType";
import { ParseTreeDrawable } from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import { Frameset } from "nlptoolkit-propbank/dist/Frameset";
export declare abstract class AutoArgument {
    protected secondLanguage: ViewLayerType;
    protected abstract autoDetectArgument(parseNode: ParseNodeDrawable, argumentType: ArgumentType): boolean;
    constructor(secondLanguage: ViewLayerType);
    autoArgument(parseTree: ParseTreeDrawable, frameset: Frameset): void;
}
