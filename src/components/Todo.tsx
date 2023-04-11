import { useDispatch, useSelector } from 'react-redux'
import { add, remove, clear } from '../app/todoSlice';
import { RootState } from '../app/store'
import { HTMLProps, KeyboardEventHandler, MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { twMerge } from 'tailwind-merge';

export const TodoForm: React.FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
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
      <div className={twMerge(className, 'p-1 rounded-md bg-cyan-700 shadow-md gap-1 flex space-between')}>
        <input
          className='w-11/12 rounded-sm p-2 font-normal outline-indigo-300'
          ref={inputRef}
          type="text"
          name="text"
          id="text"
          placeholder='write a todo'
          onKeyDown={onEnter} />
        <button className='w-2/12 rounded-sm font-normal outline-indigo-300 bg-cyan-200' onClick={onAdd}>➕</button>
      </div>
    )
  }
  
  export const TodoList: React.FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
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
      <div className={twMerge(className, 'p-2 rounded-md bg-cyan-300 shadow-md')}>
        <div className='flex justify-between'>
          <h2>Todos:</h2>
          <button className='outline-indigo-300' onClick={() => dispatch(clear())}>🗑️</button>
        </div>
        <ul ref={parent} className='mt-2 flex flex-col gap-1'>
          {todos.length > 0 && todos.map((todo) =>
            <li key={todo.id} className='bg-cyan-100 p-2 rounded-md shadow-sm flex flex-row justify-between items-start'>
              <div className='max-w-[200px] break-words'>
                <p>{todo.text}</p>
              </div>
              <div
                className='flex items-center justify-center rounded-full active:shadow-inner cursor-pointer'
                onClick={() => dispatch(remove(todo.id))}>
                ✖️
              </div>
            </li>) || <li>Todo list is empty...</li>}
  
        </ul>
      </div>
    )
  }