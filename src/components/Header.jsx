import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, TextField, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';
import { useBooks } from '../context/BookContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { setSearchFilter } = useBooks();

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchFilter(searchTerm);
    navigate('/books');
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #000000 30%, #000000 90%)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
    
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            E-Library 
          </Typography>
          <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1, display: 'flex', mx: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ 
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 'bold' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/books" sx={{ fontWeight: 'bold' }}>
              Book List
            </Button>
            <Button color="inherit" component={Link} to="/add-book" sx={{ fontWeight: 'bold' }}>
              Add Book
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;