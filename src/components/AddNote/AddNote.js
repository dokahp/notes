import {useState} from 'react';
import style from './AddNote.module.css';

let AddNote = ({handleSave}) => {
    const [noteText, setNoteText] = useState('')
    const textChanged = (e) => {
        return setNoteText(e.target.value)
    }
    const handleSubmit = () => {
        if (noteText.trim().length > 0) {
            handleSave(noteText)
            setNoteText('')
        }
    }
    return (
        <div className="note addNote">
            <textarea className={style.textArea} placeholder="Enter your Note" onChange={textChanged} value={noteText} />
            <button  onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default AddNote;