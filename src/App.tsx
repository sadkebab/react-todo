import Credits from './components/Credits';
import { TodoForm, TodoList } from './components/Todo';

const App = () => {
  
  return (
    <div className='antialiased w-full min-h-screen flex flex-col items-center bg-lime-100 p-2'>
      <div className='mt-10 w-full sm:w-[600px]'>
        <h1 className='text-2xl sm:text-3xl drop-shadow-sm'>yet another todo app...</h1>
        <Credits
          className='mt-4'
          iconSize={24}
          githubLink="https://github.com/sadkebab/react-todo"
          linkedinLink="https://www.linkedin.com/in/alberto-harka/" />
      </div>
      <div className='mt-4 w-full sm:w-[600px]'>
        <TodoForm className='mt-2' />
        <TodoList className='mt-2' />
      </div>
    </div>
  )
}

export default App
