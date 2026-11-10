/* =========================================================
   Gloria - Fashion Store HTML Template
   Main JS
   HTML template by TemplatesJungle (https://www.templatesjungle.com)
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initPreloader();
    initStickyHeader();
    initMobileMenu();
    initBackToTop();
    initHeroLetters();
    initHeroTextPagination();
    initQuickView();
    initWishlist();
    initQtyInputs();
    initSizeSwatches();
    initColorSwatches();
    initGalleryThumbs();
    initForms();
    initYear();
  });

  function initPreloader() {
    var pre = document.getElementById("preloader");
    if (!pre) return;
    window.addEventListener("load", function () {
      setTimeout(function () { pre.classList.add("hide"); }, 200);
    });
  }

  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header || header.classList.contains("header-static")) return;
    function onScroll() {
      if (window.scrollY > 60) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  function initMobileMenu() {
    document.querySelectorAll(".mobile-menu .nav-list > li > a").forEach(function (link) {
      var sub = link.nextElementSibling;
      if (!sub || !sub.classList.contains("sub-list")) return;
      link.addEventListener("click", function (e) {
        e.preventDefault();
        sub.classList.toggle("show");
        var icon = link.querySelector(".bi");
        if (icon) icon.classList.toggle("bi-chevron-down");
        if (icon) icon.classList.toggle("bi-chevron-up");
      });
    });
  }

  function initHeroLetters() {
    document.querySelectorAll("#heroTextSlides .hero-title").forEach(function (el) {
      var text = el.textContent;
      var inner = document.createElement("span");
      inner.setAttribute("aria-hidden", "true");
      text.split("").forEach(function (ch, i) {
        var letter = document.createElement("span");
        letter.className = "letter";
        letter.style.transitionDelay = (i * 45) + "ms";
        letter.textContent = ch === " " ? " " : ch;
        inner.appendChild(letter);
      });
      el.setAttribute("aria-label", text);
      el.innerHTML = "";
      el.appendChild(inner);
    });
  }

  function initHeroTextPagination() {
    var wrap = document.getElementById("heroTextSlides");
    var index = document.getElementById("heroTextIndex");
    if (!wrap || !index) return;

    var slides = Array.prototype.slice.call(wrap.querySelectorAll(".hero-text-slide"));
    var buttons = Array.prototype.slice.call(index.querySelectorAll("[data-slide-to]"));
    var current = 0;
    var timer;

    function goTo(newIndex, forward) {
      if (newIndex === current || !slides[newIndex]) return;
      var oldSlide = slides[current];
      var newSlide = slides[newIndex];

      if (forward) {
        newSlide.classList.remove("exit-left");
      } else {
        newSlide.classList.add("exit-left");
      }
      void newSlide.offsetWidth; // force reflow so the resting position applies before animating

      oldSlide.classList.remove("active");
      oldSlide.classList.toggle("exit-left", forward);

      newSlide.classList.remove("exit-left");
      newSlide.classList.add("active");

      buttons.forEach(function (btn, i) {
        btn.classList.toggle("active", i === newIndex);
        btn.setAttribute("aria-current", i === newIndex ? "true" : "false");
      });

      current = newIndex;
    }

    function next() {
      goTo((current + 1) % slides.length, true);
    }

    function startAutoplay() {
      timer = setInterval(next, 6000);
    }

    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        goTo(i, i > current);
        clearInterval(timer);
        startAutoplay();
      });
    });

    startAutoplay();
  }

  function initQuickView() {
    var modalEl = document.getElementById("quickViewModal");
    if (!modalEl || !window.bootstrap) return;
    var modal = new bootstrap.Modal(modalEl);

    var qvImage = modalEl.querySelector(".qv-image");
    var qvTitle = modalEl.querySelector(".qv-title");
    var qvPrice = modalEl.querySelector(".qv-price");
    var qvDetailLink = modalEl.querySelector(".qv-detail-link");
    var openerCard = null;

    modalEl.addEventListener("hidden.bs.modal", function () {
      if (!openerCard) return;
      var card = openerCard;
      openerCard = null;
      card.classList.add("suppress-hover");
      document.addEventListener("mousemove", function clear() {
        card.classList.remove("suppress-hover");
        document.removeEventListener("mousemove", clear);
      });
    });

    document.querySelectorAll(".quick-view-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".product-card");
        if (!card) return;
        openerCard = card;
        var img = card.querySelector(".product-thumb img");
        var title = card.querySelector(".product-title");
        var price = card.querySelector(".product-price");
        var detailLink = card.querySelector(".product-thumb a");

        if (img && qvImage) { qvImage.src = img.src; qvImage.alt = img.alt; }
        if (title && qvTitle) qvTitle.textContent = title.textContent;
        if (price && qvPrice) qvPrice.innerHTML = price.innerHTML;
        if (detailLink && qvDetailLink) {
          qvDetailLink.setAttribute("href", detailLink.getAttribute("href"));
          var target = detailLink.getAttribute("target");
          if (target) {
            qvDetailLink.setAttribute("target", target);
            qvDetailLink.setAttribute("rel", "noopener");
          } else {
            qvDetailLink.removeAttribute("target");
            qvDetailLink.removeAttribute("rel");
          }
        }

        modal.show();
      });
    });
  }

  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) btn.classList.add("show");
      else btn.classList.remove("show");
    });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function getCount(key) {
    return parseInt(localStorage.getItem(key) || "0", 10);
  }
  function setCount(key, val) {
    localStorage.setItem(key, String(val));
    document.querySelectorAll('[data-count="' + key + '"]').forEach(function (el) {
      el.textContent = val;
    });
  }

  function initWishlist() {
    setCount("gloria_wishlist", getCount("gloria_wishlist"));
    setCount("gloria_cart", getCount("gloria_cart"));

    document.querySelectorAll(".product-wishlist-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var active = btn.classList.toggle("active");
        var icon = btn.querySelector("i");
        if (icon) {
          icon.classList.toggle("bi-heart", !active);
          icon.classList.toggle("bi-heart-fill", active);
        }
        var count = getCount("gloria_wishlist") + (active ? 1 : -1);
        if (count < 0) count = 0;
        setCount("gloria_wishlist", count);
      });
    });

    document.querySelectorAll(".add-to-cart-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        setCount("gloria_cart", getCount("gloria_cart") + 1);
        var original = btn.innerHTML;
        btn.innerHTML = "Added <i class=\"bi bi-check2\"></i>";
        setTimeout(function () { btn.innerHTML = original; }, 1200);
      });
    });
  }

  function initQtyInputs() {
    document.querySelectorAll(".qty-input").forEach(function (wrap) {
      var input = wrap.querySelector("input");
      var minus = wrap.querySelector(".qty-minus");
      var plus = wrap.querySelector(".qty-plus");
      if (!input) return;
      minus && minus.addEventListener("click", function () {
        var v = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
        input.value = v;
      });
      plus && plus.addEventListener("click", function () {
        var v = (parseInt(input.value, 10) || 1) + 1;
        input.value = v;
      });
    });
  }

  function initSizeSwatches() {
    document.querySelectorAll(".size-swatch-group").forEach(function (group) {
      group.querySelectorAll(".size-swatch").forEach(function (swatch) {
        swatch.addEventListener("click", function () {
          group.querySelectorAll(".size-swatch").forEach(function (s) { s.classList.remove("active"); });
          swatch.classList.add("active");
        });
      });
    });
  }

  function initColorSwatches() {
    document.querySelectorAll(".color-swatch-group").forEach(function (group) {
      group.querySelectorAll(".color-swatch").forEach(function (swatch) {
        swatch.addEventListener("click", function () {
          group.querySelectorAll(".color-swatch").forEach(function (s) { s.classList.remove("active"); });
          swatch.classList.add("active");
        });
      });
    });
  }

  function initGalleryThumbs() {
    var main = document.querySelector(".pd-gallery-main img");
    if (!main) return;
    document.querySelectorAll(".pd-gallery-thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        document.querySelectorAll(".pd-gallery-thumb").forEach(function (t) { t.classList.remove("active"); });
        thumb.classList.add("active");
        var img = thumb.querySelector("img");
        if (img) main.src = img.dataset.full || img.src;
      });
    });
  }

  function showAlert(container, type, message) {
    if (!container) return;
    container.innerHTML =
      '<div class="alert alert-' + type + ' py-2 mb-0" role="alert">' + message + "</div>";
  }

  function initForms() {
    // Generic Bootstrap-validated forms (contact, newsletter, login, register)
    document.querySelectorAll("form.needs-validation").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
          form.classList.add("was-validated");
          return;
        }
        form.classList.add("was-validated");

        var feedback = form.querySelector(".form-feedback");
        var submitBtn = form.querySelector('[type="submit"]');
        var action = form.getAttribute("action");
        var originalLabel = submitBtn ? submitBtn.innerHTML : "";

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = "Sending...";
        }

        if (action && action.indexOf(".php") !== -1) {
          fetch(action, { method: "POST", body: new FormData(form) })
            .then(function (res) { return res.json().catch(function () { return { success: res.ok }; }); })
            .then(function (data) {
              if (data.success) {
                showAlert(feedback, "success", data.message || "Thank you! Your message has been sent successfully.");
                form.reset();
                form.classList.remove("was-validated");
              } else {
                showAlert(feedback, "danger", data.message || "Something went wrong. Please try again.");
              }
            })
            .catch(function () {
              showAlert(feedback, "success", "Thank you! Your message has been received. (Demo mode - connect contact.php to a live PHP server to send real emails.)");
              form.reset();
              form.classList.remove("was-validated");
            })
            .finally(function () {
              if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalLabel; }
            });
        } else {
          setTimeout(function () {
            showAlert(feedback, "success", "Thank you! Your submission was received.");
            form.reset();
            form.classList.remove("was-validated");
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalLabel; }
          }, 700);
        }
      });
    });
  }

  function initYear() {
    document.querySelectorAll(".current-year").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  // Re-bind dynamic interactions after shop-data.js injects product markup
  window.GloriaInitDynamic = function () {
    initWishlist();
    initQtyInputs();
    initSizeSwatches();
    initColorSwatches();
    initGalleryThumbs();
  };
})();
