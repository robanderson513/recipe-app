import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RecipeListPage from './RecipeListPage';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('RecipeListPage', () => {
  it('shows a loading state and then displays recipe groups', async () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/recipes']}>
        <RecipeListPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading your recipes...')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(150);
    });
    vi.useRealTimers();

    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Weeknight dinners')).toBeInTheDocument();
  });

  it('creates a new recipe group from the dialog', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'group-123', name: 'Dessert ideas' })
    });
    vi.stubGlobal('fetch', fetchMock);
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/recipes']}>
        <RecipeListPage />
      </MemoryRouter>
    );
    await act(async () => {
      vi.advanceTimersByTime(150);
    });
    vi.useRealTimers();

    fireEvent.click(screen.getByRole('button', { name: /create group/i }));
    fireEvent.change(screen.getByLabelText(/group name/i), { target: { value: 'Dessert ideas' } });
    fireEvent.click(screen.getByRole('button', { name: /save group/i }));

    expect(await screen.findByText('Dessert ideas')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/recipe-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Dessert ideas' })
    });
  });
});
