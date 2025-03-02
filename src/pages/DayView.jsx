import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { mainColor, bgColor } from '../utils/colors';
import { ChevronLeftSharp, ChevronRight } from '@mui/icons-material';

import RecommendationsSection from '../sections/Recomendations';

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
      <Card
        sx={{
          mb: 1,
          overflow: 'visible',
          position: 'relative',
        }}
      >
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            minHeight='200px'
            borderRadius={2}
          >
            <IconButton
              onClick={prevDay}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
              }}
            >
              <ChevronLeftSharp />
            </IconButton>

            <Box
              width='70%'
              mx='auto'
            >
              <DateDisplay
                date={currentDay.date}
                weekDay={currentDay.weekDay}
              />
            </Box>

            <IconButton
              onClick={nextDay}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </CardContent>

        {/* Фото фона */}
        <CardMedia
          component='img'
          src={currentDay.image}
          alt='Фон дня'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 2,
            zIndex: 0, // Фото находится под текстом
            opacity: 0.9, // Полупрозрачность
          }}
        />
      </Card>

      <Card
        sx={{
          mb: 1,
          bgcolor: bgColor,
          borderRadius: 2,
          overflowY: 'auto',
          maxHeight: '200px', // Set a maximum height
          minHeight: '90px', // Set a minimum height
        }}
      >
        <CardContent sx={{ overflowY: 'auto', '&:last-child': { pb: 0 } }}>
          {/* Enable vertical scrolling */}
          <Typography variant='h6'>Праздники:</Typography>
          <List
            dense
            sx={{ listStyleType: 'disc', pl: 2 }}
          >
            {currentDay.holidays.map((holiday, index) => (
              <ListItem
                key={index}
                sx={{ display: 'list-item' }}
              >
                <ListItemText primary={holiday} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: bgColor,
          borderRadius: 2,
          minHeight: '300px',
        }}
      >
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
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
              sx={{
                backgroundColor: showBooks ? mainColor : 'transparent',
                color: showBooks ? '#fff' : mainColor,
                borderColor: mainColor,
                '&:hover': {
                  backgroundColor: showBooks
                    ? '#6b442e'
                    : 'rgba(127, 85, 57, 0.1)',
                  borderColor: '#6b442e',
                },
              }}
              variant={showBooks ? 'contained' : 'outlined'}
              onClick={toggleBooks}
            >
              Что почитать
            </Button>
            <Button
              sx={{
                backgroundColor: showMovies ? mainColor : 'transparent',
                color: showMovies ? '#fff' : mainColor,
                borderColor: mainColor,
                '&:hover': {
                  backgroundColor: showMovies
                    ? '#6b442e'
                    : 'rgba(127, 85, 57, 0.1)',
                  borderColor: '#6b442e',
                },
              }}
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

const DateDisplay = ({ date, weekDay }) => {
  // Extract date components for styling

  return (
    <Box
      className='date-display'
      textAlign='center'
      py={2}
    >
      <Typography
        component='div'
        sx={{
          fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
          fontWeight: 700,
          background:
            'linear-gradient(135deg,rgb(194, 253, 191) 0%,#ffe389 100%)',
          backgroundClip: 'text',
          color: 'transparent',
          lineHeight: 1,
          letterSpacing: '2px',
          textShadow: '0px 2px 3px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.8s ease-in-out',
          mb: 1,
        }}
      >
        {date}
      </Typography>

      <Typography
        variant='h4'
        sx={{
          fontWeight: 500,
          color: 'rgba(91, 53, 29, 0.77)',
          letterSpacing: '1px',
          textTransform: 'capitalize',
          animation: 'slideUp 0.5s ease-in-out',
        }}
      >
        {weekDay}
      </Typography>
    </Box>
  );
};

export default DayView;
