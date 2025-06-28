# Edit Song Feature

## User Story
As a user, I want to edit my existing songs so that I can correct mistakes or update information.

## Acceptance Criteria
- [ ] User can access edit form from song view
- [ ] Form is pre-populated with existing song data
- [ ] Can modify any field (title, artist, album, year, key, content)
- [ ] Form validation ensures title is not empty
- [ ] Save button updates the song
- [ ] Cancel button returns to song view without saving
- [ ] Success message appears when saved
- [ ] Returns to song view after successful save

## Database Requirements
Uses existing Song model (no additional database changes needed).

## Server Function Design

### updateSong Function
**Purpose**: Update existing song for authenticated user
**Location**: Add to songs server functions file
**Input Parameters**:
- songId (string): ID of song to update
- songData (object): Updated song fields
  - title (required string)
  - artist (optional string)
  - album (optional string)
  - year (optional number)
  - key (optional string)
  - content (optional string)

**Validation Requirements**:
- Verify user is authenticated
- Verify user owns the song being updated
- Ensure title is not empty after trimming whitespace
- Validate year is valid number if provided
- Update only provided fields (partial updates)

**Return Value**: Updated song object with new timestamps

**Error Handling**:
- Throw error if song not found
- Throw error if user doesn't own the song
- Throw error if title is empty
- Handle database constraint violations

**Security Requirements**:
- Always include userId in query filter
- Never allow editing songs owned by other users
- Validate all input parameters before database update

## UI Implementation

### Route Configuration
- **URL Pattern**: `/songs/[id]/edit` where [id] is the song UUID
- **Component Name**: EditSongPage
- **Access Control**: Require user authentication
- **Route Parameters**: Extract song ID from URL

### Page Layout Design
**Header Section**:
- Cancel button: Return to song view without saving
- Page title: "Edit Song"
- Save button: Update song and return to view

**Form Section**:
- Same form fields as add song form
- Pre-populated with existing song data
- Identical styling and validation

### Form Pre-population
**Data Loading Process**:
1. Extract song ID from route parameters
2. Load existing song data using getSong function
3. Populate all form fields with current values
4. Handle loading states during data fetch
5. Handle errors if song cannot be loaded

**Field Population**:
- Title: Pre-fill with current title
- Artist: Pre-fill with current artist (or empty if null)
- Album: Pre-fill with current album (or empty if null)
- Year: Pre-fill with current year (or empty if null)
- Key: Pre-fill with current key (or empty if null)
- Content: Pre-fill with current content (or empty if null)

### Form Design and Behavior
**Form Fields**: Identical to add song form
- Title: Text input with required validation
- Artist: Text input (optional)
- Album: Text input (optional)
- Year: Number input (optional)
- Key: Text input with examples
- Content: Large textarea with monospace font

**Form Validation**: Same validation as add song form
- Title: Required field with error display
- Year: Numeric validation if provided
- Real-time validation feedback

**Form State Management**:
- Track form field values
- Track validation errors
- Track form submission loading state
- Track success/error messages
- Track whether form has been modified

### Styling Requirements
**Layout Approach**: Identical to add song form
**Header Styling**: Three-column layout (cancel, title, save)
**Form Styling**: Reuse all styling from add song form
**Button Styling**: Touch-friendly with appropriate states

**Loading States**:
- Initial data loading: Show skeleton form
- Save operation: Disable form with loading indicator
- Error states: Clear error messaging with retry options

### Component Behavior
**Data Loading Flow**:
1. Load existing song data on component mount
2. Show loading indicator during data fetch
3. Populate form fields once data is loaded
4. Handle errors if song cannot be loaded or accessed

**Form Submission Flow**:
1. Validate all fields client-side
2. Show loading state and disable form
3. Call updateSong server function
4. Handle success: Show success message, navigate to song view
5. Handle errors: Show error message, re-enable form

**Navigation Behavior**:
- Cancel button: Navigate to song view without saving changes
- Successful save: Show success message briefly, then navigate to song view
- Error case: Keep user on edit form to retry

**Change Detection**:
- Track whether form has been modified
- Optional: Warn user about unsaved changes when navigating away
- Reset form state after successful save

### Navigation Integration
**Entry Points**:
- Edit button from song view → edit form for that song
- Direct URL access with song ID

**Exit Points**:
- Cancel button → return to song view
- Successful save → return to song view
- Error states → stay on edit form for retry

**URL Structure**:
- Follow RESTful pattern: `/songs/[id]/edit`
- Maintain song ID throughout editing process

## Testing Requirements

### Manual Testing Scenarios
**Data Pre-population Testing**:
- Edit song with all fields filled
- Edit song with minimal data (title only)
- Verify all fields populate correctly
- Test with songs containing special characters

**Form Modification Testing**:
- Modify title and save successfully
- Modify multiple fields and save
- Clear optional fields and save
- Test validation when title is removed

**Navigation Testing**:
- Access edit form from song view
- Cancel returns to song view without changes
- Save updates song and returns to view
- Direct URL access works properly

**Error Scenario Testing**:
- Edit song that doesn't exist
- Edit song owned by different user
- Save with network failure
- Save with validation errors

**Performance Testing**:
- Loading state shows during data fetch
- Form responds quickly to user input
- Save operation provides appropriate feedback

### Form Validation Testing
**Required Field Validation**:
- Remove title and attempt to save (should show error)
- Save with only whitespace in title (should show error)
- Restore valid title and save successfully

**Optional Field Validation**:
- Save with empty optional fields
- Save with invalid year format
- Test maximum length inputs for text fields

### Data Persistence Testing
**Update Verification**:
- Verify changes are saved to database
- Return to song view and confirm updates
- Navigate away and back to verify persistence
- Test partial updates (only some fields changed)

## Implementation Steps

### Phase 1: Server Function
1. Implement updateSong function with authentication
2. Add user authorization checks for song ownership
3. Implement partial update logic
4. Add comprehensive input validation and error handling

### Phase 2: Basic Component Setup
1. Create EditSongPage component file
2. Add route parameter extraction for song ID
3. Implement data loading for existing song
4. Add basic error handling for data loading

### Phase 3: Form Implementation
1. Reuse form structure from add song component
2. Implement form pre-population logic
3. Add form state management for editing
4. Connect form submission to updateSong function

### Phase 4: Navigation and Routing
1. Configure route for edit song page
2. Add navigation from song view to edit form
3. Implement cancel and save navigation flows
4. Test all navigation scenarios

### Phase 5: Styling and Layout
1. Apply consistent styling with add song form
2. Style header with cancel/save buttons
3. Add loading states for data fetch and save
4. Implement responsive layout for mobile devices

### Phase 6: Validation and Error Handling
1. Implement client-side form validation
2. Add server-side error handling and display
3. Test all validation scenarios
4. Add success feedback and messaging

### Phase 7: Testing and Polish
1. Complete all manual testing scenarios
2. Test error handling and edge cases
3. Verify security prevents unauthorized access
4. Optimize user experience and performance

## Definition of Done
- User can edit existing songs from song view
- Form pre-populates with current song data correctly
- Form validation prevents saving invalid data
- Save updates song and returns to song view
- Cancel returns to song view without changes
- Success and error states provide appropriate feedback
- Security prevents editing songs owned by other users
- All manual testing scenarios pass successfully
- Performance is smooth on mobile devices