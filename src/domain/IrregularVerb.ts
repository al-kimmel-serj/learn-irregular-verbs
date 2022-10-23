class IrregularVerb {
    baseForm: string;
    pastTense: string;
    pastParticiple: string;
    translation: string;

    constructor(baseForm: string, pastTense: string, pastParticiple: string, translation: string) {
        this.baseForm = baseForm;
        this.pastTense = pastTense;
        this.pastParticiple = pastParticiple;
        this.translation = translation;
    }
}

export default IrregularVerb;