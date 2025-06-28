# View Single Song Feature

## User Story
As a user, I want to view a single song with all its details and content so that I can read and perform it.

## Acceptance Criteria
- [ ] User can view song by tapping from songs list
- [ ] Shows song title, artist, album, year, key
- [ ] Content displays in monospace font for chord alignment
- [ ] Back button returns to songs list
- [ ] Edit button is visible (leads to edit form)
- [ ] Content scrolls smoothly for long songs
- [ ] Mobile layout is optimized for reading

## Database Requirements
Uses existing Song model (no additional database changes needed).

## Server Function Design

### getSong Function
**Purpose**: Retrieve complete song data for authenticated user
**Location**: Add to songs server functions file
**Input Parameters**: 
- songId (string): ID of song to retrieve

**Query Requirements**:
- Filter by song ID and current user's ID (security)
- Return all song fields including content
- Verify user has access to this specific song

**Return Value**: Complete song object with all fields

**Error Handling**:
- Verify user is authenticated
- Throw error if song not found
- Throw error if user doesn't own the song
- Handle database connection errors

**Security Requirements**:
- Always include userId in query filter
- Never allow access to songs owned by other users
- Return 404 for non-existent or unauthorized songs

## UI Implementation

### Route Configuration
- **URL Pattern**: `/songs/[id]` where [id] is the song UUID
- **Component Name**: SongViewPage
- **Access Control**: Require user authentication
- **Route Parameters**: Extract song ID from URL

### Page Layout Design
**Header Section**:
- Back button: Navigate to songs list
- Song title: Centered, prominent display
- Edit button: Navigate to edit form
- Fixed header that stays visible while scrolling

**Content Section**:
- Song metadata display (artist, album, year, key)
- Main content area with lyrics/chords
- Scrollable content for long songs
- Optimized for reading during performance

### Song Metadata Display
**Information Layout**:
- Artist: Display as "by [Artist Name]" if present
- Album: Display album name if present
- Year: Display in parentheses if present
- Key: Display as "Key: [Musical Key]" if present
- Graceful handling when fields are empty

**Visual Hierarchy**:
- Song title: Largest, most prominent
- Metadata: Secondary styling, clearly grouped
- Separator between metadata and content
- Consistent spacing and alignment

### Content Display Requirements
**Typography**:
- Monospace font family for chord alignment
- Appropriate font size for mobile reading
- High contrast for readability
- Maintain formatting from original input

**Layout**:
- Full-width content area
- Adequate padding for comfortable reading
- Preserve line breaks and spacing
- Handle long lines appropriately on mobile

**Scrolling Behavior**:
- Smooth scrolling for long content
- Fixed header during scroll
- Touch-friendly scrolling on mobile devices
- Maintain scroll position during navigation

### Styling Requirements
**Layout Approach**: Mobile-first responsive design
**Header Styling**: Fixed position with proper z-index
**Content Styling**: Optimized for reading and performance use
**Button Styling**: Touch-friendly navigation elements

**Color Scheme**:
- High contrast text for readability in various lighting
- Subtle background colors to reduce eye strain
- Clear visual separation between sections
- Consistent with overall application design

**Responsive Behavior**:
- Mobile: Full-width layout optimized for portrait
- Tablet: Centered content with comfortable margins
- Desktop: Constrained width for optimal reading

### Component Behavior
**Data Loading**:
- Load song data immediately when component mounts
- Extract song ID from route parameters
- Show loading state during data fetch
- Handle loading errors appropriately

**State Management**:
- Track loading state during initial data fetch
- Track error state if song loading fails
- Track complete song data once loaded
- No need for complex state management initially

**Navigation Behavior**:
- Back button: Return to songs list
- Edit button: Navigate to edit form for this song
- Maintain referrer information for proper back navigation
- Handle browser back button appropriately

**Error Handling**:
- Song not found: Clear error message and back navigation
- Access denied: Appropriate security message
- Network errors: Retry option with clear feedback

### Empty Content Handling
**Missing Content**:
- Display placeholder message if content field is empty
- Encourage user to edit song to add content
- Maintain layout structure even with missing content

**Missing Metadata**:
- Hide metadata sections that are empty
- Don't display labels for fields without values
- Graceful degradation for minimal song data

### Loading and Error States
**Loading State**:
- Show loading indicator while fetching song
- Maintain header structure during loading
- Provide feedback that content is being loaded

**Error States**:
- Song not found: Clear message with back navigation
- Network error: Retry option with error explanation
- Access denied: Security message with back navigation

## Navigation Integration
**Entry Points**:
- Song list item tap → view specific song
- Direct URL access with song ID
- Edit form completion → return to song view

**Exit Points**:
- Back button → return to songs list
- Edit button → navigate to edit form
- Navigation menu → other application sections

## Testing Requirements

### Manual Testing Scenarios
**Data Display Testing**:
- Song with all metadata fields displays correctly
- Song with minimal data (title only) displays gracefully
- Song with long content scrolls properly
- Monospace font renders chords correctly
- Empty content shows appropriate placeholder

**Navigation Testing**:
- Access song view from songs list
- Back button returns to songs list correctly
- Edit button navigates to edit form
- Direct URL access works properly
- Browser back button functions correctly

**Layout Testing**:
- Mobile portrait layout is readable
- Mobile landscape layout adapts appropriately
- Tablet layout uses space effectively
- Desktop layout remains usable

**Performance Testing**:
- Loading state appears for slow networks
- Smooth scrolling with long content
- Quick navigation between songs
- Responsive header behavior during scroll

### Content Testing Scenarios
**Text Formatting**:
- Lyrics with chord notations align properly
- Line breaks are preserved from input
- Special characters display correctly
- Long lines wrap appropriately on mobile
- Monospace font maintains consistent spacing

**Metadata Scenarios**:
- All metadata fields present and filled
- Some metadata fields missing
- Very long artist or album names
- Invalid or unusual key notations

### Error Testing Scenarios
**Access Control**:
- Non-existent song ID returns appropriate error
- Song owned by different user is blocked
- Unauthenticated access is prevented

**Network Issues**:
- Slow network shows loading state
- Network failure shows error with retry
- Connection timeout handled gracefully

## Implementation Steps

### Phase 1: Server Function
1. Implement getSong function with security checks
2. Add user authentication and authorization
3. Test function with valid and invalid song IDs
4. Verify security prevents cross-user access

### Phase 2: Basic Component
1. Create SongViewPage component file
2. Add route parameter extraction for song ID
3. Implement basic data loading and state management
4. Add loading and error state handling

### Phase 3: Header Layout
1. Design and implement page header
2. Add back button with navigation functionality
3. Add song title display
4. Add edit button with navigation to edit form

### Phase 4: Content Display
1. Implement song metadata display section
2. Add main content area with monospace styling
3. Handle empty content and metadata gracefully
4. Ensure proper text formatting and spacing

### Phase 5: Styling and Layout
1. Create mobile-first CSS styles
2. Implement responsive layout for different screen sizes
3. Style header, metadata, and content sections
4. Add smooth scrolling and fixed header behavior

### Phase 6: Navigation Integration
1. Connect component to routing system
2. Implement proper back navigation
3. Add edit button navigation
4. Test all navigation flows thoroughly

### Phase 7: Testing and Polish
1. Complete all manual testing scenarios
2. Optimize reading experience for performance use
3. Test error handling and edge cases
4. Verify accessibility and mobile usability

## Definition of Done
- User can view complete song details from songs list
- Content displays properly in monospace font for performance
- All song metadata shows when available
- Navigation works correctly (back to list, forward to edit)
- Mobile layout is optimized for reading songs
- Loading and error states provide appropriate feedback
- Security prevents access to unauthorized songs
- All manual testing scenarios pass successfully