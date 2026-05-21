// Tools Data with online images
const tools = [
    {
        id: 1,
        name: 'Professional Hammer',
        category: 'hand',
        price: 24.99,
        description: 'Heavy-duty hammer for framing and carpentry work',
        image: 'https://images.homedepot-static.com/productImages/971329b0-a9b6-4b7b-95f3-cfe28f7ac1b7/svn/dewalt-framing-hammers-dwht51064-64_1000.jpg',
        liked: false
    },
    {
        id: 2,
        name: 'Cordless Drill',
        category: 'power',
        price: 89.99,
        description: 'Powerful 20V cordless drill kit with 2 batteries',
        image: 'https://image.made-in-china.com/2f0j00IHtcbgGPsWqv/Bgx-20V-Lithium-45Nm-Portable-Cordless-Drill-Power-tools.webp',
        liked: false
    },
    {
        id: 3,
        name: 'Safety Glasses',
        category: 'safety',
        price: 14.99,
        description: 'UV-protective safety glasses with anti-slip frame',
        image: 'https://onestophire.com/wp-content/uploads/2023/03/Safety-Glasses.jpg',
        liked: false
    },
    {
        id: 4,
        name: 'Adjustable Wrench Set',
        category: 'hand',
        price: 34.99,
        description: '6-piece adjustable wrench set with ergonomic grips',
        image: 'https://i5.walmartimages.com/seo/WORKPRO-3-Piece-Adjustable-Wrench-Set-6in-8in-10in-Wrenches-with-Ergonomic-Grip-for-Home-Garage-Workshop_40889896-b84c-4920-93eb-3a6fa62ab16f.722b7b6d4b5f46c373311ef7bbb27026.jpeg',
        liked: false
    },
    {
        id: 5,
        name: 'Power Saw',
        category: 'power',
        price: 129.99,
        description: 'Circular saw with laser guide and dust extraction',
        image: 'https://tse4.mm.bing.net/th/id/OIP.Upfo2AsTCYSE2w2wupMSUAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
        liked: false
    },
    {
        id: 6,
        name: 'Safety Helmet',
        category: 'safety',
        price: 35.99,
        description: 'Hard safety helmet with ventilation and chin strap',
        image: 'https://tse4.mm.bing.net/th/id/OIP.a2tceocJ9rJVnm13K3TydwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
        liked: false
    },
    {
        id: 7,
        name: 'Precision Screwdriver Set',
        category: 'hand',
        price: 19.99,
        description: '12-piece precision screwdriver set for delicate work',
        image: 'https://m.media-amazon.com/images/I/81q-mfg1dLL.jpg',
        liked: false
    },
    {
        id: 8,
        name: 'Power Drill Press',
        category: 'power',
        price: 199.99,
        description: 'Bench-top drill press with variable speed control',
        image: 'https://www.megasavershop.com/wp-content/uploads/2022/12/A271527-1912-1.jpg',
        liked: false
    },
    {
        id: 9,
        name: 'Work Gloves',
        category: 'safety',
        price: 12.99,
        description: 'Nitrile-coated work gloves with excellent grip',
        image: 'https://tse2.mm.bing.net/th/id/OIP.0xk_AzU5yZ5A7_7SWkhqIQHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3',
        liked: false
    },
    {
        id: 10,
        name: 'Tape Measure Pro',
        category: 'hand',
        price: 22.99,
        description: '25-meter pro-grade tape measure with auto-lock feature',
        image: 'https://i5.walmartimages.com/seo/Pro-Grade-82826-25-ft-x-1-in-Powerule-Tape-Measure-with-Rubber-Grip_738c36fe-9010-4711-ba3e-4553999be045.f6ada552112380f4c94742e112a46e88.jpeg',
        liked: false
    }
];

// Shopping Cart
let cart = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '../login/index.html';
        return;
    }
    
    // Set user name in profile
    document.getElementById('userName').textContent = currentUser;
    
    // Load cart from localStorage
    loadCart();
    
    // Display tools
    displayTools();
});

// Display tools
function displayTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = '';
    
    tools
        .filter(tool => currentFilter === 'all' || tool.category === currentFilter)
        .forEach(tool => {
            const card = createToolCard(tool);
            toolsGrid.appendChild(card);
        });
}

// Create tool card element
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.dataset.id = tool.id;
    
    const toolImageHTML = tool.image 
        ? `<img src="${tool.image}" alt="${tool.name}" onerror="this.style.display='none'">`
        : '';
    
    card.innerHTML = `
        <div class="tool-image">
            ${toolImageHTML}
        </div>
        <div class="tool-info">
            <div class="tool-name">${tool.name}</div>
            <span class="tool-category">${tool.category.toUpperCase()}</span>
            <div class="tool-description">${tool.description}</div>
            <div class="tool-price">$${tool.price.toFixed(2)}</div>
            <div class="tool-footer">
                <button class="add-to-cart" onclick="addToCart(${tool.id})">Add to Cart</button>
                <button class="like-btn ${tool.liked ? 'liked' : ''}" onclick="toggleLike(${tool.id})" title="Add to favorites">❤️</button>
            </div>
        </div>
    `;
    
    return card;
}

// Add to cart
function addToCart(toolId) {
    const tool = tools.find(t => t.id === toolId);
    const existingItem = cart.find(item => item.id === toolId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: tool.id,
            name: tool.name,
            price: tool.price,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showSuccess(`${tool.name} added to cart!`);
}

// Remove from cart
function removeFromCart(toolId) {
    cart = cart.filter(item => item.id !== toolId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

// Update quantity
function updateQuantity(toolId, change) {
    const item = cart.find(item => item.id === toolId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(toolId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const subtotalElem = document.getElementById('subtotal');
    const taxElem = document.getElementById('tax');
    const totalElem = document.getElementById('total');
    const orderTotalElem = document.getElementById('orderTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Your cart is empty</p>';
        subtotalElem.textContent = '$0.00';
        taxElem.textContent = '$0.00';
        totalElem.textContent = '$0.00';
        orderTotalElem.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span class="cart-item-name">${item.name}</span>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    subtotalElem.textContent = '$' + subtotal.toFixed(2);
    taxElem.textContent = '$' + tax.toFixed(2);
    totalElem.textContent = '$' + total.toFixed(2);
    orderTotalElem.textContent = '$' + total.toFixed(2);
}

// Toggle like
function toggleLike(toolId) {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
        tool.liked = !tool.liked;
        const card = document.querySelector(`[data-id="${toolId}"]`);
        const likeBtn = card.querySelector('.like-btn');
        likeBtn.classList.toggle('liked');
    }
}

// Filter tools
function filterTools(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayTools();
}

// Search tools
function searchTools() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = '';
    
    tools
        .filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(searchTerm) ||
                                 tool.description.toLowerCase().includes(searchTerm);
            const matchesFilter = currentFilter === 'all' || tool.category === currentFilter;
            return matchesSearch && matchesFilter;
        })
        .forEach(tool => {
            const card = createToolCard(tool);
            toolsGrid.appendChild(card);
        });
}

// Toggle modals
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'none' || modal.style.display === '') {
        updateCartDisplay();
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'flex';
        document.getElementById('searchInput').focus();
    } else {
        searchBar.style.display = 'none';
    }
}

function toggleProfile() {
    const modal = document.getElementById('profileModal');
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('checkoutModal').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
}

// Submit order
function submitOrder(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = totalAmount * 0.1;
    const finalTotal = totalAmount + taxAmount;
    
    // Create order object
    const order = {
        orderId: 'ORD' + Math.floor(Math.random() * 100000),
        date: new Date().toLocaleDateString(),
        items: cart.map(item => `${item.quantity}x ${item.name}`).join(', '),
        total: finalTotal.toFixed(2)
    };
    
    // Show success message
    showSuccess(`✓ Order placed successfully! Order ID: ${order.orderId}`);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    
    // Close modals
    document.getElementById('checkoutModal').style.display = 'none';
    document.getElementById('checkoutForm').reset();
    
    // Show order details in alert
    setTimeout(() => {
        alert(`Thank you for your order!\n\nOrder ID: ${order.orderId}\nDate: ${order.date}\nItems: ${order.items}\nTotal: $${order.total}`);
    }, 500);
}

// Cart functions
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function saveCart() {
    localStorage.setItem('toolsCart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('toolsCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartCount();
    }
}

// Show success message
function showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    document.getElementById('successText').textContent = message;
    successMsg.style.display = 'block';
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
}

// Navigation functions
function showAbout() {
    alert('ToolHub - Your trusted partner for premium quality tools since 2026. We provide professional-grade tools for DIY enthusiasts and professionals alike.');
}

function showContact() {
    alert('Contact us:\nEmail: support@toolhub.com\nPhone: 1-800-TOOLS-HUB\nAddress: 123 Tool Street, Tech City');
}

// Logout
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = '../login/index.html';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const profileModal = document.getElementById('profileModal');
    
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
    if (event.target == checkoutModal) {
        checkoutModal.style.display = 'none';
    }
    if (event.target == profileModal) {
        profileModal.style.display = 'none';
    }
}

// Update cart count on load
updateCartCount();
