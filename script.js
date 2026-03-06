// ============================================
// CONFIGURATION - WhatsApp Integration
// ============================================
// Change the phone number below to your restaurant's WhatsApp number
// Format: Country code + Phone number (no +, spaces, or dashes)
// Examples:
//   India: "919876543210" (for +91 9876543210)
//   USA: "15551234567" (for +1 555-123-4567)
//   UK: "447911123456" (for +44 7911 123456)
// ============================================
const WHATSAPP_PHONE_NUMBER = "7970682320";

// Menu Data
const menuData = {
  appetizers: [
    {
      id: 1,
      name: " Rolls",
      description: "Crispy vegetable spring rolls with sweet chili sauce",
      price: 180,
      emoji: "🥟",
      category: "appetizers"
    },
    {
      id: 2,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with spices and mint chutney",
      price: 220,
      emoji: "🍢",
      category: "appetizers"
    },
    {
      id: 3,
      name: "Chicken Wings",
      description: "Spicy buffalo wings with ranch dip",
      price: 280,
      emoji: "🍗",
      category: "appetizers"
    },
    {
      id: 4,
      name: "Bruschetta",
      description: "Toasted bread with tomatoes, basil, and garlic",
      price: 200,
      emoji: "🍞",
      category: "appetizers"
    }
  ],
  mains: [
    {
      id: 5,
      name: "Anni Special Curry",
      description: "Aromatic curry with mixed vegetables and spices",
      price: 320,
      emoji: "🍛",
      category: "mains"
    },
    {
      id: 6,
      name: "Grilled Chicken",
      description: "Tender grilled chicken with herb butter",
      price: 380,
      emoji: "🍖",
      category: "mains"
    },
    {
      id: 7,
      name: "Vegetable Biryani",
      description: "Fragrant basmati rice with vegetables and spices",
      price: 280,
      emoji: "🍚",
      category: "mains"
    },
    {
      id: 8,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato, mozzarella, and basil",
      price: 350,
      emoji: "🍕",
      category: "mains"
    },
    {
      id: 9,
      name: "Pasta Carbonara",
      description: "Creamy pasta with bacon and parmesan",
      price: 340,
      emoji: "🍝",
      category: "mains"
    },
    {
      id: 10,
      name: "Fish & Chips",
      description: "Beer-battered fish with crispy fries",
      price: 360,
      emoji: "🐟",
      category: "mains"
    }
  ],
  desserts: [
    {
      id: 11,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center",
      price: 220,
      emoji: "🍫",
      category: "desserts"
    },
    {
      id: 12,
      name: "Ice Cream Sundae",
      description: "Vanilla ice cream with chocolate sauce and nuts",
      price: 180,
      emoji: "🍨",
      category: "desserts"
    },
    {
      id: 13,
      name: "Cheesecake",
      description: "Creamy New York style cheesecake",
      price: 240,
      emoji: "🍰",
      category: "desserts"
    },
    {
      id: 14,
      name: "Fruit Salad",
      description: "Fresh seasonal fruits with honey",
      price: 150,
      emoji: "🍓",
      category: "desserts"
    }
  ],
  beverages: [
    {
      id: 15,
      name: "Fresh Lime Soda",
      description: "Refreshing lime soda with mint",
      price: 80,
      emoji: "🥤",
      category: "beverages"
    },
    {
      id: 16,
      name: "Mango Smoothie",
      description: "Creamy mango smoothie",
      price: 120,
      emoji: "🥭",
      category: "beverages"
    },
    {
      id: 17,
      name: "Coffee",
      description: "Hot brewed coffee",
      price: 90,
      emoji: "☕",
      category: "beverages"
    },
    {
      id: 18,
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 100,
      emoji: "🍊",
      category: "beverages"
    },
    {
      id: 19,
      name: "Iced Tea",
      description: "Chilled iced tea with lemon",
      price: 85,
      emoji: "🧊",
      category: "beverages"
    }],
  
   anni: [
    {
      id: 20,
      name: "Kuch Nhi",
      description: "NA",
      price: 1000,
      emoji: "🥤",
      category: "anni"
    }
  ] 
  
};

// Cart State
let cart = [];
let currentCategory = "all";

// DOM Elements
const screens = {
  welcome: document.getElementById("welcome-screen"),
  menu: document.getElementById("menu-screen"),
  cart: document.getElementById("cart-screen"),
  confirmation: document.getElementById("confirmation-screen")
};

const orderNowBtn = document.getElementById("order-now-btn");
const backBtn = document.getElementById("back-btn");
const cartBtn = document.getElementById("cart-btn");
const cartBackBtn = document.getElementById("cart-back-btn");
const confirmOrderBtn = document.getElementById("confirm-order-btn");
const newOrderBtn = document.getElementById("new-order-btn");
const cartCount = document.getElementById("cart-count");
const menuItemsContainer = document.getElementById("menu-items");
const cartItemsContainer = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartFooter = document.getElementById("cart-footer");
const totalAmount = document.getElementById("total-amount");
const categoryTabs = document.querySelectorAll(".category-tab");
const orderSummary = document.getElementById("order-summary");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  renderMenu();
  updateCartUI();
  
  // Initialize empty cart state
  if (cart.length === 0) {
    const cartEmpty = document.getElementById("cart-empty");
    cartEmpty.innerHTML = `
      <div class="cart-empty-icon">🛒</div>
      <p>Your cart is empty</p>
      <p style="font-size: 14px; color: var(--muted); margin-top: -8px;">Add items from the menu to get started</p>
      <button class="btn btn-primary" id="browse-menu-btn-init">Browse Menu</button>
    `;
    document.getElementById("browse-menu-btn-init")?.addEventListener("click", () => showScreen("menu"));
  }
  
  // Add event listener to table number input to clear errors on input
  const tableNumberInput = document.getElementById("table-number");
  const tableNumberError = document.getElementById("table-number-error");
  
  if (tableNumberInput) {
    tableNumberInput.addEventListener("input", () => {
      if (tableNumberError) {
        tableNumberError.classList.remove("show");
        tableNumberInput.style.borderColor = "";
      }
    });
    
    // Allow Enter key to submit
    tableNumberInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && cart.length > 0) {
        confirmOrder();
      }
    });
  }
});

// Event Listeners
function setupEventListeners() {
  orderNowBtn?.addEventListener("click", () => showScreen("menu"));
  backBtn?.addEventListener("click", () => showScreen("welcome"));
  cartBtn?.addEventListener("click", () => showScreen("cart"));
  cartBackBtn?.addEventListener("click", () => showScreen("menu"));
  confirmOrderBtn?.addEventListener("click", confirmOrder);
  newOrderBtn?.addEventListener("click", startNewOrder);

  categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      currentCategory = tab.dataset.category;
      categoryTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderMenu();
    });
  });
}

// Screen Navigation
function showScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[screenName]?.classList.add("active");
}

// Render Menu
function renderMenu() {
  const allItems = [
    ...menuData.appetizers,
    ...menuData.mains,
    ...menuData.desserts,
    ...menuData.beverages,
    ...menuData.anni
  ];

  let filteredItems = allItems;
  if (currentCategory !== "all") {
    filteredItems = allItems.filter(item => item.category === currentCategory);
  }

  menuItemsContainer.innerHTML = filteredItems
    .map(
      item => `
    <div class="menu-item">
      <div class="menu-item-image">${item.emoji}</div>
      <div class="menu-item-content">
        <div class="menu-item-header">
          <h3 class="menu-item-name">${item.name}</h3>
          <span class="menu-item-price">₹${item.price}</span>
        </div>
        <p class="menu-item-description">${item.description}</p>
        <div class="menu-item-footer">
          <span class="menu-item-category">${item.category}</span>
          <button class="view-ar-btn" onclick="href=window.location.href='https://ar-code.com/kjFkVPZSD';">
            view AR
          </button>
          <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Cart Functions
function addToCart(itemId) {
  const allItems = [
    ...menuData.appetizers,
    ...menuData.mains,
    ...menuData.desserts,
    ...menuData.beverages,
    ...menuData.anni
  ];
  const item = allItems.find(i => i.id === itemId);

  if (!item) return;

  const existingItem = cart.find(i => i.id === itemId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCartUI();
 
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartUI();
}

function updateQuantity(itemId, change) {
  const item = cart.find(i => i.id === itemId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(itemId);
  } else {
    updateCartUI();
  }
}

function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Show/hide empty state
  if (cart.length === 0) {
    cartEmpty.innerHTML = `
      <div class="cart-empty-icon">🛒</div>
      <p>Your cart is empty</p>
      <p style="font-size: 14px; color: var(--muted); margin-top: -8px;">Add items from the menu to get started</p>
      <button class="btn btn-primary" id="browse-menu-btn">Browse Menu</button>
    `;
    cartEmpty.style.display = "flex";
    cartItemsContainer.style.display = "none";
    cartFooter.style.display = "none";
    confirmOrderBtn.disabled = true;
    
    // Re-attach event listener for browse menu button
    document.getElementById("browse-menu-btn")?.addEventListener("click", () => showScreen("menu"));
  } else {
    cartEmpty.style.display = "none";
    cartItemsContainer.style.display = "flex";
    cartFooter.style.display = "flex";
    confirmOrderBtn.disabled = false;

    // Render cart items
    cartItemsContainer.innerHTML = cart
      .map(
        item => `
      <div class="cart-item">
        <div class="cart-item-image">${item.emoji}</div>
        <div class="cart-item-content">
          <div class="cart-item-header">
            <h3 class="cart-item-name">${item.name}</h3>
            <div class="cart-item-price-info">
              <span class="cart-item-unit-price">₹${item.price} × ${item.quantity}</span>
              <span class="cart-item-price">₹${item.price * item.quantity}</span>
            </div>
          </div>
          <div class="cart-item-controls">
            <div class="cart-item-left">
              <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
              </div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
              <span>🗑️</span>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    // Update totals
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    document.getElementById("item-count").textContent = itemCount;
    document.getElementById("subtotal-amount").textContent = `₹${total}`;
    totalAmount.textContent = `₹${total}`;
  }
}

// Format WhatsApp Message
function formatWhatsAppMessage(tableNumber) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  let message = `🍽️ *NEW ORDER - Anni Cafe*\n\n`;
  message += `🪑 *Table Number:* ${tableNumber}\n`;
  message += `🗓️ *Date:* ${new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}\n\n`;
  message += `📋 *Order Details:*\n`;
  message += `${'─'.repeat(25)}\n\n`;
  
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.emoji} *${item.name}*\n`;
    message += `   Quantity: ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}\n\n`;
  });
  
  message += `${'─'.repeat(25)}\n`;
  message += `📦 Total Items: ${itemCount}\n`;
  message += `💰 *Total Amount: ₹${total}*\n\n`;
  message += `Thank you! 🙏`;
  
  return message;
}

// Send Order to WhatsApp
function sendOrderToWhatsApp(tableNumber) {
  const message = formatWhatsAppMessage(tableNumber);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
}

// Order Confirmation
function confirmOrder() {
  if (cart.length === 0) return;

  // Get and validate table number
  const tableNumberInput = document.getElementById("table-number");
  const tableNumberError = document.getElementById("table-number-error");
  const tableNumber = tableNumberInput.value.trim();

  // Validate table number
  if (!tableNumber) {
    tableNumberError.textContent = "Please enter your table number";
    tableNumberError.classList.add("show");
    tableNumberInput.focus();
    tableNumberInput.style.borderColor = "var(--danger)";
    return;
  }

  // Clear error if valid
  tableNumberError.classList.remove("show");
  tableNumberInput.style.borderColor = "";

  // Build order summary
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  orderSummary.innerHTML = `
    <h3 class="order-summary-title">Order Summary</h3>
    <div class="order-summary-info">
      <div class="order-summary-info-row">
        <span class="order-info-label">🪑 Table Number:</span>
        <span class="order-info-value">${tableNumber}</span>
      </div>
    </div>
    <div class="order-summary-items">
      ${cart
        .map(
          item => `
        <div class="order-summary-item">
          <span>${item.name} × ${item.quantity}</span>
          <span>₹${item.price * item.quantity}</span>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="order-summary-total">
      <span>Total</span>
      <span>₹${total}</span>
    </div>
  `;

  // Show confirmation screen first
  showScreen("confirmation");
  
  // Update WhatsApp note
  const whatsappNote = document.getElementById("whatsapp-note");
  if (whatsappNote) {
    whatsappNote.textContent = "📱 Opening WhatsApp...";
    
    // Send order to WhatsApp after a brief delay
    setTimeout(() => {
      sendOrderToWhatsApp(tableNumber);
      whatsappNote.textContent = "✅ Order sent to WhatsApp!";
      whatsappNote.style.color = "var(--accent)";
    }, 500);
  } else {
    // Fallback: send immediately if note element doesn't exist
    sendOrderToWhatsApp(tableNumber);
  }
}

function startNewOrder() {
  cart = [];
  currentCategory = "all";
  categoryTabs.forEach(t => t.classList.remove("active"));
  categoryTabs[0].classList.add("active");
  
  // Clear table number input
  const tableNumberInput = document.getElementById("table-number");
  const tableNumberError = document.getElementById("table-number-error");
  if (tableNumberInput) {
    tableNumberInput.value = "";
    tableNumberInput.style.borderColor = "";
  }
  if (tableNumberError) {
    tableNumberError.classList.remove("show");
  }
  
  updateCartUI();
  renderMenu();
  showScreen("welcome");
}

// Make functions globally available for onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
