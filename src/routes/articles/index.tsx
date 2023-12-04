import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import type { DocumentHead } from '@builder.io/qwik-city'
import { generateClient } from '~/libs/newt'
import type { Article } from '~/types/article'

export const useArticles = routeLoader$(async ({ env }) => {
  const spaceUid = env.get('NEWT_SPACE_UID') || ''
  const token = env.get('NEWT_CDN_API_TOKEN') || ''
  const client = generateClient(spaceUid, token)

  const { items: articles } = await client.getContents<Article>({
    appUid: 'blog',
    modelUid: 'article',
    query: {
      select: ['_id', 'title', 'slug', 'body'],
    },
  })

  return articles
})

export default component$(() => {
  const articles = useArticles()
  return (
    <main>
      <ul>
        {articles.value.map((article) => {
          return (
            <li key={article._id}>
              <a href={`articles/${article.slug}`}>{article.title}</a>
            </li>
          )
        })}
      </ul>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'Newt・Qwik Cityブログ',
  meta: [
    {
      name: 'description',
      content: 'NewtとQwik Cityを利用したブログです',
    },
  ],
}
