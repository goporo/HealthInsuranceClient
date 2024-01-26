import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'

import App from './App';

let container = null;

beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // Clean up on exiting
    container.remove();
});

test('renders App component', () => {
    act(() => {
        const root = createRoot(container);
        root.render(<App />);
    });

    // Assuming you have a top-level element with the data-testid attribute set to 'app'
    const appElement = container.querySelector('[data-testid="app"]');
    expect(appElement).toBeInTheDocument();
});
