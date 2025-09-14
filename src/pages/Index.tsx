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
import UserProfileSetup from "@/components/UserProfileSetup";
import MentalHealthHub from "@/components/MentalHealthHub";
import FindFriendsCoaches from "@/components/FindFriendsCoaches";
import OthersSection from "@/components/OthersSection";
import PrivacyDashboard from "@/components/PrivacyDashboard";
import BiomechanicsAssessment from "@/components/BiomechanicsAssessment";
import SocialCompetitions from "@/components/SocialCompetitions";
import HabitTracker from "@/components/HabitTracker";
import PoseDetection from "@/components/PoseDetection";
import WearableSync from "@/components/WearableSync";
import SmartNutrition from "@/components/SmartNutrition";
import LocalExperiences from "@/components/LocalExperiences";
import AICoach from "@/components/AICoach";

const Index = () => {
  const [currentView, setCurrentView] = useState<string>("home");
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(["home"]);

  useEffect(() => {
    // Check if user profile exists and user hasn't completed setup
    const savedProfile = localStorage.getItem('userProfile');
    const hasCompletedSetup = localStorage.getItem('hasCompletedSetup');
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else if (!hasCompletedSetup) {
      setShowProfileSetup(true);
    }
  }, []);

  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      const eventToViewMap: Record<string, string> = {
        'navigate-to-workout-plan': 'workout-plan',
        'navigate-to-meal-plan': 'meal-plan',
        'open-search': 'search',
        'navigate-to-ai-coach': 'ai-coach',
        'navigate-to-pose-detection': 'pose-detection',
        'navigate-to-habits': 'habits',
        'navigate-to-mental-health': 'mental-health',
        'navigate-to-social': 'social',
        'navigate-to-local-experiences': 'local-experiences'
      };
      
      const viewName = eventToViewMap[event.type];
      if (viewName) {
        navigateToView(viewName);
      }
    };

    // Add event listeners for all navigation events
    const eventTypes = [
      'navigate-to-workout-plan', 'navigate-to-meal-plan', 'open-search',
      'navigate-to-ai-coach', 'navigate-to-pose-detection', 'navigate-to-habits',
      'navigate-to-mental-health', 'navigate-to-social', 'navigate-to-local-experiences'
    ];
    
    eventTypes.forEach(eventType => {
      window.addEventListener(eventType, handleNavigation as EventListener);
    });

    return () => {
      eventTypes.forEach(eventType => {
        window.removeEventListener(eventType, handleNavigation as EventListener);
      });
    };
  }, []);

  const navigateToView = (view: string) => {
    setNavigationHistory(prev => [...prev, view]);
    setCurrentView(view);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current view
      const previousView = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentView(previousView);
    } else {
      setCurrentView("home");
    }
  };

  const handleBottomNavigation = (section: string) => {
    switch (section) {
      case "home":
        setCurrentView("home");
        setNavigationHistory(["home"]);
        break;
      case "workouts":
        navigateToView("workout-plan");
        break;
      case "meals":
        navigateToView("meal-plan");
        break;
      case "mental-health":
        navigateToView("mental-health");
        break;
      case "others":
        navigateToView("others");
        break;
    }
  };

  const handleProfileComplete = (profile: any) => {
    setUserProfile(profile);
    localStorage.setItem('hasCompletedSetup', 'true');
    setShowProfileSetup(false);
  };

  const handleProfileSkip = () => {
    localStorage.setItem('hasCompletedSetup', 'true');
    setShowProfileSetup(false);
  };

  if (showProfileSetup) {
    return (
      <UserProfileSetup 
        onComplete={handleProfileComplete}
        onSkip={handleProfileSkip}
      />
    );
  }

  if (currentView === "workout-plan") {
    return <WorkoutPlan onBack={goBack} />;
  }

  if (currentView === "meal-plan") {
    return <MealPlan onBack={goBack} />;
  }

  if (currentView === "energy-calc") {
    return <EnergyCalculator onBack={goBack} />;
  }

  if (currentView === "profile") {
    return <PersonalProfile onBack={goBack} />;
  }

  if (currentView === "notepad") {
    return <NotePad onBack={goBack} />;
  }

  if (currentView === "analytics") {
    return <FitnessAnalytics onBack={goBack} />;
  }

  if (currentView === "mental-health") {
    return <MentalHealthHub onBack={goBack} />;
  }

  if (currentView === "find-friends") {
    return <FindFriendsCoaches onBack={goBack} />;
  }

  if (currentView === "others") {
    return (
      <OthersSection 
        onBack={goBack}
        onNavigateToPrivacy={() => navigateToView("privacy")}
        onNavigateToBiomechanics={() => navigateToView("biomechanics")}
        onNavigateToSocial={() => navigateToView("social")}
        onNavigateToHabits={() => navigateToView("habits")}
        onNavigateToPoseDetection={() => navigateToView("pose-detection")}
        onNavigateToWearableSync={() => navigateToView("wearable-sync")}
        onNavigateToSmartNutrition={() => navigateToView("smart-nutrition")}
        onNavigateToLocalExperiences={() => navigateToView("local-experiences")}
        onNavigateToAICoach={() => navigateToView("ai-coach")}
      />
    );
  }

  if (currentView === "privacy") {
    return <PrivacyDashboard onBack={goBack} />;
  }

  if (currentView === "biomechanics") {
    return <BiomechanicsAssessment onBack={goBack} />;
  }

  if (currentView === "social") {
    return <SocialCompetitions onBack={goBack} />;
  }

  if (currentView === "habits") {
    return <HabitTracker onBack={goBack} />;
  }

  if (currentView === "pose-detection") {
    return <PoseDetection onBack={goBack} />;
  }

  if (currentView === "wearable-sync") {
    return <WearableSync onBack={goBack} />;
  }

  if (currentView === "smart-nutrition") {
    return <SmartNutrition onBack={goBack} />;
  }

  if (currentView === "local-experiences") {
    return <LocalExperiences onBack={goBack} />;
  }

  if (currentView === "ai-coach") {
    return <AICoach onBack={goBack} />;
  }

  if (currentView === "search") {
    return (
      <SearchResults
        onBack={goBack}
        onNavigateToWorkoutPlan={() => navigateToView("workout-plan")}
        onNavigateToMealPlan={() => navigateToView("meal-plan")}
        onNavigateToEnergyCalc={() => navigateToView("energy-calc")}
        onNavigateToProfile={() => navigateToView("profile")}
        onNavigateToNotepad={() => navigateToView("notepad")}
        onNavigateToAnalytics={() => navigateToView("analytics")}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-hero">
      {/* App Header with Greeting and Search */}
      <AppHeader 
        userName={userProfile?.name} 
        onOpenProfile={() => navigateToView("profile")}
      />
      
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col min-h-full">
          {/* Home View - Primary Canvas */}
          <div className="flex-shrink-0">
            <HomeView 
              onNavigateToEnergyCalc={() => navigateToView("energy-calc")}
              onNavigateToNotes={() => navigateToView("notepad")}
            />
          </div>
          
          {/* Bento Grid Categories */}
          <div className="flex-shrink-0 bg-background/95 backdrop-blur-md border-t border-border/50">
            <BentoGrid 
              onNavigateToWorkoutPlan={() => navigateToView("workout-plan")}
              onNavigateToMealPlan={() => navigateToView("meal-plan")}
              onNavigateToEnergyCalc={() => navigateToView("energy-calc")}
              onNavigateToProfile={() => navigateToView("profile")}
              onNavigateToNotepad={() => navigateToView("notepad")}
              onNavigateToAnalytics={() => navigateToView("analytics")}
            />
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation onNavigate={handleBottomNavigation} />
    </div>
  );
};

export default Index;
