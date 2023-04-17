import { CheckSquare, Clock, Hand, Info, ListChecks, MousePointerClick, Plus, Search, Trash, Trash2, X } from "lucide-react"
import { ReactNode, useState } from "react"
import { twMerge as t } from "tailwind-merge"
import Overlay from "../layouts/Overlay"

const InfoBox: React.FC<{ className?: string, children: string }> = ({ className, children }) => {
    const [infoOpen, setInfoOpen] = useState(false)

    return (
        <div className={t(className, '')}>
            {!infoOpen &&
                <div className='w-full flex flex-row justify-end'>
                    <button
                        onClick={() => setInfoOpen(!infoOpen)}
                        className={t(infoOpen ? '' : 'rounded-b-md shadow-md', 'block p-1 bg-slate-800 border border-slate-600 w-10 h-10 outline-slate-600 outline-1 -outline-offset-4 rounded-t-md active:shadow-inner select-none')}>
                        <Info className="w-full" />
                    </button>
                </div> 
                ||
                <Overlay title="Help Guide" onClose={() => setInfoOpen(false)}>
                    <ul >
                        <InfoRow icon={<Plus className="w-5" />} border>
                            <p>adds a todo</p>
                        </InfoRow>
                        <InfoRow icon={<MousePointerClick className="w-5" />} border>
                            <p>click on a todo to mark it as completed</p>
                        </InfoRow>
                        <InfoRow icon={<Hand className="w-5" />} border>
                            <p>drag and drop to reorder</p>
                        </InfoRow>
                        <InfoRow icon={<X className="w-5" />} border>
                            <p>deletes a todo</p>
                        </InfoRow>
                        <InfoRow icon={<Search className="w-5" />} border>
                            <p>filters todos by text and allows for exact match with double quotes</p>
                        </InfoRow>
                        <InfoRow icon={<CheckSquare className="w-5" />} border>
                            <p>toggles completed todo visibility</p>
                        </InfoRow>
                        <InfoRow icon={<Clock className="w-5" />} border>
                            <p>sorts todo by order of insertion *</p>
                        </InfoRow>
                        <InfoRow icon={<ListChecks className="w-5" />} border>
                            <p> sorts todo by completition status *</p>
                        </InfoRow>
                        <InfoRow icon={<Trash className="w-5" />} border>
                            <p>clears all completed todos</p>
                        </InfoRow>
                        <InfoRow icon={<Trash2 className="w-5" />} border>
                            <p>deletes all todos</p>
                        </InfoRow>
                        <InfoRow>
                            <p>* the order gets reversed if the list is already sorted</p>
                        </InfoRow>
                    </ul>
                </Overlay>
            }
        </div>
    )
}

interface InfoRowProps {
    className?: string,
    icon?: ReactNode,
    children: ReactNode,
    border?: boolean
}

const InfoRow: React.FC<InfoRowProps> = ({ children, icon, className, border }) => {
    return (
        <li className={t(className, border && 'border-b border-slate-700', 'text-sm py-1 flex flex-row gap-1')}>
            {icon && icon}
            <p className="w-full">{children}</p>
        </li>
    )
}

export default InfoBox