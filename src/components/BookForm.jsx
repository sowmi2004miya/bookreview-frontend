import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, selectedBook, cancelEdit }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    rating: '',
    comment: '',
  });

  useEffect(() => {
    if (selectedBook) {
      setForm(selectedBook);
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', author: '', rating: '', comment: '' });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{selectedBook ? 'Update Review' : 'Add Book Review'}</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
      <input name="rating" placeholder="Rating (1-5)" type="number" min="1" max="5" value={form.rating} onChange={handleChange} required />
      <textarea name="comment" placeholder="Comment" value={form.comment} onChange={handleChange} required />
      <button type="submit">{selectedBook ? 'Update' : 'Add'}</button>
      {selectedBook && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
};

export default BookForm;
