import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import CommentForm from '../Components/CommentForm'

function IndividualPostPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data)

        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
      })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log('Error fetching post:', error))

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.log('Error fetching comments:', error))
  }, [id])

  function addComment(newComment) {
    setComments([...comments, newComment])
  }

  if (!post) {
    return <main><p>Loading post...</p></main>
  }

  return (
    <main>
      <article className="blog-post">
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        {user && (
          <div>
            <p><strong>Author:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        <section className="comments">
          <h2>Comments</h2>
          <CommentForm onAddComment={addComment} postId={id} />

          <h3>Existing Comments:</h3>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <ul>
              {comments.map(comment => (
                <li key={comment.id}>
                  <strong>{comment.name}:</strong> {comment.body || comment.text}
                </li>
              ))}
            </ul>
          )}
        </section>

        <Link to="/">Back to Blog Posts</Link>
      </article>
    </main>
  )
}

export default IndividualPostPage