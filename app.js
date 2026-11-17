// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Telegram Bot configuration
// IMPORTANT: Replace these with your actual Telegram Bot Token and Chat ID
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const lang = getCurrentLanguage();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        // Update name in case language changed
        existingItem.name = getProductName(product, lang);
    } else {
        cart.push({
            id: product.id,
            name: getProductName(product, lang),
            price: product.price,
            image: product.images[0],
            quantity: 1
        });
    }
    
    saveCart();
    showNotification(getTranslation('add_to_cart') + ' ✓');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = getCartCount();
    }

    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const lang = getCurrentLanguage();
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `<div class="empty-cart">${getTranslation('empty_cart')}</div>`;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price} ${getTranslation('currency_som')}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                                   onchange="updateQuantity(${item.id}, parseInt(this.value))">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button class="remove-item" onclick="removeFromCart(${item.id})">${getTranslation('remove_item')}</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    if (cartTotal) {
        cartTotal.textContent = `${getCartTotal()} ${getTranslation('currency_som')}`;
    }
}

// Product display
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const lang = getCurrentLanguage();
    
    if (PRODUCTS.length === 0) {
        productsGrid.innerHTML = `<p>${getTranslation('no_products')}</p>`;
        return;
    }

    productsGrid.innerHTML = PRODUCTS.map(product => {
        const name = getProductName(product, lang);
        const description = getProductDescription(product, lang);
        const mainImage = product.images[0];
        
        return `
            <div class="product-card">
                <div class="product-image-container" onclick="openProductModal(${product.id})">
                    <img src="${mainImage}" alt="${name}" class="product-image">
                    ${!product.inStock ? `<div class="product-badge">${getTranslation('out_of_stock')}</div>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${name}</h3>
                    <p class="product-price">${product.price} ${getTranslation('currency_som')}</p>
                    <div class="product-actions">
                        <button class="btn-add-cart" onclick="addToCart(${product.id})" 
                                ${!product.inStock ? 'disabled' : ''}>
                            ${getTranslation('add_to_cart')}
                        </button>
                        <button class="btn-view" onclick="openProductModal(${product.id})">
                            ${getTranslation('view_details')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Product Modal
function openProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const lang = getCurrentLanguage();
    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');
    const desc = document.getElementById('productModalDesc');
    const price = document.getElementById('productModalPrice');
    const mainImage = document.getElementById('productMainImage');
    const thumbnails = document.getElementById('productThumbnails');
    const addBtn = document.getElementById('addToCartFromModal');

    if (title) title.textContent = getProductName(product, lang);
    if (desc) {
        desc.textContent = getProductDescription(product, lang);
    }
    if (price) {
        price.textContent = `${product.price} ${getTranslation('currency_som')}`;
    }
    
    if (mainImage && product.images.length > 0) {
        mainImage.src = product.images[0];
        mainImage.alt = getProductName(product, lang);
    }

    if (thumbnails) {
        thumbnails.innerHTML = product.images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}')">
                <img src="${img}" alt="Thumbnail ${index + 1}">
            </div>
        `).join('');
    }

    if (addBtn) {
        addBtn.onclick = () => {
            addToCart(product.id);
            closeProductModal();
        };
        addBtn.textContent = getTranslation('add_to_cart');
        addBtn.disabled = !product.inStock;
    }

    if (modal) {
        modal.classList.add('active');
    }
}

function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('productMainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        const img = thumb.querySelector('img');
        if (img && img.src.includes(imageSrc)) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Modal management
function openCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.add('active');
        updateCartUI();
    }
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function openCheckout() {
    if (cart.length === 0) {
        alert(getTranslation('empty_cart'));
        return;
    }
    
    closeCart();
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('checkoutForm').reset();
    }
}

// Get translation helper
function getTranslation(key) {
    if (typeof window.getTranslation === 'function') {
        return window.getTranslation(key);
    }
    // Fallback
    const translations = {
        'add_to_cart': 'В корзину',
        'currency_som': 'сом',
        'no_products': 'В этой категории пока нет товаров.',
        'out_of_stock': 'Нет в наличии'
    };
    return translations[key] || key;
}

// Telegram order submission
async function sendOrderToTelegram(orderData) {
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
        alert('Пожалуйста, настройте Telegram Bot Token и Chat ID в файле app.js');
        return false;
    }

    const message = formatOrderMessage(orderData);
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();
        return data.ok;
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return false;
    }
}

function formatOrderMessage(orderData) {
    const { name, phone, address, comment, items, total } = orderData;
    
    let message = `<b>🛒 Новый заказ</b>\n\n`;
    message += `<b>Клиент:</b> ${name}\n`;
    message += `<b>Телефон:</b> ${phone}\n`;
    message += `<b>Адрес:</b> ${address}\n`;
    if (comment) {
        message += `<b>Комментарий:</b> ${comment}\n`;
    }
    message += `\n<b>Товары:</b>\n`;
    
    items.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.quantity} шт. × ${item.price} сом = ${item.quantity * item.price} сом\n`;
    });
    
    message += `\n<b>Итого: ${total} сом</b>`;
    
    return message;
}

function submitOrder() {
    const form = document.getElementById('checkoutForm');
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const comment = document.getElementById('customerComment').value;

    if (!name || !phone || !address) {
        alert('Пожалуйста, заполните все обязательные поля / Please fill in all required fields');
        return;
    }

    const orderData = {
        name,
        phone,
        address,
        comment,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: getCartTotal()
    };

    // Show loading state
    const submitBtn = document.getElementById('submitOrder');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    sendOrderToTelegram(orderData).then(success => {
        if (success) {
            alert(getTranslation('order_success') + ' Мы свяжемся с вами в ближайшее время.');
            clearCart();
            closeCheckout();
        } else {
            alert(getTranslation('order_error') + ' Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.');
        }
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function showNotification(message) {
    // Simple notification (you can enhance this with a toast library)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4a7c2a;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Make functions globally available
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.openProductModal = openProductModal;
    window.closeProductModal = closeProductModal;
    window.changeMainImage = changeMainImage;
    window.openCart = openCart;
    window.closeCart = closeCart;
    window.openCheckout = openCheckout;
    window.closeCheckout = closeCheckout;
    window.submitOrder = submitOrder;
    window.clearCart = clearCart;

    // Update current language reference (use window.currentLang set by translations.js)
    window.getCurrentLanguage = getCurrentLanguage;
    if (typeof window.currentLang === 'undefined') window.currentLang = 'ru';
    window.renderProducts = renderProducts;
    window.updateCartUI = updateCartUI;

    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }

    // Modal close buttons
    const closeCartBtn = document.getElementById('closeCart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    const closeCheckoutBtn = document.getElementById('closeCheckout');
    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', closeCheckout);
    }

    const cancelCheckoutBtn = document.getElementById('cancelCheckout');
    if (cancelCheckoutBtn) {
        cancelCheckoutBtn.addEventListener('click', closeCheckout);
    }

    const closeProductModalBtn = document.getElementById('closeProductModal');
    if (closeProductModalBtn) {
        closeProductModalBtn.addEventListener('click', closeProductModal);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckout);
    }

    // Submit order button
    const submitOrderBtn = document.getElementById('submitOrder');
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', submitOrder);
    }

    // Clear cart button
    const clearCartBtn = document.getElementById('clearCart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm(getTranslation('clear_cart') + '?')) {
                clearCart();
            }
        });
        // Update button text on language change
        const updateClearCartText = () => {
            clearCartBtn.textContent = getTranslation('clear_cart');
        };
        updateClearCartText();
        // Re-update when language changes
        const originalSetLang = window.setLanguage;
        if (originalSetLang) {
            window.setLanguage = function(lang) {
                originalSetLang(lang);
                updateClearCartText();
            };
        }
    }

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Render products
    renderProducts();
    updateCartUI();

    // Update products when language changes
    const originalSetLanguage = window.setLanguage;
    if (originalSetLanguage) {
        window.setLanguage = function(lang) {
            originalSetLanguage(lang);
            window.currentLang = lang;
            renderProducts();
            updateCartUI();
        };
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
