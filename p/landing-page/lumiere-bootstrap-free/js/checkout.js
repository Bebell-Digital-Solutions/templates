$(function () {
  var $cardFields = $('#card-fields');
  var $paymentRadios = $('input[name="payment-method"]');
  var $form = $('#checkout-form');

  $paymentRadios.on('change', function () {
    $cardFields.toggle($('#pay-card').is(':checked'));
  });

  $form.on('submit', function (e) {
    e.preventDefault();
    alert('🔒 This is a demo checkout — no payment has been processed. In production this would submit your order.');
  });
});
