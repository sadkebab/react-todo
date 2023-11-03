import { HTMLProps, KeyboardEventHandler, MouseEventHandler, useCallback, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { add } from "../../app/todoSlice"
import { twMerge as t } from "tailwind-merge"
import { Plus } from "lucide-react"
import { useTooltip } from "../../app/utils"

const TodoForm: React.FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonTooltip = useTooltip("Click to add a new todo")

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
    <div className={t(className, 'p-2 rounded-md bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600 shadow-md gap-2 flex space-between text-slate-100')}>
      <input
        className='w-full rounded-sm p-2 bg-slate-600 font-normal outline-slate-600 outline-1 -outline-offset-4 placeholder-slate-200'
        ref={inputRef}
        type="text"
        name="text"
        id="text"
        placeholder='write a todo'
        onKeyDown={onEnter} />
      <button
        {...buttonTooltip}
        className='w-16 sm:w-24 rounded-sm font-normal outline-slate-600 outline-1 -outline-offset-4 bg-slate-600 active:scale-95 flex justify-center items-center select-none'
        onClick={onAdd}>
          <Plus stroke="rgb(241,245,249)" className="w-full"/>
      </button>
    </div>
  )
}

export default TodoForm