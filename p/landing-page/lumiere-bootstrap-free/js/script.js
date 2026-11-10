$(function () {
  var selectedRingSize = "EU 52";

  var $searchPopup = $('#search-popup');
  var $searchOpenBtn = $('#search-open-btn');
  var $searchCloseBtn = $('#search-close-btn');
  var $searchInput = $('#search-input');

  var $cartDrawer = $('#cart-drawer');
  var $cartOpenBtn = $('#cart-open-btn');
  var $cartCloseBtn = $('#cart-close-btn');
  var $cartOverlay = $('#cart-overlay');
  var $cartPanel = $('#cart-panel');
  var $viewBagCloseBtn = $('#view-bag-close');

  var $sizeOptions = $('.size-option');
  var $selectedSizeText = $('#selected-size-text');

  function openSearchPopup() {
    $searchPopup.removeClass('hidden');
    setTimeout(function () { $searchPopup.addClass('opacity-100'); }, 10);
    $('body').addClass('no-scroll');
    if ($searchInput.length) setTimeout(function () { $searchInput.trigger('focus'); }, 50);
  }

  function closeSearchPopup() {
    $searchPopup.removeClass('opacity-100');
    setTimeout(function () {
      $searchPopup.addClass('hidden');
      $('body').removeClass('no-scroll');
    }, 200);
  }

  function openCartDrawer() {
    $cartDrawer.removeClass('hidden');
    setTimeout(function () {
      $cartDrawer.addClass('opacity-100');
      $cartPanel.removeClass('translate-x-full');
    }, 10);
    $('body').addClass('no-scroll');
  }

  function closeCartDrawer() {
    $cartPanel.addClass('translate-x-full');
    $cartDrawer.removeClass('opacity-100');
    setTimeout(function () {
      $cartDrawer.addClass('hidden');
      $('body').removeClass('no-scroll');
    }, 250);
  }

  function addToCart(name, price, size) {
    // Demo-only add-to-cart hook; opens the cart drawer so the interaction is visible.
    openCartDrawer();
  }

  // Size selection logic
  $sizeOptions.on('click', function () {
    var $opt = $(this);
    $sizeOptions.removeClass('bg-primary text-on-primary').addClass('bg-surface-container-low');
    $opt.removeClass('bg-surface-container-low').addClass('bg-primary text-on-primary');
    var newSize = $opt.attr('data-size');
    if (newSize) {
      selectedRingSize = newSize;
      $selectedSizeText.text('Selected: ' + selectedRingSize + ' (Standard Medium)');
    }
  });

  // Quick add from recommendations
  $('.add-to-cart-quick').on('click', function (e) {
    e.stopPropagation();
    var name = $(this).attr('data-name');
    var price = parseFloat($(this).attr('data-price'));
    if (name && price) addToCart(name, price, 'One Size');
  });

  // Search functionality: alert demo
  $searchInput.on('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var query = $searchInput.val().trim();
      if (query) alert('🔍 Searching for "' + query + '" (demo). In production, this would show product results.');
      else alert('Please enter a search term.');
      closeSearchPopup();
      $searchInput.val('');
    }
  });

  // Event listeners for modals
  $searchOpenBtn.on('click', openSearchPopup);
  $searchCloseBtn.on('click', closeSearchPopup);
  $cartOpenBtn.on('click', openCartDrawer);
  $cartCloseBtn.on('click', closeCartDrawer);
  $cartOverlay.on('click', closeCartDrawer);
  $viewBagCloseBtn.on('click', closeCartDrawer);

  // Prevent closing when clicking inside panel
  $cartPanel.on('click', function (e) { e.stopPropagation(); });

  var $searchInner = $searchPopup.find('.w-100').first();
  $searchInner.on('click', function (e) { e.stopPropagation(); });
  $searchPopup.on('click', closeSearchPopup);

  // Close on escape key
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($searchPopup.length && !$searchPopup.hasClass('hidden')) closeSearchPopup();
      if ($cartDrawer.length && !$cartDrawer.hasClass('hidden')) closeCartDrawer();
    }
  });
});
