import { useState } from "react";
import { 
  Dumbbell, 
  Utensils, 
  Users, 
  Route, 
  Trophy, 
  User,
  Play,
  Clock,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  stats?: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const BentoCard = ({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  stats, 
  isSelected, 
  onSelect 
}: BentoCardProps) => {
  return (
    <div
      onClick={() => onSelect?.(id)}
      className={cn(
        "relative group cursor-pointer rounded-lg p-4 transition-all duration-slow",
        "bg-gradient-card border border-border/50 shadow-sm hover:shadow-md",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        isSelected && [
          "scale-[1.05] shadow-selected bg-gradient-selected",
          "border-primary/30 animate-scale-selected"
        ]
      )}
    >
      {/* Background Glow Effect */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-5 animate-glow-pulse" />
      )}
      
      {/* Icon Container */}
      <div className={cn(
        "w-10 h-10 rounded-lg mb-3 flex items-center justify-center transition-all duration-normal",
        gradient,
        "group-hover:scale-110",
        isSelected && "scale-110 animate-bounce-gentle"
      )}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      
      {/* Content */}
      <div className="space-y-1">
        <h3 className={cn(
          "font-semibold text-sm text-card-foreground transition-colors duration-normal",
          isSelected && "text-primary"
        )}>
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
        {stats && (
          <p className={cn(
            "text-xs font-medium mt-2 transition-colors duration-normal",
            isSelected ? "text-secondary" : "text-primary"
          )}>
            {stats}
          </p>
        )}
      </div>
      
      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background animate-scale-in" />
      )}
    </div>
  );
};

const BentoGrid = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      id: "workouts",
      title: "Outdoor Run",
      description: "Track your runs with GPS and real-time metrics",
      icon: Dumbbell,
      gradient: "bg-gradient-to-br from-primary to-primary-glow",
      stats: "3.2k runs this week"
    },
    {
      id: "cycling",
      title: "Cycling",
      description: "Explore bike routes and track your rides",
      icon: Route,
      gradient: "bg-gradient-to-br from-secondary to-secondary-glow",
      stats: "12 routes explored"
    },
    {
      id: "meals",
      title: "Meal Plans",
      description: "Discover healthy recipes and nutrition tracking",
      icon: Utensils,
      gradient: "bg-gradient-to-br from-success to-emerald-400",
      stats: "28 recipes saved"
    },
    {
      id: "community",
      title: "Community",
      description: "Connect with local fitness enthusiasts",
      icon: Users,
      gradient: "bg-gradient-to-br from-warning to-orange-400",
      stats: "156 members nearby"
    },
    {
      id: "challenges",
      title: "Challenges",
      description: "Join weekly fitness challenges and compete",
      icon: Trophy,
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      stats: "5 active challenges"
    },
    {
      id: "profile",
      title: "Profile",
      description: "View your progress and achievements",
      icon: User,
      gradient: "bg-gradient-to-br from-pink-500 to-pink-600",
      stats: "Level 12 Athlete"
    }
  ];

  return (
    <div className="p-4 pb-2">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">Choose your fitness activity</p>
      </div>
      
      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-3 animate-fade-in">
        {cards.map((card) => (
          <BentoCard
            key={card.id}
            {...card}
            isSelected={selectedCard === card.id}
            onSelect={setSelectedCard}
          />
        ))}
      </div>
      
      {/* Quick Stats Bar */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-card border border-border/50">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-primary">
            <Play className="w-3 h-3" />
            <span className="font-medium">2.3k</span>
            <span className="text-muted-foreground">activities</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <Clock className="w-3 h-3" />
            <span className="font-medium">147h</span>
            <span className="text-muted-foreground">this month</span>
          </div>
          <div className="flex items-center gap-1 text-success">
            <Target className="w-3 h-3" />
            <span className="font-medium">89%</span>
            <span className="text-muted-foreground">goal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;