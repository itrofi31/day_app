import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { daysData } from '../data/data';

const HomePageContent = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [showBooks, setShowBooks] = useState(true);
  const [showMovies, setShowMovies] = useState(false);
  const navigate = useNavigate();
  const currentDay = daysData[currentDayIndex];

  const nextDay = () => {
    setCurrentDayIndex((prev) => (prev + 1) % daysData.length);
  };

  const prevDay = () => {
    setCurrentDayIndex(
      (prev) => (prev - 1 + daysData.length) % daysData.length
    );
  };

  return (
    <Box
      minHeight='100vh'
      bgcolor='background.default'
      p={4}
      display='flex'
      justifyContent='center'
    >
      <Box
        maxWidth='md'
        width='100%'
      >
        {/* Верхняя часть с датой */}
        <Card>
          <CardContent>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <IconButton onClick={prevDay}>
                <ChevronLeft />
              </IconButton>
              <Typography variant='h6'>{currentDay.date}</Typography>
              <IconButton onClick={nextDay}>
                <ChevronRight />
              </IconButton>
            </Box>
            <CardMedia
              component='img'
              height='200'
              image={currentDay.image}
              alt='Красивый фон'
              sx={{ borderRadius: 2, mt: 2 }}
            />
          </CardContent>
        </Card>

        {/* Секция праздников */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography
              variant='h6'
              gutterBottom
            >
              Праздники:
            </Typography>
            <List>
              {currentDay.holidays.map((holiday, index) => (
                <ListItem key={index}>
                  <ListItemText primary={holiday} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Рекомендации дня */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography
              variant='h6'
              gutterBottom
            >
              Рекомендации дня
            </Typography>
            <Box
              display='flex'
              justifyContent='center'
              gap={2}
              mb={2}
            >
              <Button
                variant={showBooks ? 'contained' : 'outlined'}
                onClick={() => {
                  setShowBooks(true);
                  setShowMovies(false);
                }}
              >
                Что почитать
              </Button>
              <Button
                variant={showMovies ? 'contained' : 'outlined'}
                onClick={() => {
                  setShowMovies(true);
                  setShowBooks(false);
                }}
              >
                Что посмотреть
              </Button>
            </Box>
            {showBooks && (
              <Box>
                {currentDay.books.map((book) => (
                  <Card
                    key={book.id}
                    sx={{ mb: 2 }}
                  >
                    <Box
                      display='flex'
                      p={2}
                    >
                      <CardMedia
                        component='img'
                        image={book.image}
                        alt={book.title}
                        sx={{ width: 64, height: 80, borderRadius: 1, mr: 2 }}
                      />
                      <Box>
                        <Typography
                          variant='subtitle1'
                          fontWeight='bold'
                        >
                          {book.title}
                        </Typography>
                        <Typography variant='body2'>
                          {book.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            )}
            {showMovies && (
              <Box>
                {currentDay.movies.map((movie) => (
                  <Card
                    key={movie.id}
                    sx={{ mb: 2 }}
                  >
                    <Box
                      display='flex'
                      p={2}
                    >
                      <CardMedia
                        component='img'
                        image={movie.image}
                        alt={movie.title}
                        sx={{ width: 64, height: 80, borderRadius: 1, mr: 2 }}
                      />
                      <Box>
                        <Typography
                          variant='subtitle1'
                          fontWeight='bold'
                        >
                          {movie.title} ({movie.year})
                        </Typography>
                        <Typography variant='body2'>
                          {movie.description}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                        >
                          IMDb: {movie.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Нижнее меню */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box
              display='flex'
              justifyContent='center'
              gap={2}
            >
              <Button
                variant='text'
                onClick={() => navigate('/categories')}
              >
                Рубрики
              </Button>
              <Button
                variant='text'
                onClick={() => navigate('/')}
              >
                День
              </Button>
              <Button
                variant='text'
                onClick={() => navigate('/test')}
              >
                Тест
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default HomePageContent;
