/**
 * main.js — REC CENTER
 * Handles:
 *   1. Age-group filter on the Youth Programs page
 *   2. Payment form validation + confirmation reveal on Register page
 *   3. Card number / expiry auto-formatting for better UX
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ══════════════════════════════════════════════════════════════════
     1. YOUTH PROGRAMS FILTER
     Filters .prog-item cards by data-age attribute when a .btn-filter
     pill is clicked. Updates aria-pressed for screen readers.
  ══════════════════════════════════════════════════════════════════ */
  const filterBtns = document.querySelectorAll('.btn-filter');
  const progItems  = document.querySelectorAll('.prog-item');
  const noResults  = document.getElementById('no-results');

  if (filterBtns.length > 0) {

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {

        // Update active state visually + ARIA
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        var selected = btn.getAttribute('data-filter'); // e.g. "4-6" or "all"
        var visible  = 0;

        progItems.forEach(function (item) {
          // data-age may contain multiple ranges separated by spaces
          var ages = item.getAttribute('data-age') || '';

          if (selected === 'all' || ages.indexOf(selected) !== -1) {
            // Show: remove hidden, animate in
            item.classList.remove('d-none');
            item.classList.add('animate__animated', 'animate__fadeIn');
            visible++;
          } else {
            // Hide
            item.classList.add('d-none');
            item.classList.remove('animate__animated', 'animate__fadeIn');
          }
        });

        // Show "no results" message if nothing matched
        if (noResults) {
          if (visible === 0) {
            noResults.classList.remove('d-none');
          } else {
            noResults.classList.add('d-none');
          }
        }
      });
    });
  }


  /* ══════════════════════════════════════════════════════════════════
     2. PAYMENT FORM — VALIDATION + CONFIRMATION
     On submit, checks that card number, expiry, CVV, name, and the
     terms checkbox are all filled. If valid, hides error and shows
     the confirmation panel. Invalid shows the error alert.
  ══════════════════════════════════════════════════════════════════ */
  var payForm = document.getElementById('payment-form');

  if (payForm) {
    payForm.addEventListener('submit', function (e) {
      // Prevent real submission (static site)
      e.preventDefault();

      var cardNum   = document.getElementById('card-number');
      var expiry    = document.getElementById('expiry');
      var cvv       = document.getElementById('cvv');
      var cardName  = document.getElementById('card-name');
      var agreeChk  = document.getElementById('agree-terms');
      var errorBox  = document.getElementById('form-error');
      var confirmEl = document.getElementById('confirmation-box');

      // Simple presence check — all fields must be non-empty and checkbox ticked
      var valid = (
        cardNum.value.trim().length > 0 &&
        expiry.value.trim().length  > 0 &&
        cvv.value.trim().length     > 0 &&
        cardName.value.trim().length > 0 &&
        agreeChk.checked
      );

      if (!valid) {
        // Show error message, focus it for screen readers
        errorBox.classList.remove('d-none');
        errorBox.focus();
      } else {
        // Hide error, show confirmation panel, scroll to it
        errorBox.classList.add('d-none');
        if (confirmEl) {
          confirmEl.classList.remove('d-none');
          confirmEl.classList.add('animate__animated', 'animate__fadeInUp');
          confirmEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Disable the submit button to prevent double-submission
        payForm.querySelector('.btn-submit').disabled = true;
        payForm.querySelector('.btn-submit').textContent = 'Submitted ✓';
      }
    });
  }


  /* ══════════════════════════════════════════════════════════════════
     3. CARD NUMBER AUTO-FORMATTING
     Inserts a space every 4 digits as the user types for readability
     e.g. "1234 5678 9012 3456"
  ══════════════════════════════════════════════════════════════════ */
  var cardInput = document.getElementById('card-number');
  if (cardInput) {
    cardInput.addEventListener('input', function () {
      // Strip all non-digits, then add spaces every 4 chars
      var digits  = this.value.replace(/\D/g, '').substring(0, 16);
      var spaced  = digits.replace(/(.{4})/g, '$1 ').trim();
      this.value  = spaced;
    });
  }

  /* Expiry auto-format: inserts " / " after 2 digits */
  var expiryInput = document.getElementById('expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').substring(0, 4);
      if (v.length >= 3) {
        this.value = v.substring(0, 2) + ' / ' + v.substring(2);
      } else {
        this.value = v;
      }
    });
  }

});
