import { useMemo } from 'react'
import { usePostHtml } from '../hooks/usePostHtml'
import type { PostMeta } from '../types'

type Props = {
  post: PostMeta
  index: number
  total: number
  topicTitle: string
}

function resolvePostHtml(html: string) {
  const base = import.meta.env.BASE_URL
  return html
    .replaceAll('__BASE__', base)
    .replaceAll('src="/course-reels/', `src="${base}`)
}

export function PostSlide({ post, index, total, topicTitle }: Props) {
  const { html, loading, error } = usePostHtml(post.file)
  const resolvedHtml = useMemo(() => resolvePostHtml(html), [html])

  return (
    <article className="post-slide" aria-label={`Post ${index + 1} of ${total}: ${post.title}`}>
      <header className="post-slide__chrome">
        <div className="post-slide__meta">
          <span className="post-slide__topic">{topicTitle}</span>
          <h2 className="post-slide__title">{post.title}</h2>
        </div>
        <span className="post-slide__count">
          {index + 1}/{total}
        </span>
      </header>

      <div className="post-slide__body">
        {loading && <p className="post-slide__status">Loading…</p>}
        {error && <p className="post-slide__status post-slide__status--error">{error}</p>}
        {!loading && !error && (
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: resolvedHtml }}
          />
        )}
      </div>

      <div className="post-slide__hint" aria-hidden="true">
        <span>Swipe up</span>
      </div>
    </article>
  )
}
