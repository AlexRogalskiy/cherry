// ==UserScript==
// @name            View Image
// @namespace       https://github.com/bijij/ViewImage
// @version         2.0.1
// @description     This userscript re-implements the "View Image" and "Search by image" buttons into google images.
// @author          Bae Junehyeon
// @run-at          document-end
// @include         http*://*.google.tld/search*tbm=isch*
// @include         http*://*.google.tld/imgres*
// @note            Based on Userscript Version 2.0.1 and synced with the Chrome Extension version.
// ==/UserScript==
'use strict';

function addLinks(node) {

    var object = node.closest('.irc_c[style*="visibility: visible;"], .irc_c[style*="transform: translate3d(0px, 0px, 0px);"]');

    if (!object)
        object = node.closest('.irc_c[style*="transform: translate3d(0px, 0px, 0px);"]');
    

    // Stop if object not found
    if (object === null) {
        return;
    }

    // Remove previously generated elements
    var oldExtensionElements = object.querySelectorAll('.ext_addon');
    for (var i = oldExtensionElements.length - 1; i >= 0; i--) {
        var element = oldExtensionElements[i];
        element.parentElement.removeChild(element);
    }

    // Retrive image links, and image url
    var imageLinks = object.querySelector('._FKw.irc_but_r > tbody > tr');
    if (!imageLinks)
        imageLinks = object.querySelector('.irc_but_r > tbody > tr');
    
    var imageText = object.querySelector('._cjj > .irc_it > .irc_hd > ._r3');
    if (!imageText)
        imageText = object.querySelector('.Qc8zh > .irc_it > .irc_hd > .rn92ee');
    if (!imageText)
        imageText = object.querySelector('.Qc8zh > .irc_it > .irc_hd > .irc_dsh');
    

    // Retrive the image;
    var image = object.querySelector('img[alt^="Image result"][src]:not([src^="https://encrypted-tbn"]).irc_mut, img[src].irc_mi');

    // Override url for images using base64 embeds
    if (image === null || image.src === '' || image.src.startsWith('data')) {
        var thumbnail = document.querySelector('img[name="' + object.dataset.itemId + '"]');
        if (thumbnail === null) {
            // If no thumbnail found, try getting image from URL
            var url = new URL(window.location);
            var imgLink = url.searchParams.get('imgurl');
            if (imgLink) {
                image = new Object();
                image.src = imgLink;
            }
        } else {
            var meta = thumbnail.closest('.rg_bx').querySelector('.rg_meta');

            var metadata = JSON.parse(meta.innerHTML);

            image = new Object();
            image.src = metadata.ou;
        }

        // Supress error in console
        if (image === null)
            return;
    }

    // Create more sizes button
    var moreSizes = document.createElement('a');
    moreSizes.setAttribute('href', '#'); // TODO: Figure out how to generate a more sizes url
    moreSizes.setAttribute('class', 'ext_addon _ZR irc_hol irc_lth _r3');
    moreSizes.setAttribute('style', 'pointer-events:none'); // Disable click for now

    // Insert text into more sizes button
    var moreSizesText = document.createElement('span');
    image.sizeText = moreSizesText;
    moreSizesText.innerHTML = object.querySelector('.irc_idim').innerHTML;
    moreSizes.appendChild(moreSizesText);

    // Create Search by image button
    var searchByImage = document.createElement('a');
    searchByImage.setAttribute('href', '/searchbyimage?image_url=' + image.src);
    searchByImage.setAttribute('target', '_blank'); // COMMENT THIS TO NOT OPEN IN NEW TAB
    searchByImage.setAttribute('class', 'ext_addon _ZR irc_hol irc_lth _r3');

    // Insert text into Search by image button
    var searchByImageText = document.createElement('span');
    localiseObject(searchByImageText, '<span>__MSG_searchImg__</span>');
    
    searchByImage.appendChild(searchByImageText);

    // Append More sizes & Search by image buttons
    if (imageText) {
        imageText.appendChild(searchByImage);
        imageText.appendChild(moreSizes);
    }

    // Create View image button
    var viewImage = document.createElement('td');
    viewImage.setAttribute('class', 'ext_addon');

    // Add globe to View image button if toggle enabled
    var viewImageLink = document.createElement('a');

    // hide copyright text if toggle enabled 
    var copyWarning = object.querySelector('.irc_bimg.irc_it');
    copyWarning.style = 'display: none;';

    // add text to view image button
    var viewImageText = document.querySelector('._WKw');
    if (!viewImageText)
        viewImageText = document.querySelector('.Tl8XHc');
    var viewImageTextClone = viewImageText.cloneNode(true);
    
    viewImageTextClone.innerText = "Search By Image";
    viewImageLink.appendChild(viewImageTextClone);

    // Add View image button URL
    viewImageLink.setAttribute('href', image.src);
    viewImageLink.setAttribute('target', '_blank');
    viewImage.appendChild(viewImageLink);

    // Add View image button to Image Links
    var save = imageLinks.childNodes[1];
    imageLinks.insertBefore(viewImage, save);
}

// Define the mutation observer
var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];

        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (var j = 0; j < mutation.addedNodes.length; j++) {
                var newNode = mutation.addedNodes[j];

                if (newNode.nodeType === Node.ELEMENT_NODE) {
                    if (newNode.classList.contains('irc_mi') | newNode.classList.contains('irc_mut') | newNode.classList.contains('irc_ris')) {
                        addLinks(newNode);
                    }
                }
            }
        }
    }
});

// Get options and start adding links
var objects = document.querySelectorAll('.irc_c');
for (var i = 0; i < objects.length; i++) {
    addLinks(objects[i]);
}

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// inject CSS into document
var customStyle = document.createElement('style');
customStyle.innerText = '._r3:hover:before{display:inline-block;pointer-events:none} ._r3{margin: 0 4pt!important}';
document.head.appendChild(customStyle);
