import { AutoArgument } from "./AutoArgument";
import { ParseNodeDrawable } from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import { ArgumentType } from "nlptoolkit-propbank/dist/ArgumentType";
export declare class TurkishAutoArgument extends AutoArgument {
    constructor();
    private checkAncestors;
    private checkAncestorsUntil;
    protected autoDetectArgument(parseNode: ParseNodeDrawable, argumentType: ArgumentType): boolean;
}
