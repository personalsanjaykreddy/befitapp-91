import { useState } from "react";
import { 
  Home, 
  Dumbbell, 
  Utensils, 
  StickyNote
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  onSelect?: (id: string) => void;
}

const NavItem = ({ id, label, icon: Icon, isActive, onSelect }: NavItemProps) => {
  return (
    <button
      onClick={() => onSelect?.(id)}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-normal min-w-0 flex-1",
        "hover:bg-accent/50 active:scale-95",
        isActive && [
          "bg-gradient-selected text-primary",
          "shadow-sm"
        ]
      )}
    >
      <div className={cn(
        "relative mb-1 transition-all duration-normal",
        isActive && "animate-bounce-gentle"
      )}>
        <Icon className={cn(
          "w-5 h-5 transition-colors duration-normal",
          isActive ? "text-primary" : "text-muted-foreground"
        )} />
        {isActive && (
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-glow-pulse" />
        )}
      </div>
      <span className={cn(
        "text-xs font-medium transition-colors duration-normal",
        isActive ? "text-primary" : "text-muted-foreground"
      )}>
        {label}
      </span>
    </button>
  );
};

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home
    },
    {
      id: "workouts",
      label: "Workouts",
      icon: Dumbbell
    },
    {
      id: "meals",
      label: "Meals",
      icon: Utensils
    },
    {
      id: "notes",
      label: "Notes",
      icon: StickyNote
    }
  ];

  return (
    <nav className="relative bg-background/95 backdrop-blur-md border-t border-border/50 px-2 py-2 animate-slide-up">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-background/80" />
      
      {/* Navigation Items */}
      <div className="relative flex items-center justify-between gap-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={activeTab === item.id}
            onSelect={setActiveTab}
          />
        ))}
      </div>
      
      {/* Active Tab Indicator */}
      <div className={cn(
        "absolute bottom-0 left-0 h-0.5 bg-gradient-primary transition-all duration-slow rounded-full",
        activeTab === "home" && "w-1/4 transform translate-x-0",
        activeTab === "workouts" && "w-1/4 transform translate-x-full",
        activeTab === "meals" && "w-1/4 transform translate-x-[200%]",
        activeTab === "notes" && "w-1/4 transform translate-x-[300%]"
      )} />
    </nav>
  );
};

export default BottomNavigation;