import { TrendingUp, Activity, Award, Calendar, Target, Flame, Footprints, Timer, Zap, Edit, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import WorkoutPopup from "./WorkoutPopup";

interface HomeViewProps {
  onNavigateToEnergyCalc?: () => void;
  onNavigateToNotes?: () => void;
}

interface DailyGoal {
  id: string;
  text: string;
  completed: boolean;
}

const HomeView = ({ onNavigateToEnergyCalc, onNavigateToNotes }: HomeViewProps) => {
  const [showWorkoutPopup, setShowWorkoutPopup] = useState(false);
  const [steps, setSteps] = useState(() => {
    const saved = localStorage.getItem('dailySteps');
    return saved ? parseInt(saved) : 2847;
  });
  const [moveMinutes, setMoveMinutes] = useState(() => {
    const saved = localStorage.getItem('dailyMoveMinutes');
    return saved ? parseInt(saved) : 12;
  });
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>(() => {
    const saved = localStorage.getItem('dailyGoals');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: '1', text: 'Drink 8 glasses of water', completed: false },
      { id: '2', text: 'Walk 10,000 steps', completed: false },
      { id: '3', text: 'Exercise for 30 minutes', completed: false }
    ];
  });

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
  }, [dailyGoals]);

  // Realistic step counting (not rapid movement)
  useEffect(() => {
    const stepInterval = setInterval(() => {
      const hour = new Date().getHours();
      // Only increment during active hours and not too rapidly
      if (hour >= 6 && hour <= 22 && Math.random() < 0.1) {
        const increment = Math.floor(Math.random() * 3) + 1;
        setSteps(prev => {
          const newSteps = Math.min(prev + increment, 15000);
          localStorage.setItem('dailySteps', newSteps.toString());
          return newSteps;
        });
      }
    }, 60000); // Update every minute

    const moveInterval = setInterval(() => {
      const hour = new Date().getHours();
      // Only increment during active hours
      if (hour >= 6 && hour <= 22 && Math.random() < 0.05) {
        setMoveMinutes(prev => {
          const newMinutes = Math.min(prev + 1, 60);
          localStorage.setItem('dailyMoveMinutes', newMinutes.toString());
          return newMinutes;
        });
      }
    }, 120000); // Update every 2 minutes

    return () => {
      clearInterval(stepInterval);
      clearInterval(moveInterval);
    };
  }, []);

  const toggleGoal = (goalId: string) => {
    setDailyGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const completedGoalsCount = dailyGoals.filter(goal => goal.completed).length;
  const weeklyProgress = Math.min(100, (completedGoalsCount / dailyGoals.length) * 100);

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Calories Circle - Smaller Size with Better Alignment */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-card border border-border/50 rounded-2xl p-4 shadow-lg hover:shadow-md transition-all duration-slow cursor-pointer group hover-highlight touch-highlight">
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Calories</h3>
              <button 
                onClick={onNavigateToEnergyCalc}
                className="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded-md hover:bg-green-500/20 transition-colors font-medium"
              >
                update
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Remaining = Goal - Food + Exercise</p>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            {/* Smaller Circular Progress with Better Text Alignment */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 28 28">
                <circle
                  cx="14"
                  cy="14"
                  r="11"
                  stroke="hsl(var(--border))"
                  strokeWidth="1.5"
                  fill="transparent"
                />
                <circle
                  cx="14"
                  cy="14"
                  r="11"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 11}`}
                  strokeDashoffset={`${2 * Math.PI * 11 * (1 - 0.72)}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-base font-bold text-foreground leading-tight">1,840</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <Target className="w-4 h-4 text-primary" />
              <div className="text-sm font-medium text-foreground">2,400</div>
              <div className="text-xs text-muted-foreground">Base Goal</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <div className="text-sm font-medium text-foreground">560</div>
              <div className="text-xs text-muted-foreground">Food</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap className="w-4 h-4 text-green-500" />
              <div className="text-sm font-medium text-foreground">0</div>
              <div className="text-xs text-muted-foreground">Exercise</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Rings */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-card border border-border/50 rounded-xl p-4 hover:shadow-md transition-all duration-normal cursor-pointer hover-highlight touch-highlight">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--border))" strokeWidth="4" fill="transparent" />
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--primary))" strokeWidth="4" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 18}`} strokeDashoffset={`${2 * Math.PI * 18 * (1 - (steps / 13000))}`}
                    strokeLinecap="round" />
                </svg>
                <Footprints className="absolute inset-0 m-auto w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{steps.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Steps • {Math.round((steps / 13000) * 100)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card border border-border/50 rounded-xl p-4 hover:shadow-md transition-all duration-normal cursor-pointer hover-highlight touch-highlight">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--border))" strokeWidth="4" fill="transparent" />
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--secondary))" strokeWidth="4" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 18}`} strokeDashoffset={`${2 * Math.PI * 18 * (1 - (moveMinutes / 60))}`}
                    strokeLinecap="round" />
                </svg>
                <Timer className="absolute inset-0 m-auto w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{moveMinutes}</div>
                <div className="text-xs text-muted-foreground">Move Min • {Math.round((moveMinutes / 60) * 100)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Goals with Functional Updates */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-card border border-border/50 rounded-xl p-4 hover:shadow-selected transition-all duration-slow cursor-pointer group hover-highlight touch-highlight">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Today's Goals</h3>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={onNavigateToNotes}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">{dayName}, {dateString}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-primary">{completedGoalsCount}/{dailyGoals.length}</span>
            <span className="text-sm text-muted-foreground">Achieved</span>
          </div>
          
          <div className="space-y-2 mb-4">
            {dailyGoals.map((goal) => (
              <div key={goal.id} className="flex items-center gap-3">
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-normal hover:scale-110 ${
                    goal.completed
                      ? 'border-success bg-success text-success-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {goal.completed && <Check className="w-3 h-3" />}
                </button>
                <span className={`text-sm ${goal.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {goal.text}
                </span>
              </div>
            ))}
          </div>
          
          {/* Weekly Progress Based on Daily Goals */}
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Weekly Progress</span>
              <span className="text-primary font-medium">{Math.round(weeklyProgress)}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-2" />
          </div>
          
          <div className="flex justify-between">
            {['S', 'S', 'M', 'T', 'W', 'T', 'F'].map((day, index) => {
              const isCompleted = index < Math.floor(weeklyProgress / 20); // Based on actual progress
              return (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium
                    ${isCompleted ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}>
                    {isCompleted ? '✓' : ''}
                  </div>
                  <span className="text-xs text-muted-foreground">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Special Features - Same Color Style */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            size="lg" 
            className="bg-gradient-primary text-primary-foreground h-14 shadow-selected hover:shadow-glow transition-all duration-slow hover:scale-110 active:scale-95"
            onClick={onNavigateToEnergyCalc}
          >
            <Plus className="w-5 h-5 mr-2" />
            Quick Log
          </Button>
          <Button
            size="lg"
            className="bg-gradient-primary text-primary-foreground h-14 shadow-selected hover:shadow-glow transition-all duration-slow hover:scale-110 active:scale-95"
            onClick={() => setShowWorkoutPopup(true)}
          >
            <Activity className="w-5 h-5 mr-2" />
            Start Workout
          </Button>
        </div>
      </div>

      {/* Workout Progress Popup */}
      {showWorkoutPopup && (
        <WorkoutPopup onClose={() => setShowWorkoutPopup(false)} />
      )}
    </div>
  );
};

export default HomeView;