import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import HomeView from "@/components/HomeView";
import BentoGrid from "@/components/BentoGrid";
import BottomNavigation from "@/components/BottomNavigation";
import WorkoutPlan from "@/components/WorkoutPlan";
import MealPlan from "@/components/MealPlan";
import EnergyCalculator from "@/components/EnergyCalculator";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "workout-plan" | "meal-plan" | "energy-calc">("home");

  const handleNavigateToWorkoutPlan = () => {
    setCurrentView("workout-plan");
  };

  const handleNavigateToMealPlan = () => {
    setCurrentView("meal-plan");
  };

  const handleNavigateToEnergyCalc = () => {
    setCurrentView("energy-calc");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  if (currentView === "workout-plan") {
    return <WorkoutPlan onBack={handleBackToHome} />;
  }

  if (currentView === "meal-plan") {
    return <MealPlan onBack={handleBackToHome} />;
  }

  if (currentView === "energy-calc") {
    return <EnergyCalculator onBack={handleBackToHome} />;
  }

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
            <BentoGrid 
              onNavigateToWorkoutPlan={handleNavigateToWorkoutPlan}
              onNavigateToMealPlan={handleNavigateToMealPlan}
              onNavigateToEnergyCalc={handleNavigateToEnergyCalc}
            />
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
