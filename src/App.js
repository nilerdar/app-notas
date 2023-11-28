import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Componente NoteList
const NoteList = ({ notes, deleteNote }) => {
  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} note={note} deleteNote={deleteNote} />
      ))}
    </div>
  );
};

// Componente Note
const Note = ({ note, deleteNote }) => {
  return (
    <div className='border rounded m-2'> 
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button className='btn btn-danger m-2' onClick={() => deleteNote(note.id)}>Eliminar</button>
    </div>
  );
};

// Componente NoteEditor
const NoteEditor = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = () => {
    addNote({
      id: Math.floor(Math.random() * 1000), // Simulando un ID único
      title,
      content,
    });
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <input className='border rounded m-2'
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea className='border rounded m-2'
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className='btn btn-primary m-2'  onClick={handleAddNote}>Agregar Nota</button>
    </div>
  );
};

// Componente App
const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    if (notes.length >= 0) {
      setNotes((prevNotes) => {
        localStorage.setItem('notes', JSON.stringify(prevNotes));
        return prevNotes;
      });
    }
  }, [notes]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className='text-center'>Aplicacion de notas</h1>
      <input className='border rounded m-2'
        type="text"
        placeholder="Buscar notas"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h2 className='text-center'>Insertar Nota</h2>
      <NoteEditor addNote={addNote} />
      <NoteList notes={filteredNotes} deleteNote={deleteNote} />
    </div>
  );
};
export default App;
