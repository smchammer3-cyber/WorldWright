// JARVIS_CHANGE
// Date: 2025-12-03
// Step: 6A-6 -- Legacy screen cleanup.
//
// This file is now a LEGACY STUB.
// The real generator lives in src/modes/generate/GenerateModeApp.tsx.
// App routing no longer imports or uses GeneratorScreen.
//
// You may safely delete this file once you no longer need it
// as a reference.

import React from 'react'

export function GeneratorScreen() {
  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui' }}>
      <h2>Legacy GeneratorScreen</h2>
      <p>
        This component has been replaced by
        {' '}
        <code>GenerateModeApp</code>
        {' '}
        in
        {' '}
        <code>src/modes/generate/GenerateModeApp.tsx</code>.
      </p>
      <p>It is no longer used by App.tsx.</p>
    </div>
  )
}

export default GeneratorScreen