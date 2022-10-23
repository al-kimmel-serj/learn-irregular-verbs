import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders form', async () => {
    render(<App/>);

    await screen.findByText(/Base form/);
    await screen.findByText(/Past tense form/);
    await screen.findByText(/Past participle form/);
});
