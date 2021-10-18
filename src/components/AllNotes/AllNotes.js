import AddNote from "../AddNote/AddNote";
import OneNote from "../OneNote/OneNote";
import style from './AllNotes.module.css';

let AllNotes = ({ allNotes, handleSave, handleDelete, handleEdit }) => {
    return (
        <div className={style.container}>
            {
                allNotes.map(el => <OneNote id={el.id}
                    noteText={el.noteText}
                    hashTag={el.hashTag}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit} />)
            }
            <AddNote handleSave={handleSave} />
        </div>
    )
}

export default AllNotes