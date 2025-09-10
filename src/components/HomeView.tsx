import { TrendingUp, Activity, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeView = () => {
  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Hero Section */}
      <div className="relative p-6 pb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0%,transparent_70%)]" />
        
        <div className="relative space-y-4">
          {/* Welcome Message */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Your Fitness Journey</h1>
            <p className="text-muted-foreground">Track, plan, and achieve your health goals</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-card border border-border/50 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Today's Activity</p>
                  <p className="text-lg font-bold text-foreground">2.1k</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-card border border-border/50 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary-glow rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Weekly Goal</p>
                  <p className="text-lg font-bold text-foreground">78%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-gradient-primary text-primary-foreground shadow-selected hover:shadow-glow transition-all duration-slow hover:scale-105 active:scale-95"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Plan Today's Workout
            </Button>
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-card border border-border/50 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Recent Achievement</h3>
            <Award className="w-5 h-5 text-warning" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-foreground font-medium">5K Run Completed! 🎉</p>
            <p className="text-xs text-muted-foreground">Personal best time: 24:32</p>
            <div className="w-full bg-border/50 rounded-full h-2">
              <div className="bg-gradient-primary h-2 rounded-full w-3/4 animate-fade-in" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;