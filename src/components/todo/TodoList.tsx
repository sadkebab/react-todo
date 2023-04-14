import { HTMLProps, MouseEventHandler, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import autoAnimate from "@formkit/auto-animate"
import { Todo, remove, swap, toggleStatus } from "../../app/todoSlice"
import { TodoToolbar } from "./TodoToolbar"
import { twMerge as t } from "tailwind-merge"
import { DndContext, DragEndEvent, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core"
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'

export const TodoList: React.FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
  const todos = useSelector((state: RootState) => state.todo.list)
  const dispatch = useDispatch()
  const { searchText, showCompleted } = useSelector((state: RootState) => state.toolbar)
  const { setNodeRef } = useDroppable({
    id: 'droppable',
  })

  const setRefs = useCallback((el: HTMLUListElement) => {
    const animationConfig = {
      duration: 150,
      easing: 'ease-out',
    }
    setNodeRef(el)
    if (el) autoAnimate(el, animationConfig)
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { over, active } = event
    if (active.data.current && over?.data.current) {
      dispatch(swap({ one: active.data.current.index, other: over.data.current.index }))
    }
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const searchFilter = useCallback((item: Todo) => {
    if (searchText.trim() === '') return true
    if (searchText.startsWith('"') && searchText.endsWith('"')) {
      return item.text.toLowerCase() === searchText.trim().toLowerCase().slice(1, -1)
    }
    return item.text.toLowerCase().includes(searchText.trim().toLowerCase())
  }, [searchText])

  const completeFilter = useCallback((item: Todo) => showCompleted || item.status === 'open', [showCompleted])

  return (

    <div className={t(className, 'p-2 rounded-md bg-cyan-300 shadow-md')}>
      <TodoToolbar />
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <ul ref={setRefs} className='mt-2 flex flex-col gap-1'>
            {todos.length > 0 && todos
              .filter(completeFilter)
              .filter(searchFilter)
              .map((todo, index) => <TodoItem key={todo.id} todo={todo} index={index} />)
              || <li>todos will appear here</li>}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  )
}

interface TodoItemProps {
  todo: Todo
  index: number
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index }) => {
  const dispatch = useDispatch()

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: todo.id,
    data: {
      index: index
    }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  const deleteAction: MouseEventHandler = (event) => {
    dispatch(remove(todo.id))
    event.stopPropagation()
  }

  const statusAction: MouseEventHandler = (event) => {
    dispatch(toggleStatus(todo.id))
  }

  return (
    <li
      ref={setNodeRef}
      className={
        t(todo.status === 'open' ? 'bg-cyan-100' : 'bg-gray-100/50','p-2 cursor-grab rounded-md shadow-sm flex flex-row justify-between touch-none')
      }
      style={style}
      onClick={statusAction}
      {...attributes}
      {...listeners}
    >
      <div className='break-words max-w-[550px]'>
        <p>{todo.status === 'completed' && '✔️'} {todo.text}</p>
      </div>
      <button
        className='text-center active:scale-95 cursor-pointer outline-indigo-300'
        onClick={deleteAction}>
        ✖️
      </button>
    </li>
  )
}