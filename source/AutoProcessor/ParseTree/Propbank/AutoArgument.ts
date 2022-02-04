import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {ArgumentType} from "nlptoolkit-propbank/dist/ArgumentType";
import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {Frameset} from "nlptoolkit-propbank/dist/Frameset";
import {NodeDrawableCollector} from "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";
import {IsTransferable} from "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTransferable";
import {ArgumentTypeStatic} from "nlptoolkit-propbank/dist/ArgumentTypeStatic";

export abstract class AutoArgument {

    protected secondLanguage: ViewLayerType
    protected abstract autoDetectArgument(parseNode: ParseNodeDrawable, argumentType: ArgumentType): boolean

    constructor(secondLanguage: ViewLayerType) {
        this.secondLanguage = secondLanguage
    }

    autoArgument(parseTree: ParseTreeDrawable, frameset: Frameset){
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTransferable(this.secondLanguage));
        let leafList = nodeDrawableCollector.collect();
        for (let parseNode of leafList){
            if (parseNode.getLayerData(ViewLayerType.PROPBANK) == null){
                for (let argumentType in ArgumentType){
                    if (frameset.containsArgument(ArgumentTypeStatic.getArguments(argumentType)) &&
                        this.autoDetectArgument(parseNode, ArgumentTypeStatic.getArguments(argumentType))){
                        parseNode.getLayerInfo().setLayerData(ViewLayerType.PROPBANK, argumentType);
                    }
                }
                if (Word.isPunctuation(parseNode.getLayerData(this.secondLanguage))){
                    parseNode.getLayerInfo().setLayerData(ViewLayerType.PROPBANK, "NONE");
                }
            }
        }
    }
}