# Add Song Feature

## User Story
As a user, I want to add a new song to my collection so that I can build my personal songbook.

## Acceptance Criteria
- [ ] User can access "Add Song" from songs list
- [ ] Form has fields: title (required), artist, album, year, key, content
- [ ] Form validation shows error if title is empty
- [ ] Success message appears when song is saved
- [ ] User is redirected to songs list after saving
- [ ] New song appears at top of songs list

## Database Requirements

### Song Model Addition
Add new Song model to Prisma schema with these fields:
- **id**: UUID primary key (auto-generated)
- **title**: Required string field
- **artist**: Optional string field
- **album**: Optional string field
- **year**: Optional integer field
- **key**: Optional string field for musical key
- **content**: Optional string field for lyrics/chords
- **createdAt**: Auto-generated timestamp
- **userId**: Foreign key to User model
- **user**: Relationship to User model

### User Model Update
Extend existing User model to include relationship to songs (one-to-many).

### Database Index
Add index on userId field for efficient user song queries.

## Server Function Design

### createSong Function
**Purpose**: Create new song for authenticated user
**Location**: Create in songs server functions file
**Input Parameters**:
- title (required string)
- artist (optional string)
- album (optional string)
- year (optional number)
- key (optional string)
- content (optional string)

**Validation Requirements**:
- Verify user is authenticated
- Ensure title is not empty after trimming whitespace
- Validate year is valid number if provided
- Set userId to current authenticated user

**Return Value**: Complete song object including generated ID and timestamps

**Error Handling**:
- Throw error if title is empty
- Handle database constraint violations
- Return appropriate error messages for validation failures

## UI Implementation

### Route Configuration
- **URL Pattern**: `/songs/new`
- **Component Name**: AddSongPage
- **Access Control**: Require user authentication

### Form Design
**Form Fields Layout**:
- Title: Text input with required validation indicator
- Artist: Text input (optional)
- Album: Text input (optional)
- Year: Number input (optional)
- Key: Text input with placeholder showing examples (C, Dm, F#)
- Content: Large textarea with monospace font family

**Form Validation**:
- Title field: Required validation with red border on error
- Year field: Numeric validation if value provided
- Real-time validation feedback on form submission attempt

**Form Actions**:
- Save button: Primary styling, submits form
- Cancel button: Secondary styling, returns to songs list

### Styling Requirements
**Layout Approach**: Mobile-first responsive design
**Form Container**: Centered layout with maximum width for larger screens
**Input Styling**: Consistent padding, border radius, focus states
**Button Styling**: Touch-friendly minimum sizes (44px height)
**Error States**: Red border and error message display
**Loading States**: Disabled form with loading indicator during submission

**Typography**:
- Form labels: Medium font weight
- Content textarea: Monospace font family for proper chord alignment
- Error messages: Smaller font size with error color

### Component Behavior
**Form State Management**:
- Track all form field values
- Track validation errors
- Track form submission loading state
- Track success/error messages

**Form Submission Flow**:
1. Validate all fields client-side
2. Show loading state and disable form
3. Call createSong server function
4. Handle success: Show success message, redirect after delay
5. Handle errors: Show error message, re-enable form

**Navigation Behavior**:
- Cancel button: Navigate immediately to songs list
- Successful save: Show success message for 1 second, then redirect
- Error case: Keep user on form to retry

### Navigation Integration
**Access Point**: Add "Add Song" button to songs list page header
**Return Navigation**: Both cancel and successful save return to songs list
**URL Structure**: Use standard RedwoodSDK routing patterns

## Testing Requirements

### Manual Testing Scenarios
**Happy Path Testing**:
- Save song with only required title field
- Save song with all fields completed
- Verify monospace font displays correctly in content field
- Confirm new song appears at top of songs list
- Test success message display and redirect timing

**Validation Testing**:
- Submit form with empty title (should show error)
- Submit form with invalid year (should show error)
- Test error message display and styling

**Navigation Testing**:
- Access add form from songs list
- Cancel from add form returns to songs list
- Successful save redirects to songs list

**Error Scenario Testing**:
- Test behavior when server returns error
- Verify user can retry after error
- Test network failure scenarios

### Browser Testing
- Test on mobile browsers (iOS Safari, Chrome Mobile)
- Verify touch interactions work properly
- Test form keyboard behavior on mobile devices

## Implementation Steps

### Phase 1: Database Setup
1. Add Song model to Prisma schema file
2. Update User model with songs relationship
3. Generate and run database migration
4. Verify foreign key constraints work correctly

### Phase 2: Server Function
1. Create songs server functions file
2. Implement createSong function with authentication
3. Add input validation and error handling
4. Test function with various input scenarios

### Phase 3: UI Component
1. Create AddSongPage component file
2. Build form layout with all required fields
3. Implement form state management
4. Add client-side validation logic

### Phase 4: Styling
1. Create mobile-first CSS styles
2. Style form inputs and buttons
3. Add error and loading states styling
4. Test responsive behavior across screen sizes

### Phase 5: Integration
1. Add route configuration for `/songs/new`
2. Add "Add Song" button to songs list page
3. Connect form submission to server function
4. Implement success and error handling

### Phase 6: Testing and Polish
1. Complete all manual testing scenarios
2. Fix any identified issues
3. Optimize mobile user experience
4. Verify accessibility requirements

## Definition of Done
- User can successfully add a song with title only
- User can add a song with all fields completed
- Form validation prevents submission of invalid data
- New song appears correctly in songs list after adding
- All manual testing scenarios pass
- Mobile experience is optimized and functional
- Code follows project conventions and patterns