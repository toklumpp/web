/*
Copyright (c) 2025 Tobias Klumpp <tobias.klumpp@toklumpp.net>
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

// Function to replace geo: URLs with platform-specific maps app URLs
function replaceGeoUrl(match, latitude, longitude, zoom, platform) {
    let url = match;
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
            // Use the bingmaps: URL scheme for Windows Maps app
            url = `bingmaps:?cp=${latitude}~${longitude}`;
            if (zoom) {
                url += `&lvl=${zoom}`;
            }
            break;
        case "Chrome OS":
        case "Chromium OS":
            // Use the googlechrome: URL scheme for Chrome OS
            url = `googlechrome://maps/?q=${latitude},${longitude}`;
            if (zoom) {
                url += `&zoom=${zoom}`;
            }
            break;
        default:
            // Use the geo: URL scheme for Android, Linux and unknown platforms
            url = match;
            break;
    }

    return url;
}

// Detect the platform
const platform = detectPlatform();

// Get all links with geo: URLs
const links = document.querySelectorAll('a[href^="geo:"]');

// Replace the href attribute of each link
links.forEach(link => {
    const match = link.href.match(geoUrlPattern);
    if (match) {
        link.href = replaceGeoUrl(link.href, match[1], match[2], match[5], platform);
    }
});