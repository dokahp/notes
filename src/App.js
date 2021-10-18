import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import AllNotes from './components/AllNotes/AllNotes';
import Select from 'react-select';
import './App.scss';


function App() {
  const [allNotes, setAllNotes] = useState([])
  const [allHashTags, setHashTag] = useState([])
  const [searchTag, setSearchTag] = useState('')
  let allHashWithoutDublicates = allHashTags.map(el => el.tags)
  allHashWithoutDublicates = new Set(allHashWithoutDublicates.flat())

  let options = [{ label: 'Показать все заметки', value: '' }, ...Array
    .from(allHashWithoutDublicates)
    .map(el => ({ value: el, label: el.slice(1) }))]
  const searchHashTagInText = (text) => {
    let hashTag = text.split(' ').filter(el => el[0] === '#')
    return hashTag
  }
  const addNewNote = (noteText) => {
    const newNote = {
      id: nanoid(),
      noteText: noteText,
      hashTag: searchHashTagInText(noteText) !== '' ? searchHashTagInText(noteText) : ''
    }
    setAllNotes([...allNotes, newNote])
    setHashTag([...allHashTags, {tags: searchHashTagInText(noteText), id: newNote.id}])
  }
  const deleteOneNote = (id) => {
    const newNotes = allNotes.filter(el => el.id !== id)
    allHashTags.filter(el => el.id === id? el.tags = []: el)
    setAllNotes(newNotes)
    setHashTag(allHashTags)
  }
  const editNote = (id, text) => {
    let tag = searchHashTagInText(text)
    let editedNotes = allNotes.map(el => el.id === id ? {
      id: id,
      noteText: text,
      hashTag: tag !== '' ? tag : ''
    } : el)
    setAllNotes(editedNotes)
    allHashTags.map(el => el.id === id? el.tags = tag: el)
    setHashTag(allHashTags)
  }
  const selectChanged = (e) => {
    setSearchTag(e.value)
  }

  return (
    <div>
      <div className="search">
        <h1>Search Note By Tag</h1>
        <div style={{ width: '400px' }}>
          <Select options={options} onChange={selectChanged}
            defaultValue={{ label: 'Показать все заметки', value: '' }} />
        </div>
      </div>
      <AllNotes key={0} allNotes={searchTag !== '' ? allNotes.filter(note => note.hashTag.includes(searchTag)) : allNotes}
        handleSave={addNewNote} handleDelete={deleteOneNote} handleEdit={editNote} />
    </div>
  )
}

export default App;
