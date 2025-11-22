import React from 'react'

interface HomeScreenProps {
  onCreateNewWorld: () => void
  onOpenWorld: (id: string) => void
}

// NOTE: For now, worlds are hard-coded placeholders.
// Later we’ll wire this to real world storage (Step 3 in the blueprint).
const MOCK_WORLDS = [
  { id: 'demo-1', name: 'Eldoria (Demo)' },
  { id: 'demo-2', name: 'Untitled World' }
]

export function HomeScreen(props: HomeScreenProps) {
  const { onCreateNewWorld, onOpenWorld } = props

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <h1 className="ww-title">WorldWright</h1>
        <button className="ww-primary-btn" onClick={onCreateNewWorld}>
          + New World
        </button>
      </header>

      <main className="ww-screen-body">
        {MOCK_WORLDS.length === 0 ? (
          <div className="ww-empty">
            <p>You don&apos;t have any worlds yet.</p>
            <button className="ww-primary-btn" onClick={onCreateNewWorld}>
              Generate New World
            </button>
          </div>
        ) : (
          <div className="ww-world-grid">
            {MOCK_WORLDS.map(world => (
              <button
                key={world.id}
                className="ww-world-card"
                onClick={() => onOpenWorld(world.id)}
              >
                <div className="ww-world-thumb" />
                <div className="ww-world-name">{world.name}</div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}