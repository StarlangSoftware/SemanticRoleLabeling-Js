import { SentenceAutoFramePredicate } from "./SentenceAutoFramePredicate";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import { FrameNet } from "nlptoolkit-framenet/dist/FrameNet";
export declare class TurkishSentenceAutoFramePredicate extends SentenceAutoFramePredicate {
    /**
     * Constructor for {@link TurkishSentenceAutoFramePredicate}. Gets the FrameSets as input from the user, and sets
     * the corresponding attribute.
     * @param frameNet FrameNet containing the Turkish frames.
     */
    constructor(frameNet: FrameNet);
    /**
     * Checks all possible frame predicates and annotate them.
     * @param sentence The sentence for which frame predicates will be determined automatically.
     * @return True, if at least one frame predicate is annotated, false otherwise.
     */
    autoPredicate(sentence: AnnotatedSentence): boolean;
}
