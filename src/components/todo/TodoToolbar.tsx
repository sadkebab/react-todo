import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { throttle } from "../../app/utils"
import { toggleShowCompleted, updateSearch } from "../../app/toolbarSlice"
import { clear, clearCompleted, reorderById, reorderByStatus } from "../../app/todoSlice"
import { twMerge as t } from "tailwind-merge"
import { Check, CheckSquare, Clock, ListChecks, Search, SortAsc, Trash, Trash2 } from "lucide-react"

export const TodoToolbar: React.FC = () => {
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
        <div className="flex flex-col gap-1">
            <div className='flex flex-col xs:flex-row justify-between gap-2'>
                <div className="flex flex-row items-center w-full gap-1 bg-slate-600 rounded-sm p-1">
                    <Search stroke="rgb(241,245,249)" className="w-5"/>
                    <input
                    ref={searchInputRef}
                    type='text'
                    className='w-full xs:py-0 h-full outline-slate-600 outline-1 bg-slate-600 shadow-inner placeholder-black placeholder-opacity-40 text-slate-100'
                    onChange={onSearchTextChange}
                    />
                </div>
                <div className="flex gap-2 flex-wrap xs:flex-nowrap select-none">
                    <ToolbarButton className={!showCompleted && 'opacity-50'} onClick={() => dispatch(toggleShowCompleted())} >
                        <CheckSquare stroke="rgb(241,245,249)" className="w-5" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => dispatch(reorderById())}>
                        <Clock stroke="rgb(241,245,249)" className="w-5" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => dispatch(reorderByStatus())}>
                        <ListChecks stroke="rgb(241,245,249)" className="w-5" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => dispatch(clearCompleted())}>
                        <Trash stroke="rgb(241,245,249)" className="w-5"/>
                    </ToolbarButton>
                    <ToolbarButton className="mr-0" onClick={() => dispatch(clear())}>
                        <Trash2 stroke="rgb(241,245,249)" className="w-5" />
                    </ToolbarButton>
                </div>
            </div>
        </div>
    )
}

interface ToolbarButtonProps {
    className?: string | false
    children: ReactNode
    onClick: () => void
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ className, children, onClick }) => {
    return (
        <button
            className={t(className, 'w-8 bg-slate-600 flex items-center justify-center outline-slate-600 outline-1 -outline-offset-4 p-1 rounded-sm active:scale-95 active:shadow-inner')}
            onClick={onClick}>
            {children}
        </button>
    )
}
