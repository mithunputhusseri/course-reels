import { Route, Routes } from 'react-router-dom'
import { TopicList } from './pages/TopicList'
import { PostFeed } from './pages/PostFeed'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TopicList />} />
      <Route path="/topic/:topicId" element={<PostFeed />} />
    </Routes>
  )
}
