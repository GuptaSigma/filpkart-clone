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
