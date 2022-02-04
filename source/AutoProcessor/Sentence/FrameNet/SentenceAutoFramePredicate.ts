import {FrameNet} from "nlptoolkit-framenet/dist/FrameNet";
import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";

export abstract class SentenceAutoFramePredicate {

    protected frameNet: FrameNet

    /**
     * The method should set determine all frame predicates in the sentence.
     * @param sentence The sentence for which frame predicates will be determined automatically.
     * @return True if the auto frame predicate is successful.
     */
    abstract autoPredicate(sentence: AnnotatedSentence): boolean

}