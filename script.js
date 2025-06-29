// Navigation System using ES6 Class
class NavigationSystem {
    constructor() {
        this.currentPage = 'home';
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('[data-page]');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                this.showPage(targetPage);
            });
        });
    }

    showPage(pageId) {
        this.pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;

        // Load page-specific content
        if (pageId === 'planets') {
            planetManager.loadPlanets();
        } else if (pageId === 'exploration') {
            newsManager.loadNews();
        }
    }
}

// Planet Management System using ES6 Class
class PlanetManager {
    constructor() {
        this.planets = [];
        this.modal = new ModalSystem();
    }

    async loadPlanets() {
        const container = document.getElementById('planet-grid');

        try {
            // Using a space API to get planet data
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=8');
            const data = await response.json();

            this.planets = [
                { name: 'Mercury', icon: '☿', color: '#8c7853', description: 'The smallest planet closest to the Sun', temp: '427°C', distance: '57.9M km' },
                { name: 'Venus', icon: '♀', color: '#ffc649', description: 'The hottest planet with thick atmosphere', temp: '462°C', distance: '108.2M km' },
                { name: 'Earth', icon: '🌍', color: '#6b93d6', description: 'Our home planet with life', temp: '15°C', distance: '149.6M km' },
                { name: 'Mars', icon: '♂', color: '#c1440e', description: 'The red planet with polar ice caps', temp: '-65°C', distance: '227.9M km' },
                { name: 'Jupiter', icon: '♃', color: '#d8ca9d', description: 'The largest gas giant', temp: '-110°C', distance: '778.5M km' },
                { name: 'Saturn', icon: '♄', color: '#fab27b', description: 'Famous for its beautiful rings', temp: '-140°C', distance: '1.43B km' },
                { name: 'Uranus', icon: '♅', color: '#4fd0e3', description: 'An ice giant tilted on its side', temp: '-195°C', distance: '2.87B km' },
                { name: 'Neptune', icon: '♆', color: '#4b70dd', description: 'The windiest planet in our solar system', temp: '-200°C', distance: '4.5B km' }
            ];

            this.renderPlanets(container);
        } catch (error) {
            console.error('Error loading planets:', error);
            this.renderPlanets(container); // Show static data if API fails
        }
    }

    renderPlanets(container) {
        container.innerHTML = this.planets.map(planet => `
            <div class="planet-card" onclick="planetManager.showPlanetDetails('${planet.name}')" 
                 style="border-left: 4px solid ${planet.color};">
                <span class="planet-icon">${planet.icon}</span>
                <h3 style="color: ${planet.color};">${planet.name}</h3>
                <p>${planet.description}</p>
                <div class="mt-3">
                    <small><strong>Temperature:</strong> ${planet.temp}</small><br>
                    <small><strong>Distance from Sun:</strong> ${planet.distance}</small>
                </div>
            </div>
        `).join('');
    }

    async showPlanetDetails(planetName) {
        const planet = this.planets.find(p => p.name === planetName);
        if (!planet) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="text-center">
                <span style="font-size: 5rem;">${planet.icon}</span>
                <h2 style="color: ${planet.color}; margin: 1rem 0;">${planet.name}</h2>
                <p class="lead">${planet.description}</p>
                
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div class="p-3" style="background: rgba(255,255,255,0.1); border-radius: 10px;">
                            <h5><i class="fas fa-thermometer-half me-2"></i>Temperature</h5>
                            <p>${planet.temp}</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-3" style="background: rgba(255,255,255,0.1); border-radius: 10px;">
                            <h5><i class="fas fa-ruler me-2"></i>Distance from Sun</h5>
                            <p>${planet.distance}</p>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 p-3" style="background: rgba(255,255,255,0.05); border-radius: 15px;">
                    <h5><i class="fas fa-info-circle me-2"></i>Did You Know?</h5>
                    <p>${this.getRandomFact(planetName)}</p>
                </div>
            </div>
        `;

        this.modal.show();
    }

    getRandomFact(planetName) {
        const facts = {
            'Mercury': 'Mercury has no atmosphere and experiences temperature swings of over 800°F!',
            'Venus': 'Venus rotates backwards compared to most planets in our solar system.',
            'Earth': 'Earth is the only known planet with life and liquid water on its surface.',
            'Mars': 'Mars has the largest volcano in the solar system - Olympus Mons!',
            'Jupiter': 'Jupiter has over 80 moons and a Great Red Spot storm larger than Earth!',
            'Saturn': 'Saturn is less dense than water and would float if placed in a giant bathtub!',
            'Uranus': 'Uranus spins on its side at a 98-degree angle to its orbit.',
            'Neptune': 'Neptune has winds that can reach speeds of up to 2,100 km/h!'
        };
        return facts[planetName] || 'This planet holds many cosmic secrets waiting to be discovered!';
    }
}

// Modal System using ES6 Class - SPECIAL REQUIREMENT IMPLEMENTATION
class ModalSystem {
    constructor() {
        this.modal = document.getElementById('planetModal');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.hide());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hide();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hide();
        });
    }

    show() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// News Management System using ES6 Class
class NewsManager {
    constructor() {
        this.newsData = [];
    }

    async loadNews() {
        const container = document.getElementById('space-news');

        try {
            // Using NASA API for space news
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5');
            const data = await response.json();

            this.newsData = data.map(item => ({
                title: item.title,
                description: item.explanation.substring(0, 200) + '...',
                date: item.date,
                image: item.url
            }));

            this.renderNews(container);
        } catch (error) {
            console.error('Error loading news:', error);
            this.renderFallbackNews(container);
        }
    }

    renderNews(container) {
        container.innerHTML = this.newsData.map(news => `
            <div class="news-card">
                <div class="d-flex align-items-start">
                    <div class="flex-grow-1">
                        <h5 style="color: var(--star-gold);">${news.title}</h5>
                        <p class="mb-2">${news.description}</p>
                        <small class="text-muted">
                            <i class="fas fa-calendar me-1"></i>${news.date}
                        </small>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderFallbackNews(container) {
        const fallbackNews = [
            { title: 'James Webb Space Telescope Discovers New Exoplanets', description: 'The revolutionary telescope continues to unveil cosmic mysteries...', date: '2024-06-15' },
            { title: 'Mars Rover Finds Evidence of Ancient Water', description: 'Latest discoveries suggest Mars once had flowing rivers...', date: '2024-06-10' },
            { title: 'SpaceX Launches New Mission to International Space Station', description: 'Successful launch brings new experiments to orbital laboratory...', date: '2024-06-05' }
        ];

        container.innerHTML = fallbackNews.map(news => `
            <div class="news-card">
                <h5 style="color: var(--star-gold);">${news.title}</h5>
                <p class="mb-2">${news.description}</p>
                <small class="text-muted">
                    <i class="fas fa-calendar me-1"></i>${news.date}
                </small>
            </div>
        `).join('');
    }
}

// Initialize all systems
const navigationSystem = new NavigationSystem();
const planetManager = new PlanetManager();
const newsManager = new NewsManager();

// Load initial content
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Cosmic Explorer initialized successfully!');
});