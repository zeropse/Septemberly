import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/8bit/avatar";
import { Badge } from "@/components/ui/8bit/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import useLocalStorage from "@/hooks/useLocalStorage";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  return initials || "?";
}

export default function ProfileCard() {
  const [profile] = useLocalStorage("Profile", {
    name: "Name",
    trait: "Autumn",
    about: "Need Sleep",
  });

  const name = profile.name || "Name";
  const trait = profile.trait || "Autumn";
  const about = profile.about || "Need Sleep";

  return (
    <Card className="min-w-sm max-w-md">
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar
          className="size-20"
          variant={trait === "retro" ? "retro" : "pixel"}
        >
          <AvatarImage
            src="https://8bitcn.com/images/pixelized-8bitcnorc.jpg"
            alt="ProfileAvatar"
          />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>

        <CardTitle>
          <h3>{name}</h3>
        </CardTitle>

        <Badge>{trait === "none" ? "None" : trait}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground text-center w-3/4 mx-auto">
          {about}
        </p>
      </CardContent>
    </Card>
  );
}
