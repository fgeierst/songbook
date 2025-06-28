# Songbook Core Features - Product Requirements Document

## Overview

The Songbook application is a personal music library management system that allows users to store, organize, and access song lyrics and chords in a mobile-first, responsive interface. Each user can maintain their own private collection of songs with comprehensive metadata and sharing capabilities.

## Product Vision

To provide musicians, music teachers, and music enthusiasts with a simple, fast, and reliable digital songbook that works seamlessly on mobile devices and tablets for live performance and practice scenarios.

## Design Philosophy

**Simplicity First**: Both code and product design prioritize simplicity and clarity over complex features. The application should be intuitive and straightforward to use, with minimal cognitive load for users during performances.

**Minimalist Styling**: Use vanilla CSS for all styling to maintain simplicity and avoid framework overhead. Focus on clean, readable interfaces that work well on mobile devices without excessive visual elements.

## Target Users

- **Primary**: Musicians who perform live and need quick access to lyrics and chords on mobile/tablet devices
- **Secondary**: Music teachers organizing song collections for lessons
- **Tertiary**: Music enthusiasts building personal song libraries

## Core Features

### 1. Song Management

#### 1.1 Add New Song
**User Story**: As a user, I want to manually add new songs to my collection so that I can build my personal songbook.

**Acceptance Criteria**:
- User can create a new song entry with the following fields:
  - Song title (required)
  - Artist name (optional)
  - Album name (optional)
  - Year (optional)
  - Key (optional)
  - Main content (lyrics/chords in monospace text format)
- Form validation ensures required fields are completed
- Success message confirms song has been added
- User is redirected to the song list after successful creation
- All text content is stored and displayed in monospace font

#### 1.2 View Song List
**User Story**: As a user, I want to see a list of all my songs so that I can quickly find and access them.

**Acceptance Criteria**:
- Songs are displayed in a scrollable list format optimized for mobile/tablet
- Default sorting is by "recently opened" (most recently viewed songs appear first)
- Each list item shows: song title, artist name, and last opened timestamp
- List is responsive and touch-friendly for mobile devices
- Empty state message when user has no songs yet
- List loads quickly even with large numbers of songs

#### 1.3 Search and Filter Songs
**User Story**: As a user, I want to search through my songs so that I can quickly find specific songs during performances.

**Acceptance Criteria**:
- Search box is prominently displayed at the top of the song list
- Search functionality covers: song title, artist name, album name
- Search results update in real-time as user types (debounced)
- Search is case-insensitive
- Clear search button to reset results
- Search works efficiently on mobile keyboards
- No results message when search yields no matches

#### 1.4 View Individual Song
**User Story**: As a user, I want to view a song's complete details and content so that I can perform or practice it.

**Acceptance Criteria**:
- Song displays in full-screen view optimized for reading
- Content is shown in monospace font for proper chord alignment
- Metadata (title, artist, album, year, key) is clearly displayed
- Content is scrollable for long songs
- Back navigation to return to song list
- Song view updates "last opened" timestamp
- Responsive design works on various screen sizes
- Text remains readable without zooming on mobile devices

#### 1.5 Edit Existing Song
**User Story**: As a user, I want to edit my existing songs so that I can correct mistakes or update information.

**Acceptance Criteria**:
- Edit button accessible from song view
- Pre-populated form with existing song data
- Same validation rules as new song creation
- Changes are saved to database
- User can cancel editing and return to song view
- Success message confirms changes have been saved
- Edited song's "last opened" timestamp is updated

### 2. Song Sharing

#### 2.1 Share Song with Other Users
**User Story**: As a user, I want to share specific songs with other users so that we can collaborate or share music knowledge.

**Acceptance Criteria**:
- Share button available in song view
- User can search for and select recipient users
- Shared song appears in recipient's song list
- Recipient can view but cannot edit the original song
- Sharing history is tracked
- Option to revoke sharing access
- Notification system for sharing events

#### 2.2 Public URL Sharing
**User Story**: As a user, I want to create public links for my songs so that I can share them with anyone without requiring app registration.

**Acceptance Criteria**:
- Generate unique, long, unguessable URLs for public sharing
- Public view shows song content without requiring authentication
- Public URLs can be disabled/revoked by song owner
- Public view includes attribution to original user (optional setting)
- Public links expire after configurable time period
- Mobile-optimized public view for shared songs

## Future Features (Not in Scope for Initial Release)

### AI-Powered Song Import
**Future Enhancement**: Automated song discovery and import from web sources with user approval workflow.

### Setlist Management
**Future Enhancement**: Ability to create and manage ordered lists of songs for performances.

### Setlist Sharing
**Future Enhancement**: Share complete setlists with other users or via public URLs.

### Chord Transposition
**Future Enhancement**: Automatically transpose songs to different keys.

### Export Functionality
**Future Enhancement**: Export songs or collections in various formats (PDF, text, etc.).

## Technical Requirements

### Performance
- Application must load quickly on mobile networks
- Song list must render smoothly with 1000+ songs
- Search must provide results within 200ms

### Responsive Design
- **Primary**: Optimized for mobile phones (portrait orientation)
- **Secondary**: Optimized for tablets (both orientations)
- **Tertiary**: Desktop compatibility

### Data Storage
- All user data stored securely with existing authentication system
- Song content supports Unicode characters for international music
- Efficient database queries for search and filtering operations

### Browser Compatibility
- Support for modern mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Progressive Web App capabilities for offline access (future consideration)

## Success Metrics

### User Engagement
- Average songs per user
- Daily active users on mobile devices
- Time spent in song view (indicating successful reading/performance use)

### Feature Adoption
- Percentage of users who add more than 10 songs
- Search feature usage frequency
- Song sharing activity

### Technical Performance
- Page load times under 2 seconds on mobile
- Search response times under 200ms
- 99.9% uptime for song access

## Technical Stack

### Core Technologies
- **RedwoodSDK**: Primary development framework providing full-stack capabilities
- **Authentication**: WebAuthn/Passkeys (already implemented)
- **Database**: Prisma ORM with SQLite/Cloudflare D1
- **Infrastructure**: Cloudflare Workers
- **Styling**: Vanilla CSS only (no CSS frameworks or libraries)

### RedwoodSDK Features to Utilize
- Server-side rendering capabilities
- Built-in routing and navigation
- Form handling and validation
- Database integration patterns
- Authentication integration
- Mobile-optimized components

### Development Principles
- **Code Simplicity**: Leverage RedwoodSDK's conventions to minimize custom code complexity
- **Vanilla CSS**: All styling implemented with standard CSS, avoiding framework dependencies
- **Performance**: Utilize RedwoodSDK's optimization features for mobile performance
- **Maintainability**: Follow RedwoodSDK patterns for consistent, readable codebase

## Dependencies

- RedwoodSDK framework and ecosystem
- Existing authentication system (WebAuthn/Passkeys)
- Current database schema (Prisma/SQLite)
- Cloudflare Workers infrastructure

## Risks and Mitigations

### Risk: Poor mobile performance affects live use
**Mitigation**: Extensive mobile testing, performance optimization, offline capabilities

### Risk: Complex sharing permissions confuse users
**Mitigation**: Simple, clear UI for sharing options, comprehensive user testing

### Risk: Search performance degrades with large song collections
**Mitigation**: Database indexing, query optimization, pagination if needed

## Launch Criteria

### Minimum Viable Product (MVP)
- [ ] Add, edit, view, and list songs
- [ ] Search functionality
- [ ] Basic sharing with other users
- [ ] Mobile-responsive interface
- [ ] Integration with existing authentication

### Success Criteria for Launch
- [ ] All acceptance criteria met for core features
- [ ] Mobile performance benchmarks achieved
- [ ] User acceptance testing completed with target users
- [ ] Security review completed for sharing features