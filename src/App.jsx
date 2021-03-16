import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef
} from 'react'
import Son from './components/son.tsx'
export const ThemeContext = createContext('lithg')
let id = new Date()
function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()
  const onSubmit = (e) => {
    e.preventDefault()
    const newText = inputRef.current.value
    addTodo({
      id: ++id,
      complete: false,
      text: newText
    })
    inputRef.current.value=''
  }
  return (
    <div>
      <h1>todos</h1>
      <form action="" onSubmit={(e) => onSubmit(e)}>
        <input type="text" placeholder="add todos" ref={inputRef} />
        <button></button>
      </form>
    </div>
  )
}
function TodoItem(props){
 const {todo:{
   id,text,complete
 },
  toggleTodo,
  removeTode}=props;
  return (
    <li>
      <input type="checkbox" onChange={()=>toggleTodo(id)} checked={complete}/>
      <label htmlFor="" style={complete?{texDecoration:'line-through' }:{}}>{text}</label>
      <button onClick={()=>removeTode(id)}> X</button>
    </li>
  )
}
function Todos(props) {
  const { todos, removeTode, toggleTodo } = props
  return (
    <div>
      <ul>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo}  toggleTodo={toggleTodo}
          removeTode={removeTode}></TodoItem>
        })}
      </ul>
    </div>
  )
}
function TodoLists() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos((todos) => [...todos, todo])
  }
  const removeTode = useCallback((id) => {
    setTodos((todos) =>
      todos.filter((todo) => {
        return todo.id !== id
      })
    )
  }, [])
  const toggleTodo = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        return todo.id === id ? { ...todo, complete: !todo.complete } : todo
      })
    )
  }
  useEffect(()=>{
    setTodos( JSON.parse(localStorage.getItem('todos')||[]))
   },[])
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  

  return (
    <div>
      <Control addTodo={addTodo}></Control>
      <Todos
        toggleTodo={toggleTodo}
        removeTode={removeTode}
        todos={todos}
      ></Todos>
    </div>
  )
}
function App() {
  return <TodoLists></TodoLists>
}

export default App
