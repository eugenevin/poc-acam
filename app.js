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
        
        // Show success feedback
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: middle;"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Success!';
        submitBtn.disabled = true;
        
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = 'search.html';
        }, 800);
    } else {
        alert('Invalid credentials. Please try again.\n\nDemo credentials:\nUsername: admin or Saeed\nPassword: acam2025');
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
    
    // Redirect to homepage with logout message
    window.location.href = 'index.html';
}

// ========== Search Page ==========
const PROPERTY_TYPE_FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'multifamily', label: 'Multifamily' },
    { value: 'office', label: 'Office' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'retail', label: 'Retail' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'government', label: 'Government/Institutional' },
    { value: 'mixed-use', label: 'Mixed-Use' },
    { value: 'special', label: 'Special Purpose' }
];

const ATTENTION_TOKEN = {
    'ok': { label: 'OK', className: 'chip-success' },
    'due-soon': { label: 'Due Soon', className: 'chip-warning' },
    'past-due': { label: 'Past Due', className: 'chip-danger' }
};

const STATUS_COLORS = {
    'ok': '#10b981',
    'due-soon': '#f59e0b',
    'past-due': '#ef4444'
};

const RAW_PROPERTY_DATA = [
    {
        id: 'walnut-creek',
        name: 'Walnut Creek Transit Village',
        address: '1234 Transit Way',
        city: 'Walnut Creek',
        state: 'CA',
        propertyId: 'WC-TV-001',
        apn: '178-090-024',
        type: 'multifamily',
        typeLabel: 'Multifamily',
        stories: 5,
        yearBuilt: 2018,
        gsf: 125000,
        healthScore: 92,
        updatedAt: '2025-08-12',
        profileCompleteness: 'high',
        lat: 37.9101,
        lng: -122.0652,
        image: 'residential-1',
        flags: [
            { category: 'Due Soon', dueDate: '2025-09-15', severity: 'warning' }
        ]
    },
    {
        id: 'downtown-tower',
        name: 'Downtown Business Tower',
        address: '22 Battery St',
        city: 'San Francisco',
        state: 'CA',
        propertyId: 'SF-DBT-014',
        apn: '3710-006',
        type: 'office',
        typeLabel: 'Office',
        stories: 28,
        yearBuilt: 2015,
        gsf: 780000,
        healthScore: 74,
        updatedAt: '2025-08-05',
        profileCompleteness: 'medium',
        lat: 37.7936,
        lng: -122.3999,
        image: 'commercial-1',
        flags: [
            { category: 'Compliance', dueDate: '2025-07-01', severity: 'overdue' },
            { category: 'Maintenance', dueDate: '2025-08-22', severity: 'warning' }
        ]
    },
    {
        id: 'industrial-complex',
        name: 'Bay Area Distribution Center',
        address: '455 Harbor Way',
        city: 'Oakland',
        state: 'CA',
        propertyId: 'OAK-DC-908',
        apn: '028-0011-005',
        type: 'industrial',
        typeLabel: 'Industrial',
        stories: 2,
        yearBuilt: 2020,
        gsf: 410000,
        healthScore: 95,
        updatedAt: '2025-08-15',
        profileCompleteness: 'high',
        lat: 37.7955,
        lng: -122.2665,
        image: 'industrial-1',
        flags: []
    },
    {
        id: 'tech-campus',
        name: 'Silicon Valley Tech Campus',
        address: '910 Innovation Dr',
        city: 'Palo Alto',
        state: 'CA',
        propertyId: 'PA-TC-302',
        apn: '124-56-012',
        type: 'office',
        typeLabel: 'Office',
        stories: 8,
        yearBuilt: 2019,
        gsf: 520000,
        healthScore: 88,
        updatedAt: '2025-08-10',
        profileCompleteness: 'high',
        lat: 37.4419,
        lng: -122.1430,
        image: 'commercial-2',
        flags: [
            { category: 'Maintenance', dueDate: '2025-09-20', severity: 'warning' }
        ]
    },
    {
        id: 'marina-residences',
        name: 'Marina Bay Residences',
        address: '600 Shoreline Blvd',
        city: 'San Mateo',
        state: 'CA',
        propertyId: 'SM-MBR-111',
        apn: '037-045-130',
        type: 'multifamily',
        typeLabel: 'Multifamily',
        stories: 15,
        yearBuilt: 2021,
        gsf: 565000,
        healthScore: 96,
        updatedAt: '2025-08-18',
        profileCompleteness: 'high',
        lat: 37.5630,
        lng: -122.3255,
        image: 'residential-2',
        flags: []
    },
    {
        id: 'warehouse-district',
        name: 'Port of Oakland Warehouse',
        address: '220 Maritime St',
        city: 'Oakland',
        state: 'CA',
        propertyId: 'OAK-WH-220',
        apn: '041-3905-002',
        type: 'industrial',
        typeLabel: 'Industrial',
        stories: 3,
        yearBuilt: 2017,
        gsf: 300000,
        healthScore: 82,
        updatedAt: '2025-07-30',
        profileCompleteness: 'medium',
        lat: 37.8058,
        lng: -122.3011,
        image: 'industrial-2',
        flags: [
            { category: 'Maintenance', dueDate: '2025-08-28', severity: 'warning' }
        ]
    },
    {
        id: 'medical-center',
        name: 'Walnut Creek Medical Plaza',
        address: '250 Civic Dr',
        city: 'Walnut Creek',
        state: 'CA',
        propertyId: 'WC-MP-022',
        apn: '178-040-010',
        type: 'healthcare',
        typeLabel: 'Healthcare',
        stories: 6,
        yearBuilt: 2016,
        gsf: 350000,
        healthScore: 91,
        updatedAt: '2025-08-11',
        profileCompleteness: 'high',
        lat: 37.9058,
        lng: -122.0670,
        image: 'commercial-3',
        flags: [
            { category: 'Compliance', dueDate: '2025-10-01', severity: 'warning' }
        ]
    },
    {
        id: 'sunset-apartments',
        name: 'Sunset Boulevard Apartments',
        address: '900 Gilman St',
        city: 'Berkeley',
        state: 'CA',
        propertyId: 'BK-SB-333',
        apn: '061-3154-008',
        type: 'mixed-use',
        typeLabel: 'Mixed-Use',
        stories: 7,
        yearBuilt: 2014,
        gsf: 290000,
        healthScore: 75,
        updatedAt: '2025-07-25',
        profileCompleteness: 'medium',
        lat: 37.8799,
        lng: -122.2990,
        image: 'residential-3',
        flags: [
            { category: 'Structural/Condition', dueDate: '2025-06-30', severity: 'overdue' }
        ]
    },
    {
        id: 'austin-tech-tower',
        name: 'Austin Technology Tower',
        address: '500 Congress Ave',
        city: 'Austin',
        state: 'TX',
        propertyId: 'ATX-TT-201',
        apn: '025-4598-110',
        type: 'office',
        typeLabel: 'Office',
        stories: 22,
        yearBuilt: 2019,
        gsf: 650000,
        healthScore: 89,
        updatedAt: '2025-08-14',
        profileCompleteness: 'high',
        lat: 30.2672,
        lng: -97.7431,
        image: 'commercial-1',
        flags: [
            { category: 'Maintenance', dueDate: '2025-09-25', severity: 'warning' }
        ]
    },
    {
        id: 'chicago-lakeview',
        name: 'Lakeview Apartments',
        address: '1800 N Lake Shore Dr',
        city: 'Chicago',
        state: 'IL',
        propertyId: 'CHI-LA-450',
        apn: '148-7754-003',
        type: 'multifamily',
        typeLabel: 'Multifamily',
        stories: 35,
        yearBuilt: 2020,
        gsf: 890000,
        healthScore: 94,
        updatedAt: '2025-08-19',
        profileCompleteness: 'high',
        lat: 41.9153,
        lng: -87.6270,
        image: 'residential-1',
        flags: []
    },
    {
        id: 'denver-warehouse',
        name: 'Denver Distribution Hub',
        address: '3400 Brighton Blvd',
        city: 'Denver',
        state: 'CO',
        propertyId: 'DEN-DH-788',
        apn: '081-2203-045',
        type: 'industrial',
        typeLabel: 'Industrial',
        stories: 1,
        yearBuilt: 2021,
        gsf: 550000,
        healthScore: 97,
        updatedAt: '2025-08-20',
        profileCompleteness: 'high',
        lat: 39.7684,
        lng: -104.9615,
        image: 'industrial-1',
        flags: []
    },
    {
        id: 'seattle-tower',
        name: 'Seattle Corporate Center',
        address: '1201 3rd Ave',
        city: 'Seattle',
        state: 'WA',
        propertyId: 'SEA-CC-930',
        apn: '066-2039-021',
        type: 'office',
        typeLabel: 'Office',
        stories: 40,
        yearBuilt: 2017,
        gsf: 1200000,
        healthScore: 86,
        updatedAt: '2025-08-08',
        profileCompleteness: 'high',
        lat: 47.6062,
        lng: -122.3321,
        image: 'commercial-2',
        flags: [
            { category: 'Compliance', dueDate: '2025-09-10', severity: 'warning' }
        ]
    },
    {
        id: 'boston-medical',
        name: 'Boston Medical Plaza',
        address: '125 Brookline Ave',
        city: 'Boston',
        state: 'MA',
        propertyId: 'BOS-MP-612',
        apn: '145-8801-007',
        type: 'healthcare',
        typeLabel: 'Healthcare',
        stories: 12,
        yearBuilt: 2016,
        gsf: 480000,
        healthScore: 90,
        updatedAt: '2025-08-13',
        profileCompleteness: 'high',
        lat: 42.3370,
        lng: -71.1040,
        image: 'commercial-3',
        flags: []
    },
    {
        id: 'miami-retail',
        name: 'Miami Beach Retail Center',
        address: '1655 Meridian Ave',
        city: 'Miami Beach',
        state: 'FL',
        propertyId: 'MIA-RC-320',
        apn: '041-3412-190',
        type: 'retail',
        typeLabel: 'Retail',
        stories: 3,
        yearBuilt: 2018,
        gsf: 225000,
        healthScore: 78,
        updatedAt: '2025-08-06',
        profileCompleteness: 'medium',
        lat: 25.7907,
        lng: -80.1384,
        image: 'commercial-1',
        flags: [
            { category: 'Compliance', dueDate: '2025-06-15', severity: 'overdue' }
        ]
    },
    {
        id: 'phoenix-mixed',
        name: 'Phoenix Urban Village',
        address: '440 N Central Ave',
        city: 'Phoenix',
        state: 'AZ',
        propertyId: 'PHX-UV-555',
        apn: '118-2956-033',
        type: 'mixed-use',
        typeLabel: 'Mixed-Use',
        stories: 24,
        yearBuilt: 2020,
        gsf: 720000,
        healthScore: 91,
        updatedAt: '2025-08-17',
        profileCompleteness: 'high',
        lat: 33.4484,
        lng: -112.0740,
        image: 'residential-2',
        flags: []
    },
    {
        id: 'atlanta-office',
        name: 'Atlanta Commerce Plaza',
        address: '191 Peachtree St NE',
        city: 'Atlanta',
        state: 'GA',
        propertyId: 'ATL-CP-711',
        apn: '085-4477-012',
        type: 'office',
        typeLabel: 'Office',
        stories: 50,
        yearBuilt: 2015,
        gsf: 1350000,
        healthScore: 83,
        updatedAt: '2025-08-04',
        profileCompleteness: 'medium',
        lat: 33.7580,
        lng: -84.3880,
        image: 'commercial-2',
        flags: [
            { category: 'Maintenance', dueDate: '2025-08-30', severity: 'warning' }
        ]
    },
    {
        id: 'portland-industrial',
        name: 'Portland Logistics Center',
        address: '9000 NE Airport Way',
        city: 'Portland',
        state: 'OR',
        propertyId: 'PDX-LC-440',
        apn: '051-8833-066',
        type: 'industrial',
        typeLabel: 'Industrial',
        stories: 2,
        yearBuilt: 2019,
        gsf: 445000,
        healthScore: 92,
        updatedAt: '2025-08-16',
        profileCompleteness: 'high',
        lat: 45.5898,
        lng: -122.5951,
        image: 'industrial-2',
        flags: []
    },
    {
        id: 'nyc-tower',
        name: 'Manhattan Financial Center',
        address: '55 Water St',
        city: 'New York',
        state: 'NY',
        propertyId: 'NYC-FC-990',
        apn: '001-0025-001',
        type: 'office',
        typeLabel: 'Office',
        stories: 52,
        yearBuilt: 2014,
        gsf: 1580000,
        healthScore: 71,
        updatedAt: '2025-08-02',
        profileCompleteness: 'medium',
        lat: 40.7028,
        lng: -74.0096,
        image: 'commercial-1',
        flags: [
            { category: 'Compliance', dueDate: '2025-05-20', severity: 'overdue' },
            { category: 'Structural/Condition', dueDate: '2025-08-25', severity: 'warning' }
        ]
    },
    {
        id: 'dallas-multifamily',
        name: 'Dallas Urban Lofts',
        address: '2200 Ross Ave',
        city: 'Dallas',
        state: 'TX',
        propertyId: 'DAL-UL-622',
        apn: '073-5541-088',
        type: 'multifamily',
        typeLabel: 'Multifamily',
        stories: 18,
        yearBuilt: 2021,
        gsf: 475000,
        healthScore: 95,
        updatedAt: '2025-08-21',
        profileCompleteness: 'high',
        lat: 32.7877,
        lng: -96.7984,
        image: 'residential-3',
        flags: []
    }
];

const PORTFOLIO_PROPERTIES = RAW_PROPERTY_DATA.map(enrichProperty);
const SEARCH_STATE = {
    query: '',
    type: 'all',
    sort: 'updated-desc',
    view: 'list'
};

let currentResults = [];
let mapInstance;
let markerLayer;
let mapInitialized = false;
let searchInputDebounce;

function initSearchPage() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const viewToggleButtons = document.querySelectorAll('.view-toggle-btn');
    const viewAllBtn = document.getElementById('viewAllBtn');

    buildFilterChips();
    initTooltipTriggers();

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            updateResults();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            clearTimeout(searchInputDebounce);
            searchInputDebounce = setTimeout(() => {
                SEARCH_STATE.query = event.target.value.trim().toLowerCase();
                updateResults();
            }, 250);
        });
    }

    if (sortSelect) {
        sortSelect.value = SEARCH_STATE.sort;
        sortSelect.addEventListener('change', (event) => {
            SEARCH_STATE.sort = event.target.value;
            updateResults();
        });
    }

    viewToggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            setActiveView(button.dataset.view);
        });
    });

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            // Reset filters to show all properties
            SEARCH_STATE.searchQuery = '';
            SEARCH_STATE.selectedFilters = ['all'];
            if (searchInput) searchInput.value = '';
            filterProperties();
        });
    }

    setActiveView(SEARCH_STATE.view);
    setLoadingState(true);
    setTimeout(() => {
        updateResults();
        setLoadingState(false);
    }, 450);
}

function buildFilterChips() {
    const container = document.getElementById('propertyTypeFilters');
    if (!container) return;

    PROPERTY_TYPE_FILTERS.forEach((filter, index) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = `filter-chip${filter.value === SEARCH_STATE.type ? ' active' : ''}`;
        chip.dataset.filter = filter.value;
        chip.textContent = filter.label;
        chip.setAttribute('role', 'tab');
        chip.setAttribute('aria-selected', filter.value === SEARCH_STATE.type);
        chip.setAttribute('tabindex', filter.value === SEARCH_STATE.type ? '0' : '-1');
        
        chip.addEventListener('click', () => {
            SEARCH_STATE.type = filter.value;
            container.querySelectorAll('.filter-chip').forEach((c) => {
                c.classList.remove('active');
                c.setAttribute('aria-selected', 'false');
                c.setAttribute('tabindex', '-1');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-selected', 'true');
            chip.setAttribute('tabindex', '0');
            updateResults();
        });

        // Keyboard navigation for filter chips
        chip.addEventListener('keydown', (e) => {
            const chips = Array.from(container.querySelectorAll('.filter-chip'));
            const currentIndex = chips.indexOf(chip);
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % chips.length;
                chips[nextIndex].click();
                chips[nextIndex].focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + chips.length) % chips.length;
                chips[prevIndex].click();
                chips[prevIndex].focus();
            }
        });
        
        container.appendChild(chip);
        if (index === 0) {
            chip.classList.add('sticky-chip');
        }
    });
}

function enrichProperty(property) {
    const attention = getAttentionStatus(property.flags || []);
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const updatedDisplay = property.updatedAt ? formatter.format(new Date(property.updatedAt)) : '—';
    const searchIndex = [
        property.name,
        property.address,
        property.city,
        property.state,
        property.propertyId,
        property.apn,
        property.typeLabel
    ].join(' ').toLowerCase();

    return {
        ...property,
        attentionStatus: attention.status,
        hasRedFlag: attention.hasRedFlag,
        earliestDueDate: attention.earliestDueDate,
        updatedDisplay,
        searchIndex
    };
}

function getAttentionStatus(flags) {
    if (!flags || flags.length === 0) {
        return { status: 'ok', hasRedFlag: false };
    }

    const today = new Date();
    const lookAhead = new Date();
    lookAhead.setDate(today.getDate() + 30);

    let earliestDueDate = null;
    let status = 'ok';

    flags.forEach((flag) => {
        if (!flag.dueDate) {
            status = 'past-due';
            return;
        }

        const dueDate = new Date(flag.dueDate);
        if (!earliestDueDate || dueDate < earliestDueDate) {
            earliestDueDate = dueDate;
        }

        if (flag.severity === 'overdue' || dueDate < today) {
            status = 'past-due';
        } else if ((status !== 'past-due') && dueDate <= lookAhead) {
            status = 'due-soon';
        }
    });

    return {
        status,
        hasRedFlag: status !== 'ok',
        earliestDueDate
    };
}

function updateResults() {
    let results = [...PORTFOLIO_PROPERTIES];

    if (SEARCH_STATE.query) {
        results = results.filter((property) => property.searchIndex.includes(SEARCH_STATE.query));
    }

    if (SEARCH_STATE.type !== 'all') {
        results = results.filter((property) => property.type === SEARCH_STATE.type);
    }

    results = applySort(results, SEARCH_STATE.sort);
    currentResults = results;

    renderProperties(results);
    updateKPIs(results);
    updateResultsSummary(results.length);
    toggleEmptyStates(results.length === 0);
    updateMap(results);
}

function applySort(properties, sort) {
    const sorted = [...properties];
    switch (sort) {
        case 'health-asc':
            sorted.sort((a, b) => a.healthScore - b.healthScore);
            break;
        case 'health-desc':
            sorted.sort((a, b) => b.healthScore - a.healthScore);
            break;
        case 'name-asc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'updated-desc':
        default:
            sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            break;
    }
    return sorted;
}

function renderProperties(properties) {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;

    if (properties.length === 0) {
        grid.innerHTML = '';
        return;
    }

    grid.innerHTML = properties.map((property) => createPropertyCard(property)).join('');
}

function createPropertyCard(property) {
    const attentionMeta = ATTENTION_TOKEN[property.attentionStatus] || ATTENTION_TOKEN['ok'];
    const metaLineParts = [`${property.stories} stories`, `Year built ${property.yearBuilt}`];
    if (property.gsf) {
        metaLineParts.push(`${Intl.NumberFormat('en-US').format(property.gsf)} SF`);
    }
    const metaLine = metaLineParts.join(' • ');
    const completenessLabel = property.profileCompleteness
        ? `Profile completeness: ${capitalize(property.profileCompleteness)}`
        : '';

    return `
        <article class="property-card" data-status="${property.attentionStatus}" onclick="viewProperty('${property.id}')">
            <div class="property-image ${property.image}">
                <div class="chip attention-chip ${attentionMeta.className}">${attentionMeta.label}</div>
                <div class="chip type-chip">${property.typeLabel}</div>
            </div>
            <div class="property-content">
                <div class="property-header">
                    <h3>${property.name}</h3>
                    <p class="property-location">${property.city}, ${property.state}</p>
                </div>
                <p class="property-meta-line">${metaLine}</p>
                <div class="property-health">
                    <div class="health-label-row">
                        <span>Property Health Score</span>
                        <span class="health-value">${property.healthScore}%</span>
                    </div>
                    <div class="health-bar">
                        <div class="health-fill ${property.healthScore < 80 ? 'warning' : ''}" style="width: ${property.healthScore}%;"></div>
                    </div>
                </div>
                <p class="property-updated">Updated: ${property.updatedDisplay}</p>
                <div class="property-footnote">
                    <span class="profile-completeness">${completenessLabel}</span>
                    <button class="btn-text link" type="button" onclick="event.stopPropagation(); viewProperty('${property.id}')">
                        Open record
                    </button>
                </div>
            </div>
        </article>
    `;
}

function updateKPIs(properties) {
    const totalEl = document.getElementById('kpiTotalProperties');
    const redFlagsEl = document.getElementById('kpiRedFlags');
    const noFlagsEl = document.getElementById('kpiNoFlags');
    const avgHealthEl = document.getElementById('kpiAvgHealth');

    if (!totalEl || !redFlagsEl || !noFlagsEl || !avgHealthEl) return;

    const total = properties.length;
    const redFlags = properties.filter((property) => property.hasRedFlag).length;
    const noFlags = Math.max(total - redFlags, 0);
    const avgHealth = total
        ? Math.round(properties.reduce((sum, property) => sum + property.healthScore, 0) / total)
        : null;

    totalEl.textContent = total || '—';
    redFlagsEl.textContent = total ? redFlags : '—';
    noFlagsEl.textContent = total ? noFlags : '—';
    avgHealthEl.textContent = avgHealth !== null ? `${avgHealth}%` : '—';
}

function updateResultsSummary(visibleCount) {
    const summary = document.getElementById('resultsSummary');
    if (!summary) return;

    if (!visibleCount) {
        summary.textContent = 'No properties to display';
        return;
    }

    summary.textContent = `Showing ${visibleCount} of ${PORTFOLIO_PROPERTIES.length} properties`;
}

function toggleEmptyStates(isEmpty) {
    const emptyState = document.getElementById('emptyState');
    const grid = document.getElementById('propertiesGrid');
    if (emptyState) {
        emptyState.classList.toggle('hidden', !isEmpty);
    }
    if (grid) {
        grid.classList.toggle('hidden', isEmpty);
    }
}

function setLoadingState(isLoading) {
    const grid = document.getElementById('propertiesGrid');
    const loading = document.getElementById('loadingState');

    if (grid) {
        grid.classList.toggle('hidden', isLoading);
    }

    if (loading) {
        loading.classList.toggle('hidden', !isLoading);
    }
}

function setActiveView(view) {
    SEARCH_STATE.view = view;

    const viewButtons = document.querySelectorAll('.view-toggle-btn');
    viewButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.view === view);
    });

    const viewStack = document.querySelector('.view-stack');
    const mapPanel = document.getElementById('mapPanel');

    if (viewStack) {
        viewStack.classList.toggle('hidden', view === 'map');
    }

    if (mapPanel) {
        mapPanel.classList.toggle('hidden', view !== 'map');
    }

    if (view === 'map') {
        updateMap(currentResults);
    }
}

function updateMap(properties) {
    const mapContainer = document.getElementById('propertiesMap');
    if (!mapContainer) return;

    if (!mapInitialized) {
        initMap(mapContainer);
    }

    if (!mapInstance || !markerLayer) {
        return;
    }

    const emptyState = document.getElementById('mapEmptyState');

    if (!properties.length) {
        if (emptyState) emptyState.classList.remove('hidden');
        if (markerLayer) markerLayer.clearLayers();
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    markerLayer.clearLayers();

    properties.forEach((property) => {
        if (property.lat && property.lng) {
            const statusColor = STATUS_COLORS[property.attentionStatus] || STATUS_COLORS['ok'];
            
            const marker = L.circleMarker([property.lat, property.lng], {
                radius: 10,
                color: '#ffffff',
                fillColor: statusColor,
                weight: 2,
                fillOpacity: 0.85,
                attentionStatus: property.attentionStatus // Store for cluster coloring
            }).bindPopup(createMapPopup(property), {
                maxWidth: 300,
                className: 'custom-popup'
            });
            
            // Add hover effect
            marker.on('mouseover', function() {
                this.setStyle({
                    radius: 12,
                    weight: 3
                });
            });
            
            marker.on('mouseout', function() {
                this.setStyle({
                    radius: 10,
                    weight: 2
                });
            });
            
            markerLayer.addLayer(marker);
        }
    });

    const bounds = markerLayer.getBounds();
    if (bounds.isValid()) {
        mapInstance.fitBounds(bounds, { padding: [32, 32], maxZoom: 13 });
    }
}

function initMap(container) {
    if (typeof L === 'undefined') return;

    // Center on continental US
    mapInstance = L.map(container, {
        scrollWheelZoom: false,
        zoomControl: true
    }).setView([39.8283, -98.5795], 4);

    // Use better tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 3
    }).addTo(mapInstance);

    // Enable scroll zoom after first click
    mapInstance.on('focus', () => {
        mapInstance.scrollWheelZoom.enable();
    });
    mapInstance.on('blur', () => {
        mapInstance.scrollWheelZoom.disable();
    });

    // Create marker cluster group with custom options
    markerLayer = L.markerClusterGroup({
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: function(cluster) {
            const childCount = cluster.getChildCount();
            const markers = cluster.getAllChildMarkers();
            
            // Determine cluster color based on worst status
            let hasOverdue = false;
            let hasDueSoon = false;
            
            markers.forEach(marker => {
                const status = marker.options.attentionStatus;
                if (status === 'past-due') hasOverdue = true;
                if (status === 'due-soon') hasDueSoon = true;
            });
            
            let clusterClass = 'marker-cluster-ok';
            if (hasOverdue) clusterClass = 'marker-cluster-overdue';
            else if (hasDueSoon) clusterClass = 'marker-cluster-warning';
            
            return L.divIcon({
                html: `<div><span>${childCount}</span></div>`,
                className: 'marker-cluster ' + clusterClass,
                iconSize: L.point(40, 40)
            });
        }
    });
    
    mapInstance.addLayer(markerLayer);

    mapInitialized = true;
}

function createMapPopup(property) {
    const attentionMeta = ATTENTION_TOKEN[property.attentionStatus] || ATTENTION_TOKEN['ok'];
    const healthClass = property.healthScore >= 90 ? 'success' : property.healthScore >= 75 ? 'warning' : 'danger';
    
    return `
        <div class="map-popup">
            <div class="map-popup-header">
                <h3 class="map-popup-title">${property.name}</h3>
                <span class="chip ${attentionMeta.className}">${attentionMeta.label}</span>
            </div>
            <div class="map-popup-body">
                <div class="map-popup-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H21M19 21H13M5 21H3M5 21H11M11 21V16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16V21M11 21H13" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span class="map-popup-meta">${property.typeLabel}</span>
                </div>
                <div class="map-popup-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                    </svg>
                    <span class="map-popup-meta">${property.city}, ${property.state}</span>
                </div>
                <div class="map-popup-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span class="map-popup-meta">Health Score: <strong class="${healthClass}">${property.healthScore}%</strong></span>
                </div>
                ${property.address ? `
                <div class="map-popup-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 7L12 2L21 7M3 7L12 12M3 7V17L12 22M21 7L12 12M21 7V17L12 22M12 12V22" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span class="map-popup-meta">${property.address}</span>
                </div>
                ` : ''}
            </div>
            <div class="map-popup-footer">
                <button class="btn-primary btn-sm" type="button" onclick="viewProperty('${property.id}')">
                    View Details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

function initTooltipTriggers() {
    const triggers = document.querySelectorAll('.tooltip-trigger');
    triggers.forEach((trigger) => {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.addEventListener('click', () => {
            const tooltipId = trigger.getAttribute('aria-describedby');
            const tooltip = tooltipId ? document.getElementById(tooltipId) : null;
            if (!tooltip) return;

            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', String(!isExpanded));
            tooltip.classList.toggle('visible', !isExpanded);
        });
    });
}

function capitalize(str = '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function viewProperty(propertyId) {
    // Navigate to property details page
    window.location.href = `property.html?id=${propertyId}`;
}

// ========== Property Page - Photos ==========
const PROPERTY_PHOTO_SETS = {
    'walnut-creek': [
        { full: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=150&fit=crop', alt: 'Building exterior' },
        { full: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200&h=150&fit=crop', alt: 'Entrance' },
        { full: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=150&fit=crop', alt: 'Lobby' },
        { full: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=150&fit=crop', alt: 'Interior' },
        { full: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=200&h=150&fit=crop', alt: 'Common area' },
        { full: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=200&h=150&fit=crop', alt: 'Aerial view' }
    ],
    'downtown-tower': [
        { full: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop', alt: 'Tower exterior' },
        { full: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop', alt: 'Lobby' },
        { full: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&h=150&fit=crop', alt: 'Office space' },
        { full: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=150&fit=crop', alt: 'Meeting room' },
        { full: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200&h=150&fit=crop', alt: 'Conference area' },
        { full: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=200&h=150&fit=crop', alt: 'City view' }
    ],
    'industrial-complex': [
        { full: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=150&fit=crop', alt: 'Warehouse exterior' },
        { full: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=200&h=150&fit=crop', alt: 'Loading dock' },
        { full: 'https://images.unsplash.com/photo-1565610222536-ef29c6f9c6ad?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1565610222536-ef29c6f9c6ad?w=200&h=150&fit=crop', alt: 'Interior storage' },
        { full: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200&h=150&fit=crop', alt: 'Warehouse floor' },
        { full: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=200&h=150&fit=crop', alt: 'Office area' },
        { full: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=200&h=150&fit=crop', alt: 'Shipping area' }
    ],
    'tech-campus': [
        { full: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop', alt: 'Campus exterior' },
        { full: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=150&fit=crop', alt: 'Open office' },
        { full: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&h=150&fit=crop', alt: 'Workspace' },
        { full: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&h=150&fit=crop', alt: 'Collaboration area' },
        { full: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=200&h=150&fit=crop', alt: 'Cafeteria' },
        { full: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200&h=150&fit=crop', alt: 'Conference room' }
    ],
    'marina-residences': [
        { full: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200&h=150&fit=crop', alt: 'Building exterior' },
        { full: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=150&fit=crop', alt: 'Tower view' },
        { full: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=150&fit=crop', alt: 'Lobby' },
        { full: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=200&h=150&fit=crop', alt: 'Amenities' },
        { full: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=150&fit=crop', alt: 'Lounge' },
        { full: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=200&h=150&fit=crop', alt: 'Waterfront view' }
    ],
    'warehouse-district': [
        { full: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=200&h=150&fit=crop', alt: 'Warehouse exterior' },
        { full: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=150&fit=crop', alt: 'Storage area' },
        { full: 'https://images.unsplash.com/photo-1565610222536-ef29c6f9c6ad?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1565610222536-ef29c6f9c6ad?w=200&h=150&fit=crop', alt: 'Interior' },
        { full: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200&h=150&fit=crop', alt: 'Loading bay' },
        { full: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=200&h=150&fit=crop', alt: 'Office' },
        { full: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&h=150&fit=crop', alt: 'Port view' }
    ],
    'medical-center': [
        { full: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=150&fit=crop', alt: 'Medical center exterior' },
        { full: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=200&h=150&fit=crop', alt: 'Main entrance' },
        { full: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=200&h=150&fit=crop', alt: 'Reception' },
        { full: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=200&h=150&fit=crop', alt: 'Waiting area' },
        { full: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&h=150&fit=crop', alt: 'Corridor' },
        { full: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=150&fit=crop', alt: 'Building' }
    ],
    'sunset-apartments': [
        { full: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&h=150&fit=crop', alt: 'Apartment building' },
        { full: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=200&h=150&fit=crop', alt: 'Facade' },
        { full: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=150&fit=crop', alt: 'Entrance' },
        { full: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=150&fit=crop', alt: 'Common area' },
        { full: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=200&h=150&fit=crop', alt: 'Retail floor' },
        { full: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop', thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=150&fit=crop', alt: 'Street view' }
    ]
};

let currentPhotoIndex = 0;
let currentPropertyPhotos = [];

function changePhoto(direction) {
    if (!currentPropertyPhotos.length) return;
    
    currentPhotoIndex += direction;
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = currentPropertyPhotos.length - 1;
    } else if (currentPhotoIndex >= currentPropertyPhotos.length) {
        currentPhotoIndex = 0;
    }
    updatePhoto();
}

function selectPhoto(index) {
    currentPhotoIndex = index;
    updatePhoto();
}

function updatePhoto() {
    if (!currentPropertyPhotos.length) return;
    
    const mainPhoto = document.querySelector('#mainPhoto img');
    const currentPhotoSpan = document.getElementById('currentPhoto');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainPhoto && currentPropertyPhotos[currentPhotoIndex]) {
        mainPhoto.src = currentPropertyPhotos[currentPhotoIndex].full;
        mainPhoto.alt = currentPropertyPhotos[currentPhotoIndex].alt;
    }
    
    if (currentPhotoSpan) {
        currentPhotoSpan.textContent = currentPhotoIndex + 1;
    }
    
    const totalPhotosSpan = document.getElementById('totalPhotos');
    if (totalPhotosSpan) {
        totalPhotosSpan.textContent = currentPropertyPhotos.length;
    }
    
    thumbnails.forEach((thumb, index) => {
        if (index === currentPhotoIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
        const thumbImg = thumb.querySelector('img');
        if (thumbImg && currentPropertyPhotos[index]) {
            thumbImg.src = currentPropertyPhotos[index].thumb;
            thumbImg.alt = currentPropertyPhotos[index].alt;
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
    // Export dropdown functionality
    const exportBtn = document.getElementById('exportBtn');
    const exportMenu = document.getElementById('exportMenu');
    
    if (exportBtn && exportMenu) {
        exportBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = exportBtn.getAttribute('aria-expanded') === 'true';
            exportBtn.setAttribute('aria-expanded', !isExpanded);
            exportMenu.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (exportMenu.classList.contains('active') && 
                !exportMenu.contains(e.target) && 
                !exportBtn.contains(e.target)) {
                exportMenu.classList.remove('active');
                exportBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Handle export menu items
        const menuItems = exportMenu.querySelectorAll('[role="menuitem"]');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const exportType = item.dataset.export;
                console.log(`Exporting ${exportType} report...`);
                // TODO: Implement actual export functionality
                alert(`Exporting ${exportType} report...`);
                exportMenu.classList.remove('active');
                exportBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

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

// ========== Sidebar Navigation for Property Details ==========
function initSidebarAccordion() {
    // Handle accordion toggles for sidebar sections
    const toggleButtons = document.querySelectorAll('.nav-section-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const submenuId = this.getAttribute('data-toggle');
            const submenu = document.querySelector(`[data-submenu="${submenuId}"]`);
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle the expanded state
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the submenu visibility
            if (submenu) {
                submenu.classList.toggle('collapsed');
            }
        });
    });
}

function initSidebarNavigation() {
    // Handle sidebar navigation clicks
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    if (navItems.length === 0) {
        console.log('No sidebar navigation found');
        return; // Exit if no sidebar exists
    }
    
    console.log(`Initialized sidebar navigation with ${navItems.length} items and ${contentSections.length} sections`);
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show the selected content section
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById('section-' + sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Scroll to top of content area
                const dashboardMain = document.querySelector('.dashboard-main');
                if (dashboardMain) {
                    dashboardMain.scrollTop = 0;
                }
            }
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 1024) {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
}

// Toggle sidebar visibility (for mobile)
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Make toggleSidebar globally accessible
window.toggleSidebar = toggleSidebar;

// ========== Load Dashboard Data ==========
function loadDashboardData(propertyId) {
    const property = DETAILED_PROPERTY_DATA[propertyId];
    if (!property) {
        console.warn('Property not found for dashboard:', propertyId);
        return;
    }
    
    // Update header title
    const headerSubtitle = document.querySelector('.header-subtitle');
    if (headerSubtitle) {
        headerSubtitle.textContent = property.subtitle;
    }
    
    // Update metrics
    const healthScoreEl = document.querySelector('.metric-card:nth-child(1) .metric-value');
    if (healthScoreEl) {
        healthScoreEl.textContent = property.healthScore + '%';
        const progressBar = document.querySelector('.metric-card:nth-child(1) .progress-bar');
        if (progressBar) {
            progressBar.style.width = property.healthScore + '%';
        }
        const metricChange = document.querySelector('.metric-card:nth-child(1) .metric-change');
        if (metricChange && property.healthScore >= 90) {
            metricChange.textContent = '+' + (property.healthScore - 89) + '% from last month';
        }
    }
    
    const complianceScoreEl = document.querySelector('.metric-card:nth-child(2) .metric-value');
    if (complianceScoreEl) {
        complianceScoreEl.textContent = property.complianceScore + '%';
        const progressBar = document.querySelector('.metric-card:nth-child(2) .progress-bar');
        if (progressBar) {
            progressBar.style.width = property.complianceScore + '%';
        }
    }
    
    const alertsEl = document.querySelector('.metric-card:nth-child(3) .metric-value');
    if (alertsEl) {
        alertsEl.textContent = property.alerts;
        const metricChange = document.querySelector('.metric-card:nth-child(3) .metric-change');
        if (metricChange) {
            if (property.alerts === 0) {
                metricChange.textContent = 'All systems operating normally';
                metricChange.className = 'metric-change positive';
            } else if (property.alerts <= 2) {
                metricChange.textContent = property.alerts + ' items requiring attention';
                metricChange.className = 'metric-change neutral';
            } else {
                metricChange.textContent = property.alerts + ' items requiring attention';
                metricChange.className = 'metric-change negative';
            }
        }
    }
    
    const lastUpdatedEl = document.querySelector('.metric-card:nth-child(4) .metric-value');
    if (lastUpdatedEl) {
        lastUpdatedEl.textContent = property.lastUpdated;
        const metricChange = document.querySelector('.metric-card:nth-child(4) .metric-change');
        if (metricChange) {
            metricChange.textContent = 'AI sync completed';
        }
    }
    
    // Update alert banner
    const alertBanner = document.querySelector('.alert-banner');
    if (alertBanner) {
        if (property.codeAlert) {
            alertBanner.style.display = 'flex';
            const alertContent = alertBanner.querySelector('div');
            if (alertContent) {
                alertContent.innerHTML = `<strong>${property.alerts > 3 ? 'Critical Alert:' : 'Code Update Alert:'}</strong> ${property.codeAlert}`;
            }
            // Set alert type based on severity
            if (property.alerts > 3) {
                alertBanner.className = 'alert-banner danger';
            } else {
                alertBanner.className = 'alert-banner warning';
            }
        } else {
            alertBanner.style.display = 'none';
        }
    }
    
    // Update building overview
    const overviewProject = document.querySelector('.overview-item:nth-child(1) .overview-value');
    if (overviewProject) {
        overviewProject.textContent = property.name;
    }
    
    const overviewLocation = document.querySelector('.overview-item:nth-child(2) .overview-value');
    if (overviewLocation) {
        overviewLocation.textContent = property.location;
    }
    
    const overviewOccupancy = document.querySelector('.overview-item:nth-child(3) .overview-value');
    if (overviewOccupancy) {
        overviewOccupancy.textContent = property.occupancy;
    }
    
    const overviewStories = document.querySelector('.overview-item:nth-child(4) .overview-value');
    if (overviewStories) {
        overviewStories.textContent = property.stories + ' Floors';
    }
    
    const overviewYear = document.querySelector('.overview-item:nth-child(5) .overview-value');
    if (overviewYear) {
        overviewYear.textContent = property.yearBuilt;
    }
    
    const overviewInspection = document.querySelector('.overview-item:nth-child(6) .overview-value');
    if (overviewInspection) {
        overviewInspection.textContent = property.lastInspection;
    }
    
    // Update property link to pass the ID
    const viewPropertyBtn = document.querySelector('.btn-primary[onclick*="property.html"]');
    if (viewPropertyBtn) {
        viewPropertyBtn.onclick = () => window.location.href = `property.html?id=${propertyId}`;
    }
    
    const viewFullProfileBtn = document.querySelector('.btn-text[onclick*="property.html"]');
    if (viewFullProfileBtn) {
        viewFullProfileBtn.onclick = () => window.location.href = `property.html?id=${propertyId}`;
    }
}

// ========== Dashboard Page ==========
function initDashboard() {
    // Load property data from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id') || 'walnut-creek';
    loadDashboardData(propertyId);
    
    // Sidebar Toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = sidebar.classList.toggle('active');
            sidebarToggle.setAttribute('aria-expanded', isActive);
            
            // Trap focus within sidebar when open on mobile
            if (isActive && window.innerWidth <= 1024) {
                const firstFocusable = sidebar.querySelector('a, button');
                if (firstFocusable) firstFocusable.focus();
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                sidebarToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close sidebar on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarToggle.setAttribute('aria-expanded', 'false');
                sidebarToggle.focus();
            }
        });
    }

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
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
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
    // Check authentication state and update navigation
    updateNavigationState();
    
    // Initialize based on current page
    if (document.querySelector('.search-body')) {
        initSearchPage();
    }
    
    if (document.querySelector('.property-body') || document.querySelector('.dashboard-body')) {
        initPropertyPage();
        initSidebarNavigation();
        initSidebarAccordion();
        
        // Get URL parameters for property page
        const urlParams = new URLSearchParams(window.location.search);
        const propertyId = urlParams.get('id');
        
        if (propertyId && document.getElementById('propertyTitle')) {
            // Load property data based on ID
            loadPropertyData(propertyId);
        } else if (document.getElementById('propertyTitle')) {
            // Default to first property if no ID specified
            loadPropertyData('walnut-creek');
        }
    }
    
    // Initialize Mobile Menu (Global)
    initMobileMenu();

    // Copy to clipboard functionality
    initCopyButtons();
});

// ========== Copy to Clipboard ==========
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.dataset.copy;
            try {
                await navigator.clipboard.writeText(textToCopy);
                // Visual feedback
                const originalHTML = button.innerHTML;
                button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
                button.style.color = 'var(--success)';
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

// ========== Detailed Property Data ==========
const DETAILED_PROPERTY_DATA = {
    'walnut-creek': {
        name: 'Walnut Creek Transit Village',
        subtitle: 'Walnut Creek Transit Village Sculpture',
        location: 'Walnut Creek, California',
        address: '1234 Transit Way, Walnut Creek, CA 94596',
        city: 'Walnut Creek',
        coordinates: '37.9101° N, 122.0652° W',
        type: 'Residential',
        occupancy: 'Residential · R-2',
        secondaryOccupancy: 'Retail podium (M)',
        stories: 5,
        yearBuilt: 2018,
        gsf: 125000,
        height: '65 ft',
        storyHeight: '13 ft',
        healthScore: 92,
        complianceScore: 98,
        alerts: 3,
        lastUpdated: 'Today',
        lastInspection: 'Sep 15, 2025',
        nextInspection: 'Sep 15, 2026',
        propertyId: 'WC-TV-001',
        apn: '178-090-024',
        jurisdiction: 'City of Walnut Creek · Contra Costa County, CA',
        foundationType: '24 in mat foundation bearing on densified sand',
        structuralSystem: 'PT flat slabs over reinforced concrete columns',
        lateralSystem: 'Special RC shear walls with special moment frames',
        seismicCategory: 'D',
        photo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop',
        codeAlert: 'New seismic requirements published - Review structural compliance by Nov 15, 2025'
    },
    'downtown-tower': {
        name: 'Downtown Business Tower',
        subtitle: 'Downtown Business Tower',
        location: 'San Francisco, California',
        address: '22 Battery St, San Francisco, CA 94111',
        city: 'San Francisco',
        coordinates: '37.7936° N, 122.3999° W',
        type: 'Commercial',
        occupancy: 'Office · B',
        secondaryOccupancy: 'Assembly (ground floor lobby)',
        stories: 28,
        yearBuilt: 2015,
        gsf: 780000,
        height: '382 ft',
        storyHeight: '13 ft typical',
        healthScore: 74,
        complianceScore: 88,
        alerts: 5,
        lastUpdated: '5 days ago',
        lastInspection: 'Jun 10, 2025',
        nextInspection: 'Jul 1, 2025',
        propertyId: 'SF-DBT-014',
        apn: '3710-006',
        jurisdiction: 'City & County of San Francisco Department of Building Inspection',
        foundationType: 'Deep drilled piers extending 120 ft to bedrock',
        structuralSystem: 'Composite steel frame with metal deck and concrete fill',
        lateralSystem: 'Buckling-restrained braced frames (BRBF)',
        seismicCategory: 'D',
        photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
        codeAlert: 'Fire alarm system inspection overdue - Schedule with Fire Marshal within 30 days'
    },
    'industrial-complex': {
        name: 'Bay Area Distribution Center',
        subtitle: 'Bay Area Distribution Center',
        location: 'Oakland, California',
        address: '455 Harbor Way, Oakland, CA 94607',
        city: 'Oakland',
        coordinates: '37.7955° N, 122.2665° W',
        type: 'Industrial',
        occupancy: 'Warehouse · S-1',
        secondaryOccupancy: 'Office (mezzanine)',
        stories: 2,
        yearBuilt: 2020,
        gsf: 410000,
        height: '42 ft',
        storyHeight: '32 ft clear height',
        healthScore: 95,
        complianceScore: 99,
        alerts: 0,
        lastUpdated: 'Today',
        lastInspection: 'Aug 5, 2025',
        nextInspection: 'Aug 5, 2026',
        propertyId: 'OAK-DC-908',
        apn: '028-0011-005',
        jurisdiction: 'City of Oakland Building Services Division',
        foundationType: 'Continuous spread footings with thickened slab-on-grade',
        structuralSystem: 'Pre-engineered metal building with open-web steel joists',
        lateralSystem: 'Steel braced frames with rigid moment connections',
        seismicCategory: 'D',
        photo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
        codeAlert: null
    },
    'tech-campus': {
        name: 'Silicon Valley Tech Campus',
        subtitle: 'Silicon Valley Tech Campus',
        location: 'Palo Alto, California',
        address: '910 Innovation Dr, Palo Alto, CA 94303',
        city: 'Palo Alto',
        coordinates: '37.4419° N, 122.1430° W',
        type: 'Commercial',
        occupancy: 'Office · B',
        secondaryOccupancy: 'Assembly (cafeteria & meeting spaces)',
        stories: 8,
        yearBuilt: 2019,
        gsf: 520000,
        height: '120 ft',
        storyHeight: '15 ft typical',
        healthScore: 88,
        complianceScore: 94,
        alerts: 2,
        lastUpdated: '10 days ago',
        lastInspection: 'Jul 20, 2025',
        nextInspection: 'Jan 20, 2026',
        propertyId: 'PA-TC-302',
        apn: '124-56-012',
        jurisdiction: 'City of Palo Alto Development Services',
        foundationType: 'Mat-slab foundation with post-tensioned grade beam system',
        structuralSystem: 'Reinforced concrete flat slab with interior columns',
        lateralSystem: 'Perimeter special moment-resisting concrete frames',
        seismicCategory: 'D',
        photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
        codeAlert: 'HVAC maintenance due - Schedule preventive service by Sep 20, 2025'
    },
    'marina-residences': {
        name: 'Marina Bay Residences',
        subtitle: 'Marina Bay Residences',
        location: 'San Mateo, California',
        address: '600 Shoreline Blvd, San Mateo, CA 94401',
        city: 'San Mateo',
        coordinates: '37.5630° N, 122.3255° W',
        type: 'Residential',
        occupancy: 'Residential · R-2',
        secondaryOccupancy: 'Business (ground floor amenities)',
        stories: 15,
        yearBuilt: 2021,
        gsf: 565000,
        height: '180 ft',
        storyHeight: '12 ft typical',
        healthScore: 96,
        complianceScore: 99,
        alerts: 0,
        lastUpdated: '2 days ago',
        lastInspection: 'Aug 10, 2025',
        nextInspection: 'Feb 10, 2026',
        propertyId: 'SM-MBR-111',
        apn: '037-045-130',
        jurisdiction: 'City of San Mateo Building Division',
        foundationType: 'Deep foundation with auger-cast piles to 65 ft',
        structuralSystem: 'Post-tensioned concrete flat plates with mild reinforcing',
        lateralSystem: 'Coupled concrete shear walls at building core',
        seismicCategory: 'D',
        photo: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=500&fit=crop',
        codeAlert: null
    },
    'warehouse-district': {
        name: 'Port of Oakland Warehouse',
        subtitle: 'Port of Oakland Warehouse',
        location: 'Oakland, California',
        address: '220 Maritime St, Oakland, CA 94607',
        city: 'Oakland',
        coordinates: '37.8058° N, 122.3011° W',
        type: 'Industrial',
        occupancy: 'Warehouse · S-1',
        secondaryOccupancy: 'High-hazard storage (H-3)',
        stories: 3,
        yearBuilt: 2017,
        gsf: 300000,
        height: '55 ft',
        storyHeight: '18 ft clear',
        healthScore: 82,
        complianceScore: 91,
        alerts: 2,
        lastUpdated: '21 days ago',
        lastInspection: 'May 15, 2025',
        nextInspection: 'Nov 15, 2025',
        propertyId: 'OAK-WH-220',
        apn: '041-3905-002',
        jurisdiction: 'City of Oakland Building Services Division',
        foundationType: 'Continuous footings with reinforced concrete slab-on-grade',
        structuralSystem: 'Structural steel frame with bar joists and metal deck',
        lateralSystem: 'Concentric braced frames (CBF) in both directions',
        seismicCategory: 'D',
        photo: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop',
        codeAlert: 'Sprinkler system maintenance scheduled for Aug 28, 2025'
    },
    'medical-center': {
        name: 'Walnut Creek Medical Plaza',
        subtitle: 'Walnut Creek Medical Plaza',
        location: 'Walnut Creek, California',
        address: '250 Civic Dr, Walnut Creek, CA 94596',
        city: 'Walnut Creek',
        coordinates: '37.9058° N, 122.0670° W',
        type: 'Healthcare',
        occupancy: 'Healthcare · I-2',
        secondaryOccupancy: 'Business (medical offices)',
        stories: 6,
        yearBuilt: 2016,
        gsf: 350000,
        height: '85 ft',
        storyHeight: '14 ft typical',
        healthScore: 91,
        complianceScore: 97,
        alerts: 1,
        lastUpdated: '9 days ago',
        lastInspection: 'Jul 15, 2025',
        nextInspection: 'Oct 1, 2025',
        propertyId: 'WC-MP-022',
        apn: '178-040-010',
        jurisdiction: 'City of Walnut Creek · Contra Costa County, CA',
        foundationType: 'Mat foundation on improved subgrade',
        structuralSystem: 'Reinforced concrete moment frames with PT slabs',
        lateralSystem: 'Special reinforced concrete moment frames',
        seismicCategory: 'D',
        photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop',
        codeAlert: 'Healthcare facility compliance review due Oct 1, 2025'
    },
    'sunset-apartments': {
        name: 'Sunset Boulevard Apartments',
        subtitle: 'Sunset Boulevard Apartments',
        location: 'Berkeley, California',
        address: '900 Gilman St, Berkeley, CA 94710',
        city: 'Berkeley',
        coordinates: '37.8799° N, 122.2990° W',
        type: 'Mixed-Use',
        occupancy: 'Mixed-Use · R-2 over M',
        secondaryOccupancy: 'Retail (ground floor)',
        stories: 7,
        yearBuilt: 2014,
        gsf: 290000,
        height: '85 ft',
        storyHeight: '12 ft typical',
        healthScore: 75,
        complianceScore: 82,
        alerts: 4,
        lastUpdated: '26 days ago',
        lastInspection: 'Mar 20, 2025',
        nextInspection: 'Jun 30, 2025 (OVERDUE)',
        propertyId: 'BK-SB-333',
        apn: '061-3154-008',
        jurisdiction: 'City of Berkeley Building & Safety Division',
        foundationType: 'Shallow spread footings with grade beams',
        structuralSystem: 'Wood frame over concrete podium (Type V over Type I)',
        lateralSystem: 'Wood shearwalls over concrete shear walls',
        seismicCategory: 'D',
        photo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop',
        codeAlert: 'CRITICAL: Structural inspection overdue - Schedule immediately'
    }
};

// ========== Load Property Data ==========
function loadPropertyData(propertyId) {
    const property = DETAILED_PROPERTY_DATA[propertyId];
    if (!property) {
        console.warn('Property not found:', propertyId);
        return;
    }
    
    // Load property-specific photos
    currentPropertyPhotos = PROPERTY_PHOTO_SETS[propertyId] || PROPERTY_PHOTO_SETS['walnut-creek'];
    currentPhotoIndex = 0;
    
    // Update property page if elements exist
    const propertyTitle = document.getElementById('propertyTitle');
    if (propertyTitle) {
        propertyTitle.textContent = property.name;
    }
    
    const propertyLocation = document.getElementById('propertyLocation');
    if (propertyLocation) {
        const locationHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            ${property.city}, CA • Updated ${property.lastUpdated}
        `;
        propertyLocation.innerHTML = locationHTML;
    }
    
    // Update photos using the property-specific photo set
    updatePhoto();
    
    // Update salient information
    updatePropertyField('.info-row:nth-child(1) .info-value', property.address);
    updatePropertyField('.info-row:nth-child(2) .info-value', `${property.coordinates}\n<button class="btn-icon copy-btn" data-copy="${property.coordinates.replace('° N, ', ',').replace('° W', '')}" aria-label="Copy coordinates"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" stroke-width="2"/></svg></button>`, true);
    updatePropertyField('.info-row:nth-child(3) .info-value', property.jurisdiction);
    updatePropertyField('.info-row:nth-child(4) .info-value', `${property.propertyId} · APN ${property.apn}`);
    
    // Key Specs section
    const keySpecsSection = document.querySelectorAll('.salient-section')[1];
    if (keySpecsSection) {
        const specs = keySpecsSection.querySelectorAll('.info-row .info-value');
        if (specs[0]) specs[0].textContent = property.yearBuilt;
        if (specs[1]) specs[1].textContent = `${property.stories} stories above grade, 0 below`;
        if (specs[2]) specs[2].textContent = `${Intl.NumberFormat('en-US').format(property.gsf)} sq ft`;
        if (specs[3]) specs[3].textContent = `${property.height} • ${property.storyHeight} typical story height`;
    }
    
    // Occupancy section
    const occupancySection = document.querySelectorAll('.salient-section')[2];
    if (occupancySection) {
        const occupancy = occupancySection.querySelectorAll('.info-row .info-value');
        if (occupancy[0]) occupancy[0].textContent = property.occupancy;
        if (occupancy[1]) occupancy[1].textContent = property.secondaryOccupancy;
        if (occupancy[2]) occupancy[2].textContent = property.type;
    }
    
    // Update structural overview section
    const structuralOverview = document.querySelector('#structural-overview');
    if (structuralOverview) {
        const dataRows = structuralOverview.querySelectorAll('.data-row .data-value');
        if (dataRows[0]) dataRows[0].textContent = property.yearBuilt;
        if (dataRows[1]) dataRows[1].textContent = `${property.stories} above grade, 0 below`;
        if (dataRows[2]) dataRows[2].textContent = `${Intl.NumberFormat('en-US').format(property.gsf)} sq ft`;
        if (dataRows[3]) dataRows[3].textContent = `${property.height} overall / ${property.storyHeight}`;
        if (dataRows[5]) dataRows[5].textContent = property.structuralSystem;
    }
    
    // Update foundation system
    const foundationSection = document.querySelector('#foundation-system');
    if (foundationSection) {
        const foundationRows = foundationSection.querySelectorAll('.data-row .data-value');
        if (foundationRows[0]) foundationRows[0].textContent = property.foundationType;
    }
    
    // Update lateral system
    const lateralSection = document.querySelector('#lateral-system');
    if (lateralSection) {
        const lateralRows = lateralSection.querySelectorAll('.data-row .data-value');
        if (lateralRows[0]) lateralRows[0].textContent = property.lateralSystem;
    }
    
    // Update jurisdiction section
    const jurisdictionSection = document.querySelector('#jurisdiction-codes');
    if (jurisdictionSection) {
        const jurisdictionRows = jurisdictionSection.querySelectorAll('.data-row .data-value');
        if (jurisdictionRows[0]) jurisdictionRows[0].textContent = property.city + ' · ' + property.jurisdiction.split('·')[1];
        if (jurisdictionRows[4]) jurisdictionRows[4].textContent = property.jurisdiction;
    }
    
    // Update design parameters
    const designSection = document.querySelector('#design-parameters');
    if (designSection) {
        const seismicRows = designSection.querySelectorAll('.structural-data .data-row .data-value');
        if (seismicRows[3]) seismicRows[3].textContent = property.seismicCategory === 'D' ? 'D (Stiff soil)' : property.seismicCategory;
        if (seismicRows[4]) seismicRows[4].textContent = property.seismicCategory;
    }
    
    // Update condition & inspections
    const conditionSection = document.querySelector('#condition-inspections');
    if (conditionSection) {
        const conditionRows = conditionSection.querySelectorAll('.data-row .data-value');
        if (conditionRows[0]) conditionRows[0].textContent = property.lastInspection;
        if (conditionRows[4]) conditionRows[4].textContent = property.nextInspection;
        if (conditionRows[5]) {
            const badge = conditionRows[5].querySelector('.badge');
            if (badge) {
                badge.textContent = property.healthScore + '%';
                badge.className = property.healthScore >= 90 ? 'badge success' : property.healthScore >= 80 ? 'badge warning' : 'badge danger';
            }
        }
    }
    
    // Update health score in summary strip
    const healthScoreValue = document.querySelector('.summary-value');
    if (healthScoreValue) {
        healthScoreValue.textContent = property.healthScore + '%';
    }
    
    const healthBarSpan = document.querySelector('.health-bar.mini span');
    if (healthBarSpan) {
        healthBarSpan.style.width = property.healthScore + '%';
    }
    
    // Update next deadline
    const nextDeadline = document.querySelectorAll('.summary-item')[2];
    if (nextDeadline) {
        const deadlineP = nextDeadline.querySelector('p');
        if (deadlineP) {
            deadlineP.textContent = `Annual structural inspection · ${property.nextInspection}`;
        }
    }
    
    // Update last updated
    const lastUpdatedItem = document.querySelectorAll('.summary-item')[3];
    if (lastUpdatedItem) {
        const lastUpdatedP = lastUpdatedItem.querySelector('p');
        if (lastUpdatedP) {
            lastUpdatedP.textContent = `Updated ${property.lastUpdated}`;
        }
    }
    
    // Reinitialize copy buttons after updating
    setTimeout(() => {
        initCopyButtons();
    }, 100);
}

function updatePropertyField(selector, value, isHTML = false) {
    const element = document.querySelector(selector);
    if (element) {
        if (isHTML) {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    }
}

// ========== Navigation State Management ==========
function updateNavigationState() {
    const isLoggedIn = sessionStorage.getItem('acam_logged_in') === 'true';
    const username = sessionStorage.getItem('acam_username');
    
    // Update navigation links based on login state
    const loginLink = document.getElementById('loginLink');
    const dashboardLink = document.getElementById('dashboardLink');
    
    if (loginLink && dashboardLink) {
        if (isLoggedIn) {
            loginLink.style.display = 'none';
            dashboardLink.style.display = 'inline-flex';
            dashboardLink.href = 'search.html';
            if (username) {
                dashboardLink.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 0.5rem;"><rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/></svg>Dashboard`;
            }
        } else {
            loginLink.style.display = 'inline-flex';
            dashboardLink.style.display = 'none';
        }
    }
    
    // Update hero dashboard button
    const heroDashboardBtn = document.getElementById('heroDashboardBtn');
    if (heroDashboardBtn) {
        if (isLoggedIn) {
            heroDashboardBtn.href = 'search.html';
            heroDashboardBtn.textContent = 'Go to Dashboard';
        } else {
            heroDashboardBtn.href = 'login.html';
            heroDashboardBtn.textContent = 'Get Started';
        }
    }
}

// ========== Make Functions Global ==========
window.logout = logout;
window.viewProperty = viewProperty;
window.updateNavigationState = updateNavigationState;
window.changePhoto = changePhoto;
window.selectPhoto = selectPhoto;
window.switchVisualTab = switchVisualTab;
window.openInGoogleMaps = openInGoogleMaps;

// ========== Mobile Menu ==========
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// ========== Console Welcome Message ==========
console.log('%cACAM.ai', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilding Health Records Platform', 'font-size: 14px; color: #6b7280;');
console.log('%cMVP v2.0 - Complete Workflow Implementation', 'font-size: 12px; color: #9ca3af;');



