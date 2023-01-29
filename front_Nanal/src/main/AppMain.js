import { Routes, Route } from "react-router-dom";
import Calendar from "../components/Calendaar.js";
import BookCase from "../components/BookCase.js";
import SignIn from "../components/account/SignIn.js";
import MyPage from "../components/mypage/MyPage.js";
import SignUp from "../components/account/SignUp.js";
import NotFound from "../components/another/NotFound.js";
import DiaryCreate from "../components/diary/DiaryCreate";
import DiaryUpdate from "../components/diary/DiaryUpdate";
import DiaryList from "../components/diary/DiaryList";
import GroupList from "../components/group/GroupList"
import FriendList from "../components/friend/FriendList"
import GroupCreate from '../components/group/GroupCreate';
import RecycleBin from "../components/another/recycleBin"

const AppMain = ({ isCalendaar }) => {
  return (
    <Routes>
      {isCalendaar ? (
        <Route path='/' element={<Calendar />}></Route>
      ) : (
        <Route path='/' element={<BookCase />}></Route>
      )}
      <Route path="/MyPage" element={<MyPage />}></Route>
      <Route path="/SignUp" element={<SignUp />}></Route>
      <Route path="/SignIn" element={<SignIn />}></Route>
      <Route path="/New" element={<DiaryCreate />}></Route>
      <Route path="/RecycleBin" element={<RecycleBin />}></Route>
      <Route path="/Diary/List" element={<DiaryList />}></Route>
      <Route path='/Diary/Create' element={<DiaryCreate />}></Route>
      <Route path="/Group/List" element={<GroupList />}></Route>
      <Route path="/Friend/List" element={<FriendList />}></Route>
      <Route path='/Group/Create' element={<GroupCreate />}></Route>
      <Route path="/Edit/:id" element={<DiaryUpdate />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppMain;