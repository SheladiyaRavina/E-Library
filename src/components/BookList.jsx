import React, { useState, useMemo } from 'react';
import { useBooks } from '../context/BookContext';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating
} from '@mui/material';

const BookList = () => {
  const { books } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const genres = useMemo(() => [...new Set(books.map(book => book.genre))], [books]);
  const years = useMemo(() => [...new Set(books.map(book => new Date(book.publicationDate).getFullYear()))].sort((a, b) => b - a), [books]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (genreFilter === '' || book.genre === genreFilter) &&
    (yearFilter === '' || new Date(book.publicationDate).getFullYear().toString() === yearFilter)
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Explore Our Library
      </Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search books"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genreFilter}
            label="Genre"
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {genres.map(genre => (
              <MenuItem key={genre} value={genre}>{genre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={yearFilter}
            label="Year"
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {years.map(year => (
              <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={book.imageUrl}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  by {book.author}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Chip label={book.genre} color="primary" size="small" />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(book.publicationDate).getFullYear()}
                  </Typography>
                </Box>
                <Rating value={book.rating || 0} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {book.description ? (book.description.slice(0, 100) + '...') : 'No description available.'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/book/${book.id}`}>Learn More</Button>
                <Button size="small" component={Link} to={`/edit-book/${book.id}`}>Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookList;