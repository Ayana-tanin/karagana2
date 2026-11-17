// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

function getApiBaseUrl() {
    return window.location.pathname.replace(/\/$/, '') || '';
}

function t(key, fallback) {
    return (typeof window.getTranslation === 'function' ? window.getTranslation(key) : null) || fallback;
}

// Load products from API
async function loadProducts() {
    try {
        const response = await fetch(getApiBaseUrl() + '/api/products/');
        const data = await response.json();
        products = data.products || [];
        window.productsLoaded = true;
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1
        });
    }
    
    saveCart();
    showNotification('Товар добавлен в корзину ✓');
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
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">' + t('empty_cart', 'Корзина пуста') + '</div>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price} ${t('currency_som', 'сом')}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                                   onchange="updateQuantity(${item.id}, parseInt(this.value))">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button class="remove-item" onclick="removeFromCart(${item.id})">${t('remove_item', 'Удалить')}</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    if (cartTotal) {
        cartTotal.textContent = getCartTotal().toFixed(2);
    }
}

// Product display
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    if (products.length === 0) {
        var msg = (window.productsLoaded ? t('no_products', 'В этой категории пока нет товаров.') : 'Товары загружаются...');
        productsGrid.innerHTML = '<p>' + msg + '</p>';
        return;
    }

    productsGrid.innerHTML = products.map(product => {
        const mainImage = product.images && product.images.length > 0 ? product.images[0] : '';
        
        return `
            <div class="product-card">
                <div class="product-image-container" onclick="openProductModal(${product.id})">
                    <img src="${mainImage}" alt="${product.name}" class="product-image">
                    ${!product.inStock ? '<div class="product-badge">' + t('out_of_stock', 'Нет в наличии') + '</div>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${product.price} ${t('currency_som', 'сом')}</p>
                    <div class="product-actions">
                        <button class="btn-add-cart" onclick="addToCart(${product.id})" 
                                ${!product.inStock ? 'disabled' : ''}>
                            ${t('add_to_cart', 'В корзину')}
                        </button>
                        <button class="btn-view" onclick="openProductModal(${product.id})">
                            ${t('view_details', 'Подробнее')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');
    const desc = document.getElementById('productModalDesc');
    const price = document.getElementById('productModalPrice');
    const mainImage = document.getElementById('productMainImage');
    const thumbnails = document.getElementById('productThumbnails');
    const addBtn = document.getElementById('addToCartFromModal');

    if (title) title.textContent = product.name;
    if (desc) desc.textContent = product.description;
    if (price) price.textContent = product.price + ' ' + t('currency_som', 'сом');
    
    if (mainImage && product.images && product.images.length > 0) {
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
    }

    if (thumbnails && product.images) {
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
        if (img && img.src.includes(imageSrc.split('/').pop())) {
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
        alert('Корзина пуста');
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

// Submit order
async function submitOrder() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const comment = document.getElementById('customerComment').value;

    if (!name || !phone || !address) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }

    const orderData = {
        name,
        phone,
        address,
        comment,
        items: cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }))
    };

    const submitBtn = document.getElementById('submitOrder');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    try {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const response = await fetch(getApiBaseUrl() + '/api/order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();
        
        if (data.success) {
            alert('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
            clearCart();
            closeCheckout();
        } else {
            alert('Ошибка при отправке заказа: ' + (data.error || 'Неизвестная ошибка'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ошибка при отправке заказа. Пожалуйста, попробуйте позже.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Заявка на сбор и сдачу караганы — отправка в Telegram
async function submitCaraganaRequest() {
    var form = document.getElementById('caraganaRequestForm');
    if (!form) return;
    var nameEl = document.getElementById('requestName');
    var phoneEl = document.getElementById('requestPhone');
    var commentEl = document.getElementById('requestComment');
    var name = (nameEl && nameEl.value || '').trim();
    var phone = (phoneEl && phoneEl.value || '').trim();
    var comment = (commentEl && commentEl.value || '').trim();

    if (!name || !phone) {
        alert((typeof t === 'function' ? t('form_name', 'Имя') : 'Имя') + ' и ' + (typeof t === 'function' ? t('form_phone', 'Телефон') : 'Телефон') + ' обязательны.');
        return;
    }

    var btn = document.getElementById('submitCaraganaRequest');
    var originalText = btn ? btn.textContent : '';
    if (btn) {
        btn.textContent = 'Отправка...';
        btn.disabled = true;
    }

    try {
        var csrfEl = form.querySelector('[name=csrfmiddlewaretoken]');
        var csrftoken = csrfEl ? csrfEl.value : '';
        var response = await fetch(getApiBaseUrl() + '/api/caragana-request/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ name: name, phone: phone, comment: comment })
        });
        var data = await response.json();
        if (data.success) {
            alert(typeof t === 'function' ? t('request_success', 'Заявка отправлена!') : 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            form.reset();
        } else {
            alert((typeof t === 'function' ? t('request_error', 'Ошибка при отправке заявки.') : 'Ошибка при отправке заявки.') + ' ' + (data.error || ''));
        }
    } catch (err) {
        console.error(err);
        alert(typeof t === 'function' ? t('request_error', 'Ошибка при отправке заявки.') : 'Ошибка при отправке заявки. Попробуйте позже.');
    } finally {
        if (btn) {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: #4a7c59;
        color: white;
        padding: 1.5rem 2.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 40px rgba(13, 40, 24, 0.3);
        z-index: 3000;
        font-weight: 700;
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
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
            if (confirm('Очистить корзину?')) {
                clearCart();
            }
        });
    }

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Mobile nav toggle
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open', navMenu.classList.contains('open'));
        });
        document.querySelectorAll('.nav-menu .nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Caragana request form
    const caraganaRequestForm = document.getElementById('caraganaRequestForm');
    if (caraganaRequestForm) {
        caraganaRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitCaraganaRequest();
        });
    }

    // Load products and update cart
    loadProducts();
    updateCartUI();

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
});

// Add animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
