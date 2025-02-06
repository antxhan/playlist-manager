# Playlist Manager

## [Live URL](https://the-playlist-manager.netlify.app/)

## Description

This project involves building a React web application that integrates with the Spotify API, allowing users to seamlessly manage their playlists and explore music. 
The primary goal is to provide an interactive, user-friendly interface that enhances the music experience by integrating playlist management, discovery, and playback into one seamless app.

## Features

The app will include the following features:

- Authentication: Log in with Spotify to access user data.
- Routing: Implemented using React Router for smooth navigation.
- Spotify Data Integration: Fetch playlists, tracks, and recommendations directly from Spotify.
- Playlist Management:
    - Create, edit, and delete playlists.
    - Add favorite tracks when creating a playlist.
- Music Playback:
    - Play and pause music using the Spotify Web Playback SDK.
    - Keyboard shortcuts: Space to play/pause, M to mute/unmute.
- Search Functionality: Find Spotify playlists based on keywords.
- Personalized Recommendations: Get suggested playlists based on favorite genres.

## Group member contributions

While everyone contributed in every aspect of this project, the primary contribution of each person was;

- Anton:
  Configuration, fetching the api, routing, search functionality
- Jod:
  Music player
- Kevin:
  CRUD implementation, animations, view transitions, responsiveness, error handling 

## Known bugs

- Website may be blocked if you have an ad-blocker
- 2 hours after signing in there will be a 401, however after refreshing it will be handled.
- User shouldn’t have the option to edit other users playlists
- Music Player initial 404 error message
- If you have signed in on multiple different instances the music player may not work
- If user (new accounts) does not have any prior listening activity there will be nothing to recommend and that view will stay in loading state
