import { ModeToggle } from "@/style/mode-toggle";
import { Button } from "@/components/ui/8bit/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import ProfileCard from "@/components/widgets/Profile";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/8bit/avatar";
import { Separator } from "@/components/ui/8bit/separator";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2">
          🌿 Septemberly
        </h1>

        <div className="flex items-center gap-3">
          <ModeToggle />

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 rounded-full cursor-pointer"
              >
                <Avatar className="size-9" variant="pixel">
                  <AvatarImage
                    src="https://8bitcn.com/images/pixelized-8bitcnorc.jpg"
                    alt="ProfileAvatar"
                  />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Profile</DialogTitle>
              </DialogHeader>

              <ProfileCard />

              <DialogClose />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <Separator className="my-4" />
    </>
  );
};

export default Header;
