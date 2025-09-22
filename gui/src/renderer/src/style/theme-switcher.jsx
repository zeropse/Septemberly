import { Button } from '@/components/ui/8bit/button'
import { useTheme } from './theme-context'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/8bit/card'

export function ThemeSwitcher() {
  const { themeVariant, setThemeVariant } = useTheme()

  const themes = [
    {
      id: 'cassette',
      name: 'Cassette'
    },
    {
      id: 'pacman',
      name: 'Pacman'
    },
    {
      id: 'arcade',
      name: 'Arcade'
    },
    {
      id: 'rustybyte',
      name: 'Rusty Byte'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Themes</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-5">
        {themes.map((theme) => {
          const isActive = themeVariant === theme.id

          return (
            <Button
              key={theme.id}
              onClick={() => setThemeVariant(theme.id)}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              className="cursor-pointer"
            >
              {theme.name}
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
