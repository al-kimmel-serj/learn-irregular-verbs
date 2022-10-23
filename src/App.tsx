import React, {useEffect, useState} from 'react';
import './App.css';
import IrregularVerb from "./domain/IrregularVerb";
import CardForm from "./forms/CardForm";

async function fetchShuffledIrregularVerbs(): Promise<IrregularVerb[]> {
    const remoteIrregularVerbs = [
        new IrregularVerb('be', 'was/were', 'been', 'быть'),
        new IrregularVerb('become', 'became', 'become', 'становиться'),
        new IrregularVerb('begin', 'began', 'begun', 'начинать'),
    ];

    for (let i = remoteIrregularVerbs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remoteIrregularVerbs[i], remoteIrregularVerbs[j]] = [remoteIrregularVerbs[j], remoteIrregularVerbs[i]];
    }

    return remoteIrregularVerbs;
}

function App() {
    const [irregularVerbs, setIrregularVerbs] = useState<IrregularVerb[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchDataFromBackend = async () => {
            const remoteIrregularVerbs = await fetchShuffledIrregularVerbs();
            setIrregularVerbs(remoteIrregularVerbs);
            setCurrentIndex(0);
        }

        fetchDataFromBackend().catch(console.error);
    }, []);

    if (currentIndex === null) {
        return (
            <div>Loading ...</div>
        );
    }

    const verb = irregularVerbs[currentIndex];

    return (
        <div className="App">
            {currentIndex >= irregularVerbs.length
                ? <div className="congrats-container">
                    <h1>All done. Congrats! :)</h1>
                </div>
                : (
                    <div className="card-container">
                        <CardForm key={verb.baseForm} verb={verb} onSuccess={() => {
                            setCurrentIndex(currentIndex + 1);
                        }} onFail={() => {
                            alert(`${verb.translation} forms aren't correct`);
                        }}/>
                    </div>
                )}
        </div>
    );
}

export default App;
