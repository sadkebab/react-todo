import { twMerge as t } from 'tailwind-merge'
import Credits from './components/Credits'
import { TodoForm } from './components/todo/TodoForm'
import { TodoList } from './components/todo/TodoList'
import autoAnimate from '@formkit/auto-animate'
import { useState } from 'react'

const App = () => {


  return (
    <div className='antialiased w-full min-h-screen flex flex-col items-center bg-slate-100 p-4'>
      <div className='lg:mt-10 w-full sm:w-[600px]'>
        <h1 className='sm:text-3xl'>yet another todo app...</h1>
        <Credits
          className='mt-2'
          iconSize={24}
          githubLink="https://github.com/sadkebab/react-todo"
          linkedinLink="https://www.linkedin.com/in/alberto-harka/" />
      </div>
      <div className='mt-4 w-full sm:w-[600px]'>
        <TodoForm />
        <TodoList className='mt-2' />
      </div>
      <div className='mt-3 w-full sm:w-[600px]'>
        <InfoBox>how to use</InfoBox>
      </div>
    </div>
  )
}

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
          className={t(!infoOpen && 'rounded-b-md', 'block p-2 bg-cyan-100 shadow-md rounded-t-md active:shadow-inner')}>
          <p>{infoOpen ? '🔼' : 'ℹ️'}</p>
        </button>
      </div>
      {infoOpen && <ul className='p-2 -mt-1 bg-cyan-100 shadow-md z-50 relative rounded-b-md rounded-tl-md'>
        <Info border>➕ and ⏎ key add a todo</Info>
        <Info border>🖱️ click on a todo to mark it as completed</Info>
        <Info border>➰ drag and drop to reorder</Info>
        <Info border>✖️ deletes a todo</Info>
        <Info border>🔎 filters todos by text and allows for exact match with double quotes </Info>
        <Info border>✔️ toggles completed todo visibility</Info>
        <Info border>🕣 sorts todo by order of insertion *</Info>
        <Info border>🔀 sorts todo by completition status *</Info>
        <Info border>🧹 clears all completed todos</Info>
        <Info border>🗑️ deletes all todos</Info>
        <Info>* the order gets reversed if the list is already sorted</Info>
      </ul>}
    </div>
  )
}

interface InfoProps {
  className?: string,
  children: string,
  border?: boolean
}

const Info: React.FC<InfoProps> = ({ children, className, border }) => {
  return (
    <li><p className={t(className, border && 'border-b border-cyan-500', 'text-sm py-1')}>{children}</p></li>
  )
}

export default App
