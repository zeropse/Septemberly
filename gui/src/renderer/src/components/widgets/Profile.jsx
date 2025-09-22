import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/8bit/avatar'
import { Badge } from '@/components/ui/8bit/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/8bit/card'
import { useProfileName, useProfileTrait, useProfileAbout, useAppStore } from '@/stores/appStore'
import { useState } from 'react'
import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/8bit/button'
import { Input } from '@/components/ui/8bit/input'
import { Textarea } from '@/components/ui/8bit/textarea'
import { ThemeSwitcher } from '@/style/theme-switcher'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from '@/components/ui/8bit/dialog'

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function ProfileCard() {
  const name = useProfileName()
  const trait = useProfileTrait()
  const about = useProfileAbout()
  const profileDraft = useAppStore((s) => s.profileDraft)
  const setProfileDraft = useAppStore((s) => s.setProfileDraft)
  const updateProfileDraft = useAppStore((s) => s.updateProfileDraft)
  const clearProfileDraft = useAppStore((s) => s.clearProfileDraft)
  const commitProfileDraft = useAppStore((s) => s.commitProfileDraft)

  const [isEditing, setIsEditing] = useState(false)
  const [clearDialogOpen, setClearDialogOpen] = useState(false)

  return (
    <Card className="min-w-sm max-w-md">
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar className="size-20" variant={trait === 'retro' ? 'retro' : 'pixel'}>
          <AvatarImage src="./Profile-Avatar.jpg" alt="ProfileAvatar" />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>

        <CardTitle>
          <h3>{name}</h3>
        </CardTitle>

        <Badge>{trait === 'none' ? 'None' : trait.charAt(0).toUpperCase() + trait.slice(1)}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {isEditing ? (
          <div className="w-full flex flex-col items-center gap-4">
            <Input
              value={profileDraft?.name ?? name}
              onChange={(e) => updateProfileDraft({ name: e.target.value })}
              placeholder="Name"
              className="w-full rounded"
            />
            <Textarea
              value={profileDraft?.about ?? about}
              onChange={(e) => updateProfileDraft({ about: e.target.value })}
              className="w-full rounded"
              rows={3}
              placeholder="About"
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center w-3/4 mx-auto">{about}</p>
        )}
      </CardContent>
      <CardFooter className="text-center flex flex-col gap-5">
        <div>
          {isEditing ? (
            <div className="w-full flex gap-4">
              <Button
                onClick={() => {
                  clearProfileDraft()
                  setIsEditing(false)
                }}
                className="w-1/2 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  commitProfileDraft()
                  setIsEditing(false)
                }}
                className="w-1/2 cursor-pointer"
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                setProfileDraft({ name, about, trait })
                setIsEditing(true)
              }}
              className="w-full cursor-pointer"
            >
              Edit Profile
            </Button>
          )}
        </div>
        <ThemeSwitcher />
        <Dialog open={clearDialogOpen} onOpenChange={(open) => setClearDialogOpen(open)}>
          <div>
            <DialogTrigger asChild variant="destructive">
              <Button className="w-full cursor-pointer">Remove All Storages</Button>
            </DialogTrigger>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clear all data?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              This will clear everything. You will be treated like a new user.
            </DialogDescription>
            <DialogFooter>
              <div className="w-full flex gap-4">
                <DialogClose asChild>
                  <Button
                    onClick={() => setClearDialogOpen(false)}
                    className="w-1/2 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={async () => {
                      try {
                        try {
                          sessionStorage.clear()
                        } catch {
                          // ignore
                        }

                        try {
                          localStorage.clear()
                        } catch {
                          // ignore
                        }

                        try {
                          if (window.indexedDB && indexedDB.databases) {
                            const dbs = await indexedDB.databases()
                            for (const db of dbs) {
                              if (db && db.name) {
                                try {
                                  await new Promise((res) => {
                                    const req = indexedDB.deleteDatabase(db.name)
                                    req.onsuccess = () => res(true)
                                    req.onerror = () => res(false)
                                    req.onblocked = () => res(false)
                                  })
                                } catch {
                                  // ignore
                                }
                              }
                            }
                          }
                        } catch {
                          // ignore
                        }
                      } finally {
                        window.location.reload()
                      }
                    }}
                    className="w-1/2 cursor-pointer"
                    variant="destructive"
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
