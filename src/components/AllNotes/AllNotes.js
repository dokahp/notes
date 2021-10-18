import OneNote from "../OneNote/OneNote";


let AllNotes = ({ allNotes, handleDelete, handleEdit }) => {
    return (
        <>
            {
                allNotes.map(el => <OneNote key={el.id} id={el.id}
                    noteText={el.noteText}
                    hashTag={el.hashTag}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit} />)
            }
            
        </>
    )
}

export default AllNotes