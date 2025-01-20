import styled, { ThemeProvider } from 'styled-components'
import {darkTheme} from './utils/Themes'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Event from './pages/Event'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from './pages/Login'
import EventDetailsPage from './pages/EventDetailPage'
import { ToastContainer } from 'react-toastify'
import Calender from './pages/Calender'
import BlogDetailsPage from './pages/BlogDetailPage'



function App() {

  return (
    <>
     <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path="/events" element={<Event />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/events/:id" element={<EventDetailsPage/>} />
          <Route path="/blog/:id" element={<BlogDetailsPage/>} />
          <Route path="/calender" element={<Calender/>} />
        </Routes>
      </BrowserRouter>
     </ThemeProvider>
    </>
  )
}

export default App
