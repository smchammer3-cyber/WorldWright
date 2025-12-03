// JARVIS_CHANGE
// Date: 2025-12-03
// Step: 6A-6 -- Legacy screen cleanup.
//
// This file is now a LEGACY STUB.
// Editing flows have been moved to Create Mode at
//   src/modes/create/CreateModeApp.tsx
// and routed via /modes/create/:id.
//
// App.tsx no longer imports or uses EditorScreen.
// You may safely delete this file once you no longer need it
// as a reference.

import React from 'react'

export type EditorScreenProps = {
  onBack?: () => void
}

export function EditorScreen(_props: EditorScreenProps) {
  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui' }}>
      <h2>Legacy EditorScreen</h2>
      <p>
        This component has been replaced by
        {' '}
        <code>CreateModeApp</code>
        {' '}
        in
        {' '}
        <code>src/modes/create/CreateModeApp.tsx</code>.
      </p>
      <p>It is no longer used by App.tsx.</p>
    </div>
  )
}

export default EditorScreen