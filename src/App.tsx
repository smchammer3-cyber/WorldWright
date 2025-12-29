// ========================================================
// WORLDWRIGHT -- APP ROUTES (V1.3)
// File: src/App.tsx
// ========================================================

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";

import GenerateModeApp from "./modes/generate/GenerateModeApp";
import CreateModeApp from "./modes/create/CreateModeApp";
import SimModeApp from "./modes/sim/SimModeApp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />

      <Route path="/generate" element={<GenerateModeApp />} />
      <Route path="/create/:worldId" element={<CreateModeApp />} />
      <Route path="/sim/:worldId" element={<SimModeApp />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}