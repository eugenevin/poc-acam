# ACAM.ai - Complete Usage Guide

## Getting Started

### Demo Credentials
- **Username:** `admin`
- **Password:** `acam2025`

## Complete Workflow Walkthrough

### Step 1: Login
1. Open `login.html` in your browser
2. You'll see a modern split-screen login interface
3. Enter the demo credentials:
   - Username: `admin`
   - Password: `acam2025`
4. Click "Sign In" button
5. You'll be automatically redirected to the property search page

**Features:**
- Password visibility toggle (eye icon)
- "Remember me" checkbox
- Demo credentials displayed on the page for easy reference
- Responsive design that works on all devices

---

### Step 2: Property Search
1. After login, you'll land on `search.html`
2. You'll see:
   - A large search bar at the top
   - Filter chips (All Properties, Residential, Commercial, Industrial)
   - Three sample property cards with health scores
   - Quick stats showing portfolio overview

**What You Can Do:**
- **Search:** Type an address or property ID in the search bar
- **Filter:** Click filter chips to show specific property types
- **View Property:** Click any property card to view its details
- **Navigate:** Use the header to access notifications or logout

**Sample Properties:**
1. **Walnut Creek Transit Village** (Residential, 92% health)
2. **Downtown Business Tower** (Commercial, 78% health - needs review)
3. **Bay Area Distribution Center** (Industrial, 95% health)

---

### Step 3: Property Overview
1. Click on "Walnut Creek Transit Village" (or any property)
2. You'll be taken to `property.html`
3. At the top, you'll see:
   - Property photo/street view toggle
   - Core metadata (Property ID, Type, Floors, Year Built, etc.)
   - Export and Add Document buttons

**Photo/Street View Toggle:**
- Click "Photo" or "Street View" tabs to switch views
- Visual placeholders show where images would appear

**Metadata Sections Displayed:**

**Location & Jurisdiction:**
- Address: 1234 Transit Way, Walnut Creek, CA 94596
- Geolocation: 37.9101° N, 122.0652° W
- Jurisdiction: City of Walnut Creek

**Building Characteristics:**
- Year Built: 2018
- Stories: 5 Floors
- Floor Area: 125,000 sq ft

**Use & Classification:**
- Primary Occupancy: Residential (R-2)
- Use Type: Multi-family Residential

---

### Step 4: Category Tabs (14 Categories)
Scroll down to see 14 category tabs:

1. **Structural** ⭐ (Active by default) - Detailed structural data
2. **Architectural** - Building design information
3. **Mechanical** - Mechanical systems
4. **Electrical** - Electrical systems
5. **Plumbing** - Plumbing systems
6. **Fire Protection** - Fire safety systems
7. **Accessibility and Egress** - ADA compliance and egress routes
8. **Roof Systems** - Roofing materials and systems
9. **Environmental and Format** - Environmental data and formats
10. **Cybersecurity and Smart Systems** - Building automation and security
11. **Resilience and Risk Insights** - Risk analysis and resilience metrics
12. **Maintenance and Capital Planning** - Lifecycle and budget planning
13. **Zoning and Entitlements** - Zoning codes and legal entitlements
14. **Ownership and Leasing (optional)** - Ownership and tenant information

**How to Use:**
- Click any tab to view that category's content
- Active tab is highlighted in purple
- Content changes instantly

---

### Step 5: Structural Tab - Expandable Sections

The Structural tab contains four expandable sections:

#### Section 1: Foundation & Soil
**Click the header to expand/collapse**

Data displayed:
- Foundation Type: Mat Foundation
- Soil Type: Dense Sand (Class D)
- Bearing Capacity: 3,000 PSF
- Depth: 8 feet below grade
- Concrete Strength: 4,000 PSI
- Waterproofing: Membrane system

**Source Link:** S-101 Foundation Plan, Sheet Index: General Notes

#### Section 2: Structural System (Expanded by default)
This section shows:

**Main Data:**
- Primary System: Reinforced Concrete Moment Frame
- Lateral System: Special Reinforced Concrete Shear Walls
- Floor System: Post-tensioned concrete slabs
- Column Spacing: 20' × 24' typical
- Seismic Design Category: D
- Response Modification Factor: R = 8

**Material Specifications Table:**
| Component | Material | Specification | Strength |
|-----------|----------|---------------|----------|
| Columns | Concrete | ASTM C39 | 5,000 PSI |
| Beams | Concrete | ASTM C39 | 4,000 PSI |
| Shear Walls | Concrete | ACI 318-14 | 5,000 PSI |
| Rebar | Steel | ASTM A615 Grade 60 | 60,000 PSI |

**Source Link:** S-100 Structural General Notes, S-201-S-205 Floor Plans

#### Section 3: Load Criteria & Design
Contains two subsections:

**Dead Loads:**
- Concrete: 150 PCF
- Floor Finishes: 15 PSF
- Ceiling/MEP: 10 PSF

**Live Loads:**
- Residential: 40 PSF
- Corridors: 100 PSF
- Roof: 20 PSF

**Source Link:** S-100 Structural General Notes (Auto-populated from OCR)

#### Section 4: Review Facts & Upload Drawings
This is the key section implementing the document upload workflow.

**Upload Zone:**
- Drag and drop area for files
- "Choose Files" button
- Supports: PDF, DWG, DXF (Max 50MB per file)

**AI-Powered Features (Visual Display):**
1. **OCR Processing**
   - Automatically extract text from General Notes
   - Extract sheet indexes
   - Icon: Book/document

2. **Auto-Populate Fields**
   - Key structural facts automatically fill in
   - Data extraction from drawings
   - Icon: AI sparkle

3. **Source Linking**
   - Every fact links to source document
   - Traceability and verification
   - Icon: Link chain

**Existing Documents List:**
Shows 3 processed documents:
1. S-100 Structural General Notes (2.4 MB) - OCR Complete
2. S-101 Foundation Plan (3.1 MB) - OCR Complete
3. S-201-205 Floor Framing Plans (8.7 MB) - OCR Complete

Each document shows:
- Document name
- Upload date and file size
- OCR completion badge
- View icon (eye) to preview

---

## Design Features & Best Practices

### Visual Design
✅ **Modern & Professional:**
- Purple-blue gradient brand colors (#667eea to #764ba2)
- Clean, spacious layouts with proper whitespace
- Consistent border radius and shadows
- Professional typography (Inter font family)

✅ **User Experience:**
- Intuitive navigation with clear hierarchy
- Interactive elements with hover states
- Smooth transitions and animations
- Responsive design for all screen sizes

✅ **Accessibility:**
- High contrast text
- Clear labels on all inputs
- Keyboard navigation support
- ARIA labels on interactive elements

### Interactive Elements

**Buttons:**
- Primary (gradient purple) - Main actions
- Secondary (white with border) - Secondary actions
- Text (purple text) - Tertiary actions
- Icon (gray, subtle) - Utility actions

**Status Badges:**
- Success (green) - Compliant, Complete, Verified
- Warning (amber) - Review Needed
- Info (blue) - General information
- Danger (red) - Critical issues

**Cards:**
- Property cards with hover effects
- Expandable sections with smooth animations
- Data grids for organized information
- Tables for structured data

### State Management
- Login state stored in sessionStorage
- Persists across page navigation
- Automatic logout when closing browser
- Username stored for personalization

---

## Browser Compatibility

✅ **Fully Supported:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Tips for Demonstrating

1. **Start Fresh:** Clear sessionStorage before demo
2. **Show Flow:** Go through login → search → property → structural in order
3. **Highlight Features:** 
   - Click expandable sections to show/hide
   - Switch between category tabs
   - Point out source links on data
   - Show the OCR feature descriptions
4. **Emphasize AI:** Note the "Auto-populated from OCR" text
5. **Show Responsiveness:** Resize browser to show mobile view

---

## Customization for Production

### To Add Real Data:
1. **Update `app.js`:** Modify `loadPropertyData()` function
2. **Add API Calls:** Replace hardcoded data with API endpoints
3. **Implement File Upload:** Add actual file upload handler
4. **Connect OCR Service:** Integrate with OCR API
5. **Add Database:** Store user sessions and property data

### To Add More Properties:
Edit the `properties` object in `app.js` (line 283) and add property cards to `search.html`.

### To Add More Categories:
1. Add a new tab button in `property.html`
2. Add corresponding content section
3. Style it in `styles.css`

---

## Troubleshooting

**Problem:** Can't log in
- **Solution:** Use exact credentials: admin / acam2025 (case-sensitive)

**Problem:** Redirected to login repeatedly
- **Solution:** Check if browser allows sessionStorage

**Problem:** Sections won't expand
- **Solution:** Ensure JavaScript is enabled

**Problem:** Styling looks broken
- **Solution:** Verify `styles.css` is loaded correctly

**Problem:** Nothing happens when clicking property cards
- **Solution:** Check browser console for JavaScript errors

---

## Key Implementation Details

### Security (Demo Level)
⚠️ **Note:** This is a demo with hardcoded credentials
- In production, implement proper authentication
- Use HTTPS
- Add CSRF protection
- Implement rate limiting
- Use secure session management

### Performance
✅ **Optimized:**
- Minimal external dependencies
- CSS animations use GPU acceleration
- Lazy loading of content
- Efficient DOM manipulation

### Code Quality
✅ **Best Practices:**
- Semantic HTML5
- BEM-inspired CSS naming
- Modular JavaScript
- Commented code sections
- Consistent formatting

---

## Next Steps for Production

1. **Backend Integration:** Connect to real API
2. **Authentication:** Implement JWT or OAuth
3. **File Upload:** Add S3 or similar storage
4. **OCR Integration:** Connect to OCR service (Tesseract, Google Cloud Vision)
5. **Database:** PostgreSQL or MongoDB for data storage
6. **Real-time Updates:** WebSocket for live data
7. **Testing:** Unit tests, integration tests, E2E tests
8. **Deployment:** Docker, CI/CD pipeline
9. **Monitoring:** Error tracking, analytics
10. **Documentation:** API docs, user guides

---

## Support & Contact

For questions or issues with this implementation, refer to the main README.md or project documentation.

**Built with modern web standards and best practices for property management workflows.**

