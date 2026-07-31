import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Pages
import Home from '@/pages/Home'; // Move your landing page sections here
import About from '@/pages/About'; // Your newly created About page
import PortfolioPage from '@/pages/Portfolio'; // Create this later
import ContactPage from '@/pages/Contact'; // Create this later

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream text-ink antialiased">
        <Navbar />
        
        <main>
          <Routes>
            {/* 01. Home Page */}
            <Route path="/" element={<Home />} />
            
            {/* 02. About Page */}
            <Route path="/about" element={<About />} />
            
            {/* 03. Portfolio Page (Uncomment when created) */}
            <Route path="/portfolio" element={<PortfolioPage />} />
            
            {/* 04. Contact Page (Uncomment when created) */}
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;