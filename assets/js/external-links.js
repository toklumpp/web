'use strict';

// Function to check if a link is external
function isExternal(link) {
    const origin = window.location.origin;
    return link.origin !== origin;
}

// Function to make external links open in a new tab
function makeExternalLinksOpenInNewTab() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (isExternal(link)) {
            link.setAttribute('target', '_blank');
        }
    });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', makeExternalLinksOpenInNewTab);
