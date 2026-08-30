/* Tiny Home-button injector. Computes the site index from location.pathname
   so the same file works on chse1971.com (/) and GitHub project pages
   (/CHSE1971/). Omit this script on the homepage (it also no-ops there). */
(function () {
  "use strict";
  if (document.getElementById("chse-home-btn")) return;

  function homeHref() {
    var path = location.pathname || "/";
    var m = path.match(/^(\/CHSE1971)(?=\/|$)/i);
    return m ? m[1] + "/" : "/";
  }

  function isHome() {
    var path = (location.pathname || "/").replace(/\/index\.html?$/i, "/");
    if (path.charAt(path.length - 1) !== "/") path += "/";
    return path === homeHref();
  }

  if (isHome()) return;

  var a = document.createElement("a");
  a.id = "chse-home-btn";
  a.className = "chse-home-btn";
  a.href = homeHref();
  a.setAttribute("aria-label", "Home");
  a.title = "Home";
  a.appendChild(document.createTextNode("Home"));

  function mount() {
    if (document.getElementById("chse-home-btn")) return;
    (document.body || document.documentElement).appendChild(a);
  }

  if (document.body) mount();
  else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
