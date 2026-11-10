(function () {
  function initNavDropdowns() {
    // Applies to every top-level nav dropdown (Home, Collections mega menu,
    // Pages) so they all open on hover on desktop, matching the rest of the
    // navbar's interaction, while still supporting click/keyboard on mobile.
    var items = document.querySelectorAll('.navbar-lumiere .navbar-nav > .nav-item.dropdown');
    items.forEach(function (item) {
      var toggle = item.querySelector(':scope > [data-bs-toggle="dropdown"]');
      if (!toggle || typeof bootstrap === 'undefined') return;
      var dropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
      var showTimer, hideTimer;

      item.addEventListener('mouseenter', function () {
        if (window.innerWidth < 992) return;
        clearTimeout(hideTimer);
        showTimer = setTimeout(function () { dropdown.show(); }, 80);
      });

      item.addEventListener('mouseleave', function () {
        if (window.innerWidth < 992) return;
        clearTimeout(showTimer);
        hideTimer = setTimeout(function () { dropdown.hide(); }, 200);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavDropdowns);
  } else {
    initNavDropdowns();
  }
})();
