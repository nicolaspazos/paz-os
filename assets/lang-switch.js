/*
 * Standalone ES/EN language switcher for the static Paz.os mirror.
 *
 * Why this exists: the site was a TranslatePress (WordPress) site whose
 * language switcher relied on server-side logic + plugin JS that isn't part of
 * a static export. This script makes the existing bottom-right floater work on
 * its own, on both desktop and touch, and — importantly for future updates —
 * derives the counterpart URL purely from the current path, so any NEW page
 * (Spanish at /foo/, English at /en/foo/) switches correctly with no per-page
 * setup. Just keep the <script>/<link> tags in the page <head>/<body>.
 *
 * Convention: Spanish pages live at "/<path>/", English at "/en/<path>/".
 */
(function () {
  "use strict";

  // Map the current path to its other-language counterpart.
  function counterpart(p) {
    if (p === "/en" || p === "/en/") return "/";            // EN home -> ES home
    if (p.slice(0, 4) === "/en/") return p.slice(3);        // /en/foo/ -> /foo/
    if (p === "" || p === "/") return "/en/";               // ES home -> EN home
    return "/en" + p;                                       // /foo/ -> /en/foo/
  }

  function init() {
    var floater = document.getElementById("trp-floater-ls");
    if (!floater) return;

    var target = counterpart(location.pathname);

    // Point every *enabled* switch link at the URL-derived counterpart. This
    // both fixes pages with stale links and future-proofs newly added pages.
    var list = document.getElementById("trp-floater-ls-language-list");
    if (list) {
      var links = list.querySelectorAll("a");
      for (var i = 0; i < links.length; i++) {
        if (links[i].className.indexOf("trp-ls-disabled-language") !== -1) continue;
        links[i].setAttribute("href", target);
      }
    }

    // Make the floater open on click/tap/keyboard, not just CSS :hover, so it
    // works on touch devices where there is no hover state.
    var current = document.getElementById("trp-floater-ls-current-language");
    if (current) {
      current.setAttribute("role", "button");
      current.setAttribute("tabindex", "0");
      current.setAttribute("aria-label", "Change language");
      current.style.cursor = "pointer";

      var toggle = function (e) {
        e.preventDefault();
        floater.classList.toggle("trp-open");
      };
      current.addEventListener("click", toggle);
      current.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") toggle(e);
      });
    }

    // Dismiss the open list when tapping elsewhere.
    document.addEventListener("click", function (e) {
      if (!floater.contains(e.target)) floater.classList.remove("trp-open");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
