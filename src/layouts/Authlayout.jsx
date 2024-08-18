import { Outlet } from 'react-router-dom'

export default function Authlayouts() {
  return (
    <main className='max-w-4xl m-auto mt-10 md:mt-20 flex flex-col md:flex-row items-center'>
        {/* <img
            src='../img/logo.svg'
            alt='imagen logotipo'
            className="max-w-xs"
        /> */}

        <div className='w-full'>
            <Outlet />
        </div>
        
    </main>
  )
}
