import { useState } from 'react'

function CommentForm({ onAddComment, postId }) {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim() || !comment.trim()) {
      return
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        body: comment,
        postId: Number(postId)
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not post comment')
        }
        return response.json()
      })
      .then(data => {
        onAddComment(data)
        setName('')
        setComment('')
      })
      .catch(error => console.log('Error posting comment:', error))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={event => setName(event.target.value)}
        required
      />

      <textarea
        placeholder="Write a comment"
        value={comment}
        onChange={event => setComment(event.target.value)}
        required
      />

      <button type="submit">Submit Comment</button>
    </form>
  )
}

export default CommentForm