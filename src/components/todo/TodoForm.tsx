import { HTMLProps, KeyboardEventHandler, MouseEventHandler, useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import { add } from "../../app/todoSlice"
import { twMerge as t } from "tailwind-merge"

export const TodoForm: React.FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
  
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
      <div className={t(className, 'p-1 rounded-md bg-cyan-700 shadow-md gap-1 flex space-between')}>
        <input
          className='w-11/12 rounded-sm p-2 font-normal outline-indigo-300'
          ref={inputRef}
          type="text"
          name="text"
          id="text"
          placeholder='write a todo'
          onKeyDown={onEnter} />
        <button 
          className='w-2/12 rounded-sm font-normal outline-indigo-300 bg-cyan-200 active:scale-95 flex justify-center items-center select-none' 
          onClick={onAdd}>
          ➕
        </button>
      </div>
    )
  }

  