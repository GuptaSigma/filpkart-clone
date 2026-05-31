<<<<<<< HEAD
// =============================================
// script.js — Flipkart Clone (Fixed)
// =============================================

// BUG FIX 1: cartCount was duplicated (also declared in filpkart.html inline script).
// This file now owns the global cart state; inline script in filpkart.html removed.
let cartCount = 0;

// BUG FIX 2: querySelector ran before DOM was ready — wrapped in DOMContentLoaded.
document.addEventListener("DOMContentLoaded", () => {

  const cartLink = document.getElementById("cart-link");

  // ── Add-to-Cart buttons (class="add-to-cart") ─────────────────────────────
  // BUG FIX 3: filpkart.html used class "add-to-cart-btn" on older cards and
  // "add-to-cart" on newer ones.  The JS only listened to ".add-to-cart".
  // Unified: all buttons now use "add-to-cart-btn" in HTML; script listens to both.
  const addToCartButtons = document.querySelectorAll(".add-to-cart, .add-to-cart-btn");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      cartCount++;
      if (cartLink) cartLink.textContent = `Cart (${cartCount})`;
      alert("Product added to cart!");
    });
  });

  // ── Filter products ────────────────────────────────────────────────────────
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter    = document.getElementById("priceFilter");
  const productCards   = document.querySelectorAll(".product-card");

  function filterProducts() {
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";
    const selectedPrice    = priceFilter    ? priceFilter.value    : "all";

    productCards.forEach(card => {
      const category = card.dataset.category;
      // BUG FIX 4: `const category` was declared twice in the same block —
      // the second declaration shadowed the first with the price value.
      // Fixed: renamed second variable to `price`.
      const price = parseFloat(card.dataset.price);

      let categoryMatch = selectedCategory === "all" || selectedCategory === category;
      let priceMatch    = false;

      if (selectedPrice === "all")          priceMatch = true;
      else if (selectedPrice === "0-1000")  priceMatch = price <= 1000;
      else if (selectedPrice === "1000-5000") priceMatch = price > 1000 && price <= 5000;
      else if (selectedPrice === "5000+")   priceMatch = price > 5000;

      card.style.display = (categoryMatch && priceMatch) ? "block" : "none";
    });
  }

  if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);
  if (priceFilter)    priceFilter.addEventListener("change", filterProducts);

  // ── Sort by price ──────────────────────────────────────────────────────────
  const sortPriceSelect = document.getElementById("sortPrice");

  if (sortPriceSelect) {
    sortPriceSelect.addEventListener("change", () => {
      const selectedOption = sortPriceSelect.value;
      const container  = document.querySelector(".product-container");
      if (!container) return;

      const cardsArray = Array.from(container.querySelectorAll(".product-card"));

      cardsArray.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        if (selectedOption === "low-high")  return priceA - priceB;
        if (selectedOption === "high-low")  return priceB - priceA;
        return 0;
      });

      container.innerHTML = "";
      cardsArray.forEach(card => container.appendChild(card));
    });
  }

  // ── Wishlist buttons ───────────────────────────────────────────────────────
  const wishlistButtons = document.querySelectorAll(".wishlist-btn");

  wishlistButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.textContent = "💖 Wishlisted";
      button.disabled = true;
      alert("Added to Wishlist!");
    });
  });

  // ── Carousel auto-scroll ───────────────────────────────────────────────────
  const slider = document.getElementById("slider");
  if (slider) {
    let scrollAmount = 0;
    setInterval(() => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      scrollAmount += 210;
      if (scrollAmount > maxScroll) scrollAmount = 0;
      slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 3000);
  }

});

// ── Global helpers (called inline from HTML onclick attributes) ──────────────
// BUG FIX 5: addToCart / buyNow were defined inside filpkart.html's inline
// <script> AND used onclick="…".  Moved here so they're available globally.
function addToCart(name, price) {
  cartCount++;
  const cartLink = document.getElementById("cart-link");
  if (cartLink) cartLink.textContent = `Cart (${cartCount})`;
  alert(`${name} added to cart.`);
}

function buyNow(name, price) {
  // BUG FIX 6: footer had "©@035" — typo for "©2025".
  // (Noted here; fixed in filpkart.html below.)
  alert(`Proceed to buy ${name} for ₹${price}`);
}
=======
// Cart count value
let cartCount = 0;

const cartLink = document.getElementById("cart-link");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    cartCount++;
    cartLink.textContent = `Cart (${cartCount})`;
    alert("Product added to cart");
  });
});
 
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const productCards = document.querySelectorAll(".product-card");

function filterProducts(){
const selectedCategory=categoryFilter.value;
const selectedPrice=priceFilter.value;

productCards.forEach(card=> {
const category = card.dataset.category;
const category = parseFloat(card.dataset.price);

let categoryMatch = selectedCategory === "all" || selectedCategory === category;
    let priceMatch = false;

    if (selectedPrice === "all") priceMatch = true;
    else if (selectedPrice === "0-1000") priceMatch = price <= 1000;
    else if (selectedPrice === "1000-5000") priceMatch = price > 1000 && price <= 5000;
    else if (selectedPrice === "5000+") priceMatch = price > 5000;

    if (categoryMatch && priceMatch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);

const sortPriceSelect = document.getElementById("sortPrice");

sortPriceSelect.addEventListener("change", () => {
  const selectedOption = sortPriceSelect.value;

  const container = document.querySelector(".product-container");
  const cardsArray = Array.from(container.querySelectorAll(".product-card"));

  cardsArray.sort((a, b) => {
    const priceA = parseFloat(a.dataset.price);
    const priceB = parseFloat(b.dataset.price);

    if (selectedOption === "low-high") {
      return priceA - priceB;
    } else if (selectedOption === "high-low") {
      return priceB - priceA;
    }
    return 0;
  });

  // Clear and re-append sorted cards
  container.innerHTML = "";
  cardsArray.forEach(card => container.appendChild(card));
});
const wishlistButtons = document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.textContent = "💖 Wishlisted";
    button.disabled = true;
    alert("Added to Wishlist!");
  });
});
>>>>>>> d66d18c2c297b9122c09a0ee563f80b317696849
