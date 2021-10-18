import { useRef } from 'react';
import ContentEditable from 'react-contenteditable'
import style from './OneNote.module.css';

let OneNote = ({ id, noteText, hashTag, handleDelete, handleEdit }) => {
    const text = useRef(noteText);
    const handleChange = (e) => {
        text.current = e.target.value;
    };
    return (
        <div className="note oneNote">
            <ContentEditable html={text.current} onBlur={() => handleEdit(id, text.current)} onChange={handleChange} />
            <div className={style.container}>
                {
                    hashTag.map(el => <span className={hashTag ? style.hashTag : ''}>{el}</span>)
                }
                <button className={style.deleteBtn} onClick={() => handleDelete(id)}>Delete</button>
            </div>

        </div>
    )
}


export default OneNote