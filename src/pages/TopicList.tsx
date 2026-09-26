import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { useTopics } from '../hooks/useTopics'

export function TopicList() {
  const { topics, loading, error } = useTopics()

  return (
    <div className="page page--topics">
      <header className="topics-header">
        <div className="topics-header__row">
          <div>
            <p className="eyebrow">Course Reels</p>
            <h1>Topics</h1>
          </div>
          <ThemeToggle />
        </div>
        <p className="lede">
          Pick a topic, then scroll through one-concept posts — like a reel, built for notes.
        </p>
      </header>

      <main className="topics-main">
        {loading && <p className="status">Loading topics…</p>}
        {error && <p className="status status--error">{error}</p>}

        <ul className="topic-list">
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link
                to={`/topic/${topic.id}`}
                className="topic-card"
                style={{ '--topic-accent': topic.accent } as CSSProperties}
              >
                <div className="topic-card__accent" />
                <div className="topic-card__body">
                  <p className="topic-card__subtitle">{topic.subtitle}</p>
                  <h2>{topic.title}</h2>
                  <p className="topic-card__desc">{topic.description}</p>
                  <span className="topic-card__cta">
                    {topic.posts.length} posts
                    <span aria-hidden="true"> →</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
