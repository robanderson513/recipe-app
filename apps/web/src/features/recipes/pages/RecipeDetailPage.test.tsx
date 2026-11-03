import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RecipeDetailPage from './RecipeDetailPage';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function renderRecipeDetailPage() {
  return render(
    <MemoryRouter initialEntries={['/recipes/new']}>
      <Routes>
        <Route path="/recipes/new" element={<RecipeDetailPage />} />
        <Route path="/recipes" element={<div>Recipes index</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('RecipeDetailPage', () => {
  it('creates a recipe and routes back to the storage page', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'recipe-123' })
    });
    vi.stubGlobal('fetch', fetchMock);

    renderRecipeDetailPage();

    fireEvent.change(screen.getByLabelText(/recipe name/i), { target: { value: 'Lemon pasta' } });
    fireEvent.change(screen.getByLabelText(/recipe description/i), {
      target: { value: 'A bright and savory pasta night favorite.' }
    });
    fireEvent.change(screen.getByLabelText(/recipe group/i), { target: { value: 'favorites' } });
    fireEvent.change(screen.getByLabelText(/measurement system/i), { target: { value: 'metric' } });
    fireEvent.change(screen.getByRole('textbox', { name: /ingredients 1/i }), {
      target: { value: '200g spaghetti' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /steps 1/i }), {
      target: { value: 'Boil the pasta until tender.' }
    });

    fireEvent.click(screen.getByRole('button', { name: /save recipe/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/recipes',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
    );
    expect(await screen.findByText('Recipes index')).toBeInTheDocument();
  });

  it('warns before leaving a page with unsaved changes', () => {
    const confirmMock = vi.spyOn(window, 'confirm').mockReturnValue(false);

    renderRecipeDetailPage();

    fireEvent.change(screen.getByLabelText(/recipe name/i), { target: { value: 'Fresh salad' } });
    fireEvent.click(screen.getByRole('button', { name: /^cancel$/i }));

    expect(confirmMock).toHaveBeenCalledWith(
      'You have unsaved changes. Leaving this page will discard them. Continue?'
    );
  });
});
