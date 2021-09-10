// ==UserScript==
// @name         GitHub hide public badge
// @version      2
// @description  Hides "Public" repository badge or removes "Public" prefix
// @author       kidonng
// @namespace    https://github.com/kidonng/cherry
// @match        https://github.com/*
// ==/UserScript==

// Ported from https://github.com/sindresorhus/refined-github/pull/4770

import { observe } from 'selector-observer'

function upperCaseFirst(input) {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
}

document.head.insertAdjacentHTML(
  'beforeend',
  `<style>
    .rgh-ci-link .Label[hidden] + .commit-build-statuses {
      margin-left: 0;
    }
  </style>`
)

observe(
  '[itemprop^="name"] + .Label, .pinned-item-list-item-content .Label, .Popover .f5 + .Label',
  {
    add(badge) {
      const newText = badge.textContent.replace(/^Public ?/, '')

      if (newText === '') {
        badge.hidden = true
      } else {
        badge.textContent = upperCaseFirst(newText)
      }
    },
  }
)