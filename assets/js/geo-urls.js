/*
Copyright (c) 2025 Tobias Klumpp <tobias.klumpp@toklumpp.net>
SPDX-License-Identifier: MIT
*/
// Regular expression pattern to match geo: URLs
const geoUrlPattern = /geo:([\-0-9.]+),([\-0-9.]+)(\?(z=([0-9]+))?)?/;

// Function to detect the platform
function detectPlatform() {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/Android/i)) {
        return 'android';
    } else if (userAgent.match(/CrOS/i)) {
        return 'chromeos';
    } else if (userAgent.match(/Linux/i)) {
        return 'linux';
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
        return 'ios';
    } else if (userAgent.match(/Mac OS X/i)) {
        return 'mac';
    } else if (userAgent.match(/Windows/i)) {
        return 'windows';
    } else {
        return 'unknown';
    }
}

// Function to replace geo: URLs with platform-specific maps app URLs
function replaceGeoUrl(match, latitude, longitude, zoom, platform) {
    let url = match;
    switch (platform) {
        case 'ios':
        case 'mac':
            // Use the maps: URL scheme for Apple devices
            url = `maps:${latitude},${longitude}`;
            if (zoom) {
                url += `?z=${zoom}`;
            }
            break;
        case 'windows':
            // Use the bingmaps: URL scheme for Windows Maps app
            url = `bingmaps:?cp=${latitude}~${longitude}`;
            if (zoom) {
                url += `&z=${zoom}`;
            }
            break;
        case 'chromeos':
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
        const latitude = match[1];
        const longitude = match[2];
        const zoom = match[5];
        const newUrl = replaceGeoUrl(link.href, latitude, longitude, zoom, platform);
        link.href = newUrl;
    }
});