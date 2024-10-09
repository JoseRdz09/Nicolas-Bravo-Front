import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Layout() {
  return (
    <div>
        <Navbar />

        <div className='pt-24 w-full'>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}
