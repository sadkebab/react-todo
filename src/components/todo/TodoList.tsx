import { HTMLProps, MouseEventHandler, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import autoAnimate from "@formkit/auto-animate"
import { Todo, remove, toggleStatus } from "../../app/todoSlice"
import { TodoToolbar } from "./TodoToolbar"
import { twMerge as t } from "tailwind-merge"

export const TodoList: React.FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
    const todos = useSelector((state: RootState) => state.todo.list)
    const { searchText, showCompleted } = useSelector((state: RootState) => state.toolbar)
    const todoContainerRef = useRef(null)
  
    useEffect(() => {
      const animationConfig = {
        duration: 150,
        easing: 'ease-out',
      }
      todoContainerRef.current && autoAnimate(todoContainerRef.current, animationConfig)
    }, [todoContainerRef])
  
    return (
      <div className={t(className, 'p-2 rounded-md bg-cyan-300 shadow-md')}>
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
            .map((todo) => <TodoItem key={todo.id} todo={todo} />)
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
      <li
        className={`${todo.status === 'open' ? 'bg-cyan-100' : 'bg-gray-100/50'} p-2 rounded-md shadow-sm flex flex-row justify-between items-start`}
        onClick={statusAction}>
        <div className='break-words max-w-[550px]'>
          <p>{todo.status==='completed' && '✔️ '}{todo.text}</p>
        </div>
        <button
          className='text-center active:scale-95 cursor-pointer outline-indigo-300'
          onClick={deleteAction}>
          ✖️
        </button>
      </li>
    )
  }