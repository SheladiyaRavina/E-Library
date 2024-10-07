import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Box,
  Card,
  CardMedia,
} from '@mui/material';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, borrowBook, returnBook } = useBooks();

  const book = getBookById(parseInt(id));

  if (!book) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Book not found
        </Typography>
      </Container>
    );
  }

  const handleBorrow = () => {
    borrowBook(book.id);
  };

  const handleReturn = () => {
    returnBook(book.id);
  };

  return (
    <Container maxWidth="md">
      <h1 variant="body1">Book Details</h1>
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                image={book.imageUrl}
                alt={book.title}
                sx={{ height: '100%', objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {book.title}
          </Typography>
            <Typography variant="h6" gutterBottom>
              by {book.author}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="body1" >Genre: {book.genre}</Typography>
              <Typography variant="body1">Publication Date: {book.publicationDate}</Typography>
              <Typography variant="body1">ISBN: {book.isbn}</Typography>
              <Typography variant="body1">Status: {book.borrowed ? 'Borrowed' : 'Available'}</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
            {book.borrowed ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleReturn}
                sx={{ mr: 2 }}
              >
                Return Book
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleBorrow}
                sx={{ mr: 2 }}
              >
                Borrow Book
              </Button>
            )}
            <br></br>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Back to Home
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookDetails;