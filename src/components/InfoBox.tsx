import autoAnimate from "@formkit/auto-animate"
import { Check, CheckCircle, CheckSquare, Clock, Hand, Info, ListChecks, MousePointerClick, Plus, Search, Trash, Trash2, X } from "lucide-react"
import { ReactNode, useState } from "react"
import { twMerge as t } from "tailwind-merge"

const InfoBox: React.FC<{ className?: string, children: string }> = ({ className, children }) => {
    const [infoOpen, setInfoOpen] = useState(false)

    const setAnimatedRef = (el: HTMLDivElement) => {
        const animationConfig = {
            duration: 150,
            easing: 'ease-out',
        }
        if (el) autoAnimate(el, animationConfig)
    }
    return (
        <div ref={setAnimatedRef} className={t(className, '')}>
            <div className='w-full flex flex-row justify-end'>
                <button
                    onClick={() => setInfoOpen(!infoOpen)}
                    className={t(infoOpen ? '' : 'rounded-b-md shadow-md', 'block p-1 bg-slate-800 border border-slate-600 w-10 h-10 outline-slate-500 outline-1 -outline-offset-4 rounded-t-md active:shadow-inner select-none')}>
                    {infoOpen ? <X className="w-full"/> : <Info className="w-full" />}
                </button>
            </div>
            { infoOpen && 
                <ul className='px-2 pt-2 pb-1 -mt-1 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 text-slate-200 shadow-md z-50 relative rounded-b-md rounded-tl-md'>
                    <InfoRow border><Plus className="w-5"/> and ⏎ key add a todo</InfoRow>
                    <InfoRow border><MousePointerClick className="w-5"/> click on a todo to mark it as completed</InfoRow>
                    <InfoRow border><Hand className="w-5"/> drag and drop to reorder</InfoRow>
                    <InfoRow border><X className="w-5"/> deletes a todo</InfoRow>
                    <InfoRow border><Search className="w-5"/> filters todos by text and allows for exact match with double quotes </InfoRow>
                    <InfoRow border><CheckSquare className="w-5"/> toggles completed todo visibility</InfoRow>
                    <InfoRow border><Clock className="w-5"/> sorts todo by order of insertion *</InfoRow>
                    <InfoRow border><ListChecks className="w-5"/> sorts todo by completition status *</InfoRow>
                    <InfoRow border><Trash className="w-5"/> clears all completed todos</InfoRow>
                    <InfoRow border><Trash2 className="w-5"/> deletes all todos</InfoRow>
                    <InfoRow>* the order gets reversed if the list is already sorted</InfoRow>
                </ul>
            }
        </div>
    )
}

interface InfoProps {
    className?: string,
    children: ReactNode,
    border?: boolean
}

const InfoRow: React.FC<InfoProps> = ({ children, className, border }) => {
    return (
        <li><p className={t(className, border && 'border-b border-slate-700', 'text-sm py-1 flex gap-1 flex-wrap')}>{children}</p></li>
    )
}

export default InfoBox