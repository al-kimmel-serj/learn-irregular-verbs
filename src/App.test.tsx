import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import IrregularVerb from "./domain/IrregularVerb";

test('renders form', async () => {
    const f = () => Promise.resolve<IrregularVerb[]>([
        new IrregularVerb('be', 'was/were', 'been', 'быть'),
    ]);

    render(<App fetchShuffledIrregularVerbs={f} />);

    await screen.findByText(/Base form/);
    await screen.findByText(/Past tense form/);
    await screen.findByText(/Past participle form/);
});
