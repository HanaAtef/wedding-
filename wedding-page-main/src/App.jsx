import DateSection from './components/DateSection';
import Herosection from './components/Herosection';
import InvitationSection from './components/InvitationSection';
import Location from './components/Location';
import WelcomeSection from './components/WelcomeSection';
import LittleOnes from './components/LittleOnes';
import Countdown from './components/Countdown';

function App() {
  return (
    <section className="relative overflow-hidden">
      <WelcomeSection />
      <Herosection />

      <DateSection date="2026-09-17" />
      <InvitationSection />
      <LittleOnes />
      <Location />
      <Countdown />
    </section>
  );
}

export default App;
