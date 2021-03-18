// ==UserScript==
// @name         GitHub profile README link
// @version      1.0.1
// @description  Make profile README's header link to the README instead of the repository
// @author       kidonng
// @namespace    https://github.com/kidonng/cherry
// @match        https://github.com/*
// ==/UserScript==

;(() => {
  'use strict'

   const link = document.querySelector('.user-profile-nav + div .octicon-octoface + a')

   if (link) {
     link.href += '#readme'
   }
})()
