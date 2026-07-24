import rss from '@astrojs/rss';
import { SITE } from '../consts';
import { livePosts } from '../publish';

export async function GET(context) {
  const articles = (await livePosts()).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: `/${a.data.category}/${a.id}/`,
    })),
  });
}
