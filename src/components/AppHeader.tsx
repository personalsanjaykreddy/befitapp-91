import { Search } from "lucide-react";
import { getTimeBasedGreeting, getMotivationalMessage } from "@/utils/time";
import { Input } from "@/components/ui/input";
import AppIcon from "/lovable-uploads/0739df50-386f-415c-8067-a0ba00776be0.png";

interface AppHeaderProps {
  userName?: string;
}

const AppHeader = ({ userName }: AppHeaderProps) => {
  const greeting = getTimeBasedGreeting();
  const message = getMotivationalMessage();

  return (
    <header className="relative z-50 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* App Icon and Greeting */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md bg-gradient-primary p-1 hover:scale-110 transition-transform duration-normal">
            <img 
              src={AppIcon} 
              alt="FitnessMap" 
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {greeting}{userName ? `, ${userName}` : ''}!
            </span>
            <span className="text-xs text-muted-foreground">
              {message}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search workouts, meals, analytics..."
            className="pl-10 h-9 bg-card/50 border-border/50 rounded-lg text-sm cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-normal"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-search'));
            }}
            readOnly
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;