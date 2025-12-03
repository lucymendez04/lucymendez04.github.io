// Initialize the map centered on Lincoln, NE
const map = L.map('map').setView([40.8136, -96.7026], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Define custom green icon
const greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Function to add markers
function addMarkers() {
    stores.forEach(store => {
        if (store.lat && store.lng) {
            const marker = L.marker([store.lat, store.lng], { icon: greenIcon }).addTo(map);

            // Hover tooltip
            marker.bindTooltip(`
                <div>
                    <strong>${store.name}</strong><br>
                    ${store.address}
                </div>
            `, {
                className: 'store-tooltip',
                direction: 'top',
                offset: [0, -40]
            });

            // Click popup
            marker.bindPopup(`
                <div class="store-popup">
                    <h3>${store.name}</h3>
                    <p><span class="label">Address:</span> ${store.address}</p>
                    <p><span class="label">Hours:</span> ${store.hours}</p>
                    <p><span class="label">Reviews:</span> ${store.reviews}</p>
                    <p><span class="label">Category:</span> ${store.category}</p>
                    <p><span class="label">Price:</span> ${store.price}</p>
                </div>
            `);
        }
    });
}

// Load markers when DOM is ready
document.addEventListener('DOMContentLoaded', addMarkers);
