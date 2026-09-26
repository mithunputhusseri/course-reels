export type PostMeta = {
  id: string
  title: string
  /** Path relative to public/, e.g. content/topics/p2l5/posts/01.html */
  file: string
}

export type Topic = {
  id: string
  title: string
  subtitle: string
  description: string
  accent: string
  posts: PostMeta[]
}

export type TopicsIndex = {
  topics: Topic[]
}
