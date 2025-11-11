import Footer from '@/components/footer'
import Header from '@/components/header'
import { Outlet } from 'react-router'

function AppLayout() {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default AppLayout