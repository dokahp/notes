import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Select from 'react-select';

import AllNotes from './components/AllNotes/AllNotes';
import AddNote from './components/AddNote/AddNote';

import './App.scss';



const defaultOptions = { label: 'Показать все заметки', value: '' }

function App() {
  const [allNotes, setAllNotes] = useState([])
  const [allHashTags, setHashTag] = useState([])
  const [searchTag, setSearchTag] = useState('')

  const searchHashTagInText = (text) => {
    let hashTag = text.split(' ').filter(el => el[0] === '#')
    return hashTag
  }

  const handleAddNote = (noteText) => {
    const newNote = {
      id: nanoid(),
      noteText: noteText,
      hashTag: searchHashTagInText(noteText) !== '' ? searchHashTagInText(noteText) : ''
    }
    setAllNotes(allNotes => [...allNotes, newNote])
    setHashTag(allHashTags => [...allHashTags, { tags: searchHashTagInText(noteText), id: newNote.id }])
  }

  const handleDeleteNote = (id) => {
    const newNotes = allNotes.filter(el => el.id !== id)
    allHashTags.filter(el => el.id === id ? el.tags = [] : el)
    setAllNotes(newNotes)
    setHashTag(allHashTags)
  }
  
  const handleEditNote = (id, text) => {
    let tag = searchHashTagInText(text)
    setAllNotes(allNotes => allNotes.map(el => el.id === id ? {
      id: id,
      noteText: text,
      hashTag: tag !== '' ? tag : ''
    } : el))
    setHashTag(allHashTags => allHashTags.map(el => el.id === id ? { ...el, tags: tag } : el))
  }


  return (
    <div>
      <div className="search">
        <h1>Search Note By Tag</h1>
        <div style={{width: "400px"}}>
          <Select
            options={[
              defaultOptions,
              ...[...new Set(allHashTags.reduce((acc, { tags }) => [...acc, ...tags], []))].map(tag => ({ value: tag, label: tag.slice(1) }))
            ]}
            onChange={({ value }) => setSearchTag(value)}
            defaultValue={defaultOptions} /></div>

      </div>
      <div className="container">
        <AllNotes
          allNotes={searchTag !== '' ? allNotes.filter(note => note.hashTag.includes(searchTag)) : allNotes}
          handleDelete={handleDeleteNote}
          handleEdit={handleEditNote} />
        <AddNote handleSave={handleAddNote} />
      </div>
    </div>
  )
}

export default App;
