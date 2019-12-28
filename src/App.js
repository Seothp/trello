import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import ToDo from './components/todo/todo';
import ToDoData from './components/todo-data/todo-data'
import './App.css';


function App() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <ToDoData />
      </DndProvider>
    </div>
  );
}

export default App;
