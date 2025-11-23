import React from 'react'
import { listWorldSummaries } from '../core/worldStorage'

interface HomeScreenProps {
  onCreateNewWorld: () => void
  onOpenWorld: (id: string) => void
}

export function HomeScreen({ onCreateNewWorld, onOpenWorld }: HomeScreenProps) {
  const worlds = listWorldSummaries()

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <div>
          <h1 className="ww-title">WorldWright</h1>
          <p className="ww-subtitle">
            Create believable worlds, then simulate and edit their history.
          </p>
        </div>
        <button className="ww-primary-button" onClick={onCreateNewWorld}>
          + Create New World
        </button>
      </header>

      <main className="ww-screen-body">
        {worlds.length === 0 ? (
          <div className="ww-empty-state">
            <p>You don&apos;t have any worlds yet.</p>
            <button className="ww-secondary-button" onClick={onCreateNewWorld}>
              Start your first world
            </button>
          </div>
        ) : (
          <div className="ww-world-grid">
            {worlds.map((world) => (
              <button
                key={world.id}
                className="ww-world-card"
                onClick={() => onOpenWorld(world.id)}
              >
                <div className="ww-world-thumb" />
                <div className="ww-world-name">{world.name}</div>
                <div className="ww-world-meta">
                  <span>
                    Updated:{' '}
                    {new Date(world.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}