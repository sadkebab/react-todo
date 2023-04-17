import { HTMLProps, KeyboardEventHandler, MouseEventHandler, useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import { add } from "../../app/todoSlice"
import { twMerge as t } from "tailwind-merge"
import { Plus } from "lucide-react"

const TodoForm: React.FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
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
    <div className={t(className, 'p-1 rounded-md bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600 shadow-md gap-1 flex space-between text-slate-100')}>
      <input
        className='w-11/12 rounded-sm p-2 bg-slate-500 font-normal outline-slate-500 outline-1 -outline-offset-4 placeholder-slate-200'
        ref={inputRef}
        type="text"
        name="text"
        id="text"
        placeholder='write a todo'
        onKeyDown={onEnter} />
      <button
        className='w-2/12 rounded-sm font-normal outline-slate-500 outline-1 -outline-offset-4 bg-slate-500 active:scale-95 flex justify-center items-center select-none'
        onClick={onAdd}>
          <Plus stroke="rgb(241,245,249)" className="w-full"/>
      </button>
    </div>
  )
}

export default TodoForm