import './home-page.css';

function HomePage() {
  return (
    <section className="home-page">
      <p className="overline">Your kitchen starts here</p>
      <h1 className="text-display font-heading font-weight-emphasis">Recipe App</h1>
      <p className="intro">A fresh place to collect, organize, and cook the recipes you love.</p>
      <div className="status">
        <span className="status-indicator" aria-hidden="true" />
        Ready for your first recipe
      </div>
    </section>
  );
}

export default HomePage;
