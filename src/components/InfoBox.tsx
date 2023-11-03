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
							adds a todo
						</InfoRow>
						<InfoRow icon={<MousePointerClick className="w-5" />} border>
							click on a todo to mark it as completed
						</InfoRow>
						<InfoRow icon={<Hand className="w-5" />} border>
							drag and drop to reorder
						</InfoRow>
						<InfoRow icon={<X className="w-5" />} border>
							deletes a todo
						</InfoRow>
						<InfoRow icon={<Search className="w-5" />} border>
							filters todos by text and allows for exact match with double quotes
						</InfoRow>
						<InfoRow icon={<CheckSquare className="w-5" />} border>
							hide/show completed todos
						</InfoRow>
						<InfoRow icon={<Clock className="w-5" />} border>
							sorts todo by order of insertion *
						</InfoRow>
						<InfoRow icon={<ListChecks className="w-5" />} border>
							sorts todo by completition status *
						</InfoRow>
						<InfoRow icon={<Trash className="w-5" />} border>
							clears all completed todos
						</InfoRow>
						<InfoRow icon={<Trash2 className="w-5" />} border>
							deletes all todos
						</InfoRow>
						<InfoRow>
							* the order gets reversed if the list is already sorted
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