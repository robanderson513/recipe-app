import AppLayout from './components/navigation/AppLayout';
import { getActiveNavigationDestination } from './components/navigation/navigation.js';

function App() {
  const activeDestination = getActiveNavigationDestination(
    window.location.pathname,
  );

  return (
    <AppLayout>
      {activeDestination.href === '/' ? (
        <section className="welcome">
          <p className="eyebrow">Your kitchen starts here</p>
          <h1>Recipe App</h1>
          <p className="intro">
            A fresh place to collect, organize, and cook the recipes you love.
          </p>
          <div className="status">
            <span className="status-indicator" aria-hidden="true" />
            Ready for your first recipe
          </div>
        </section>
      ) : (
        <section className="welcome">
          <p className="eyebrow">Your collection</p>
          <h1>{activeDestination.label}</h1>
          <p className="intro">Your saved recipes will appear here.</p>
        </section>
      )}
    </AppLayout>
  );
}

export default App;
