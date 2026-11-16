import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router'
import BlogPostsPage from './pages/BlogPostsPage'
import IndividualPostPage from './pages/individualPostPages'
import ContactPage from './pages/ContactPage'

const posts = [
  {
    title: 'My First Blog Post',
    content: 'This is the content of my first blog post. Welcome to my blog! Hope you enjoy reading it.',
    author: 'John Doe',
    date: '2023-10-01'
  },
  {
    title: 'My Journey Learning Web Development',
    content: 'Learning HTML, CSS, JavaScript, and React has been an interesting experience. I am excited to keep improving my web development skills.',
    author: 'Cedric Reeves',
    date: '2026-10-18'
  }
]

function Header() {
  return (
    <header className="header">
      <h1>My Blog</h1>
      <nav>
       <Link to="/">Home</Link>
    <Link to="/posts/1">Individual Post</Link>
    <Link to="/contact">Contact</Link>
      </nav>
    </header>
  )
}

function Comments() {
  const [comments, setComments] = useState([
    'Comment 1',
    'Comment 2',
    'Comment 3'
  ])
  const [newComment, setNewComment] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (newComment.trim() !== '') {
      setComments([...comments, newComment.trim()])
      setNewComment('')
    }
  }

  return (
    <section className="comments">
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Existing Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </section>
  )
}

function BlogPost({ post }) {
  return (
    <article className="blog-post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Date:</strong> {post.date}</p>
      <Comments />
    </article>
  )
}

function Footer() {
  return <footer>© 2026 My Blog</footer>
}

 function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<BlogPostsPage />} />
        <Route path="/posts/:id" element={<IndividualPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </>
  )
}
export default App