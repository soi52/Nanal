import { Routes, Route } from 'react-router-dom';
import NotFound from '../component/another/NotFound';
import MyDiary from './MyDiary';

const AppMain = () => {
  return (
    <Routes>
      <Route path='/' element={<MyDiary />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppMain;
