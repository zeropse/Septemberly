import { ModeToggle } from "@/style/mode-toggle";
import { Button } from "@/components/ui/8bit/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/8bit/dialog";
import Settings from "@/components/widgets/Settings";
import ProfileCard from "@/components/widgets/Profile";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/8bit/avatar";
import { useProfileName } from "@/stores/appStore";
import { IconLeaf2, IconSettings } from "@tabler/icons-react";

const Header = () => {
  const profileName = useProfileName();

  const initials = (() => {
    if (!profileName) return "?";
    const parts = profileName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  })();

  return (
    <>
      <header className="flex items-center justify-between mb-4 md:mb-6 px-2 sm:px-4 md:px-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <IconLeaf2
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            aria-hidden="true"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">
            Septemberly
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <ModeToggle />

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                aria-label="Settings"
              >
                <IconSettings className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md mx-4 sm:mx-0">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Configure theme and reset application data.
              </DialogDescription>
              <Settings />
              <DialogClose />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 rounded-full cursor-pointer h-8 w-8 sm:h-9 sm:w-9"
                aria-label="Profile"
              >
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9" variant="pixel">
                  <AvatarImage src="/Profile-Avatar.jpg" alt="ProfileAvatar" />
                  <AvatarFallback className="text-xs sm:text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg mx-4 sm:mx-0">
              <DialogHeader>
                <DialogTitle>Profile</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                View your profile information and stats.
              </DialogDescription>
              <ProfileCard />
              <DialogClose />
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </>
  );
};

export default Header;
