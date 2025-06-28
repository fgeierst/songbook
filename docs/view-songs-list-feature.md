# View Songs List Feature

## User Story
As a user, I want to see a list of all my songs so that I can browse and access them quickly.

## Acceptance Criteria
- [ ] User sees their songs in a scrollable list
- [ ] Each song shows title, artist, and creation date
- [ ] Songs are sorted by newest first
- [ ] Empty state shows "No songs yet" with add button
- [ ] Can tap song to view full details
- [ ] "Add Song" button is easily accessible
- [ ] List is optimized for mobile touch

## Database Requirements
Uses Song model from add-song-feature (no additional database changes needed).

## Server Function Design

### getSongs Function
**Purpose**: Retrieve all songs for authenticated user
**Location**: Add to songs server functions file
**Input Parameters**: None (uses authenticated user context)

**Query Requirements**:
- Filter songs by current user's ID
- Order by creation date (newest first)
- Select only fields needed for list display: id, title, artist, createdAt
- Exclude content field for performance (not needed in list view)

**Return Value**: Array of song objects with list-specific fields only

**Error Handling**:
- Verify user is authenticated
- Handle database connection errors
- Return empty array if user has no songs

## UI Implementation

### Route Configuration
- **URL Pattern**: `/songs` (main songs page)
- **Component Name**: SongsListPage
- **Access Control**: Require user authentication
- **Default Route**: Consider making this the main landing page for authenticated users

### Page Layout Design
**Header Section**:
- Page title: "My Songs"
- Add Song button: Prominent placement, easy to access
- Consistent with mobile navigation patterns

**List Section**:
- Scrollable container for song items
- Touch-friendly spacing between items
- Smooth scrolling behavior for mobile devices

**Empty State**:
- Centered message when no songs exist
- Clear call-to-action to add first song
- Helpful guidance for new users

### Song List Item Design
**Information Display**:
- Song title: Large, bold font for easy reading
- Artist name: Smaller, secondary color (if present)
- Creation date: Human-readable format ("Added 2 days ago")
- Visual hierarchy that prioritizes song title

**Interactive Elements**:
- Full card clickable area (minimum 44px height)
- Hover/focus states for better user feedback
- Touch-friendly tap targets with adequate spacing

**Visual Styling**:
- Card-based layout with subtle borders/shadows
- Consistent padding and margins
- Responsive design that adapts to screen width

### Styling Requirements
**Layout Approach**: Mobile-first responsive design
**List Container**: Full-width on mobile, constrained on larger screens
**Item Styling**: Card-based design with consistent spacing
**Typography**: Clear hierarchy with readable font sizes
**Touch Targets**: Minimum 44px height for all interactive elements

**Color Scheme**:
- Primary text: High contrast for song titles
- Secondary text: Muted color for artist names and dates
- Background: Light color to distinguish from page background
- Interactive states: Subtle color changes on hover/focus

**Responsive Behavior**:
- Mobile: Full-width cards with vertical stacking
- Tablet: Maintain single column but increase padding
- Desktop: Optional multi-column layout for very wide screens

### Component Behavior
**Data Loading**:
- Load songs immediately when component mounts
- Show loading indicator while fetching data
- Handle and display error states appropriately

**List State Management**:
- Track loading state during initial data fetch
- Track error state if data loading fails
- Track songs array once loaded

**Navigation Behavior**:
- Tap song item: Navigate to song detail view
- Tap Add button: Navigate to add song form
- Maintain scroll position when returning to list

**Date Formatting**:
- Today: "Added today"
- Yesterday: "Added yesterday" 
- Recent: "Added X days ago"
- Older: "Added on Jan 15, 2024"

### Empty State Design
**Content Requirements**:
- Clear message: "No songs yet"
- Encouraging subtitle: "Add your first song to get started"
- Prominent Add Song button
- Optional illustration or icon

**Layout**:
- Center-aligned content
- Adequate spacing above and below
- Same styling as main Add Song button

### Loading and Error States
**Loading State**:
- Show loading spinner or skeleton cards
- Maintain layout structure during loading
- Provide feedback that data is being fetched

**Error State**:
- Clear error message for failed data loading
- Retry button to attempt loading again
- Fallback to empty state if retry fails

## Navigation Integration
**Entry Points**:
- Direct URL access to `/songs`
- Navigation from other parts of application
- Potential default landing page for authenticated users

**Exit Points**:
- Individual song items → song detail view
- Add Song button → add song form
- Navigation menu → other application sections

## Testing Requirements

### Manual Testing Scenarios
**Data Display Testing**:
- User with no songs sees empty state correctly
- User with one song sees single item displayed
- User with multiple songs sees all songs in correct order
- Song metadata displays correctly (title, artist, date)

**Interaction Testing**:
- Tap song item navigates to song detail
- Add Song button navigates to add form
- Loading state appears during data fetch
- Error state handles network failures appropriately

**Responsive Testing**:
- List displays correctly on mobile devices
- Touch targets are easy to tap on small screens
- Layout adapts appropriately to tablet sizes
- Desktop view maintains usability

**Performance Testing**:
- List loads quickly with reasonable number of songs
- Scrolling performance is smooth on mobile devices
- No significant delay in navigation actions

### Edge Case Testing
**Data Scenarios**:
- Songs with missing artist information
- Songs with very long titles
- Songs created on same day (date sorting)
- Large number of songs (scrolling performance)

**Error Scenarios**:
- Network failure during data loading
- Authentication session expiry
- Database connection issues

## Implementation Steps

### Phase 1: Server Function
1. Implement getSongs function in server functions file
2. Add user authentication verification
3. Optimize query for list view requirements
4. Test function with various user scenarios

### Phase 2: Basic Component
1. Create SongsListPage component file
2. Implement basic data loading and state management
3. Create simple list layout structure
4. Add loading and error state handling

### Phase 3: List Item Design
1. Design and implement song list item component
2. Add song metadata display with proper formatting
3. Implement navigation to song detail view
4. Add human-readable date formatting

### Phase 4: Styling and Layout
1. Create mobile-first CSS styles
2. Style list container and individual items
3. Add responsive behavior for different screen sizes
4. Implement hover and focus states

### Phase 5: Empty State
1. Design and implement empty state layout
2. Add encouraging messaging and call-to-action
3. Connect Add Song button to navigation
4. Test empty state experience

### Phase 6: Integration and Polish
1. Configure route for songs list page
2. Connect navigation from other parts of application
3. Optimize performance for smooth scrolling
4. Complete all testing scenarios

## Definition of Done
- User can view list of their songs with proper metadata
- Empty state displays when user has no songs
- Navigation works correctly to song details and add form
- Loading and error states provide appropriate feedback
- Mobile layout is touch-friendly and responsive
- All manual testing scenarios pass successfully
- Performance is smooth with reasonable number of songs