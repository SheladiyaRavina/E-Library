import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import BookProvider from '../src/context/BookContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Home from '../src/pages/Home';
import BookList from '../src/components/BookList';
import BookDetail from '../src/components/BookDetail';
import EditBook from '../src/pages/EditBook';
import AddBook from '../src/pages/AddBook';
const theme = createTheme({
  palette: {
    primary: {
      main: '#6d361d',
    },
    secondary: {
      main: '#6d361d',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BookProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1,}}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/edit-book/:id" element={<EditBook />} />
                <Route path="/add-book" element={<AddBook />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;