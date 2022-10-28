import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";

const rootElement = document.getElementById("app")
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        <Home />
    </StrictMode>
);