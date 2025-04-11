import { useState } from 'react';
import { bgColor, mainColor } from '../utils/colors';

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { testQuestions } from '../data/testData';

const TestView = () => {
  // Мок-данные для теста

  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleCheckAnswers = () => {
    let correctAnswers = 0;

    testQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setShowResults(true);
  };

  const handleResetTest = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const calculatePercentage = () => {
    return Math.round((score / testQuestions.length) * 100);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
    >
      <Card sx={{ mb: 2, bgcolor: bgColor, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant='h5'
            gutterBottom
            align='center'
          >
            Проверь себя 🕵
          </Typography>
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
        }}
      >
        <CardContent
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {!showResults ? (
            <>
              <Typography
                variant='h6'
                gutterBottom
              >
                Вопросы:
              </Typography>

              <Box sx={{ flex: 1, overflowY: 'auto', pb: 1 }}>
                <List>
                  {testQuestions.map((question) => (
                    <ListItem
                      key={question.id}
                      disablePadding
                      sx={{ mb: 3 }}
                    >
                      <Card sx={{ width: '100%', boxShadow: 1 }}>
                        <CardContent>
                          <Typography
                            variant='subtitle1'
                            fontWeight='bold'
                            gutterBottom
                          >
                            {question.id}. {question.question}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <FormControl component='fieldset'>
                            <RadioGroup
                              value={answers[question.id] || ''}
                              onChange={(e) =>
                                handleAnswerChange(question.id, e.target.value)
                              }
                            >
                              {question.options.map((option) => (
                                <FormControlLabel
                                  key={option}
                                  value={option}
                                  control={
                                    <Radio
                                      sx={{
                                        color: '#7f5539',
                                        '&.Mui-checked': {
                                          color: '#7f5539',
                                        },
                                      }}
                                    />
                                  }
                                  label={option}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </CardContent>
                      </Card>
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box
                display='flex'
                justifyContent='center'
                mt={2}
                pb={3}
              >
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  onClick={handleCheckAnswers}
                  disabled={Object.keys(answers).length < testQuestions.length}
                  sx={{ bgcolor: mainColor }}
                >
                  Проверить ответы
                </Button>
              </Box>
            </>
          ) : (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              height='100%'
              textAlign='center'
            >
              <Typography
                variant='h4'
                gutterBottom
              >
                Результаты теста
              </Typography>

              <Box
                position='relative'
                display='inline-flex'
                sx={{ mb: 2 }}
              >
                <CircularProgress
                  variant='determinate'
                  value={calculatePercentage()}
                  size={120}
                  thickness={5}
                  color={
                    calculatePercentage() >= 70
                      ? 'success'
                      : calculatePercentage() >= 40
                      ? 'warning'
                      : 'error'
                  }
                />
                <Box
                  position='absolute'
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  <Typography
                    variant='h4'
                    component='div'
                    color='text.secondary'
                  >
                    {calculatePercentage()}%
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant='h6'
                gutterBottom
              >
                Правильных ответов: {score} из {testQuestions.length}
              </Typography>

              <Typography
                variant='body1'
                sx={{ mb: 3 }}
              >
                {calculatePercentage() >= 80
                  ? 'Отличный результат! Вы настоящий эрудит!'
                  : calculatePercentage() >= 60
                  ? 'Хороший результат! Вы многое знаете!'
                  : calculatePercentage() >= 40
                  ? 'Неплохой результат. Есть куда расти!'
                  : 'Стоит попробовать ещё раз и улучшить свой результат!'}
              </Typography>

              <Button
                variant='outlined'
                color='primary'
                onClick={handleResetTest}
                sx={{ color: mainColor, borderColor: mainColor }}
              >
                Пройти тест заново
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestView;
