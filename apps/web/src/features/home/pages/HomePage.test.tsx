import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the welcome content', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Recipe App' })).toBeInTheDocument();
    expect(screen.getByText('Your kitchen starts here')).toBeInTheDocument();
    expect(screen.getByText('A fresh place to collect, organize, and cook the recipes you love.')).toBeInTheDocument();
    expect(screen.getByText('Ready for your first recipe')).toBeInTheDocument();
  });
});
