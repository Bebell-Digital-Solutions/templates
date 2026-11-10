$(function () {
  var $rows = $('.cart-row');
  var $subtotal = $('#cart-page-subtotal');
  var $total = $('#cart-page-total');
  var $shipping = $('#cart-page-shipping');
  var $promoInput = $('#promo-code-input');
  var $promoBtn = $('#promo-code-btn');
  var $emptyMessage = $('#cart-empty-message');
  var $cartTable = $('#cart-table-wrapper');

  function currency(n) {
    return '£' + n.toFixed(2);
  }

  function recalc() {
    var subtotal = 0;
    $('.cart-row').each(function () {
      var price = parseFloat($(this).attr('data-price'));
      var qty = parseInt($(this).find('.qty-value').val(), 10) || 1;
      var lineTotal = price * qty;
      $(this).find('.line-total').text(currency(lineTotal));
      subtotal += lineTotal;
    });

    var shipping = subtotal > 0 ? 15 : 0;
    $subtotal.text(currency(subtotal));
    $shipping.text(shipping ? currency(shipping) : 'Free');
    $total.text(currency(subtotal + shipping));

    var hasItems = $('.cart-row').length > 0;
    $cartTable.toggle(hasItems);
    $emptyMessage.toggle(!hasItems);
  }

  $(document).on('click', '.qty-increment', function () {
    var $input = $(this).siblings('.qty-value');
    $input.val(parseInt($input.val(), 10) + 1);
    recalc();
  });

  $(document).on('click', '.qty-decrement', function () {
    var $input = $(this).siblings('.qty-value');
    var val = parseInt($input.val(), 10);
    if (val > 1) $input.val(val - 1);
    recalc();
  });

  $(document).on('change', '.qty-value', recalc);

  $(document).on('click', '.remove-cart-row', function () {
    $(this).closest('.cart-row').fadeOut(200, function () {
      $(this).remove();
      recalc();
    });
  });

  $promoBtn.on('click', function () {
    var code = $promoInput.val().trim();
    if (code) alert('Promo code "' + code + '" is not valid (demo).');
    else alert('Please enter a promo code.');
  });

  recalc();
});
