let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.products-container .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});

// add to card  JS
const carticon = document.querySelector("#carticon");
const cart = document.querySelector(".cart");
const cartclose = document.querySelector("#cart-close");
carticon.addEventListener("click", () => cart.classList.add("active"));
cartclose.addEventListener("click", () => cart.classList.remove("active"));

const addcartbutton = document.querySelectorAll(".buy");
addcartbutton.forEach(buttons => {
buttons.addEventListener("click", event =>{
  const previewBox =event.target.closest(".preview");
  Addtocart(previewBox);
});
});
const cartcontent = document.querySelector(".cart-content");
const Addtocart = previewBox =>{
  const  productImg = previewBox.querySelector("img").src;
  const  productTittle = previewBox.querySelector("h3").textContent;
  const  productPrice = previewBox.querySelector(".price").textContent;

  const cartitems= cartcontent.querySelectorAll('.cart-product-tittle');
  for (let items of cartitems){
    if(items.textContent === productTittle){
      alert("this is already in the cart..");
    }
  }
  const cartbox = document.createElement('div');
  cartbox.classList.add('cart-box');
  cartbox.innerHTML =`
  <img src="${productImg}" class="cart-img">
         <div class="cart-detail">
            <h2 class="cart-product-tittle">${productTittle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
               <button id="decrement">-</button>
               <span class='number'>1</span>
               <button id="increment">+</button>
            </div>
         </div>
         <i class="fa-solid fa-trash-can cart-remove"></i>
         `;
         cartcontent.appendChild(cartbox);
        
         cartbox.querySelector(".cart-remove").addEventListener("click", () => {
         cartbox.remove();

         updatecartcount(-1);

         updateTotalPrice();
         
      });

         cartbox.querySelector(".cart-quantity").addEventListener("click", event => {
          const numberelement = cartbox.querySelector(".number");
          const decrementbutton = cartbox.querySelector("#decrement");
          let quantity= numberelement.textContent;
          if(event.target.id === 'decrement' && quantity > 1){
            quantity--;
            if(quantity === 1) {
              decrementbutton.style.color = "#999";
            }
          } else if(event.target.id === 'increment') {
            quantity++;
            decrementbutton.style.color = "#333";
          }
          numberelement.textContent = quantity;

          updateTotalPrice();
       });

       updatecartcount(1);
       updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  const cartBoxes =cartcontent.querySelectorAll(".cart-box");
  let total = 0;
  cartBoxes.forEach(cartbox => {
    const priceElement = cartbox.querySelector(".cart-price");
    const quantityElement = cartbox.querySelector(".number");
    const price = priceElement.textContent.replace("Rs", "");
    const quantity = quantityElement.textContent;
    total += price * quantity;
  });
  totalPriceElement.textContent = `Rs${total}`;
};

let cartitemcount = 0;
const updatecartcount = change => {
  const cartitemcountbadge =document.querySelector(".cart-item-count");
  cartitemcount += change;
  if(cartitemcount > 0){
    cartitemcountbadge.style.visibility = "visible";
    cartitemcountbadge.textContent = cartitemcount;
  }
  else{
    cartitemcountbadge.style.visibility = "hidden";
    cartitemcountbadge.textContent = "";

  }
};

const buynowbutton =document.querySelector(".btn-buy");
buynowbutton.addEventListener("click", () => {
  const cartBoxs = cartcontent.querySelectorAll(".cart-box");
  if(
    cartBoxs.length === 0){
      alert("your cart is epmty. Please add items to your cart before buying..");
      return;
    }
    cartBoxs.forEach(cartbox => cartbox.remove());
    cartitemcount = 0;
    updatecartcount(0);

    updateTotalPrice();
    alert("Thank you for your purchase!");
});
//side navbar
// Toggle the visibility of a dropdown menu
const toggleDropdown = (dropdown, menu, isOpen) => {
    dropdown.classList.toggle("open", isOpen);
    menu.style.height = isOpen ? `${menu.scrollHeight}px` : 0;
  };
  // Close all open dropdowns
  const closeAllDropdowns = () => {
    document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
      toggleDropdown(openDropdown, openDropdown.querySelector(".dropdown-menu"), false);
    });
  };
  // Attach click event to all dropdown toggles
  document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const dropdown = dropdownToggle.closest(".dropdown-container");
      const menu = dropdown.querySelector(".dropdown-menu");
      const isOpen = dropdown.classList.contains("open");
      closeAllDropdowns(); // Close all open dropdowns
      toggleDropdown(dropdown, menu, !isOpen); // Toggle current dropdown visibility
    });
  });
  // Attach click event to sidebar toggle buttons
  document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
    button.addEventListener("click", () => {
      closeAllDropdowns(); // Close all open dropdowns
      document.querySelector(".sidebar").classList.toggle("collapsed"); // Toggle collapsed class on sidebar
    });
  });
  // Collapse sidebar by default on small screens
  if (window.innerWidth <= 1024) document.querySelector(".sidebar").classList.add("collapsed");