import s from './Warn.module.css';

export default function Warn({ text, close }: { text: string; close: () => void }) {
  return (
    <div className={s.modal}>
      <div className={s['modal-content']}>
        <p>{text}</p>
        <button className={s.button} onClick={() => close()}>
          确定
        </button>
      </div>
    </div>
  );
}
