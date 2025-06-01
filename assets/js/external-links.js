/*
Copyright (c) 2025 Tobias Klumpp (https://www.toklumpp.net/)
SPDX-License-Identifier: MIT
*/
'use strict';

// Function to check if a link is external
function isExternal(link) {
    const url = new URL(link.href);
    const origin = window.location.origin;
    return (link.origin !== origin) && (url.protocol !== 'mailto:')
        && (url.protocol !== 'geo:') && (url.protocol !== 'maps:')
        && (url.protocol !== 'bingmaps:');
}

// Function to make external links open in a new tab
function makeExternalLinksOpenInNewTab() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (isExternal(link)) {
            link.setAttribute('target', '_blank');
            const rel = link.getAttribute('rel');
            if (rel) {
                if (!rel.includes('noopener')) {
                    link.setAttribute('rel', `${rel} noopener`);
                }
            } else {
                link.setAttribute('rel', 'noopener');
            }
        }
    });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', makeExternalLinksOpenInNewTab);
