import React, { useState } from 'react';
import { Box } from '@mui/material';
import { daysData, categoriesData } from '../data/data';
import TestView from './TestView';
import DayView from './DayView';
import CategoriesView from './CategoriesView';
import BottomNavigation from '../sections/Navigation';

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
      p={1}
      bgcolor='background.default'
      display='flex'
      justifyContent='center'
      sx={{ overflow: 'hidden' }} // Prevent page level scrolling
    >
      <Box
        maxWidth='sm'
        width='100%'
        display='flex'
        flexDirection='column'
        height='100%'
        p='0 2 2 2'
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

// Create a simple wrapper component to export
const HomePage = () => {
  return <HomePageContent />;
};

export default HomePage;
