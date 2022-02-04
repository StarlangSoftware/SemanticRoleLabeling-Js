import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
export declare abstract class SentenceAutoPredicate {
    /**
     * The method should set determine all predicates in the sentence.
     * @param sentence The sentence for which predicates will be determined automatically.
     * @return True if the auto predicate is successful.
     */
    abstract autoPredicate(sentence: AnnotatedSentence): boolean;
}
