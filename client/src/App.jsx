import SoilPulseCard from './components/bento/SoilPulseCard';
import FertilizerPredictor from './components/bento/FertilizerPredictor';
import { FieldStateProvider } from './context/FieldStateContext';

import TrendsCard from './components/bento/TrendsCard';
import DiseaseScanner from './components/bento/DiseaseScanner';

import SatelliteInsights from './components/bento/SatelliteCard';
import CropRotationGuide from './components/bento/RotationGuide';
import YojanaTicker from './components/bento/YojanaTicker';
import KisanGPT from './components/chat/KisanGPT';

/* Removed Placeholders */


function App() {
  return (
    <FieldStateProvider>
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1625246333195-bf433a52147f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center font-sans">
        {/* Overlay for readability - lighter to keep "airiness" but reduce blur cost */}
        <div className="min-h-screen bg-white/40 md:p-8 overflow-x-hidden">

          <header className="mb-8 flex justify-between items-center text-rural-green">
            <div>
              <h1 className="text-4xl font-bold tracking-tight drop-shadow-md">Krishi-Drishti</h1>
              <p className="text-lg opacity-90 font-light">Smart Farming Dashboard</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/30">
              <span className="text-sm font-medium">📍 Punjab, India</span>
            </div>
          </header>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)] max-w-7xl mx-auto pb-24">

            {/* Row 1 */}
            <div className="md:col-span-2 md:row-span-2">
              <SoilPulseCard />
            </div>
            <div className="md:col-span-2 md:row-span-1">
              <FertilizerPredictor />
            </div>
            <div className="md:col-span-1 md:row-span-1">
              <DiseaseScanner />
            </div>
            <div className="md:col-span-1 md:row-span-1">
              <SatelliteInsights />
            </div>

            {/* Row 2 */}
            <div className="md:col-span-3 md:row-span-1">
              <TrendsCard />
            </div>
            <div className="md:col-span-1 md:row-span-2">
              <YojanaTicker />
            </div>

            <div className="md:col-span-3 md:row-span-1">
              <CropRotationGuide />
            </div>

          </div>

          <KisanGPT />
        </div>
      </div>
    </FieldStateProvider>
  );
}

export default App;
