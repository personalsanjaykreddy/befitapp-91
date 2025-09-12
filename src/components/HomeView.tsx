import { TrendingUp, Activity, Award, Calendar, Target, Flame, Footprints, Timer, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const HomeView = () => {
  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Today Section Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Today</h1>
            <p className="text-sm text-muted-foreground">Keep pushing towards your goals</p>
          </div>
          <Button size="sm" variant="outline" className="gap-2">
            <Crown className="w-4 h-4" />
            Go Premium
          </Button>
        </div>
      </div>

      {/* Calories Circle - Main Focus */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-card border border-border/50 rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Calories</h3>
            <p className="text-xs text-muted-foreground">Remaining = Goal - Food + Exercise</p>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            {/* Large Circular Progress */}
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 144 144">
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="hsl(var(--border))"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - 0.72)}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">1,840</div>
                  <div className="text-sm text-muted-foreground">Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <Target className="w-5 h-5 text-primary" />
              <div className="text-sm font-medium text-foreground">2,400</div>
              <div className="text-xs text-muted-foreground">Base Goal</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Flame className="w-5 h-5 text-orange-500" />
              <div className="text-sm font-medium text-foreground">560</div>
              <div className="text-xs text-muted-foreground">Food</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap className="w-5 h-5 text-green-500" />
              <div className="text-sm font-medium text-foreground">0</div>
              <div className="text-xs text-muted-foreground">Exercise</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Rings */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-card border border-border/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--border))" strokeWidth="4" fill="transparent" />
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--primary))" strokeWidth="4" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 18}`} strokeDashoffset={`${2 * Math.PI * 18 * (1 - 0.65)}`}
                    strokeLinecap="round" />
                </svg>
                <Footprints className="absolute inset-0 m-auto w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">8,432</div>
                <div className="text-xs text-muted-foreground">Steps • 65%</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card border border-border/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--border))" strokeWidth="4" fill="transparent" />
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--secondary))" strokeWidth="4" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 18}`} strokeDashoffset={`${2 * Math.PI * 18 * (1 - 0.42)}`}
                    strokeLinecap="round" />
                </svg>
                <Timer className="absolute inset-0 m-auto w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">25</div>
                <div className="text-xs text-muted-foreground">Move Min • 42%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Your Daily Goals</h3>
            <span className="text-sm text-muted-foreground">Last 7 days</span>
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

      {/* Quick Actions */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            size="lg" 
            className="bg-gradient-primary text-primary-foreground h-14 shadow-selected hover:shadow-glow transition-all duration-slow hover:scale-105"
          >
            <Flame className="w-5 h-5 mr-2" />
            Log Food
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 border-primary/20 hover:bg-primary/5"
          >
            <Activity className="w-5 h-5 mr-2" />
            Add Exercise
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;