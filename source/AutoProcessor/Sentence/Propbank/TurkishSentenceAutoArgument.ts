import {SentenceAutoArgument} from "./SentenceAutoArgument";
import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import {AnnotatedWord} from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";
import {MorphologicalTag} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalTag";

export class TurkishSentenceAutoArgument extends SentenceAutoArgument{

    /**
     * Given the sentence for which the predicate(s) were determined before, this method automatically assigns
     * semantic role labels to some/all words in the sentence. The method first finds the first predicate, then assuming
     * that the shallow parse tags were preassigned, assigns ÖZNE tagged words ARG0; NESNE tagged words ARG1. If the
     * verb is in passive form, ÖZNE tagged words are assigned as ARG1.
     * @param sentence The sentence for which semantic roles will be determined automatically.
     * @return If the method assigned at least one word a semantic role label, the method returns true; false otherwise.
     */
    autoArgument(sentence: AnnotatedSentence): boolean {
        let modified = false;
        let predicateId = null;
        for (let i = 0; i < sentence.wordCount(); i++){
            let word = <AnnotatedWord> sentence.getWord(i);
            if (word.getArgumentList() != null && word.getArgumentList().containsPredicate()){
                predicateId = word.getSemantic();
                break;
            }
        }
        if (predicateId != null){
            for (let i = 0; i < sentence.wordCount(); i++){
                let word = <AnnotatedWord> sentence.getWord(i);
                if (word.getArgumentList() == null){
                    if (word.getShallowParse() != null && word.getShallowParse() == "ÖZNE"){
                        if (word.getParse() != null && word.getParse().containsTag(MorphologicalTag.PASSIVE)){
                            word.setArgumentList("ARG1$" + predicateId);
                        } else {
                            word.setArgumentList("ARG0$" + predicateId);
                        }
                        modified = true;
                    } else {
                        if (word.getShallowParse() != null && word.getShallowParse() == "NESNE"){
                            word.setArgumentList("ARG1$" + predicateId);
                            modified = true;
                        }
                    }
                }
            }
        }
        return modified;
    }
    
}