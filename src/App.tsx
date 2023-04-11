import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from './app/todoSlice';
import { RootState } from './app/store'
import { KeyboardEventHandler, MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

function App() {

  return (
    <div className='w-full min-h-screen flex flex-col gap-4 items-center justify-center bg-slate-400 p-4'>
      <h1 className='text-green-200 text-3xl'>MyTodo</h1>
      <TodoForm />
      <TodoList />
    </div>
  )
}

function TodoForm() {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(() => {
    if (inputRef.current && inputRef.current.value.length > 0) {
      dispatch(add(inputRef.current.value))
      inputRef.current.value = ""
    }
  }, [])

  const onEnter: KeyboardEventHandler<HTMLInputElement> = useCallback((keyEvent) => {
    if (keyEvent.code !== 'Enter') return
    addTodo()
  }, [])

  const onAdd: MouseEventHandler<HTMLButtonElement> = useCallback((clickEvent) => {
    addTodo();
  }, [])

  return (
    <div className='min-w-[320px] max-w-[320px] p-4 rounded-md bg-slate-700 shadow-md flex gap-1'>
      <input
        className='w-11/12 rounded-sm p-1 font-normal outline-indigo-300'
        ref={inputRef}
        type="text"
        name="text"
        id="text"
        placeholder='write a todo'
        onKeyDown={onEnter} />
      <button className='w-2/12 rounded-sm p-1 font-normal outline-indigo-300 bg-yellow-100' onClick={onAdd}>➕</button>
    </div>
  )
}

function TodoList() {
  const todos = useSelector((state: RootState) => state.todo.list)
  const dispatch = useDispatch()
  const parent = useRef(null)

  useEffect(() => {
    const animationConfig = {
      duration: 100,
      easing: 'ease-out',
    }
    parent.current && autoAnimate(parent.current, animationConfig)
  }, [parent])

  return (
    <div className='p-4 rounded-md bg-slate-700 min-w-[320px] max-w-[320px] shadow-md'>
      <h2 className='text-slate-200'>Todos:</h2>
      <ul ref={parent} className='mt-2 flex flex-col gap-2'>
        {todos.length > 0 && todos.map((todo) =>
          <li key={todo.id} className='bg-slate-400 p-2 rounded-md shadow-sm flex flex-row justify-between items-start'>
            <div className='max-w-[200px] break-words'>
              <p>{todo.text}</p>
            </div>
            <div
              className='rounded-full bg-red-400 border border-red-800 w-4 h-4 text-xs text-slate-900 flex items-center justify-center shadow-sm active:shadow-inner cursor-pointer'
              onClick={() => dispatch(remove(todo.id))}>
              x
            </div>
          </li>) || <li className='text-slate-100'>Todo list is empty...</li>}

      </ul>
    </div>
  )
}

export default App
