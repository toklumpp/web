import React from "https://esm.sh/react"
export let createElement = React.createElement;
export function h1(content) {
    createElement("h1", {}, content);
};