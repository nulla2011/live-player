import { useState } from 'react';
import style from './Congratulations.module.css';
export default function Xibao() {
  const [title, setTitle] = useState('404 NOT FOUND');
  return (
    <div className={style.bg}>
      <div className={style.title} onClick={() => setTitle('♬月火水木金土日♬\n♬毎日がHoliday♬')}>
        {title}
      </div>
    </div>
  );
}
