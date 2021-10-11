// ==UserScript==
// @name         Pages Source
// @version      2
// @description  Easily go to GitHub Pages' source repository
// @author       kidonng
// @namespace    https://github.com/kidonng/cherry
// @match        http*://*.github.io/*
// @example      https://edwardtufte.github.io/
// @example      https://edwardtufte.github.io/tufte-css/
// ==/UserScript==

import React from 'dom-chef'

const id = 'cherry-pages-source'
document.head.append(<style>{`#${id}:hover { opacity: 1 !important; }`}</style>)

const username = location.hostname.replace('.github.io', '')
let href = `https://github.com/${username}`
let title
if (document.title !== 'Site not found · GitHub Pages') {
  href +=
    location.pathname.slice(0, location.pathname.indexOf('/', 1)) ||
    `/${username}.github.io`
  title = 'Go to source repository'
} else {
  title = 'Go to user profile'
}

// Icon is from GitHub header
const icon = (
  <svg
    height="32"
    width="32"
    viewBox="0 0 16 16"
    version="1.1"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    ></path>
  </svg>
)

document.body.append(
  <a
    {...{ href, id, title }}
    style={{
      position: 'fixed',
      right: 0,
      bottom: 0,
      margin: '.5rem',
      opacity: 0.5,
      transition: 'opacity .25s',
    }}
  >
    {icon}
  </a>
)