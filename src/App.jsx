import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import PhotoGrid from './components/PhotoGrid'
import Footer from './components/Footer'

// v1: homepage only — no routing yet.
export default function App() {
  return (
    <>
      <Header />
      <main className="page">
        <Hero />
        <Intro />
        <PhotoGrid />
      </main>
      <Footer />
    </>
  )
}
