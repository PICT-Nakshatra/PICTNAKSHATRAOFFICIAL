import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Event from "./pages/Event";
import Contacts from "./pages/Contacts";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import EventDetailsPage from "./pages/EventDetailPage";
import { ToastContainer } from "react-toastify";
import Calender from "./pages/Calender";
import BlogDetailsPage from "./pages/BlogDetailPage";
import AuthCallback from "./pages/AuthCallback";
import Gallery from "./pages/Gallery";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import SmoothScroll from "./SmoothScroll";

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AuthProvider>
          <SmoothScroll>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route
                  path="/events"
                  element={
                    <ProtectedRoute>
                      <Event />
                    </ProtectedRoute>
                  }
                />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route
                  path="/blog"
                  element={
                    <ProtectedRoute>
                      <Blog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/events/:id"
                  element={
                    <ProtectedRoute>
                      <EventDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog/:id"
                  element={
                    <ProtectedRoute>
                      <BlogDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/calender"
                  element={
                    <ProtectedRoute>
                      <Calender />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </SmoothScroll>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
