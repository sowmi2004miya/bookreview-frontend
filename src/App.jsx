import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = import.meta.env.VITE_API_URL;

function App() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    rating: '',
    reviewer: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

 
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API}/api/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' && value !== '' ? Number(value) : value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        
        await axios.put(`${API}/api/reviews/${editingId}`, form);
        setMessage(' Review updated!');
      } else {
        
        await axios.post(`${API}/api/reviews`, form);
        setMessage(' Review added!');
      }

      setForm({ title: '', author: '', rating: '', reviewer: '' });
      setEditingId(null);
      fetchReviews();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setMessage('Failed to submit review');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  
  const handleEdit = (review) => {
    setForm({
      title: review.title,
      author: review.author,
      rating: review.rating,
      reviewer: review.reviewer
    });
    setEditingId(review._id);
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

 
  const handleCancel = () => {
    setForm({ title: '', author: '', rating: '', reviewer: '' });
    setEditingId(null);
  };

  return (
    <div className="container">
      <h1>📚 Book Review App</h1>

      <form onSubmit={handleSubmit} className="review-form">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          name="rating"
          type="number"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (1–5)"
          min="1"
          max="5"
          required
        />
        <input
          name="reviewer"
          value={form.reviewer}
          onChange={handleChange}
          placeholder="Reviewer"
        />
        <button type="submit">{editingId ? 'Update Review' : 'Add Review'}</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>

      {message && <p className="message">{message}</p>}

      <ul className="review-list">
        {reviews.map((r) => (
          <li key={r._id} className="review-item">
            <strong>{r.title}</strong>
            <p><em>Author:</em> {r.author}</p>
            <p><em>Rating:</em> {r.rating}</p>
            <p><em>Reviewer:</em> {r.reviewer}</p>
            <button onClick={() => handleEdit(r)}>Edit</button>
            <button onClick={() => handleDelete(r._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
