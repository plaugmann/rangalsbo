import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TheHousePage from './pages/TheHousePage'
import ContactPage from './pages/ContactPage'
import ComingSoon from './pages/ComingSoon'

// v2: HashRouter with 7 secondary-page routes plus the homepage.
export default function App() {
  return (
    <HashRouter>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/house" element={<TheHousePage />} />
          <Route path="/photos" element={<ComingSoon title="Photos" />} />
          <Route path="/things-to-do" element={<ComingSoon title="Things To Do" />} />
          <Route path="/where-to-eat" element={<ComingSoon title="Where To Eat" />} />
          <Route path="/users-guide" element={<ComingSoon title={'User\u2019s Guide'} />} />
          <Route path="/faq" element={<ComingSoon title="FAQ" />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
