import { TrendingUp, Activity, Award, Calendar, Target, Flame, Footprints, Timer, Zap, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getRandomMotivationalWish, getRandomWellnessQuote } from "@/utils/time";

interface HomeViewProps {
  onNavigateToEnergyCalc?: () => void;
  onNavigateToNotes?: () => void;
}

const HomeView = ({ onNavigateToEnergyCalc, onNavigateToNotes }: HomeViewProps) => {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Get random motivational content
  const motivationalWish = getRandomMotivationalWish();
  const wellnessQuote = getRandomWellnessQuote();

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Time to Stay Active Section */}
      <div className="px-6 pt-4 pb-2">
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-primary animate-fade-in">
            {motivationalWish}
          </p>
          <p className="text-xs text-muted-foreground italic">
            "{wellnessQuote}"
          </p>
        </div>
      </div>

      {/* Calories Circle - Smaller Size */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-card border border-border/50 rounded-2xl p-4 shadow-lg hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group">
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">Calories</h3>
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
            {/* Smaller Circular Progress */}
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 112 112">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="hsl(var(--border))"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 48}`}
                  strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.72)}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">1,840</div>
                  <div className="text-xs text-muted-foreground">Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 text-center">
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
          <div className="bg-gradient-card border border-border/50 rounded-xl p-4 hover:shadow-md hover:scale-[1.02] transition-all duration-normal cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="15" stroke="hsl(var(--border))" strokeWidth="3" fill="transparent" />
                  <circle cx="20" cy="20" r="15" stroke="hsl(var(--primary))" strokeWidth="3" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 15}`} strokeDashoffset={`${2 * Math.PI * 15 * (1 - 0.65)}`}
                    strokeLinecap="round" />
                </svg>
                <Footprints className="absolute inset-0 m-auto w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-base font-bold text-foreground">8,432</div>
                <div className="text-xs text-muted-foreground">Steps • 65%</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card border border-border/50 rounded-xl p-4 hover:shadow-md hover:scale-[1.02] transition-all duration-normal cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="15" stroke="hsl(var(--border))" strokeWidth="3" fill="transparent" />
                  <circle cx="20" cy="20" r="15" stroke="hsl(var(--secondary))" strokeWidth="3" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 15}`} strokeDashoffset={`${2 * Math.PI * 15 * (1 - 0.42)}`}
                    strokeLinecap="round" />
                </svg>
                <Timer className="absolute inset-0 m-auto w-4 h-4 text-secondary" />
              </div>
              <div>
                <div className="text-base font-bold text-foreground">25</div>
                <div className="text-xs text-muted-foreground">Move Min • 42%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Goals with Update Feature */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-card border border-border/50 rounded-xl p-4 hover:shadow-selected hover:scale-[1.02] transition-all duration-slow cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Daily Goals</h3>
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
            <span className="text-2xl font-bold text-primary">4/7</span>
            <span className="text-sm text-muted-foreground">Achieved</span>
          </div>
          
          <div className="flex justify-between">
            {['S', 'S', 'M', 'T', 'W', 'T', 'F'].map((day, index) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium
                  ${index < 4 ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}>
                  {index < 4 ? '✓' : ''}
                </div>
                <span className="text-xs text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Features */}
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
            variant="outline"
            className="h-14 border-primary/20 hover:bg-primary/5 hover:scale-110 active:scale-95 transition-all duration-slow"
            onClick={() => {
              // Navigate to workout plan for exercise
              window.dispatchEvent(new CustomEvent('navigate-to-workout-plan'));
            }}
          >
            <Activity className="w-5 h-5 mr-2" />
            Start Workout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;