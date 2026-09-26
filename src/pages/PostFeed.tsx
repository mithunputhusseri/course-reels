import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PostSlide } from '../components/PostSlide'
import { ThemeToggle } from '../components/ThemeToggle'
import { useTopic } from '../hooks/useTopics'

export function PostFeed() {
  const { topicId } = useParams()
  const { topic, loading, error } = useTopic(topicId)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const onScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const index = Math.round(el.scrollTop / el.clientHeight)
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll, topic])

  if (loading) {
    return (
      <div className="page page--feed">
        <p className="status">Loading…</p>
      </div>
    )
  }

  if (error || !topic) {
    return (
      <div className="page page--feed">
        <p className="status status--error">{error ?? 'Topic not found'}</p>
        <Link to="/" className="back-link">
          ← All topics
        </Link>
      </div>
    )
  }

  return (
    <div
      className="page page--feed"
      style={{ '--topic-accent': topic.accent } as CSSProperties}
    >
      <div className="feed-topbar">
        <Link to="/" className="back-link" aria-label="Back to topics">
          ← Topics
        </Link>
        <ThemeToggle />
      </div>

      <div className="progress-rail" aria-hidden="true">
        {topic.posts.map((post, i) => (
          <span
            key={post.id}
            className={`progress-rail__seg${i === activeIndex ? ' is-active' : ''}${i < activeIndex ? ' is-done' : ''}`}
          />
        ))}
      </div>

      <div ref={scrollerRef} className="reel-scroller" tabIndex={0}>
        {topic.posts.map((post, index) => (
          <PostSlide
            key={post.id}
            post={post}
            index={index}
            total={topic.posts.length}
            topicTitle={topic.title}
          />
        ))}
      </div>
    </div>
  )
}
