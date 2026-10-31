import { useEffect, useState, type FormEvent } from 'react';
import Button from '../components/ui/Button/Button';
import ExpansionPanel from '../components/ui/ExpansionPanel/ExpansionPanel';
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
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRecipeGroups(MOCK_RECIPE_GROUPS);
      setExpandedGroups(Object.fromEntries(MOCK_RECIPE_GROUPS.map((group) => [group.id, true])));
      setIsLoading(false);
    }, 150);

    return () => window.clearTimeout(timer);
  }, []);

  const hasSavedRecipes = recipeGroups.some((group) => group.recipes.length > 0);

  const handleCreateGroup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = groupName.trim();
    if (!trimmedName) {
      return;
    }

    const newGroupId = `${trimmedName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    setRecipeGroups((currentGroups) => [
      {
        id: newGroupId,
        name: trimmedName,
        recipes: []
      },
      ...currentGroups
    ]);
    setExpandedGroups((currentExpandedGroups) => ({
      ...currentExpandedGroups,
      [newGroupId]: true
    }));
    setGroupName('');
    setIsGroupDialogOpen(false);
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((currentExpandedGroups) => ({
      ...currentExpandedGroups,
      [groupId]: !(currentExpandedGroups[groupId] ?? true)
    }));
  };

  return (
    <section className="recipe-storage-page">
      <div className="recipe-storage-header">
        <div>
          <p className="eyebrow">Your collection</p>
          <h1>Saved recipes</h1>
        </div>

        <div className="recipe-storage-actions">
          <Button variant="secondary" type="button" aria-label="Add a new recipe" disabled>
            Add recipe
          </Button>
          <Button type="button" onClick={() => setIsGroupDialogOpen(true)}>
            Create group
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="recipe-storage-status">Loading your recipes...</p>
      ) : !hasSavedRecipes ? (
        <div className="recipe-storage-empty" aria-live="polite">
          <h2>No recipes saved</h2>
          <p>Start collecting your favorite meals and organize them into groups as you go.</p>
          <Button type="button" onClick={() => setIsGroupDialogOpen(true)}>
            Create group
          </Button>
        </div>
      ) : (
        <div className="recipe-groups" aria-live="polite">
          {recipeGroups.map((group) => {
            const isExpanded = expandedGroups[group.id] ?? true;

            return (
              <ExpansionPanel
                key={group.id}
                title={group.name}
                expanded={isExpanded}
                onToggle={() => toggleGroup(group.id)}
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
        <div className="recipe-dialog-backdrop" onClick={() => setIsGroupDialogOpen(false)}>
          <div
            className="recipe-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-group-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="create-group-title">Create a recipe group</h2>

            <form onSubmit={handleCreateGroup}>
              <label className="recipe-dialog-field" htmlFor="recipe-group-name">
                <span>Group name</span>
                <input
                  id="recipe-group-name"
                  name="groupName"
                  type="text"
                  value={groupName}
                  onChange={(event) => setGroupName(event.target.value)}
                  placeholder="Favorites"
                  autoFocus
                />
              </label>

              <div className="recipe-dialog-actions">
                <Button variant="text-neutral" type="button" onClick={() => setIsGroupDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save group</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default RecipeStoragePage;
