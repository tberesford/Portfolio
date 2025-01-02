import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home', () => {
    it('renders title', () => {
        render(<Home/>);
        const content = screen.getByText("Tom Beresford");
        expect(content).toBeInTheDocument();
    })
})