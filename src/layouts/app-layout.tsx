import { Outlet } from 'react-router'

function AppLayout() {
  return (
    <div className='grid-background'>
        <Outlet/>
    </div>
  )
}

export default AppLayout