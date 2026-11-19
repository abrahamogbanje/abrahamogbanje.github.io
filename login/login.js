(function () {
  "use strict";

  var form = document.getElementById("login-form");
  var emailField = document.getElementById("email");
  var passwordField = document.getElementById("password");
  var submitButton = document.getElementById("submit-button");
  var message = document.getElementById("auth-message");

  function announce(text, isError) {
    message.textContent = text;
    message.classList.toggle("is-error", Boolean(isError));
  }

  function setBusy(busy) {
    submitButton.disabled = busy;
    submitButton.textContent = busy ? "Signing in…" : "Sign in";
    form.setAttribute("aria-busy", String(busy));
  }

  if (new URLSearchParams(window.location.search).get("reason") === "expired") {
    announce("Your session expired after inactivity. Please sign in again.", false);
  }

  async function redirectIfAlreadyAuthorized() {
    try {
      var state = await window.PortfolioAuth.checkAdministrator();
      if (state.authorized) window.location.replace("/admin/");
    } catch (error) {
      // The form remains usable and reports configuration/network failures on submit.
    }
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    message.textContent = "";

    if (!form.reportValidity()) return;
    setBusy(true);

    try {
      var client = window.PortfolioAuth.getClient();
      var signIn = await client.auth.signInWithPassword({
        email: emailField.value.trim(),
        password: passwordField.value
      });

      if (signIn.error) {
        announce("Sign-in failed. Check your details and try again.", true);
        passwordField.value = "";
        passwordField.focus();
        return;
      }

      var access = await window.PortfolioAuth.checkAdministrator();
      if (!access.authorized) {
        await client.auth.signOut();
        announce("This account is not authorized to administer the portfolio.", true);
        passwordField.value = "";
        passwordField.focus();
        return;
      }

      window.location.replace("/admin/");
    } catch (error) {
      announce(error && error.message === "Supabase is not configured yet."
        ? "Administrator sign-in is not configured yet."
        : "Could not contact the sign-in service. Please try again.", true);
    } finally {
      setBusy(false);
    }
  });

  redirectIfAlreadyAuthorized();
})();
