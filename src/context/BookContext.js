import React, { createContext, useState, useContext } from 'react';
import { bookData } from '../data/bookData';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(bookData);

  const addBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, { ...newBook, id: Date.now(), borrowed: false }]);
  };

  const editBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? { ...book, ...updatedBook } : book
      )
    );
  };

  const deleteBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  const borrowBook = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, borrowed: true } : book
      )
    );
  };

  const returnBook = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, borrowed: false } : book
      )
    );
  };

  const getBookById = (id) => {
    return books.find(book => book.id === id);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        editBook,
        deleteBook,
        borrowBook,
        returnBook,
        getBookById,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;