import AppHeader from "@/components/AppHeader";
import HomeView from "@/components/HomeView";
import BentoGrid from "@/components/BentoGrid";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-hero">
      {/* App Header with Greeting and Search */}
      <AppHeader />
      
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col min-h-full">
          {/* Home View - Primary Canvas */}
          <div className="flex-shrink-0">
            <HomeView />
          </div>
          
          {/* Bento Grid Categories */}
          <div className="flex-shrink-0 bg-background/95 backdrop-blur-md border-t border-border/50">
            <BentoGrid />
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
