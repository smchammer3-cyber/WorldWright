import React from 'react'
import { listWorldSummaries } from '../core/worldStorage'

interface HomeScreenProps {
  onCreateNewWorld: () => void
  onOpenWorld: (id: string) => void
}

export function HomeScreen(props: HomeScreenProps) {
  const { onCreateNewWorld, onOpenWorld } = props

  const worlds = listWorldSummaries()

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <h1 className="ww-title">WorldWright</h1>
        <button className="ww-primary-btn" onClick={onCreateNewWorld}>
          + New World
        </button>
      </header>

      <main className="ww-screen-body">
        {worlds.length === 0 ? (
          <div className="ww-empty-state">
            <p>You don&apos;t have any worlds yet.</p>
            <button className="ww-primary-btn" onClick={onCreateNewWorld}>
              Generate New World
            </button>
          </div>
        ) : (
          <div className="ww-world-grid">
            {worlds.map(world => (
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