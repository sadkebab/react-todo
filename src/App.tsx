import { Tooltip } from 'react-tooltip'
import Credits from './components/Credits'
import InfoBox from './components/InfoBox'
import TodoForm from './components/todo/TodoForm'
import TodoList from './components/todo/TodoList'
const App = () => {


  return (
    <div className='antialiased w-full min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-800 to-red-950 text-slate-100 p-4'>
      <div className='lg:mt-10 w-full sm:w-[600px]'>
        <h1 className='text-xl sm:text-2xl lg:text-3xl'>yet another todo app...</h1>
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
      {/* <div className='mt-3 w-full sm:w-[600px] slate'>
        <InfoBox>how to use</InfoBox>
      </div> */}
      <Tooltip id='tooltip' style={{
        backgroundColor: 'rgb(30 41 59)',
        borderRadius: '4px',
        boxShadow: '0 0 1px 1px rgba(32, 32, 32, 0.3)',
      }} />
    </div>
  )
}

export default App
