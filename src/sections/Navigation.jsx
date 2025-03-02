import { Box, Button, Card, CardContent } from '@mui/material';
import { mainColor } from '../utils/colors';

const BottomNavigation = ({
  currentView,
  onDayClick,
  onCategoriesClick,
  onTestClick,
}) => {
  return (
    <Card>
      <CardContent sx={{ bgcolor: '#ddb892', borderRadius: 2 }}>
        <Box
          display='flex'
          justifyContent='center'
          gap={2}
        >
          <Button
            sx={{
              backgroundColor:
                currentView === 'categories' ? mainColor : 'transparent',
              color: currentView === 'categories' ? '#fff' : mainColor,
              borderColor: mainColor,
              '&:hover': {
                backgroundColor:
                  currentView === 'categories'
                    ? '#6b442e'
                    : 'rgba(127, 85, 57, 0.1)',
                borderColor: '#6b442e',
              },
            }}
            variant={currentView === 'categories' ? 'contained' : 'text'}
            onClick={onCategoriesClick}
          >
            Рубрики
          </Button>
          <Button
            sx={{
              backgroundColor:
                currentView === 'day' ? mainColor : 'transparent',
              color: currentView === 'day' ? '#fff' : mainColor,
              borderColor: mainColor,
              '&:hover': {
                backgroundColor:
                  currentView === 'day' ? '#6b442e' : 'rgba(127, 85, 57, 0.1)',
                borderColor: '#6b442e',
              },
            }}
            variant={currentView === 'day' ? 'contained' : 'text'}
            onClick={onDayClick}
          >
            День
          </Button>
          <Button
            sx={{
              backgroundColor:
                currentView === 'test' ? mainColor : 'transparent',
              color: currentView === 'test' ? '#fff' : mainColor,
              borderColor: mainColor,
              '&:hover': {
                backgroundColor:
                  currentView === 'test' ? '#6b442e' : 'rgba(127, 85, 57, 0.1)',
                borderColor: '#6b442e',
              },
            }}
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

export default BottomNavigation;
