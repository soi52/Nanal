import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import axios_api from '../../../config/Axios';
import emptyProfile from '../../../src_assets/img/emptyProfile.png';
// import DiaryTotalList from '../../diary/DiaryTotalList';

// username, userMassage, profile 받아와야함
// 수정 시 파일 전송까지 ㅇㅇ
function ProfileForm() {
  const navigate = useNavigate();

  // user profile
  const [userProfile, setUserProfile] = useState({
    days: 1,
    img: null,
    introduction: null,
    nickname: '',
  });

  //총 작성한 일기, 좋아하는 일기, 가입한지 N일째
  const [pStatus, setPStatus] = useState({});
  const changePStatus = (a, b) => {
    setPStatus({
      dCount: a,
      likeCount: b,
    });
  };

  //이미지 useState 삼항연산자 써서 axios로 받아오면 그게 기본 값으로 들어가게 해놨는데 왜 안 되는지 잘 몰겠음.
  // const [Image, setImage] = useState(
  //   userProfile.img === null ? emptyProfile : Image
  // );
  const [Image, setImage] = useState();
  const fileInput = useRef(null);

  //이미지 수정 폼. 여기서 setImage로 바꾸면 Image에 저장된거 put으로 올려주기만하면 됨.
  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(Image);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Mount 됐을 때 user
  useEffect(() => {
    axios_api
      .get('user/profile')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '회원 정보 조회 성공') {
            // console.log(data.data.profile);
            setUserProfile(data.data.profile);
          }
        } else {
          console.log('회원 정보 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('회원 정보 조회: ' + error);
      });
    // 총 작성한 일기 수
    axios_api
      .get('diary')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '일기 개수 조회 성공') {
            let daCount = data.data.diaryCount;
            // 좋아하는 일기
            axios_api.get('diary/bookmark').then(({ data }) => {
              // console.log(data)
              if (data.statusCode === 200) {
                if (
                  data.data.responseMessage === '일기 북마크 개수 조회 성공'
                ) {
                  let lCount = data.data.bookCount;
                  changePStatus(daCount, lCount);
                }
              } else {
                console.log('일기 개수 조회 오류: ');
                console.log(data.statusCode);
                console.log(data.data.responseMessage);
              }
            });
          } else {
            console.log('일기 북마크 개수 조회 오류: ');
            console.log(data.statusCode);
            console.log(data.data.responseMessage);
          }
        }
      })
      .catch(({ error }) => {
        console.log('일기 개수 조회: ' + error);
      });
  }, []);

  return (
    <div>
      <div className='flex justify-evenly mt-5'>
        <img
          // src={Image}
          src={userProfile.img}
          className='w-28 h-28 p-1 rounded-full'
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <input
          type='file'
          style={{ display: 'none' }}
          // accept='image/jpg,impge/png,image/jpeg'
          accept='image/*'
          name='profile_img'
          onChange={onChange}
          ref={fileInput}
        />
        <div className='my-auto'>
          <p className='my-auto text-2xl font-bold p-1'>
            {userProfile.nickname} 님의 일기장
          </p>

        </div>
      </div>
      <div className='box-border my-3 mx-auto w-76 h-32 border-1 '>
        <p>유저 프로필 들어가면 없어져야함.</p>
        <p>{userProfile.introduction}</p>
      </div>
      <div className='flex justify-between'>
        <p className='my-3 font-semibold'>
          나날과 함께한 {userProfile.days}일째 나날입니다.
        </p>
      </div>
      <div className='flex justify-around box-border h-24 w-80 p-4 bg-slate-300/50 rounded-lg'>
        <div
          className='grid content-evenly'
          onClick={() => navigate('/Diary/Total/List')}
        >
          <p className='text-center'>총 작성한 일기</p>
          <p className='text-center font-bold'>{pStatus.dCount}</p>
        </div>
        <div
          className='grid content-evenly'
          onClick={() => navigate('/Diary/Bookmark/List')}
        >
          <p className='text-center'>좋아하는 일기</p>
          <p className='text-center font-bold'>{pStatus.likeCount}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
