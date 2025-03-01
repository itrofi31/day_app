import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/Categories';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<HomePage />}
      />
      <Route
        path='/categories'
        element={<CategoriesPage />}
      />
      <Route
        path='/test'
        element={<TestPage />}
      />
    </Routes>
  );
}

export default App;
