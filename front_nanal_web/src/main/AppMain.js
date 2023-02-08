import { Routes, Route } from 'react-router-dom';
import NotFound from '../component/another/NotFound';
import Home from './Home';

const AppMain = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppMain;
