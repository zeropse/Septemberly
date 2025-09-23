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
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <IconLeaf2 className="h-8 w-8" aria-hidden="true" />
          <h1 className="text-3xl font-bold">Septemberly</h1>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer"
                aria-label="Settings"
              >
                <IconSettings className="h-7 w-7" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
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
                className="p-0 rounded-full cursor-pointer"
                aria-label="Profile"
              >
                <Avatar className="size-9" variant="pixel">
                  <AvatarImage src="/Profile-Avatar.jpg" alt="ProfileAvatar" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Profile</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                View and edit your profile information.
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
