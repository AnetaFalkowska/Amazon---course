let grid = "";

products.forEach((product) => {
  grid += `<div class="product-container">
<div class="product-image-container">
  <img class="product-image"
    src=${product.image}>
</div>

<div class="product-name limit-text-to-2-lines">
${product.name}
</div>

<div class="product-rating-container">
  <img class="product-rating-stars"
    src="images/ratings/rating-${product.rating.stars * 10}.png">
  <div class="product-rating-count link-primary">
  ${product.rating.count}
  </div>
</div>

<div class="product-price">
    $${(product.priceCents / 10).toFixed(2)}
</div>

<div class="product-quantity-container">
  <select class="js-quantity-selector-${product.id}">
    <option selected value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>
</div>

<div class="product-spacer"></div>

<div class="added-to-cart js-added-to-cart-${product.id}">
  <img src="images/icons/checkmark.png">
  Added
</div>

<button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
    product.id
  }">
  Add to Cart
</button>
</div>`;
});

document.querySelector(".products-grid").innerHTML = grid;

let addedMessagesTimeouts={}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => { 
    
    const {productId} = button.dataset;      
    const quantity = +document.querySelector(`.js-quantity-selector-${productId}`).value
    const index = cart.findIndex(el => el.productId === productId)
    if (index !== -1) {
        cart[index].quantity += quantity;
    } else {cart.push({productId, quantity})}
    let totalQty=0
    cart.forEach(el=> totalQty+=el.quantity)
    document.querySelector(".js-cart-quantity").innerHTML = totalQty
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
    addedMessage.classList.add("added-to-cart-visible")
    // Check if there's a previous timeout for this
    // product. If there is, we should stop it.
    const existingTimer = addedMessagesTimeouts[productId]
    if (existingTimer) {clearTimeout(existingTimer)}
    const timer = setTimeout(()=>{addedMessage.classList.remove("added-to-cart-visible")}, 2000)
    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    addedMessagesTimeouts[productId] = timer
  });

});
