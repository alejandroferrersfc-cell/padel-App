// js/equipment.js
const equipmentData = [
    { id: 'eq1', name: "Pala Bullpadel Vertex 04", price: "280€", img: "https://via.placeholder.com/150?text=Vertex+04", link: "https://www.bullpadel.com", top: "25%", left: "75%" },
    { id: 'eq2', name: "Camiseta Oficial Tapia", price: "45€", img: "https://via.placeholder.com/150?text=Camiseta", link: "https://www.noxsport.es", top: "45%", left: "48%" },
    { id: 'eq3', name: "Zapatillas Asics Gel", price: "120€", img: "https://via.placeholder.com/150?text=Asics", link: "https://www.asics.com", top: "85%", left: "55%" }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('equipment-container');
    if (!container) return;

    container.innerHTML = `
        <div class="equipment-image-wrapper" style="position: relative; max-width: 450px; margin: 0 auto;">
            <!-- Dummy Player Image (Full Body) -->
            <img src="https://placehold.co/450x650/1e293b/00d2ff?text=Jugador+de+Pádel" style="width: 100%; border-radius: 12px; display: block; box-shadow: var(--shadow-glass);">
            
            ${equipmentData.map(item => `
                <div class="hotspot" style="top: ${item.top}; left: ${item.left};" onclick="window.addToWishlist('${item.id}')">
                    <i class="fa-solid fa-plus"></i>
                    <div class="hotspot-tooltip">${item.name} - ${item.price}</div>
                </div>
            `).join('')}
        </div>
    `;
});
