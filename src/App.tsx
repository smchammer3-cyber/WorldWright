import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import GenerateModeApp from "./modes/generate/GenerateModeApp";
import CreateModeApp from "./modes/create/CreateModeApp";
import SimModeApp from "./modes/sim/SimModeApp";
import { restoreFromLocalStorage } from "./core/worldStorage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/generate" element={<GenerateModeApp />} />
      {/* Keep route param name aligned with mode apps (CreateModeApp uses `id`) */}
      <Route path="/modes/create/:id" element={<CreateModeApp />} />
      <Route path="/modes/sim/:id" element={<SimModeApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    // One-time legacy migration support (safe no-op if nothing to migrate)
    (async () => {
      try {
        await restoreFromLocalStorage();
      } catch {
        // storage should never crash the app
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}