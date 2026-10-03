import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white grid-bg selection:bg-violet-600/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <AboutMe />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
