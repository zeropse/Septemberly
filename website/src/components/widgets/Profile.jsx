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
import { useProfileName, useProfileTrait } from "@/stores/appStore";
import { useGamificationStore } from "@/stores/gamificationStore";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function ProfileCard() {
  const name = useProfileName();
  const trait = useProfileTrait();

  // Gamification store hooks
  const totalXP = useGamificationStore((state) => state.totalXP);
  const getCurrentLevelInfo = useGamificationStore(
    (state) => state.getCurrentLevelInfo
  );
  const getProgressToNextLevel = useGamificationStore(
    (state) => state.getProgressToNextLevel
  );
  const recentActions = useGamificationStore((state) => state.recentActions);

  const currentLevel = getCurrentLevelInfo();
  const { progress, remaining } = getProgressToNextLevel();
  const isMaxLevel = currentLevel.level === 5;

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <Card className="min-w-sm max-w-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <Avatar
            className="size-20"
            variant={trait === "retro" ? "retro" : "pixel"}
          >
            <AvatarImage src="/Profile-Avatar.jpg" alt="ProfileAvatar" />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>

          <CardTitle>
            <h3>{name}</h3>
          </CardTitle>

          <Badge>
            {trait === "none"
              ? "None"
              : trait.charAt(0).toUpperCase() + trait.slice(1)}
          </Badge>
        </CardHeader>
      </Card>

      {/* Gamification Progress */}
      <Card className="bg-black/10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center flex items-center justify-center gap-2">
            🎮 Progress
            <Badge variant="secondary" className="font-bold">
              Level {currentLevel.level}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Level Info */}
          <div className="text-center space-y-2">
            <div className="text-lg font-medium text-yellow-400">
              {currentLevel.name}
            </div>
            <div className="text-sm opacity-80">
              Total XP:{" "}
              <span className="font-bold text-green-400">{totalXP}</span>
            </div>
          </div>

          {/* Progress Bar */}
          {!isMaxLevel && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Level {currentLevel.level}</span>
                <span>Level {currentLevel.level + 1}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="text-xs text-center opacity-70">
                {remaining} XP to next level
              </div>
            </div>
          )}

          {isMaxLevel && (
            <div className="text-center text-yellow-500 font-bold">
              ⭐ Maximum Level Reached! ⭐
            </div>
          )}

          {/* Recent Activities */}
          {recentActions.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-center">
                Recent Activities
              </div>
              <div className="max-h-20 overflow-y-auto space-y-1">
                {recentActions.slice(0, 3).map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center justify-between text-xs bg-black/20 rounded px-2 py-1"
                  >
                    <span className="truncate flex-1">{action.action}</span>
                    <div className="flex items-center gap-1 ml-2">
                      <span className="text-green-400">+{action.xpGained}</span>
                      {action.levelUp && (
                        <span className="text-yellow-400">🎉</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
