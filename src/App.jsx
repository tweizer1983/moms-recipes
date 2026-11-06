import { useEffect } from 'react'
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router'
import { categories, siteTitle } from './data/recipes.js'

const notFoundTitle = 'הדף לא נמצא'

function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteTitle}` : siteTitle
  }, [title])
}

function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <main>
      <Outlet />
    </main>
  )
}

function LinkButtons({ links }) {
  return (
    <ul className="link-buttons">
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to}>{link.label}</Link>
        </li>
      ))}
    </ul>
  )
}

function HomePage() {
  usePageTitle()

  return (
    <>
      {/* Placeholder: replace this div with an <img> when the photo is ready. */}
      <div className="hero" role="img" aria-label="מקום לתמונה ראשית">
        <span>כאן תהיה התמונה הראשית</span>
      </div>
      <div className="page">
        <h1>{siteTitle}</h1>
        <nav aria-label="סוגי מתכונים">
          <LinkButtons
            links={categories.map((category) => ({
              to: `/${category.slug}`,
              label: category.name,
            }))}
          />
        </nav>
      </div>
    </>
  )
}

function CategoryPage() {
  const { categorySlug } = useParams()
  const category = categories.find((item) => item.slug === categorySlug)
  usePageTitle(category?.name ?? notFoundTitle)

  if (!category) return <NotFound />

  return (
    <div className="page">
      <Link className="back-link" to="/">
        → חזרה לדף הבית
      </Link>
      <h1>{category.name}</h1>
      <LinkButtons
        links={category.recipes.map((recipe) => ({
          to: `/${category.slug}/${recipe.slug}`,
          label: recipe.name,
        }))}
      />
    </div>
  )
}

function RecipePage() {
  const { categorySlug, recipeSlug } = useParams()
  const category = categories.find((item) => item.slug === categorySlug)
  const recipe = category?.recipes.find((item) => item.slug === recipeSlug)
  usePageTitle(recipe?.name ?? notFoundTitle)

  if (!recipe) return <NotFound />

  return (
    <article className="page recipe">
      <Link className="back-link" to={`/${category.slug}`}>
        → חזרה ל{category.name}
      </Link>
      <h1>{recipe.name}</h1>
      {recipe.sections.map((section, sectionIndex) => {
        const List = section.kind === 'steps' ? 'ol' : 'ul'
        return (
          <section key={sectionIndex}>
            {section.title && <h2>{section.title}</h2>}
            <List>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </List>
            {section.notes?.map((note, noteIndex) => (
              <p className="note" key={noteIndex}>
                {note}
              </p>
            ))}
          </section>
        )
      })}
    </article>
  )
}

function NotFound() {
  return (
    <div className="page">
      <h1>{notFoundTitle}</h1>
      <Link to="/">חזרה לדף הבית</Link>
    </div>
  )
}

function NotFoundPage() {
  usePageTitle(notFoundTitle)
  return <NotFound />
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path=":categorySlug" element={<CategoryPage />} />
          <Route path=":categorySlug/:recipeSlug" element={<RecipePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
