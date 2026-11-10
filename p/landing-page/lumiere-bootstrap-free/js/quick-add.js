$(function () {
  var toastEl = document.getElementById('addToCartToast');
  var toast = toastEl ? new bootstrap.Toast(toastEl) : null;

  $(document).on('click', '.add-to-cart-quick', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var name = $(this).attr('data-name') || 'Item';
    $('#addToCartToastBody').text(name + ' added to bag');
    if (toast) toast.show();
  });
});
