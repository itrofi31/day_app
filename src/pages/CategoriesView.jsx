import { useState } from 'react';
import { bgColor, mainColor } from '../utils/colors';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight, Favorite } from '@mui/icons-material';

// CategoriesView component
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
      <Card sx={{ mb: 2, bgcolor: bgColor, borderRadius: 2 }}>
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
          bgcolor: bgColor,
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
          }}
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
                  <Box
                    display={fact.image ? 'flex' : ''}
                    gap={1}
                  >
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
                      <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <Button
                          variant='outlined'
                          size='small'
                          onClick={() => handleOpenDialog(fact)}
                          sx={{
                            mt: 1,
                            borderColor: mainColor,
                            color: mainColor,
                          }}
                        >
                          Узнать больше
                        </Button>
                        <IconButton
                          sx={{ color: mainColor, mt: 1 }}
                          onClick={() =>
                            console.log(`Liked fact: ${fact.title}`)
                          } // Логика для лайка
                        >
                          <Favorite />
                        </IconButton>
                      </Box>
                    </Box>
                    {fact.image && (
                      <CardMedia
                        component='img'
                        sx={{
                          width: '100px', // Установите ширину
                          height: '100px', // Установите высоту
                          objectFit: 'cover', // Сохранение пропорций изображения
                          marginTop: '15px',
                        }}
                        image={fact.image}
                      />
                    )}
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
              <Button
                sx={{ color: mainColor }}
                onClick={handleCloseDialog}
              >
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CategoriesView;
