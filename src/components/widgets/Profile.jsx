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
  let onboarding = null;
  try {
    const raw = localStorage.getItem("Profile");
    if (raw) onboarding = JSON.parse(raw);
  } catch {
    onboarding = null;
  }

  const name = onboarding?.name || "Name";
  const trait = onboarding?.trait || "Autumn";
  const about = onboarding?.about || "Need Sleep";

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
