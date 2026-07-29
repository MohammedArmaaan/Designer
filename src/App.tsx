import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Portfolio } from '@/components/sections/Portfolio';
import { Services } from '@/components/sections/Services';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonial } from '@/components/sections/Testimonial';
import { Archive } from '@/components/sections/Archive';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { Stats } from '@/components/sections/Stats';
import { Articles } from '@/components/sections/Articles';
import { Faq } from '@/components/sections/Faq';

function App() {
  return (
    <div className="min-h-screen bg-cream text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Pricing />
        <Testimonial />
        <Archive />
        <CtaBanner />
        <Stats />
        {/* <Articles /> */}
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

export default App;
