import { SentenceAutoArgument } from "./SentenceAutoArgument";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
export declare class TurkishSentenceAutoArgument extends SentenceAutoArgument {
    /**
     * Given the sentence for which the predicate(s) were determined before, this method automatically assigns
     * semantic role labels to some/all words in the sentence. The method first finds the first predicate, then assuming
     * that the shallow parse tags were preassigned, assigns ÖZNE tagged words ARG0; NESNE tagged words ARG1. If the
     * verb is in passive form, ÖZNE tagged words are assigned as ARG1.
     * @param sentence The sentence for which semantic roles will be determined automatically.
     * @return If the method assigned at least one word a semantic role label, the method returns true; false otherwise.
     */
    autoArgument(sentence: AnnotatedSentence): boolean;
}
