import AppHeader from "@/components/AppHeader";
import MapView from "@/components/MapView";
import BentoGrid from "@/components/BentoGrid";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-hero overflow-hidden">
      {/* App Header with Greeting and Search */}
      <AppHeader />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Map View - Primary Canvas */}
        <div className="flex-1 relative">
          <MapView />
        </div>
        
        {/* Bento Grid Categories */}
        <div className="flex-shrink-0 bg-background/95 backdrop-blur-md border-t border-border/50">
          <BentoGrid />
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
