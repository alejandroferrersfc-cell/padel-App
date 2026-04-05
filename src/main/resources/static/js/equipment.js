// js/equipment.js
const equipmentPlayersData = [
    {
        id: 'coello',
        name: 'Arturo Coello',
        img: 'img/coello.jpg',
        equipment: [
            { id: 'eq-head-extreme', name: "Pala Head Extreme Pro", price: "280€", link: "https://www.head.com", top: "55%", left: "75%" },
            { id: 'eq-head-shirt-w', name: "Camiseta Blanca Head", price: "45€", link: "https://www.head.com", top: "35%", left: "55%" },
            { id: 'eq-head-shoes-w', name: "Zapatillas Head Sprint", price: "135€", link: "https://www.head.com", top: "85%", left: "50%" }
        ]
    },
    {
        id: 'tapia',
        name: 'Agustín Tapia',
        img: 'img/tapia.jpg',
        equipment: [
            { id: 'eq-nox-at10', name: "Pala Nox AT10 18K", price: "295€", link: "https://www.noxsport.es", top: "40%", left: "10%" },
            { id: 'eq-nox-shirt-r', name: "Camiseta Roja Nox", price: "40€", link: "https://www.noxsport.es", top: "50%", left: "55%" },
            { id: 'eq-nox-shoes', name: "Zapatillas Nox AT10", price: "125€", link: "https://www.noxsport.es", top: "95%", left: "55%" }
        ]
    },
    {
        id: 'paquito',
        name: 'Paquito Navarro',
        img: 'img/paquito.jpg',
        equipment: [
            { id: 'eq-bd-hack', name: "Pala Bullpadel Hack 03", price: "275€", link: "https://www.bullpadel.com", top: "65%", left: "45%" },
            { id: 'eq-bd-shirt-b', name: "Camiseta Azul Bullpadel", price: "45€", link: "https://www.bullpadel.com", top: "48%", left: "40%" },
            { id: 'eq-bd-shoes', name: "Zapatillas Bullpadel Hack", price: "110€", link: "https://www.bullpadel.com", top: "85%", left: "30%" }
        ]
    },
    {
        id: 'chingotto',
        name: 'Fede Chingotto',
        img: 'img/chingotto.jpg',
        equipment: [
            { id: 'eq-bd-neuron', name: "Pala Bullpadel Neuron", price: "270€", link: "https://www.bullpadel.com", top: "28%", left: "68%" },
            { id: 'eq-bd-shirt-w', name: "Camiseta Clara Bullpadel", price: "45€", link: "https://www.bullpadel.com", top: "45%", left: "60%" },
            { id: 'eq-bd-shoes-b', name: "Zapatillas Bullpadel Vertex", price: "115€", link: "https://www.bullpadel.com", top: "85%", left: "45%" }
        ]
    },
    {
        id: 'yanguas',
        name: 'Mike Yanguas',
        img: 'img/yanguas.jpg',
        equipment: [
            { id: 'eq-lok-max', name: "Pala Lok Max Flow", price: "250€", link: "https://www.lokpadel.com", top: "68%", left: "68%" },
            { id: 'eq-lok-shirt', name: "Camiseta Azul Lok", price: "40€", link: "https://www.lokpadel.com", top: "35%", left: "40%" },
            { id: 'eq-asics-gel', name: "Zapatillas Asics Gel", price: "130€", link: "https://www.asics.com", top: "80%", left: "20%" }
        ]
    }
];

// Provide items globally for wishlist.js
window.SHOPPING_ITEMS = equipmentPlayersData.flatMap(player => player.equipment.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    img: player.img, // Using player's image as product image for simplicity
    link: item.link
})));

let currentEquipmentPlayerId = 'coello';

window.selectPlayer = function(id) {
    currentEquipmentPlayerId = id;
    renderEquipment();
};

function renderEquipment() {
    const container = document.getElementById('equipment-container');
    if (!container) return;
    
    const player = equipmentPlayersData.find(p => p.id === currentEquipmentPlayerId);
    
    // Create UI to swap players
    let buttonsHtml = '<div class="player-selector">';
    equipmentPlayersData.forEach(p => {
        buttonsHtml += `<button class="player-selector-btn ${p.id === currentEquipmentPlayerId ? 'active' : ''}" onclick="window.selectPlayer('${p.id}')">${p.name}</button>`;
    });
    buttonsHtml += '</div>';

    // Image with hotspots
    let equipmentHtml = `
        <div class="equipment-image-wrapper" style="position: relative; max-width: 600px; width: 100%; margin: 0 auto;">
            <img src="${player.img}" alt="${player.name}" onerror="this.onerror=null; this.src='https://placehold.co/600x650/1e293b/00d2ff?text=Falta+la+foto:+\\\\n${player.img.split('/')[1]}';" style="width: 100%; border-radius: 12px; display: block; box-shadow: var(--shadow-glass); object-fit: contain;">
            
            ${player.equipment.map(item => `
                <div class="hotspot" style="top: ${item.top}; left: ${item.left};" onclick="window.addToWishlist('${item.id}')">
                    <i class="fa-solid fa-plus"></i>
                    <div class="hotspot-tooltip">${item.name} - ${item.price}</div>
                </div>
            `).join('')}
        </div>
    `;

    container.innerHTML = buttonsHtml + equipmentHtml;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderEquipment);
} else {
    renderEquipment();
}
