import { useRef, useState, useEffect } from 'react';
import style from './Congratulations.module.css';
export default function Xibao() {
  const [title, setTitle] = useState('404 NOT FOUND');
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    document.title = '404';
  }, []);
  return (
    <div className={style.bg}>
      <h1
        ref={titleRef}
        className={style.title}
        onClick={() => {
          setTitle('♬月火水木金土日♬\n♬毎日がHoliday♬');
          titleRef.current!.style.cursor = 'auto';
        }}
      >
        {title}
      </h1>
    </div>
  );
}
