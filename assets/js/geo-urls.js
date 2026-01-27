/*
Copyright (c) 2025 Tobias Klumpp (https://www.toklumpp.net/)
SPDX-License-Identifier: MIT
*/
'use strict';
// Regular expression pattern to match geo: URLs
const geoUrlPattern = /geo:([\-0-9.]+),([\-0-9.]+)(\?(z=([0-9]+))?)?/;

// Function to detect the platform
function detectPlatform() {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/Android/i)) {
        return "Android";
    } else if (userAgent.match(/CrOS/i)) {
        return "Chrome OS";
    } else if (false) {
        return "Chromium OS";
    } else if (userAgent.match(/Linux/i)) {
        return "Linux";
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
        return "iOS";
    } else if (userAgent.match(/Mac OS X/i)) {
        return "macOS";
    } else if (userAgent.match(/Windows/i)) {
        return "Windows";
    } else {
        return "Unknown";
    }
}

function detectBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/Seamonkey/i)) {
        return "Seamonkey";
    } else if (userAgent.match(/Firefox/i)) {
        return "Firefox";
    } else if (userAgent.match(/Edg/i)) {
        return "Microsoft Edge";
    } else if (userAgent.match(/Chromium/i)) {
        return "Chromium";
    } else if (userAgent.match(/Chrome/i)) {
        return "Google Chrome";
    } else if (userAgent.match(/Safari/i)) {
        return "Safari";
    } else if (userAgent.match(/Opera/i) || userAgent.match(/OPR/i)) {
        return "Opera";
    } else {
        return "Unknown";
    }
}

// Function to replace geo: URLs with platform-specific maps app URLs
function replaceGeoUrl(match, latitude, longitude, zoom, platform, browser) {
    let url = match;
    let clickable = true;
    switch (platform) {
        case "iOS":
        case "macOS":
            // Use the maps: URL scheme for Apple devices
            url = `maps://?ll=${latitude},${longitude}`;
            if (zoom) {
                url += `&z=${zoom}`;
            }
            break;
        case "Windows":
            switch (browser) {
                case "Microsoft Edge":
                    url = `https://www.bing.com/maps?cp=${latitude}~${longitude}`;
                    if (zoom) {
                        url += `&lvl=${zoom}`;
                    }
                    break;
                case "Firefox":
                case "Google Chrome":
                case "Opera":
                    url = `https://www.google.com/maps/@${latitude},${longitude}`;
                    if (zoom) {
                        url += `,${zoom}z`;
                    }
                    break;
                default:
                    url = match;
                    clickable = false;
            }
            break;
        default:
            // Use the geo: URL scheme for Android, ChromeOS, Linux and unknown platforms
            url = match;
            break;
    }

    return { "url": url, "clickable": clickable };
}

function geoUrls() {
    // Detect the platform
    const platform = detectPlatform();
    const browser = detectBrowser();

    // Get all links with geo: URLs
    const links = document.querySelectorAll('a[href^="geo:"]');

    // Replace the href attribute of each link
    links.forEach(link => {
        const match = link.href.match(geoUrlPattern);
        if (match) {
            let result = replaceGeoUrl(link.href, match[1], match[2], match[5], platform, browser);
            link.href = result.url;
            if (!result.clickable) {
                link.className += " no-link";
            }
            if (link.href.match(/http/i)) {
                link.rel += " noopener";
                link.target = "_blank";
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', geoUrls);