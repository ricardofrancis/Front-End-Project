// Enhanced Planet Data with more details
const planetsData = [{
    name: "Mercury",
    icon: "🌑",
    color: "#8C7853",
    type: "terrestrial",
    distance: "58 million km",
    diameter: "4,879 km",
    moons: "0",
    dayLength: "176 Earth days",
    yearLength: "88 Earth days",
    temperature: "427°C (day) / -173°C (night)",
    atmosphere: "Extremely thin",
    gravity: "3.7 m/s²",
    funFact: "Mercury has ice at its poles despite being closest to the Sun!"
}, {
    name: "Venus",
    icon: "🌕",
    color: "#FFC649",
    type: "terrestrial",
    distance: "108 million km",
    diameter: "12,104 km",
    moons: "0",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    temperature: "462°C",
    atmosphere: "96% CO₂, thick clouds",
    gravity: "8.87 m/s²",
    funFact: "Venus spins backwards and has days longer than its years!"
}, {
    name: "Earth",
    icon: "🌍",
    color: "#6B93D6",
    type: "terrestrial",
    distance: "150 million km",
    diameter: "12,756 km",
    moons: "1 (Moon)",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    temperature: "15°C average",
    atmosphere: "78% N₂, 21% O₂",
    gravity: "9.81 m/s²",
    funFact: "The only known planet with life and liquid water on its surface!"
}, {
    name: "Mars",
    icon: "🔴",
    color: "#CD5C5C",
    type: "terrestrial",
    distance: "228 million km",
    diameter: "6,792 km",
    moons: "2 (Phobos, Deimos)",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    temperature: "-65°C average",
    atmosphere: "95% CO₂, very thin",
    gravity: "3.71 m/s²",
    funFact: "Mars has the largest volcano in the solar system - Olympus Mons!"
}, {
    name: "Jupiter",
    icon: "🪐",
    color: "#D8CA9D",
    type: "gas-giant",
    distance: "778 million km",
    diameter: "142,984 km",
    moons: "95+ (Io, Europa, Ganymede, Callisto)",
    dayLength: "9.9 hours",
    yearLength: "12 Earth years",
    temperature: "-110°C",
    atmosphere: "89% H₂, 10% He",
    gravity: "24.79 m/s²",
    funFact: "Jupiter's Great Red Spot is a storm larger than Earth!"
}, {
    name: "Saturn",
    icon: "🪐",
    color: "#FAD5A5",
    type: "gas-giant",
    distance: "1.4 billion km",
    diameter: "120,536 km",
    moons: "146+ (Titan, Enceladus, Mimas)",
    dayLength: "10.7 hours",
    yearLength: "29 Earth years",
    temperature: "-140°C",
    atmosphere: "96% H₂, 3% He",
    gravity: "10.44 m/s²",
    funFact: "Saturn's rings are made of ice and rock particles!"
}, {
    name: "Uranus",
    icon: "🔵",
    color: "#4FD0E7",
    type: "ice-giant",
    distance: "2.9 billion km",
    diameter: "51,118 km",
    moons: "27+ (Miranda, Ariel, Umbriel)",
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    temperature: "-195°C",
    atmosphere: "83% H₂, 15% He, 2% CH₄",
    gravity: "8.69 m/s²",
    funFact: "Uranus rotates on its side at a 98-degree angle!"
}, {
    name: "Neptune",
    icon: "🔵",
    color: "#4B70DD",
    type: "ice-giant",
    distance: "4.5 billion km",
    diameter: "49,528 km",
    moons: "16+ (Triton, Nereid, Proteus)",
    dayLength: "16.1 hours",
    yearLength: "165 Earth years",
    temperature: "-200°C",
    atmosphere: "80% H₂, 19% He, 1% CH₄",
    gravity: "11.15 m/s²",
    funFact: "Neptune has the strongest winds in the solar system at 2,100 km/h!"
}, {
    name: "Pluto",
    icon: "🌑",
    color: "#988A80",
    type: "dwarf",
    distance: "5.9 billion km",
    diameter: "2,376 km",
    moons: "5 (Charon, Nix, Hydra)",
    dayLength: "6.4 Earth days",
    yearLength: "248 Earth years",
    temperature: "-230°C",
    atmosphere: "N₂, CH₄, CO",
    gravity: "0.62 m/s²",
    funFact: "Pluto's moon Charon is nearly half the size of Pluto itself!"
}];

let currentFilter = 'all';
let filteredPlanets = [...planetsData];


async function updateISSLocation() {
    try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();

        const issInfo = document.getElementById('iss-info');
        issInfo.innerHTML = `
            <div class="iss-item">
                <strong>Latitude</strong><br>
                ${data.latitude.toFixed(2)}°
            </div>
            <div class="iss-item">
                <strong>Longitude</strong><br>
                ${data.longitude.toFixed(2)}°
            </div>
            <div class="iss-item">
                <strong>Altitude</strong><br>
                ${data.altitude.toFixed(0)} km
            </div>
            <div class="iss-item">
                <strong>Speed</strong><br>
                ${data.velocity.toFixed(0)} km/h
            </div>
        `;
    } catch (error) {
        document.getElementById('iss-info').innerHTML = `
            <div class="iss-item">
                <strong>ISS data unavailable</strong><br>
                Check your connection
            </div>
        `;
    }
}

function renderPlanets(planets) {
    const grid = document.getElementById('planet-grid');

    if (planets.length === 0) {
        grid.innerHTML = '<div class="no-results">No planets found matching your search.</div>';
        return;
    }

    grid.innerHTML = planets.map(planet => `
        <div class="planet-card" onclick="showPlanetDetails('${planet.name}')" style="border-color: ${planet.color}">
            <div class="planet-icon" style="color: ${planet.color}">
                ${planet.icon}
            </div>
            <h3 class="planet-name">${planet.name}</h3>
            <ul class="planet-facts">
                <li><span class="fact-label">Distance:</span> ${planet.distance}</li>
                <li><span class="fact-label">Diameter:</span> ${planet.diameter}</li>
                <li><span class="fact-label">Moons:</span> ${planet.moons}</li>
                <li><span class="fact-label">Day Length:</span> ${planet.dayLength}</li>
            </ul>
        </div>
    `).join('');
}

// Show planet details in modal
function showPlanetDetails(planetName) {
    const planet = planetsData.find(p => p.name === planetName);
    const modal = document.getElementById('planetModal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 5rem; color: ${planet.color}; margin-bottom: 1rem;">
                ${planet.icon}
            </div>
            <h2 style="color: ${planet.color}; margin-bottom: 1rem;">${planet.name}</h2>
            <p style="font-style: italic; color: #64ffda;">${planet.funFact}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px;">
                <strong style="color: #64ffda;">Physical Properties</strong>
                <ul style="list-style: none; padding: 0; margin-top: 0.5rem;">
                    <li>Diameter: ${planet.diameter}</li>
                    <li>Gravity: ${planet.gravity}</li>
                    <li>Temperature: ${planet.temperature}</li>
                </ul>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px;">
                <strong style="color: #64ffda;">Orbital Properties</strong>
                <ul style="list-style: none; padding: 0; margin-top: 0.5rem;">
                    <li>Distance: ${planet.distance}</li>
                    <li>Day Length: ${planet.dayLength}</li>
                    <li>Year Length: ${planet.yearLength}</li>
                </ul>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px;">
                <strong style="color: #64ffda;">Atmosphere & Moons</strong>
                <ul style="list-style: none; padding: 0; margin-top: 0.5rem;">
                    <li>Atmosphere: ${planet.atmosphere}</li>
                    <li>Moons: ${planet.moons}</li>
                    <li>Type: ${planet.type.replace('-', ' ')}</li>
                </ul>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function searchPlanets(query) {
    const searchTerm = query.toLowerCase();
    return planetsData.filter(planet =>
        planet.name.toLowerCase().includes(searchTerm) ||
        planet.type.toLowerCase().includes(searchTerm) ||
        planet.moons.toLowerCase().includes(searchTerm) ||
        planet.atmosphere.toLowerCase().includes(searchTerm) ||
        planet.funFact.toLowerCase().includes(searchTerm)
    );
}


function filterPlanets(type) {
    if (type === 'all') return planetsData;
    return planetsData.filter(planet => planet.type === type);
}


function updateDisplay() {
    let results = filterPlanets(currentFilter);
    const searchQuery = document.getElementById('planet-search').value;

    if (searchQuery) {
        results = searchPlanets(searchQuery);
    }

    renderPlanets(results);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        renderPlanets(planetsData);
        updateISSLocation();
    }, 1000);


    setInterval(updateISSLocation, 10000);

    // Search input
    document.getElementById('planet-search').addEventListener('input', (e) => {
        updateDisplay();
    });


    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            updateDisplay();
        });
    });

    // Modal close
    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('planetModal').style.display = 'none';
    });

    // Close modal on overlay click
    document.getElementById('planetModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.target.style.display = 'none';
        }
    });
});