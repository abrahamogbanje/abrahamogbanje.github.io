(function () {
  "use strict";

  var config = window.PORTFOLIO_SUPABASE_CONFIG;
  var client = null;

  function getClient() {
    if (client) return client;

    if (!config || !config.url || !config.publishableKey) {
      throw new Error("Supabase is not configured yet.");
    }
    if (!window.supabase || typeof window.supabase.createClient !== "function") {
      throw new Error("The Supabase client library could not be loaded.");
    }

    var projectUrl;
    try {
      projectUrl = new URL(config.url);
    } catch (error) {
      throw new Error("The Supabase project URL is invalid.");
    }

    var localDevelopment = projectUrl.hostname === "localhost" || projectUrl.hostname === "127.0.0.1";
    if (projectUrl.protocol !== "https:" && !localDevelopment) {
      throw new Error("The Supabase project URL must use HTTPS.");
    }

    client = window.supabase.createClient(config.url, config.publishableKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
      }
    });
    return client;
  }

  async function checkAdministrator() {
    var supabaseClient = getClient();
    var sessionResult = await supabaseClient.auth.getSession();
    if (sessionResult.error) throw sessionResult.error;
    if (!sessionResult.data.session) return { signedIn: false, authorized: false };

    var result = await supabaseClient.functions.invoke("admin-status", { method: "POST" });
    if (result.error || !result.data || result.data.authorized !== true) {
      return { signedIn: true, authorized: false };
    }
    return { signedIn: true, authorized: true, email: result.data.email };
  }

  window.PortfolioAuth = Object.freeze({
    getClient: getClient,
    checkAdministrator: checkAdministrator
  });
})();
