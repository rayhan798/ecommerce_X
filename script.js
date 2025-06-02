 // Data - restaurant menu items
  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic delight with 100% real mozzarella cheese and tomato sauce.",
      price: 12.99,
      img: "./img/pizza-pizza-filled-with-tomatoes-salami-olives.jpg",
      category: "Pizza"
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      description: "Creamy pasta with pancetta, egg, and Parmesan cheese.",
      price: 14.99,
      img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80",
      category: "Pasta"
    },
     {
      id: 3,
      name: "Caesar Salad",
      description: "Crispy romaine lettuce, Parmesan cheese, and croutons with creamy Caesar dressing.",
      price: 9.99,
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80",
      category: "Salad"
    },
    {
      id: 4,
      name: "Cheeseburger",
      description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and pickles on a toasted bun.",
      price: 11.49,
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
      category: "Burgers"
    },
     {
      id: 5,
      name: "Grilled Salmon",
      description: "Delicious salmon fillet grilled to perfection with lemon butter sauce.",
      price: 18.99,
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      category: "Seafood"
    },
    {
      id: 6,
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
      price: 7.50,
      img: "./img/tasty-homemade-tiramisu-cake.jpg",
      category: "Dessert"
    },
     {
      id: 7,
      name: "Lemonade",
      description: "Freshly squeezed lemonade with a hint of mint.",
      price: 4.00,
      img: "./img/mojito-drink-with-lime-lemon-mint-wood-table.jpg",
      category: "Drinks"
    },
    {
      id: 8,
      name: "Chocolate Brownie",
      description: "Rich chocolate brownie served warm with vanilla ice cream.",
      price: 6.75,
      img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
      category: "Dessert"
    },
    {
      id: 9,
      name: "Grilled Bteak",
      description: "Rich chocolate brownie served warm with vanilla ice cream.",
      price: 6.75,
      img: "./img/grilled-beef-steak-with-fries-grilled-tomato-pepper-sauces.jpg",
      category: "Dessert"
    }
  ];

   // Cart state
  let cart = {};
  // Helpers
  function formatPrice(amount) {
    return '$' + amount.toFixed(2);
  }
  // Render menu items
  function renderMenu() {
    const container = document.getElementById('items-grid');
    container.innerHTML = '';
    menuItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';

        card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" loading="lazy" />
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="price">${formatPrice(item.price)}</div>
          <button class="add-to-cart" data-id="${item.id}">Add to Order</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

    // Render cart
  function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    const totalEl = document.getElementById('cart-total');
    const clearBtn = document.getElementById('clear-cart');
    cartContainer.innerHTML = '';
    const cartEntries = Object.entries(cart);
    if (cartEntries.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartFooter.style.display = 'none';
      clearBtn.style.display = 'none';
      return;
    }
    let total = 0;
    cartEntries.forEach(([idStr, qty]) => {
      const id = parseInt(idStr);
      const item = menuItems.find(i => i.id === id);
      if (!item) return;
      const itemTotal = item.price * qty;
      total += itemTotal;
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
          <span>${qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
        </div>
        <div class="cart-item-price">${formatPrice(itemTotal)}</div>
      `;
      cartContainer.appendChild(itemDiv);
    });
    totalEl.textContent = formatPrice(total);
    cartFooter.style.display = 'flex';
    clearBtn.style.display = 'block';
  }
  // Add to cart
  function addToCart(id) {
    if (cart[id]) {
      cart[id]++;
    } else {
      cart[id] = 1;
    }
    renderCart();
  }
  // Change qty in cart
  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id] += delta;
    if (cart[id] <= 0) {
      delete cart[id];
    }
    renderCart();
  }
  // Clear cart
  function clearCart() {
    cart = {};
    renderCart();
  }
   // Event listeners
  function addEventListeners() {
    // Add to cart buttons
    document.getElementById('items-grid').addEventListener('click', e => {
      if (e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        addToCart(id);
      }
    });
    // Cart qty buttons
    document.getElementById('cart-items').addEventListener('click', e => {
      if (e.target.classList.contains('qty-btn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const action = e.target.getAttribute('data-action');
        changeQty(id, action === 'increase' ? 1 : -1);
      }
    });
     // Clear cart button
    document.getElementById('clear-cart').addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your order?')) {
        clearCart();
      }
    });
  }
  // Initialize
  function init() {
    renderMenu();
    renderCart();
    addEventListeners();
  }
  init();