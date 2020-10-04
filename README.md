# TMDbViewer
The app is intended for running on iOS and Android simulators. Both iOS 14 and Android 11 supported.

The app uses the [The Movie Database (TMDb) API v3](https://developers.themoviedb.org/3/getting-started/introduction). The main screen shows six collections split into two groups. First group contains most popular movies, as well as Family and Documentary movies. The second groups contains most popular TV shows, as well as Family and Documentary TV shows. All six lists are updated during browsing.

Every item in list is tappable. When tapped an item prompts navigation to a Details screen containing brief description of the movie/TV show.

The play button in Details screen calls a full screen video player equiped with custom playback controls. The vido clip is hardcoded whithin the app. The cross button in the top left part of the screen closes the video player.

## Installation
1. Clone the repo
2. Enter the project folder and run `npm run deploy` command. It will install npm and Pod dependencies

## Running on iOS simulator
1. Open Xcode
2. Choose `/ios/TMDbViewer.xcworkspace` file
3. Pick desired simulator
4. Hit *Run* button

## Running on Android simulator
1. Open Android Studio
2. Choose an *Open an existing Android Studio project* option
3. To to `/android` folder
4. Wait until build is complete
5. Using terminal go to the project’s folder and run `react-native start` command
6. Pick desired simulator
7. Wait until server is ready and hit *Run* button from within Android Studio
