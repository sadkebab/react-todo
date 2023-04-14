import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useCallback, useEffect, useRef } from "react"
import { throttle } from "../../app/utils"
import { toggleShowCompleted, updateSearch } from "../../app/toolbarSlice"
import { clear, clearCompleted, reorderById, reorderByStatus } from "../../app/todoSlice"
import { twMerge as t } from "tailwind-merge"

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
            <div className='flex flex-col xs:flex-row justify-between gap-1'>
                <input
                    ref={searchInputRef}
                    type='text'
                    className='text-sm w-full px-2 py-2 xs:py-0 outline-indigo-300 rounded-sm bg-cyan-100 border border-cyan-400 shadow-inner placeholder-black placeholder-opacity-40'
                    onChange={onSearchTextChange}
                    placeholder='🔍' />
                <div className="flex flex-row gap-1 justify-between flex-wrap xs:flex-nowrap select-none">
                    <ToolbarButton className={!showCompleted && 'opacity-50'} icon="✔️" onClick={() => dispatch(toggleShowCompleted())} />
                    <ToolbarButton icon="🕣" onClick={() => dispatch(reorderById())} />
                    <ToolbarButton icon="🔀" onClick={() => dispatch(reorderByStatus())} />
                    <ToolbarButton icon="🧹" onClick={() => dispatch(clearCompleted())} />
                    <ToolbarButton icon="🗑️" onClick={() => dispatch(clear())} />
                </div>
            </div>
        </div>
    )
}

interface ToolbarButtonProps {
    className?: string | false
    icon: string
    onClick: () => void
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ className, icon, onClick }) => {
    return (
        <button
            className={t(className, 'w-8 bg-cyan-100 border border-cyan-400 outline-indigo-300 p-1 rounded shadow-sm active:scale-95 active:shadow-inner')}
            onClick={onClick}>
            {icon}
        </button>
    )
}
