import { Routes, Route } from 'react-router-dom';
import NotFound from '../component/another/NotFound';
import MyDiary from './MyDiary';
import SignIn from '../component/account/SignIn';
import SignUp from '../component/account/SignUp';
import FindId from '../component/account/FindId';
import FindPw from '../component/account/FindPw';

const AppMain = () => {
  return (
    <Routes>
      <Route path='/' element={<MyDiary />}></Route>
      <Route path='/login' element={<SignIn />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/findid' element={<FindId />}></Route>
      <Route path='/findpw' element={<FindPw />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppMain;
