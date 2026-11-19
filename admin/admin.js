(function () {
  "use strict";

  var status = document.getElementById("admin-status");
  var actions = document.getElementById("admin-actions");
  var signOutButton = document.getElementById("sign-out-button");
  var idleTimer;
  var idleLimitMs = 30 * 60 * 1000;

  function resetIdleTimer() {
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(async function () {
      try {
        await window.PortfolioAuth.getClient().auth.signOut();
      } finally {
        window.location.replace("/login/?reason=expired");
      }
    }, idleLimitMs);
  }

  ["pointerdown", "keydown", "touchstart"].forEach(function (eventName) {
    document.addEventListener(eventName, resetIdleTimer, { passive: true });
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) resetIdleTimer();
  });

  async function initialize() {
    try {
      var access = await window.PortfolioAuth.checkAdministrator();
      if (!access.signedIn || !access.authorized) {
        window.location.replace("/login/");
        return;
      }
      status.textContent = "You are signed in as the portfolio administrator. The content dashboard will be added in the next phase.";
      actions.hidden = false;
      resetIdleTimer();
    } catch (error) {
      status.textContent = "Administrator access could not be verified. Please sign in again.";
      window.setTimeout(function () { window.location.replace("/login/"); }, 1200);
    }
  }

  signOutButton.addEventListener("click", async function () {
    signOutButton.disabled = true;
    try {
      var client = window.PortfolioAuth.getClient();
      await client.auth.signOut();
    } finally {
      window.location.replace("/login/");
    }
  });

  initialize();
})();
