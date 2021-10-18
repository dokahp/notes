import ContentEditable from 'react-contenteditable'
import style from './OneNote.module.css';

let OneNote = ({ id, noteText, hashTag, handleDelete, handleEdit }) => {

    return (
        <div className="note oneNote">
            <h3>{noteText}</h3>
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