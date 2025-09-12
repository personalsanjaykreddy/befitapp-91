import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import HomeView from "@/components/HomeView";
import BentoGrid from "@/components/BentoGrid";
import BottomNavigation from "@/components/BottomNavigation";
import WorkoutPlan from "@/components/WorkoutPlan";
import MealPlan from "@/components/MealPlan";
import EnergyCalculator from "@/components/EnergyCalculator";
import PersonalProfile from "@/components/PersonalProfile";
import NotePad from "@/components/NotePad";
import FitnessAnalytics from "@/components/FitnessAnalytics";
import SearchResults from "@/components/SearchResults";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "workout-plan" | "meal-plan" | "energy-calc" | "profile" | "notepad" | "analytics" | "search">("home");

  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      switch (event.type) {
        case 'navigate-to-workout-plan':
          setCurrentView('workout-plan');
          break;
        case 'navigate-to-meal-plan':
          setCurrentView('meal-plan');
          break;
        case 'open-search':
          setCurrentView('search');
          break;
      }
    };

    window.addEventListener('navigate-to-workout-plan', handleNavigation as EventListener);
    window.addEventListener('navigate-to-meal-plan', handleNavigation as EventListener);
    window.addEventListener('open-search', handleNavigation as EventListener);

    return () => {
      window.removeEventListener('navigate-to-workout-plan', handleNavigation as EventListener);
      window.removeEventListener('navigate-to-meal-plan', handleNavigation as EventListener);
      window.removeEventListener('open-search', handleNavigation as EventListener);
    };
  }, []);

  if (currentView === "workout-plan") {
    return <WorkoutPlan onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "meal-plan") {
    return <MealPlan onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "energy-calc") {
    return <EnergyCalculator onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "profile") {
    return <PersonalProfile onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "notepad") {
    return <NotePad onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "analytics") {
    return <FitnessAnalytics onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "search") {
    return (
      <SearchResults
        onBack={() => setCurrentView("home")}
        onNavigateToWorkoutPlan={() => setCurrentView("workout-plan")}
        onNavigateToMealPlan={() => setCurrentView("meal-plan")}
        onNavigateToEnergyCalc={() => setCurrentView("energy-calc")}
        onNavigateToProfile={() => setCurrentView("profile")}
        onNavigateToNotepad={() => setCurrentView("notepad")}
        onNavigateToAnalytics={() => setCurrentView("analytics")}
      />
    );
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
            onNavigateToWorkoutPlan={() => setCurrentView("workout-plan")}
            onNavigateToMealPlan={() => setCurrentView("meal-plan")}
            onNavigateToEnergyCalc={() => setCurrentView("energy-calc")}
            onNavigateToProfile={() => setCurrentView("profile")}
            onNavigateToNotepad={() => setCurrentView("notepad")}
            onNavigateToAnalytics={() => setCurrentView("analytics")}
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
