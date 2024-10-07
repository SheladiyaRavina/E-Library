import React, { useState, useEffect } from 'react';
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
  Box
} from '@mui/material';

const Banner = () => (
  <Box
    sx={{
      backgroundImage: 'url(https://media.istockphoto.com/id/949117984/photo/cropped-image-of-books.jpg?s=612x612&w=0&k=20&c=3l8JzmMfq-scnAsGEXEZwuQJkISszVyTwzFzZJVfd18=)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '250px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: 4,
    }}
  >
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" component="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
        Welcome to E-Library
      </Typography>
      <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
        Discover a world of knowledge at your fingertips
      </Typography>

    </Box>
  </Box>
);

const BookSection = ({ title, books }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item key={book.id} xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="280"
              image={book.imageUrl}
              alt={book.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="subtitle1" component="div" noWrap>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                by {book.author}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/book/${book.id}`}>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const RandomBookRow = ({ title, books }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item key={book.id} xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="280"
              image={book.imageUrl}
              alt={book.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="subtitle1" component="div" noWrap>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                by {book.author}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/book/${book.id}`}>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const Home = () => {
  const { books } = useBooks();
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [classicBooks, setClassicBooks] = useState([]);
  const [textbooks, setTextbooks] = useState([]);
  const [randomBooks1, setRandomBooks1] = useState([]);
  const [randomBooks2, setRandomBooks2] = useState([]);

  useEffect(() => {

    setTrendingBooks(books.filter(book => book.category === 'Trending').slice(0, 5));
    setClassicBooks(books.filter(book => book.category === 'Classic').slice(0, 5));
    setTextbooks(books.filter(book => book.category === 'Textbook').slice(0, 5));


    const shuffled = [...books].sort(() => 0.5 - Math.random());
    setRandomBooks1(shuffled.slice(0, 5));
    setRandomBooks2(shuffled.slice(5, 10));
  }, [books]);

  return (
    <>
      <Banner />
      <Container maxWidth="lg">
        <BookSection title="Trending Books" books={trendingBooks} />
        <BookSection title="Classic Books" books={classicBooks} />
        <BookSection title="Textbooks" books={textbooks} />

        <RandomBookRow title="You May Also Like" books={randomBooks1} />
        <RandomBookRow title="Other Books" books={randomBooks2} />
      </Container>
    </>
  );
};

export default Home;