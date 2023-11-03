import { X } from "lucide-react"
import { ReactNode } from "react"

interface LigtboxProps {
  title: string
  children: ReactNode
  onClose: () => void
}
const Overlay: React.FC<LigtboxProps> = ({ title, children, onClose }) => {
  const stopBubble = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div
        className="rounded-md  shadow-lg p-4 px-2 pt-2 pb-1 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 text-slate-200"
        onClick={stopBubble}
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}><X className="w-6" /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Overlay