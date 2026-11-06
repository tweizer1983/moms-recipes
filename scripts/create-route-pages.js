// GitHub Pages only serves files that exist, so opening or refreshing a link
// like /moms-recipes/soups/pea-soup needs a real file at that path. This copies
// the built page to every category and recipe URL, plus 404.html for bad links.
import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { categories } from '../src/data/recipes.js'

const dist = 'dist'
const indexPage = join(dist, 'index.html')

const routes = categories.flatMap((category) => [
  category.slug,
  ...category.recipes.map((recipe) => join(category.slug, recipe.slug)),
])

for (const route of routes) {
  await mkdir(join(dist, route), { recursive: true })
  await copyFile(indexPage, join(dist, route, 'index.html'))
}
await copyFile(indexPage, join(dist, '404.html'))

console.log(`Created ${routes.length} route pages and 404.html`)
