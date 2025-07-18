import React from 'react';

const BookList = ({ reviews, onEdit, onDelete }) => {
  return (
    <div className="list">
      <h2>All Book Reviews</h2>
      {reviews.length === 0 ? <p>No reviews found.</p> : (
        reviews.map((book) => (
          <div className="card" key={book._id}>
            <h3>{book.title} - by {book.author}</h3>
            <p>⭐ {book.rating}</p>
            <p>{book.comment}</p>
            <button onClick={() => onEdit(book)}>Edit</button>
            <button onClick={() => onDelete(book._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;
