# ACAM.ai - Building Health Records Platform

A complete, production-ready web application for ACAM.ai - an AI-powered intelligent building asset management platform implementing the full property management workflow.

## Overview

ACAM.ai serves as a "health record for buildings," providing property owners and asset managers with a centralized, intelligent system for organizing and tracking structural and nonstructural systems history.

### The Problem
- Property owners lack centralized systems for building data
- Critical documents (architectural, structural, MEP, fire suppression) are scattered or lost
- This leads to costly inefficiencies, delayed maintenance, and risk exposure
- **There is no health record for buildings**

### The Solution
ACAM.ai uses AI to:
- Ingest, organize, and track building data over time
- Flag relevant building code updates
- Track physical and regulatory changes
- Generate dynamic reports for maintenance, compliance, and due diligence
- Enable faster, informed responses to multi-hazard assessments

### Differentiation
Beyond simple document storage, ACAM.ai provides:
- **Active asset management** - Critical intelligence when it matters most
- **Context-aware insights** - AI understands system relationships
- **Proactive decision support** - Maintain compliance and resilience automatically

## Complete Workflow Implementation

This application implements the full 4-step workflow:

### 1. Log In (`login.html`)
- Secure login interface with modern design
- Hardcoded demo credentials for testing
- Password visibility toggle
- Remember me functionality
- **Demo Credentials:**
  - Username: `admin`
  - Password: `acam2025`

### 2. Property Search (`search.html`)
- Search by address or property ID
- Filter properties by type (Residential, Commercial, Industrial)
- Visual property cards with health scores
- Quick stats dashboard
- Recent properties overview

### 3. Property Overview (`property.html`)
- Photo or Street View toggle
- **Metadata Sections:**
  - Location & Jurisdiction (Address, Geolocation, Jurisdiction)
  - Building Characteristics (Year Built, Stories, Floor Area)
  - Use & Classification (Primary Occupancy, Use Type)
- **14 Category Tabs:**
  - Structural
  - Architectural
  - Mechanical
  - Electrical
  - Plumbing
  - Fire Protection
  - Accessibility and Egress
  - Roof Systems
  - Environmental and Format
  - Cybersecurity and Smart Systems
  - Resilience and Risk Insights
  - Maintenance and Capital Planning
  - Zoning and Entitlements
  - Ownership and Leasing (optional)

### 4. Structural Tab - Review Facts & Upload Drawings
- **Expandable Sections:**
  - Foundation & Soil (with detailed specifications)
  - Structural System (materials, lateral system, load data)
  - Load Criteria & Design (dead loads, live loads)
  - Review Facts & Upload Drawings
- **OCR Features:**
  - Upload structural drawings (PDF, DWG, DXF)
  - Automatic OCR of General Notes and sheet indexes
  - Auto-populate key fields from drawings
  - Source linking for every fact
- **Document Management:**
  - View existing processed documents
  - OCR completion status
  - Source document references

### Additional Pages

#### Landing Page (`index.html`)
- Hero section with animated preview
- Problem statement with visual cards
- Solution overview with feature grid
- Differentiation comparison
- Modern gradient design with smooth animations

#### Dashboard (`dashboard.html`)
- Comprehensive building health overview
- Real-time metrics and health scores
- Seismic and wind design data
- Material specifications table
- Governing code references
- Construction & QC notes
- AI-powered insights section
- Live compliance monitoring

## Tech Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Design**: Custom CSS with CSS Variables
- **Typography**: Inter font family
- **Icons**: Custom SVG icons
- **Responsive**: Mobile-first responsive design

## Getting Started

### Installation

1. Clone or download this repository
2. No build process required - this is a static site!

### Running Locally

Simply open `index.html` in a modern web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## File Structure

```
startup/
├── login.html          # Step 1: Login page
├── search.html         # Step 2: Property search
├── property.html       # Step 3 & 4: Property overview with structural tab
├── index.html          # Marketing landing page
├── dashboard.html      # Original dashboard (still accessible)
├── styles.css          # Complete design system & components
├── app.js              # Full application logic & state management
└── README.md           # This file
```

## User Flow

1. **Start**: User opens `login.html`
2. **Login**: Enter credentials (admin/acam2025)
3. **Search**: Redirects to `search.html` to find properties
4. **Select**: Click on a property card
5. **Overview**: View property details on `property.html`
6. **Explore**: Navigate through 14 category tabs
7. **Structural**: Open Structural tab with expandable sections
8. **Upload**: Review facts and upload drawings with AI processing

## Design System

### Colors
- **Primary**: `#667eea` (Purple-Blue)
- **Secondary**: `#764ba2` (Purple)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Info**: `#3b82f6` (Blue)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Base Size**: 16px
- **Scale**: Responsive with rem units

### Spacing
- Uses CSS custom properties for consistent spacing
- 8px base unit system

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #667eea;
    --secondary: #764ba2;
    /* ... */
}
```

### Adding New Data
Update the dashboard content in `dashboard.html` with your building data.

### Modifying Layout
The grid system uses CSS Grid with responsive breakpoints at 1024px and 768px.

## Sample Data

The dashboard showcases data from the **Walnut Creek Transit Village Sculpture** project including:
- Seismic design parameters (Ss: 1.569, S1: 1.961)
- Wind design data (92 MPH, Exposure B)
- Material specifications (ASTM standards)
- Code references (2016 CBC, ASCE 7-10, ACI 318)
- Construction notes and QC requirements

## Future Enhancements

Potential features for production version:
- Backend API integration
- User authentication
- Real-time data sync
- Document upload/management
- Advanced reporting engine
- Multi-building portfolio view
- Mobile app
- AI chatbot for queries

## License

This is an MVP demonstration. All rights reserved.

## Contact

For more information about ACAM.ai, visit the platform or contact the development team.

---

**Built with care for modern building asset management** 🏗️✨



