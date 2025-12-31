import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import GenerateModeApp from "./modes/generate/GenerateModeApp";
import CreateModeApp from "./modes/create/CreateModeApp";
import SimModeApp from "./modes/sim/SimModeApp";
export default function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomeScreen, {}) }), _jsx(Route, { path: "/generate", element: _jsx(GenerateModeApp, {}) }), _jsx(Route, { path: "/create/:worldId", element: _jsx(CreateModeApp, {}) }), _jsx(Route, { path: "/sim/:worldId", element: _jsx(SimModeApp, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }));
}
