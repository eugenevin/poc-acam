/* ============================================
   ACAM.ai - Building Health Records Platform
   Main JavaScript Application Logic
   ============================================ */

// ========== Authentication ==========
const DEMO_CREDENTIALS = [
    {
        username: 'admin',
        password: 'acam2025'
    },
    {
        username: 'Saeed',
        password: 'acam2025'
    }
];

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('acam_logged_in');
    if (!isLoggedIn && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Login form handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Password toggle
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', togglePassword);
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check if credentials match any user
    const validUser = DEMO_CREDENTIALS.find(user => 
        user.username === username && user.password === password
    );
    
    if (validUser) {
        sessionStorage.setItem('acam_logged_in', 'true');
        sessionStorage.setItem('acam_username', username);
        window.location.href = 'search.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

function logout() {
    sessionStorage.removeItem('acam_logged_in');
    sessionStorage.removeItem('acam_username');
    window.location.href = 'login.html';
}

// ========== Search Page ==========
const testProperties = [
    {
        id: 'walnut-creek',
        name: 'Walnut Creek Transit Village',
        address: 'Walnut Creek, CA',
        type: 'residential',
        floors: '5 Floors',
        yearBuilt: '2018',
        health: 92,
        status: 'Compliant',
        image: 'residential-1'
    },
    {
        id: 'downtown-tower',
        name: 'Downtown Business Tower',
        address: 'San Francisco, CA',
        type: 'commercial',
        floors: '12 Floors',
        yearBuilt: '2015',
        health: 78,
        status: 'Review Needed',
        image: 'commercial-1'
    },
    {
        id: 'industrial-complex',
        name: 'Bay Area Distribution Center',
        address: 'Oakland, CA',
        type: 'industrial',
        floors: '2 Floors',
        yearBuilt: '2020',
        health: 95,
        status: 'Compliant',
        image: 'industrial-1'
    },
    {
        id: 'tech-campus',
        name: 'Silicon Valley Tech Campus',
        address: 'Palo Alto, CA',
        type: 'commercial',
        floors: '8 Floors',
        yearBuilt: '2019',
        health: 88,
        status: 'Compliant',
        image: 'commercial-2'
    },
    {
        id: 'marina-residences',
        name: 'Marina Bay Residences',
        address: 'San Mateo, CA',
        type: 'residential',
        floors: '15 Floors',
        yearBuilt: '2021',
        health: 96,
        status: 'Compliant',
        image: 'residential-2'
    },
    {
        id: 'warehouse-district',
        name: 'Port of Oakland Warehouse',
        address: 'Oakland, CA',
        type: 'industrial',
        floors: '3 Floors',
        yearBuilt: '2017',
        health: 82,
        status: 'Compliant',
        image: 'industrial-2'
    },
    {
        id: 'medical-center',
        name: 'Walnut Creek Medical Plaza',
        address: 'Walnut Creek, CA',
        type: 'commercial',
        floors: '6 Floors',
        yearBuilt: '2016',
        health: 91,
        status: 'Compliant',
        image: 'commercial-3'
    },
    {
        id: 'sunset-apartments',
        name: 'Sunset Boulevard Apartments',
        address: 'Berkeley, CA',
        type: 'residential',
        floors: '7 Floors',
        yearBuilt: '2014',
        health: 75,
        status: 'Review Needed',
        image: 'residential-3'
    }
];

let currentFilter = 'all';

function initSearchPage() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.filter;
            handleSearch();
        });
    });
    
    // Initial render
    renderProperties(testProperties);
}

function handleSearch(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    let filtered = testProperties;
    
    // Filter by type
    if (currentFilter !== 'all') {
        filtered = filtered.filter(prop => prop.type === currentFilter);
    }
    
    // Filter by search query
    if (query) {
        filtered = filtered.filter(prop => 
            prop.name.toLowerCase().includes(query) ||
            prop.address.toLowerCase().includes(query)
        );
    }
    
    renderProperties(filtered);
}

function renderProperties(properties) {
    const grid = document.querySelector('.properties-grid');
    if (!grid) return;
    
    if (properties.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#9ca3af" stroke-width="2"/>
                    <path d="M21 21L16.65 16.65" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <h3>No properties found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = properties.map(prop => `
        <div class="property-card" onclick="viewProperty('${prop.id}')">
            <div class="property-image ${prop.image}">
                <div class="property-badge ${prop.health >= 90 ? 'success' : prop.health >= 75 ? 'warning' : 'danger'}">
                    ${prop.status}
                </div>
                <div class="property-type">${capitalize(prop.type)}</div>
            </div>
            <div class="property-content">
                <h3>${prop.name}</h3>
                <p class="property-address">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    ${prop.address}
                </p>
                <div class="property-meta">
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <span>${prop.floors}</span>
                    </div>
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <span>Built ${prop.yearBuilt}</span>
                    </div>
                </div>
                <div class="property-health">
                    <div class="health-label">Health Score</div>
                    <div class="health-bar">
                        <div class="health-fill ${prop.health < 80 ? 'warning' : ''}" style="width: ${prop.health}%;"></div>
                    </div>
                    <div class="health-value">${prop.health}%</div>
                </div>
            </div>
        </div>
    `).join('');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function viewProperty(propertyId) {
    window.location.href = `property.html?id=${propertyId}`;
}

// ========== Property Page - Photos ==========
const propertyPhotos = [
    {
        full: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=150&fit=crop',
        alt: 'Building exterior view'
    },
    {
        full: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop',
        alt: 'Modern building facade'
    },
    {
        full: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200&h=150&fit=crop',
        alt: 'Building entrance'
    },
    {
        full: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop',
        alt: 'Lobby interior'
    },
    {
        full: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&h=150&fit=crop',
        alt: 'Office interior'
    },
    {
        full: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop',
        alt: 'Aerial view'
    }
];

let currentPhotoIndex = 0;

function changePhoto(direction) {
    currentPhotoIndex += direction;
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = propertyPhotos.length - 1;
    } else if (currentPhotoIndex >= propertyPhotos.length) {
        currentPhotoIndex = 0;
    }
    updatePhoto();
}

function selectPhoto(index) {
    currentPhotoIndex = index;
    updatePhoto();
}

function updatePhoto() {
    const mainPhoto = document.querySelector('#mainPhoto img');
    const currentPhotoSpan = document.getElementById('currentPhoto');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainPhoto) {
        mainPhoto.src = propertyPhotos[currentPhotoIndex].full;
        mainPhoto.alt = propertyPhotos[currentPhotoIndex].alt;
    }
    
    if (currentPhotoSpan) {
        currentPhotoSpan.textContent = currentPhotoIndex + 1;
    }
    
    thumbnails.forEach((thumb, index) => {
        if (index === currentPhotoIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function openInGoogleMaps() {
    const lat = 37.9101;
    const lng = -122.0652;
    window.open(`https://www.google.com/maps/@${lat},${lng},17z`, '_blank');
}

function switchVisualTab(tabName) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.visual-tab');
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update content visibility
    const views = document.querySelectorAll('.visual-view');
    views.forEach(view => {
        if (view.dataset.content === tabName) {
            view.classList.add('active');
        } else {
            view.classList.remove('active');
        }
    });
}

// ========== Property Page ==========
function initPropertyPage() {
    // Visual tabs (Photo/Street View) - handled by switchVisualTab
    const visualTabs = document.querySelectorAll('.visual-tab');
    visualTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            switchVisualTab(targetTab);
        });
    });
    
    // Category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetCategory = tab.dataset.category;
            
            // Update tab states
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update content
            document.querySelectorAll('.tab-content').forEach(content => {
                if (content.dataset.content === targetCategory) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
    
    // Structural section navigation
    const structuralNavItems = document.querySelectorAll('.structural-nav-item');
    structuralNavItems.forEach(navItem => {
        navItem.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = navItem.dataset.section;
            
            // Update nav states
            structuralNavItems.forEach(item => item.classList.remove('active'));
            navItem.classList.add('active');
            
            // Update section visibility
            document.querySelectorAll('.structural-section').forEach(section => {
                if (section.id === targetSection) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Smooth scroll to content area
            const contentArea = document.querySelector('.structural-content-area');
            if (contentArea) {
                contentArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

// Toggle expandable sections
function toggleSection(headerElement) {
    const section = headerElement.closest('.expandable-section');
    section.classList.toggle('expanded');
}

// Make toggleSection globally accessible
window.toggleSection = toggleSection;

// ========== Dashboard Page ==========
function initDashboard() {
    // Simulate real-time updates
    setInterval(() => {
        const syncIndicator = document.querySelector('.sync-indicator.active');
        if (syncIndicator) {
            syncIndicator.style.opacity = '0';
            setTimeout(() => {
                syncIndicator.style.opacity = '1';
            }, 300);
        }
    }, 5000);

    // Alert banner close functionality
    const alertBanner = document.querySelector('.alert-banner');
    if (alertBanner) {
        const closeBtn = alertBanner.querySelector('.btn-text');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                alertBanner.style.opacity = '0';
                alertBanner.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    alertBanner.style.display = 'none';
                }, 300);
            });
        }
    }
}

// ========== Smooth Scrolling ==========
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

// ========== Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.problem-card, .solution-card, .metric-card, .dashboard-card, .property-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========== Navbar Scroll Effect ==========
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar, .app-header');
    const currentScroll = window.pageYOffset;

    if (navbar) {
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    }

    lastScroll = currentScroll;
});

// ========== Hover Effects ==========
document.querySelectorAll('.metric-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const progressBar = this.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.transform = 'scaleX(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const progressBar = this.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.transform = 'scaleX(1)';
        }
    });
});

// ========== Page Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize based on current page
    if (document.querySelector('.search-body')) {
        initSearchPage();
    }
    
    if (document.querySelector('.property-body')) {
        initPropertyPage();
    }
    
    if (document.querySelector('.dashboard-body')) {
        initDashboard();
    }
    
    // Get URL parameters for property page
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (propertyId && document.getElementById('propertyTitle')) {
        // Load property data based on ID
        loadPropertyData(propertyId);
    }
});

// ========== Load Property Data ==========
function loadPropertyData(propertyId) {
    // Sample property data
    const properties = {
        'walnut-creek': {
            name: 'Walnut Creek Transit Village',
            location: 'Walnut Creek, California',
            type: 'Residential',
            floors: '5 Floors',
            yearBuilt: '2018'
        },
        'downtown-tower': {
            name: 'Downtown Business Tower',
            location: 'San Francisco, California',
            type: 'Commercial',
            floors: '12 Floors',
            yearBuilt: '2015'
        },
        'industrial-complex': {
            name: 'Bay Area Distribution Center',
            location: 'Oakland, California',
            type: 'Industrial',
            floors: '2 Floors',
            yearBuilt: '2020'
        }
    };
    
    const property = properties[propertyId];
    if (property) {
        document.getElementById('propertyTitle').textContent = property.name;
    }
}

// ========== Make Functions Global ==========
window.logout = logout;
window.viewProperty = viewProperty;

// ========== Console Welcome Message ==========
console.log('%cACAM.ai', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilding Health Records Platform', 'font-size: 14px; color: #6b7280;');
console.log('%cMVP v2.0 - Complete Workflow Implementation', 'font-size: 12px; color: #9ca3af;');



