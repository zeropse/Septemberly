import { useState } from "react";
import { Separator } from "@/components/ui/8bit/separator";
import { ThemeSwitcher } from "@/style/theme-switcher";
import { Button } from "@/components/ui/8bit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/8bit/dialog";

export default function Settings() {
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-4">
        <ThemeSwitcher />
        <Separator className="my-2" />

        <Dialog
          open={clearDialogOpen}
          onOpenChange={(open) => setClearDialogOpen(open)}
        >
          <div>
            <DialogTrigger asChild variant="destructive">
              <Button className="w-full cursor-pointer">Reset App</Button>
            </DialogTrigger>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset App</DialogTitle>
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
                          sessionStorage.clear();
                        } catch {
                          // ignore
                        }

                        try {
                          localStorage.clear();
                        } catch {
                          // ignore
                        }

                        try {
                          if (window.indexedDB && indexedDB.databases) {
                            const dbs = await indexedDB.databases();
                            for (const db of dbs) {
                              if (db && db.name) {
                                try {
                                  await new Promise((res) => {
                                    const req = indexedDB.deleteDatabase(
                                      db.name
                                    );
                                    req.onsuccess = () => res(true);
                                    req.onerror = () => res(false);
                                    req.onblocked = () => res(false);
                                  });
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
                        window.location.reload();
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
      </div>
    </div>
  );
}
