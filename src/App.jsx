const categories = [
  { id: 'starters', name: 'ראשונות' },
  { id: 'mains', name: 'עיקריות' },
  { id: 'desserts', name: 'קינוחים' },
]

function App() {
  return (
    <>
      <header className="site-header">
        <a className="site-title" href="#top">
          המתכונים של אמא
        </a>
        <nav aria-label="סוגי מתכונים">
          <ul className="menu">
            {categories.map((category) => (
              <li key={category.id}>
                <a href={`#${category.id}`}>{category.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top">
        {/* Placeholder: replace this div with an <img> when the photo is ready. */}
        <div className="hero" role="img" aria-label="מקום לתמונה ראשית">
          <span>כאן תהיה התמונה הראשית</span>
        </div>

        {categories.map((category) => (
          <section className="category" id={category.id} key={category.id}>
            <h2>{category.name}</h2>
            <p>המתכונים יעלו בקרוב.</p>
          </section>
        ))}
      </main>
    </>
  )
}

export default App
