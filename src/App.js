import logo from './logo.svg';
import './App.css';
import ToDoList from './Components/ToDoList';
import { TodosContext } from './contexts/todosContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';


const todoarrey=[
  {
    id:uuidv4(),
    title:"المهمة الاولي",
    details:"تفاصيل المهمة الاولي",
    isCompleted: false,
  },
  {
    id:uuidv4(),
    title:"المهمة الثانية ",
    details:"تفاصيل المهمة الثانية",
    isCompleted: false,
  },
  {
    id:uuidv4(),
    title:"المهمة الثالثة ",
    details:"تفاصيل المهمة الثالثة",
    isCompleted: false,
  }
]
function App() {
  const  [todos , setTodos] = useState(todoarrey)
  return (
    <div className="App" style={{
      height:"100vh",
      background:'#090040',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      direction:"rtl",
    }}>
      <TodosContext.Provider value={{todos , setTodos}}>
      <ToDoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
