import {AutoArgument} from "./AutoArgument";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {ArgumentType} from "nlptoolkit-propbank/dist/ArgumentType";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {ParseNode} from "nlptoolkit-parsetree/dist/ParseNode";

export class TurkishAutoArgument extends AutoArgument{

    constructor() {
        super(ViewLayerType.TURKISH_WORD);
    }

    private checkAncestors(parseNode: ParseNode, name: string): boolean{
        while (parseNode != null){
            if (parseNode.getData().getName() == name){
                return true;
            }
            parseNode = parseNode.getParent();
        }
        return false;
    }

    private checkAncestorsUntil(parseNode: ParseNode, suffix: string): boolean{
        while (parseNode != null){
            if (parseNode.getData().getName().includes("-" + suffix)){
                return true;
            }
            parseNode = parseNode.getParent();
        }
        return false;
    }

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