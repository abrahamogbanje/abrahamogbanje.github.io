/* ==========================================================================
   PORTFOLIO SCRIPT
   Everything here is optional enhancement: the page still works without it.
   1. Mobile navigation
   2. Active link highlighting
   3. Theme toggle (light / dark)
   4. Scroll reveal
   5. Copy email button
   6. Footer year
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("nav-list");

  function setMenu(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    navList.classList.toggle("is-open", open);
  }

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      setMenu(navToggle.getAttribute("aria-expanded") !== "true");
    });

    // Close the menu after choosing a link
    navList.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    // Escape closes the menu and returns focus to the button
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        navToggle.focus();
      }
    });

    // Close if focus or a click moves outside the nav
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".site-nav")) setMenu(false);
    });
  }

  /* ---------- 2. Active link highlighting ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav-list a");

  if ("IntersectionObserver" in window && sections.length) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var isCurrent = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" }); // triggers near the middle of the screen

    sections.forEach(function (s) { activeObserver.observe(s); });
  }

  /* ---------- 3. Theme toggle ---------- */
  var root = document.documentElement;
  var themeToggle = document.querySelector(".theme-toggle");
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return darkQuery.matches ? "dark" : "light";
  }

  function syncToggle() {
    if (!themeToggle) return;
    var isDark = currentTheme() === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }

  // Restore a saved choice (storage can be blocked, so it's wrapped in try/catch)
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (err) { /* ignore */ }
  syncToggle();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (err) { /* ignore */ }
      syncToggle();
    });
  }

  /* ---------- 4. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    // No animation: show everything immediately
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 5. Copy email button ---------- */
  var copyBtn = document.getElementById("copy-email");
  var emailLink = document.getElementById("email-link");
  var copyStatus = document.getElementById("copy-status");

  function announce(message) {
    if (!copyStatus) return;
    copyStatus.textContent = message;
    setTimeout(function () { copyStatus.textContent = ""; }, 2500);
  }

  if (copyBtn && emailLink) {
    copyBtn.addEventListener("click", function () {
      var address = emailLink.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(
          function () { announce("Copied!"); },
          function () { announce("Press Ctrl/Cmd+C to copy"); }
        );
      } else {
        announce("Copy not supported here");
      }
    });
  }

  /* ---------- 6. Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
