import { useState, Suspense } from 'react'
import Onboarding from '@/components/Onboarding/Onboarding'
import ErrorBoundary from '@/components/sections/ErrorBoundary'
import Dock from '@/components/Dock'
import widgets from '@/data/widgets.jsx'
import { useAppStore } from '@/stores/appStore'
import Loader from '@/components/sections/Loader'

const Content = () => {
  const { activeWidget, onboarded } = useAppStore()
  const [showOnboarding, setShowOnboarding] = useState(() => !onboarded)
  const shouldShowOnboarding = !onboarded && showOnboarding

  return (
    <>
      {shouldShowOnboarding && (
        <Onboarding
          onFinish={() => {
            setShowOnboarding(false)
          }}
        />
      )}

      <div>
        <div
          className={`flex gap-10 ${
            shouldShowOnboarding ? 'pointer-events-none select-none filter blur-sm opacity-90' : ''
          }`}
        >
          {/* Main Widget Area */}
          <div className="flex-1">
            {(() => {
              const active = widgets.find((w) => w.id === activeWidget)
              if (!active) return null
              const ActiveComponent = active.component
              return (
                <div className="h-full" key={active.id}>
                  <ErrorBoundary>
                    <Suspense fallback={<Loader className="bg-chart-1" />}>
                      <ActiveComponent />
                    </Suspense>
                  </ErrorBoundary>
                </div>
              )
            })()}
          </div>
        </div>
      </div>

      <div
        className={
          shouldShowOnboarding ? 'pointer-events-none select-none filter blur-sm opacity-90' : ''
        }
      >
        <Dock />
      </div>
    </>
  )
}

export default Content
