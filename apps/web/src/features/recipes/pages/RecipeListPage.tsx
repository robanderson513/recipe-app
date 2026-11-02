import { useEffect, useState } from 'react';
import Button from '@ui/Button';
import ExpansionPanel from '@ui/ExpansionPanel';
import AddRecipeGroupDialog from '../components/AddRecipeGroupDialog';
import './recipe-list-page.css';

type RecipeGroup = {
  id: string;
  name: string;
  recipes: string[];
};

type CreateRecipeGroupRequest = {
  name: string;
};

const MOCK_RECIPE_GROUPS: RecipeGroup[] = [
  {
    id: 'favorites',
    name: 'Favorites',
    recipes: ['Lemon herb chicken', 'Crispy chickpea grain bowl']
  },
  {
    id: 'weeknight',
    name: 'Weeknight dinners',
    recipes: ['Creamy tomato pasta', 'Coconut curry soup']
  },
  {
    id: 'desserts',
    name: 'Desserts',
    recipes: ['Berry yogurt parfait']
  }
];

function RecipeListPage() {
  const [recipeGroups, setRecipeGroups] = useState<RecipeGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRecipeGroups(MOCK_RECIPE_GROUPS);
      setIsLoading(false);
    }, 150);

    return () => window.clearTimeout(timer);
  }, []);

  const hasSavedRecipes = recipeGroups.some((group) => group.recipes.length > 0);

  const handleCreateGroup = async (name: string) => {
    const request: CreateRecipeGroupRequest = { name };
    const response = await fetch('/api/recipe-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error('Unable to save the recipe group. Please try again.');
    }

    const createdGroup: Pick<RecipeGroup, 'id' | 'name'> = await response.json();
    setRecipeGroups((currentGroups) => [{ ...createdGroup, recipes: [] }, ...currentGroups]);
    setIsGroupDialogOpen(false);
  };

  return (
    <section className="recipe-list-page">
      <div className="flex flex-wrap items-end justify-between gap-default mb-section">
        <div className="flex flex-col gap-tight">
          <p className="overline">Your collection</p>
          <h1 className="text-display font-heading font-weight-emphasis">Saved recipes</h1>
        </div>

        <div className="flex flex-wrap justify-end gap-compact">
          <Button variant="secondary" aria-label="Add a new recipe" disabled>
            Add recipe
          </Button>
          <Button onClick={() => setIsGroupDialogOpen(true)}>Create group</Button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-secondary">Loading your recipes...</p>
      ) : !hasSavedRecipes ? (
        <div
          className="flex flex-col items-center justify-center gap-default border rounded-card bg-surface-subtle p-card text-center"
          aria-live="polite"
        >
          <h2 className="text-title">No recipes saved</h2>
          <p className="text-secondary">
            Start collecting your favorite meals and organize them into groups as you go.
          </p>
          <Button onClick={() => setIsGroupDialogOpen(true)}>Create group</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-default" aria-live="polite">
          {recipeGroups.map((group) => {
            return (
              <ExpansionPanel
                key={group.id}
                title={group.name}
                headerAdornment={<span className="recipe-group-count">{group.recipes.length}</span>}
              >
                <ul className="flex flex-col gap-compact p-control">
                  {group.recipes.length > 0 ? (
                    group.recipes.map((recipe) => (
                      <li key={recipe} className="border rounded-control bg-surface-default p-control">
                        {recipe}
                      </li>
                    ))
                  ) : (
                    <li className="text-secondary py-compact">No recipes in this group yet.</li>
                  )}
                </ul>
              </ExpansionPanel>
            );
          })}
        </div>
      )}

      {isGroupDialogOpen && (
        <AddRecipeGroupDialog onCancel={() => setIsGroupDialogOpen(false)} onSubmit={handleCreateGroup} />
      )}
    </section>
  );
}

export default RecipeListPage;
