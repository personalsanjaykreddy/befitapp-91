import { useState, useEffect } from "react";
import { Search, X, Clock, Utensils, Activity, Calculator, User, NotebookPen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
  action: () => void;
}

interface SearchResultsProps {
  onBack: () => void;
  onNavigateToWorkoutPlan: () => void;
  onNavigateToMealPlan: () => void;
  onNavigateToEnergyCalc: () => void;
  onNavigateToProfile: () => void;
  onNavigateToNotepad: () => void;
  onNavigateToAnalytics: () => void;
}

const SearchResults = ({ 
  onBack, 
  onNavigateToWorkoutPlan, 
  onNavigateToMealPlan, 
  onNavigateToEnergyCalc,
  onNavigateToProfile,
  onNavigateToNotepad,
  onNavigateToAnalytics
}: SearchResultsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // All searchable content in the app
  const allResults: SearchResult[] = [
    {
      id: "workout-plan",
      title: "Workout Plan",
      description: "Create personalized workout routines",
      category: "Fitness",
      icon: Activity,
      action: onNavigateToWorkoutPlan
    },
    {
      id: "meal-plan", 
      title: "Meal Plans",
      description: "Discover healthy recipes and nutrition",
      category: "Nutrition",
      icon: Utensils,
      action: onNavigateToMealPlan
    },
    {
      id: "energy-calc",
      title: "Energy Calculator", 
      description: "Calculate calories and nutrition",
      category: "Analytics",
      icon: Calculator,
      action: onNavigateToEnergyCalc
    },
    {
      id: "profile",
      title: "Personal Profile",
      description: "Manage your personal details",
      category: "Profile",
      icon: User,
      action: onNavigateToProfile
    },
    {
      id: "notepad",
      title: "Notes & To-Do",
      description: "Keep track of tasks and notes",
      category: "Productivity",
      icon: NotebookPen,
      action: onNavigateToNotepad
    },
    {
      id: "analytics",
      title: "Fitness Analytics",
      description: "View your health metrics",
      category: "Analytics", 
      icon: TrendingUp,
      action: onNavigateToAnalytics
    },
    // Exercise types
    {
      id: "strength-training",
      title: "Strength Training",
      description: "Build muscle with resistance exercises",
      category: "Exercise",
      icon: Activity,
      action: onNavigateToWorkoutPlan
    },
    {
      id: "cardio",
      title: "Cardio Workouts", 
      description: "Improve cardiovascular health",
      category: "Exercise",
      icon: Activity,
      action: onNavigateToWorkoutPlan
    },
    {
      id: "yoga",
      title: "Yoga & Flexibility",
      description: "Improve flexibility and mindfulness",
      category: "Exercise",
      icon: Activity,
      action: onNavigateToWorkoutPlan
    },
    // Nutrition content
    {
      id: "pre-workout-meal",
      title: "Pre-workout Meals",
      description: "Fuel your workouts properly",
      category: "Nutrition",
      icon: Utensils,
      action: onNavigateToMealPlan
    },
    {
      id: "post-workout-meal",
      title: "Post-workout Recovery",
      description: "Optimize recovery with nutrition",
      category: "Nutrition", 
      icon: Utensils,
      action: onNavigateToMealPlan
    },
    {
      id: "protein",
      title: "High Protein Foods",
      description: "Build muscle with protein-rich meals",
      category: "Nutrition",
      icon: Utensils,
      action: onNavigateToMealPlan
    },
    // Analytics terms
    {
      id: "calories",
      title: "Calorie Tracking",
      description: "Monitor your daily calorie intake",
      category: "Analytics",
      icon: Calculator,
      action: onNavigateToEnergyCalc
    },
    {
      id: "steps",
      title: "Step Counter",
      description: "Track your daily steps",
      category: "Analytics",
      icon: TrendingUp,
      action: onNavigateToAnalytics
    },
    {
      id: "bmi",
      title: "BMI Calculator",
      description: "Calculate your body mass index",
      category: "Analytics",
      icon: Calculator,
      action: onNavigateToProfile
    }
  ];

  useEffect(() => {
    // Load recent searches
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allResults.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );

    setFilteredResults(results);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query)) {
      const updated = [query, ...recentSearches.slice(0, 4)]; // Keep last 5
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const handleResultClick = (result: SearchResult) => {
    handleSearch(result.title);
    result.action();
  };

  const categories = [...new Set(filteredResults.map(r => r.category))];

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <Button onClick={onBack} variant="outline" size="sm">
            <X className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Search</h1>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search workouts, meals, analytics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-card/50 border-border/50 rounded-lg"
            autoFocus
          />
        </div>

        {/* Recent Searches */}
        {searchQuery === "" && recentSearches.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Searches
            </h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="w-full text-left p-3 rounded-lg bg-card/50 border border-border/50 hover:bg-card transition-colors"
                >
                  <span className="text-sm text-foreground">{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery !== "" && (
          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-foreground font-medium">No results found</p>
                <p className="text-sm text-muted-foreground">Try searching for workouts, meals, or analytics</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
                </p>
                
                {categories.map(category => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-foreground mb-2 px-2">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {filteredResults
                        .filter(result => result.category === category)
                        .map(result => (
                          <Card
                            key={result.id}
                            className="p-4 bg-gradient-card border border-border/50 cursor-pointer hover:shadow-md transition-all hover:scale-[1.01]"
                            onClick={() => handleResultClick(result)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <result.icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground">{result.title}</h4>
                                <p className="text-sm text-muted-foreground">{result.description}</p>
                              </div>
                            </div>
                          </Card>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;