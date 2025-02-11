import {SentenceAutoPredicate} from "./SentenceAutoPredicate";
import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import {FramesetList} from "nlptoolkit-propbank/dist/FramesetList";

export class TurkishSentenceAutoPredicate extends SentenceAutoPredicate{

    private readonly framesetList: FramesetList

    /**
     * Constructor for {@link TurkishSentenceAutoPredicate}. Gets the FrameSets as input from the user, and sets
     * the corresponding attribute.
     * @param framesetList FramesetList containing the Turkish propbank frames.
     */
    constructor(framesetList: FramesetList) {
        super();
        this.framesetList = framesetList
    }

    /**
     * The method uses predicateCandidates method to predict possible predicates. For each candidate, it sets for that
     * word PREDICATE tag.
     * @param sentence The sentence for which predicates will be determined automatically.
     * @return If at least one word has been tagged, true; false otherwise.
     */
    autoPredicate(sentence: AnnotatedSentence): boolean {
        let candidateList = sentence.predicateCandidates(this.framesetList);
        for (let word of candidateList){
            word.setArgumentList("PREDICATE$" + word.getSemantic());
        }
        if (candidateList.length > 0){
            return true;
        }
        return false;
    }

}