// js/wishlist.js
// Data is now populated globally by equipment.js (window.SHOPPING_ITEMS)

window.addToWishlist = function(id) {
    let wishlist = JSON.parse(localStorage.getItem('padel_wishlist') || '[]');
    const item = window.SHOPPING_ITEMS.find(e => e.id === id);
    
    if (item && !wishlist.find(w => w.id === id)) {
        wishlist.push(item);
        localStorage.setItem('padel_wishlist', JSON.stringify(wishlist));
        alert("¡" + item.name + " añadido a tu lista de deseos!");
        // Re-render immediately if on the wishlist passing
        if (window.renderWishlist) window.renderWishlist();
    } else {
        alert("Este artículo ya está en tu Wishlist.");
    }
};

window.removeFromWishlist = function(id) {
    let wishlist = JSON.parse(localStorage.getItem('padel_wishlist') || '[]');
    wishlist = wishlist.filter(w => w.id !== id);
    localStorage.setItem('padel_wishlist', JSON.stringify(wishlist));
    if (window.renderWishlist) window.renderWishlist();
};

window.renderWishlist = function() {
    const container = document.getElementById('wishlist-container');
    if (!container) return; // Not on wishlist view? Wait, it's SPA, so element exists

    let wishlist = JSON.parse(localStorage.getItem('padel_wishlist') || '[]');
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p style="color:var(--text-sec); grid-column: 1/-1;">Tu lista de deseos está vacía. ¡Ve a Equipamiento para añadir material!</p>';
        return;
    }

    container.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p style="color: var(--primary); font-weight: bold; margin: 10px 0;">${item.price}</p>
            <div style="display:flex; gap: 10px; justify-content: center;">
                <button class="btn-primary" style="font-size: 0.85rem; padding: 0.5rem 1rem;" onclick="window.open('${item.link}', '_blank')">
                    <i class="fa-solid fa-cart-shopping"></i> Comprar
                </button>
                <button class="btn-primary" style="background: var(--danger); font-size: 0.85rem; padding: 0.5rem 1rem;" onclick="window.removeFromWishlist('${item.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
};

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    if (document.getElementById('wishlist-container')) {
        window.renderWishlist();
    }
});
