// ==UserScript==
// @name         Telegram Raw Media
// @version      1
// @description  Show media on t.me as regular elements
// @author       kidonng
// @namespace    https://github.com/kidonng/cherry
// @match        https://t.me/*
// @match        https://telegram.me/*
// @grant        GM.addStyle
// @example      https://t.me/kichann/1281
// ==/UserScript==

import React from 'dom-chef'
import { observe } from 'selector-observer'

const parseUrl = (source: HTMLElement) =>
    source.style.backgroundImage.replace(/^url\("(.+)"\)$/, '$1')
const thumbPreview =
    '.link_preview_right_image, .tgme_widget_message_reply_thumb'
const preview = `.link_preview_image, ${thumbPreview}`
const processed = 'trm-processed'

GM.addStyle(`
/* Remove the cover on videos */
.link_preview_video_player:after {
    display: none;
}

/* Fix thumb size */
${thumbPreview} {
    object-fit: cover;
}
`)

observe(`:is(.tgme_widget_message_photo, ${preview}):not(.${processed})`, {
    add(target) {
        const source = target.matches(preview)
            ? target
            : target.closest('.tgme_widget_message_photo_wrap') // Handle both single and multiple images
        if (!source) return

        const img = (
            <img
                className={target.className}
                src={parseUrl(source as HTMLElement)}
            />
        )
        img.classList.add(processed)
        if (!target.matches(thumbPreview)) img.style.width = '100%'

        target.replaceWith(img)
    },
})
