import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef
} from 'react'
import { createSet, createAdd, createRemove, createToggle } from './action'
import Son from './components/son.tsx'

function bindActionCreators(actionCreators,dispatch){
  const ret={}
  for (let key in actionCreators){
    ret[key]=function (...args){
      // const actionCreator=actionCreators[key]
      // const action =actionCreator(...)
      dispatch(actionCreators[key](...args))
    }
  }
}

export const ThemeContext = createContext('lithg')
let id = new Date()
function Control(props) {
  const { dispatch } = props
  const inputRef = useRef()
  const onSubmit = (e) => {
    e.preventDefault()
    const newText = inputRef.current.value
    dispatch(createAdd({
      id: ++id,
      complete: false,
      text: newText
    }))
    inputRef.current.value = ''
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
function TodoItem(props) {
  const {
    todo: { id, text, complete },
    dispatch
  } = props
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => dispatch(createToggle(id))}
        checked={complete}
      />
      <label
        htmlFor=""
        style={complete ? { texDecoration: 'line-through' } : {}}
      >
        {text}
      </label>
      <button onClick={() => dispatch(createRemove(id))}> X</button>
    </li>
  )
}
function Todos(props) {
  const { todos, dispatch } = props
  return (
    <div>
      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem key={todo.id} todo={todo} dispatch={dispatch}></TodoItem>
          )
        })}
      </ul>
    </div>
  )
}
function TodoLists() {
  const [todos, setTodos] = useState([])
  // const addTodo = (todo) => {
  //   setTodos((todos) => [...todos, todo])
  // }
  // const removeTode = useCallback((id) => {
  //   setTodos((todos) =>
  //     todos.filter((todo) => {
  //       return todo.id !== id
  //     })
  //   )
  // }, [])
  // const toggleTodo = (id) => {
  //   setTodos((todos) =>
  //     todos.map((todo) => {
  //       return todo.id === id ? { ...todo, complete: !todo.complete } : todo
  //     })
  //   )
  // }

  const dispatch = useCallback((action) => {
    const { type, payload } = action
    switch (type) {
      case 'set':
        setTodos(payload)
        break
      case 'add':
        setTodos((todos) => [...todos, payload])
        break
      case 'remove':
        setTodos((todos) =>
          todos.filter((todo) => {
            return todo.id !== payload
          })
        )
        break
      case 'toggle':
        setTodos((todos) =>
          todos.map((todo) => {
            return todo.id === payload
              ? { ...todo, complete: !todo.complete }
              : todo
          })
        )
        break
      default:
    }
  }, [])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos') || [])
    // setTodos(todos)
    dispatch(createSet(todos))
  }, [])
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div>
      <Control dispatch={dispatch}></Control>
      <Todos dispatch={dispatch} todos={todos}></Todos>
    </div>
  )
}
function App() {
  return <TodoLists></TodoLists>
}

export default App
