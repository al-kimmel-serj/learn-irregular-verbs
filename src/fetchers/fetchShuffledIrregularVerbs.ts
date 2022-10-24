import IrregularVerb from "../domain/IrregularVerb";

async function fetchShuffledIrregularVerbs(): Promise<IrregularVerb[]> {
    const resp = await fetch('./irregular-verbs.json');
    const remoteIrregularVerbs: IrregularVerb[] = await resp.json();

    for (let i = remoteIrregularVerbs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remoteIrregularVerbs[i], remoteIrregularVerbs[j]] = [remoteIrregularVerbs[j], remoteIrregularVerbs[i]];
    }

    return remoteIrregularVerbs;
}

export default fetchShuffledIrregularVerbs;
