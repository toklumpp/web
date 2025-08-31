import React from "https://esm.sh/react"
import ReactDOM from "https://esm.sh/react-dom/client"
import { createElement, h1 } from "./react-shortcuts.js";

ReactDOM.createRoot(document.getElementById('stats')).render(
    createElement("h1", {}, "Hello")
);