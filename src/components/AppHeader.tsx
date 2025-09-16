import { Search, User, Camera } from "lucide-react";
import { getTimeBasedGreeting, getMotivationalMessage, getChangingGreetingLine, getDisplayName, checkAndAskForNickname } from "@/utils/time";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppIcon from "/lovable-uploads/0739df50-386f-415c-8067-a0ba00776be0.png";

interface AppHeaderProps {
  userName?: string;
  onOpenProfile?: () => void;
}

const AppHeader = ({ userName, onOpenProfile }: AppHeaderProps) => {
  const greeting = getTimeBasedGreeting();
  const message = getMotivationalMessage();
  const changingLine = getChangingGreetingLine();
  const displayName = userName ? getDisplayName(userName) : undefined;
  
  // Check if name is too long and ask for nickname
  if (userName && userName !== displayName) {
    checkAndAskForNickname(userName);
  }
  
  const userPhoto = localStorage.getItem('userPhoto');

  return (
    <header className="relative z-50 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Greeting and Profile */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-primary font-medium animate-fade-in">
              {changingLine}
            </span>
            <span className="text-sm font-medium text-foreground">
              {greeting}{displayName ? `, ${displayName}` : ''}!
            </span>
            <span className="text-xs text-muted-foreground">
              {message}
            </span>
          </div>
        </div>

        {/* App Icon - Centered */}
        <div className="flex-1 flex justify-center">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-gradient-primary p-1.5 hover:scale-110 hover:shadow-glow transition-all duration-normal cursor-pointer">
            <img 
              src={AppIcon} 
              alt="StartFit" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Profile and Search */}
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
          
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search features..."
              className="pl-10 h-9 bg-card/50 border-border/50 rounded-lg text-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-normal"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-search'));
              }}
              readOnly
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;