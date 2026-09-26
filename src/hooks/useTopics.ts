import { useEffect, useState } from 'react'
import type { Topic, TopicsIndex } from '../types'

const INDEX_URL = `${import.meta.env.BASE_URL}content/topics.json`

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(INDEX_URL)
        if (!res.ok) throw new Error(`Failed to load topics (${res.status})`)
        const data = (await res.json()) as TopicsIndex
        if (!cancelled) {
          setTopics(data.topics)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load topics')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { topics, loading, error }
}

export function useTopic(topicId: string | undefined) {
  const { topics, loading, error } = useTopics()
  const topic = topics.find((t) => t.id === topicId)
  return { topic, loading, error: error ?? (topic || loading ? null : 'Topic not found') }
}
