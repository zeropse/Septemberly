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
import { Settings as SettingsIcon } from "lucide-react";
import ProfileCard from "@/components/widgets/Profile";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/8bit/avatar";
import { useProfileName } from "@/stores/appStore";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-leaf-2"
            aria-hidden="true"
            focusable="false"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
            <path d="M7.5 15q -3.5 0 -4.5 -6a8.4 8.4 0 0 1 3.438 .402a12 12 0 0 1 -.052 -.793c0 -3.606 3.204 -5.609 3.204 -5.609s2.003 1.252 2.842 3.557q 2.568 -1.557 6.568 -1.557q .396 3.775 -1.557 6.568c2.305 .839 3.557 2.842 3.557 2.842s-3 2.59 -7 2.59c0 1 0 1 .5 3q -6 0 -7 -5" />
          </svg>
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
                <SettingsIcon className="h-5 w-5" />
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
