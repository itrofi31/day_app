// HomePageContent.js
import React, { useState } from 'react';
import { Box, Card, CardContent, Button } from '@mui/material';
// import DayView from './views/DayView';
// import CategoriesView from './views/CategoriesView';
// import TestView from './views/TestView';
// import BottomNavigation from './components/BottomNavigation';
import { daysData, categoriesData } from '../data/data';

const HomePageContent = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [showBooks, setShowBooks] = useState(true);
  const [showMovies, setShowMovies] = useState(false);
  const [currentView, setCurrentView] = useState('day');

  // Navigation handlers
  const handleDayClick = () => setCurrentView('day');
  const handleCategoriesClick = () => setCurrentView('categories');
  const handleTestClick = () => setCurrentView('test');

  // Day navigation handlers
  const nextDay = () => {
    setCurrentDayIndex((prev) => (prev + 1) % daysData.length);
  };

  const prevDay = () => {
    setCurrentDayIndex(
      (prev) => (prev - 1 + daysData.length) % daysData.length
    );
  };

  // Category navigation handlers
  const nextCategory = () => {
    setCurrentCategoryIndex((prev) => (prev + 1) % categoriesData.length);
  };

  const prevCategory = () => {
    setCurrentCategoryIndex(
      (prev) => (prev - 1 + categoriesData.length) % categoriesData.length
    );
  };

  // Toggle handlers for books/movies
  const toggleBooks = () => {
    setShowBooks(true);
    setShowMovies(false);
  };

  const toggleMovies = () => {
    setShowMovies(true);
    setShowBooks(false);
  };

  return (
    <Box
      height='100vh'
      bgcolor='background.default'
      display='flex'
      justifyContent='center'
      sx={{ overflow: 'hidden' }} // Prevent page level scrolling
    >
      <Box
        maxWidth='md'
        width='100%'
        display='flex'
        flexDirection='column'
        height='100%'
        p={2}
      >
        {/* Main content area with fixed height and scrollable content */}
        <Box
          flex='1'
          overflow='hidden'
          display='flex'
          flexDirection='column'
        >
          {currentView === 'day' && (
            <DayView
              currentDay={daysData[currentDayIndex]}
              nextDay={nextDay}
              prevDay={prevDay}
              showBooks={showBooks}
              showMovies={showMovies}
              toggleBooks={toggleBooks}
              toggleMovies={toggleMovies}
            />
          )}

          {currentView === 'categories' && (
            <CategoriesView
              currentCategory={categoriesData[currentCategoryIndex]}
              nextCategory={nextCategory}
              prevCategory={prevCategory}
            />
          )}

          {currentView === 'test' && <TestView />}
        </Box>

        {/* Fixed Bottom Navigation */}
        <Box mt={2}>
          <BottomNavigation
            currentView={currentView}
            onDayClick={handleDayClick}
            onCategoriesClick={handleCategoriesClick}
            onTestClick={handleTestClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

// export default HomePageContent;

// views/DayView.js
// import React from 'react';
import {
  Typography,
  IconButton,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
// import { ChevronLeft, ChevronRight } from '@mui/icons-material';
// import RecommendationsSection from '../components/RecommendationsSection';

const DayView = ({
  currentDay,
  nextDay,
  prevDay,
  showBooks,
  showMovies,
  toggleBooks,
  toggleMovies,
}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
    >
      {/* Date Header - Fixed Height */}
      <Card sx={{ mb: 2 }}>
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
            height='160'
            image={currentDay.image}
            alt='Фон дня'
            sx={{ borderRadius: 2, mt: 2 }}
          />
        </CardContent>
      </Card>

      {/* Holidays Section - Fixed Height */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography
            variant='h6'
            gutterBottom
          >
            Праздники:
          </Typography>
          <List dense>
            {currentDay.holidays.map((holiday, index) => (
              <ListItem key={index}>
                <ListItemText primary={holiday} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Recommendations Section - Scrollable */}
      <Card
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <CardContent
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
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
              onClick={toggleBooks}
            >
              Что почитать
            </Button>
            <Button
              variant={showMovies ? 'contained' : 'outlined'}
              onClick={toggleMovies}
            >
              Что посмотреть
            </Button>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', pb: 1 }}>
            <RecommendationsSection
              showBooks={showBooks}
              showMovies={showMovies}
              books={currentDay.books}
              movies={currentDay.movies}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

// export default DayView;

// views/CategoriesView.js
// import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const CategoriesView = ({ currentCategory, nextCategory, prevCategory }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFact, setSelectedFact] = useState(null);

  const handleOpenDialog = (fact) => {
    setSelectedFact(fact);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
    >
      {/* Category Header - Fixed Height */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <IconButton onClick={prevCategory}>
              <ChevronLeft />
            </IconButton>
            <Typography variant='h6'>{currentCategory.title}</Typography>
            <IconButton onClick={nextCategory}>
              <ChevronRight />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Facts Section - Scrollable */}
      <Card
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <CardContent
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Typography
            variant='h6'
            gutterBottom
          >
            События:
          </Typography>

          <Box sx={{ flex: 1, overflowY: 'auto', pb: 1 }}>
            {currentCategory.facts.map((fact) => (
              <Card
                key={fact.id}
                sx={{ mb: 2 }}
              >
                <CardContent>
                  <Box>
                    <Typography
                      variant='subtitle1'
                      fontWeight='bold'
                    >
                      {fact.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      gutterBottom
                    >
                      {fact.date}
                    </Typography>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => handleOpenDialog(fact)}
                      sx={{ mt: 1 }}
                    >
                      Узнать больше
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Dialog for expanded fact information */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='sm'
        fullWidth
      >
        {selectedFact && (
          <>
            <DialogTitle>
              {selectedFact.title}
              <Typography
                variant='subtitle2'
                color='text.secondary'
              >
                {selectedFact.date}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Typography>{selectedFact.description}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Закрыть</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

// export default CategoriesView;

// views/TestView.js
// import React from 'react';

const TestView = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
    >
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography
            variant='h5'
            gutterBottom
          >
            Тест
          </Typography>
          <Typography paragraph>
            Здесь будет содержимое страницы с тестами.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

// export default TestView;

// components/BottomNavigation.js
// import React from 'react';

const BottomNavigation = ({
  currentView,
  onDayClick,
  onCategoriesClick,
  onTestClick,
}) => {
  return (
    <Card>
      <CardContent>
        <Box
          display='flex'
          justifyContent='center'
          gap={2}
        >
          <Button
            variant={currentView === 'categories' ? 'contained' : 'text'}
            onClick={onCategoriesClick}
          >
            Рубрики
          </Button>
          <Button
            variant={currentView === 'day' ? 'contained' : 'text'}
            onClick={onDayClick}
          >
            День
          </Button>
          <Button
            variant={currentView === 'test' ? 'contained' : 'text'}
            onClick={onTestClick}
          >
            Тест
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// export default BottomNavigation;

// components/RecommendationsSection.js
// import React from 'react';

const RecommendationsSection = ({ showBooks, showMovies, books, movies }) => {
  return (
    <>
      {showBooks && (
        <Box>
          {books.map((book) => (
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
                  <Typography variant='body2'>{book.description}</Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      )}
      {showMovies && (
        <Box>
          {movies.map((movie) => (
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
                  <Typography variant='body2'>{movie.description}</Typography>
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
    </>
  );
};

export default RecommendationsSection;

// data/categoriesData.js
