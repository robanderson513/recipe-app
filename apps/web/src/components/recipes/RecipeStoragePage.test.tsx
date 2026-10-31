import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RecipeStoragePage from './RecipeStoragePage';

describe('RecipeStoragePage', () => {
  it('shows a loading state and then displays recipe groups', async () => {
    vi.useFakeTimers();

    render(<RecipeStoragePage />);

    expect(screen.getByText('Loading your recipes...')).toBeInTheDocument();

    vi.advanceTimersByTime(150);

    await waitFor(() => {
      expect(screen.getByText('Favorites')).toBeInTheDocument();
      expect(screen.getByText('Weeknight dinners')).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('creates a new recipe group from the dialog', async () => {
    vi.useFakeTimers();

    render(<RecipeStoragePage />);
    vi.advanceTimersByTime(150);

    fireEvent.click(screen.getByRole('button', { name: /create group/i }));
    fireEvent.change(screen.getByLabelText(/group name/i), { target: { value: 'Dessert ideas' } });
    fireEvent.click(screen.getByRole('button', { name: /save group/i }));

    await waitFor(() => {
      expect(screen.getByText('Dessert ideas')).toBeInTheDocument();
    });

    vi.useRealTimers();
  });
});
