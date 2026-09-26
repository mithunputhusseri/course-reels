import { useEffect, useState } from 'react'

export function usePostHtml(filePath: string | undefined) {
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!filePath) return

    let cancelled = false
    const url = `${import.meta.env.BASE_URL}${filePath.replace(/^\//, '')}`

    async function load() {
      setLoading(true)
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Failed to load post (${res.status})`)
        const text = await res.text()
        if (!cancelled) {
          setHtml(text)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load post')
          setHtml('')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [filePath])

  return { html, loading, error }
}
