import { useDispatch, useSelector } from 'react-redux'
import { add, remove, clear, Todo, toggleStatus } from '../app/todoSlice';
import { updateSearch, toggleShowCompleted } from '../app/toolbarSlice';
import { RootState } from '../app/store'
import { HTMLProps, KeyboardEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { twMerge } from 'tailwind-merge';
import { throttle } from '../app/utils';

const animationConfig = {
  duration: 150,
  easing: 'ease-out',
}

export const TodoForm: React.FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(() => {
    if (inputRef.current && inputRef.current.value.trim().length > 0) {
      dispatch(add(inputRef.current.value.trim()))
      inputRef.current.value = ""
    }
  }, [])

  const onEnter: KeyboardEventHandler<HTMLInputElement> = useCallback((keyEvent) => {
    if (keyEvent.code !== 'Enter') return
    addTodo()
  }, [])

  const onAdd: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    addTodo()
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
      <button 
        className='w-2/12 rounded-sm font-normal outline-indigo-300 bg-cyan-200 active:scale-95' 
        onClick={onAdd}>
        ➕
      </button>
    </div>
  )
}

export const TodoList: React.FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
  const todos = useSelector((state: RootState) => state.todo.list)
  const { searchText, showCompleted } = useSelector((state: RootState) => state.toolbar)
  const todoContainerRef = useRef(null)

  useEffect(() => {
    todoContainerRef.current && autoAnimate(todoContainerRef.current, animationConfig)
  }, [todoContainerRef])

  return (
    <div className={twMerge(className, 'p-2 rounded-md bg-cyan-300 shadow-md')}>
      <TodoToolbar />
      <ul ref={todoContainerRef} className='mt-2 flex flex-col gap-1'>
        {todos.length > 0 && todos
          .filter(item => showCompleted || item.status === 'open')
          .filter(item => { 
            if(searchText.trim() === '') return true 
            if(searchText.startsWith('"') && searchText.endsWith('"')){
              return item.text.toLowerCase() === searchText.trim().toLowerCase().slice(1,-1)
            }
            return item.text.toLowerCase().includes(searchText.trim().toLowerCase()) 
          })
          .map((todo) => <TodoItem todo={todo} />)
          || <li>todos will appear here</li>}

      </ul>
    </div>
  )
}

interface TodoItemProps {
  todo: Todo
}
const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch()

  const deleteAction: MouseEventHandler = (event) => {
    dispatch(remove(todo.id))
    event.stopPropagation()
  }

  const statusAction: MouseEventHandler = (event) => {
    dispatch(toggleStatus(todo.id))
  }

  return (
    <li key={todo.id}
      className={`${todo.status === 'open' ? 'bg-cyan-100' : 'bg-gray-100/50'} p-2 rounded-md shadow-sm flex flex-row justify-between items-start`}
      onClick={statusAction}>
      <div className='break-words max-w-[550px]'>
        <p>{todo.status==='completed' && '☑️ '}{todo.text}</p>
      </div>
      <button
        className='text-center active:scale-95 cursor-pointer outline-indigo-300'
        onClick={deleteAction}>
        ✖️
      </button>
    </li>
  )
}

const TodoToolbar: React.FC = () => {
  const { searchText, showCompleted } = useSelector((state: RootState) => state.toolbar)
  const dispatch = useDispatch()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.value = searchText
  }, [])

  const dipatchUpdate = useCallback(throttle(() => {
    if (searchInputRef && searchInputRef.current) dispatch(updateSearch(searchInputRef.current.value))
  }, 100), [])

  const onSearchTextChange = () => {
    dipatchUpdate()
  }

  return (
    <div className='flex justify-between'>
      <div className='flex flex-row gap-1'>
        <input
          ref={searchInputRef}
          type='text'
          className='text-sm px-1 outline-indigo-300 rounded-sm bg-cyan-100 shadow-inner placeholder-black placeholder-opacity-40'
          onChange={onSearchTextChange}
          placeholder='🔍' />
        <button 
          className={`w-8 outline-indigo-300 ${!showCompleted && 'opacity-50'} border bg-cyan-100 border-cyan-200 rounded-sm px-1 shadow-sm active:scale-95 active:shadow-inner`} 
          onClick={() => dispatch(toggleShowCompleted())}>
            ☑️
        </button>
      </div>
      <button 
        className='w-8 outline-indigo-300 borderrounded-sm px-1 shadow-sm active:scale-95 active:shadow-inner' 
        onClick={() => dispatch(clear())}>
          🗑️
      </button>
    </div>
  )
}