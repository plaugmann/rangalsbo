import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TheHousePage from './pages/TheHousePage'
import PhotosPage from './pages/PhotosPage'
import ThingsToDoPage from './pages/ThingsToDoPage'
import WhereToEatPage from './pages/WhereToEatPage'
import UsersGuidePage from './pages/UsersGuidePage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'

// v2: HashRouter with 7 secondary-page routes plus the homepage.
export default function App() {
  return (
    <HashRouter>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/house" element={<TheHousePage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/things-to-do" element={<ThingsToDoPage />} />
          <Route path="/where-to-eat" element={<WhereToEatPage />} />
          <Route path="/users-guide" element={<UsersGuidePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
