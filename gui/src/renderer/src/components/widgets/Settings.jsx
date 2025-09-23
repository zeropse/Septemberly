import { useState } from 'react'
import { ThemeSwitcher } from '@/style/theme-switcher'
import { Button } from '@/components/ui/8bit/button'
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
import { version } from '../../../package.json'
import { IconBrandXFilled, IconBrandLinkedinFilled, IconBrandGithub } from '@tabler/icons-react'
import { Card } from '@/components/ui/8bit/card'

export default function Settings() {
  const [clearDialogOpen, setClearDialogOpen] = useState(false)

  const appVersion = `v${version}`

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-4">
        <ThemeSwitcher />

        <Card>
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center flex flex-col gap-2">
            <p>Septemberly {appVersion}</p>
            <p>Made by zeropse</p>
            <div className="flex justify-center gap-5 mt-2">
              <a
                href="https://github.com/zeropse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <IconBrandGithub className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" />
              </a>
              <a
                href="https://linkedin.com/in/zeropse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <IconBrandLinkedinFilled className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" />
              </a>
              <a
                href="https://x.com/zer0pse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter) profile"
              >
                <IconBrandXFilled className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" />
              </a>
            </div>
          </div>
        </Card>

        <Dialog open={clearDialogOpen} onOpenChange={(open) => setClearDialogOpen(open)}>
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
      </div>
    </div>
  )
}
