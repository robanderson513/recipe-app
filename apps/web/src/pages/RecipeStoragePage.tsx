import { useEffect, useState } from 'react';
import Button from '../components/ui/Button/Button';
import ExpansionPanel from '../components/ui/ExpansionPanel/ExpansionPanel';
import AddRecipeGroupDialog from '../features/recipes/components/AddRecipeGroupDialog';
import './recipe-storage-page.css';

type RecipeGroup = {
  id: string;
  name: string;
  recipes: string[];
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

function RecipeStoragePage() {
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

  const handleCreateGroup = (name: string) => {
    const newGroupId = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    setRecipeGroups((currentGroups) => [
      {
        id: newGroupId,
        name,
        recipes: []
      },
      ...currentGroups
    ]);
    setIsGroupDialogOpen(false);
  };

  return (
    <section className="recipe-storage-page">
      <div className="recipe-storage-header">
        <div>
          <p className="eyebrow">Your collection</p>
          <h1>Saved recipes</h1>
        </div>

        <div className="recipe-storage-actions">
          <Button variant="secondary" aria-label="Add a new recipe" disabled>
            Add recipe
          </Button>
          <Button onClick={() => setIsGroupDialogOpen(true)}>Create group</Button>
        </div>
      </div>

      {isLoading ? (
        <p className="recipe-storage-status">Loading your recipes...</p>
      ) : !hasSavedRecipes ? (
        <div className="recipe-storage-empty" aria-live="polite">
          <h2>No recipes saved</h2>
          <p>Start collecting your favorite meals and organize them into groups as you go.</p>
          <Button onClick={() => setIsGroupDialogOpen(true)}>Create group</Button>
        </div>
      ) : (
        <div className="recipe-groups" aria-live="polite">
          {recipeGroups.map((group) => {
            return (
              <ExpansionPanel
                key={group.id}
                title={group.name}
                headerAdornment={<span className="recipe-group-count">{group.recipes.length}</span>}
              >
                <ul className="recipe-list">
                  {group.recipes.length > 0 ? (
                    group.recipes.map((recipe) => (
                      <li key={recipe} className="recipe-list-item">
                        {recipe}
                      </li>
                    ))
                  ) : (
                    <li className="recipe-list-empty">No recipes in this group yet.</li>
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

export default RecipeStoragePage;
