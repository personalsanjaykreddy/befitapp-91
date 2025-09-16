import { Search, User } from "lucide-react";
import { getTimeBasedGreeting, getMotivationalMessage, getRandomMotivationalWish, getRandomWellnessQuote, getDisplayName, checkAndAskForNickname } from "@/utils/time";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppHeaderProps {
  userName?: string;
  onOpenProfile?: () => void;
}

const AppHeader = ({ userName, onOpenProfile }: AppHeaderProps) => {
  const greeting = getTimeBasedGreeting();
  const motivationalWish = getRandomMotivationalWish();
  const wellnessQuote = getRandomWellnessQuote();
  const displayName = userName ? getDisplayName(userName) : undefined;
  
  // Check if name is too long and ask for nickname
  if (userName && userName !== displayName) {
    checkAndAskForNickname(userName);
  }
  
  const userPhoto = localStorage.getItem('userPhoto');

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Profile - Left Side */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenProfile}
            className="hover:scale-110 transition-transform duration-normal"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={userPhoto || ""} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground animate-pulse">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
          
          {/* Greeting and Motivational Content */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {greeting}{displayName ? `, ${displayName}` : ''}!
            </span>
            <span className="text-xs text-primary font-medium animate-fade-in">
              {motivationalWish}
            </span>
            <span className="text-xs text-muted-foreground">
              {wellnessQuote}
            </span>
          </div>
        </div>

        {/* StartFit Logo - Center */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 hover:scale-110 hover:shadow-glow transition-all duration-normal cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              StartFit
            </span>
          </div>
        </div>

        {/* Search - Right Side */}
        <div className="relative w-32 sm:w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 h-9 bg-card/50 border-border/50 rounded-lg text-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-normal"
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