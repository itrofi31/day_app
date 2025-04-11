import { Box, Card, CardMedia, Typography } from '@mui/material';
import { bgColor } from '../utils/colors';

const RecommendationsSection = ({ showBooks, showMovies, books, movies }) => {
  return (
    <>
      {showBooks && (
        <Box>
          {books.map((book) => (
            <Card
              key={book.id}
              sx={{ mb: 2, bgColor, borderRadius: 2 }}
            >
              <Box
                display='flex'
                p={2}
                alignItems={'top'}
              >
                <CardMedia
                  component='img'
                  image={book.image}
                  alt={book.title}
                  sx={{ width: 64, height: 80, borderRadius: 1, mr: 2, mt: 2 }}
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
              sx={{ mb: 2, borderRadius: 2 }}
            >
              <Box
                display='flex'
                p={2}
                alignItems={'top'}
              >
                <CardMedia
                  component='img'
                  image={movie.image}
                  alt={movie.title}
                  sx={{ width: 64, height: 80, borderRadius: 1, mr: 2, mt: 2 }}
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
