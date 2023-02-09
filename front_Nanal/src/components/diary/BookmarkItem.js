import { Link } from 'react-router-dom';
import emo_joy from '../../src_assets/img/emo_joy.png';

function BookmarkItem({ diaryIdx, content }) {
  // 나중에 그림 들어와야 함
  return (
    <Link to={'/Diary/Detail'} state={{ diaryIdx: diaryIdx }}>
      <div className='my-5 relative group'>
        <img
          src={emo_joy}
          alt='DALL:E2'
          className='p-1 rounded-lg absolute inset-0 object-cover group-hover:opacity-50'
        />
        <div className='transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0'>
          <div className='p-2'>
            <p className='text-sm truncate ... font-bold mt-10'>{content}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookmarkItem;
