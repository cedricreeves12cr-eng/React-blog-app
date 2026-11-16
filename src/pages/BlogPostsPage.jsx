import { useState, useEffect } from 'react'
import { Link } from 'react-router'

function BlogPostsPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.log('Error fetching posts:', error))
  }, [])

  return (
    <main>
      <h2>Blog Posts</h2>

      {posts.map(post => (
        <article className="blog-post" key={post.id}>
          <h2>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.body.substring(0, 100)}...</p>
          <Link to={`/posts/${post.id}`}>Read More</Link>
        </article>
      ))}
    </main>
  )
}

export default BlogPostsPage