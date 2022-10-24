import React, {useEffect, useState} from 'react';
import './App.css';
import IrregularVerb from "./domain/IrregularVerb";
import CardForm from "./forms/CardForm";

type AppProps = {
    fetchShuffledIrregularVerbs: () => Promise<IrregularVerb[]>,
}

function App({fetchShuffledIrregularVerbs}: AppProps) {
    const [irregularVerbs, setIrregularVerbs] = useState<IrregularVerb[]>([]);
    const [irregularVerbsIsLoading, setIrregularVerbsIsLoading] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const fetchDataFromBackend = async () => {
            try {
                setIrregularVerbsIsLoading(true);
                const remoteIrregularVerbs = await fetchShuffledIrregularVerbs();
                setIrregularVerbs(remoteIrregularVerbs);
            } finally {
                setIrregularVerbsIsLoading(false);
            }
        }

        fetchDataFromBackend().catch(console.error);
    }, [fetchShuffledIrregularVerbs]);

    if (irregularVerbsIsLoading) {
        return (
            <div className="App">
                <h1>Loading ...</h1>
            </div>
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
