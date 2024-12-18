# RN-Template

## Main Tools used

This template leverages a set of powerful frameworks and libraries that make app development faster and more efficient. Here's a breakdown of the main libraries and their purposes:

- **[Expo SDK](https://expo.dev/)**: The core framework that powers the app, providing a managed environment for building cross-platform apps with React Native. Expo includes essential libraries and APIs for handling device features such as haptics, notifications, camera, and more.
- **[expo-router](https://docs.expo.dev/routing/)**: A file-based routing library that simplifies navigation between screens in a React Native app. It is inspired by Next.js routing, providing automatic route generation and an intuitive navigation structure.
- **[@react-navigation/native](https://reactnavigation.org/docs/getting-started/)**: A library for managing screen transitions and navigation in a React Native app. It is highly customizable and offers various navigation patterns, including stack, tab, and drawer navigation.
- **[@tanstack/react-query](https://tanstack.com/query)**: A powerful library for managing server state in React applications. It simplifies data fetching, caching, and synchronization.
- **[@supabase/supabase-js](https://supabase.com/docs/library/getting-started)**: A backend-as-a-service (BaaS) platform that provides instant APIs for databases, authentication, and real-time data syncing.
- **[i18n-js](https://github.com/fnando/i18n-js)**: A lightweight internationalization (i18n) library for handling translations and locale-based formatting in React Native apps.
- **[Nativewind](https://github.com/marklawlor/nativewind)**: A utility-first CSS-in-JS framework built on top of Tailwind CSS. It allows for styling React Native components using utility classes in a way that is familiar to web developers.
- **[react-hook-form](https://react-hook-form.com/)**: A library for managing form state and validation with minimal re-renders. It integrates seamlessly with React Native and allows for easy handling of form validation and submission.
- **[lucide-react-native](https://github.com/derhuerst/lucide-react-native)**: A collection of open-source, high-quality icons for React Native apps.
- **[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)**: A library for building high-performance animations in React Native. It provides a more declarative approach to animation and can handle complex animations with less overhead.
- **[react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)**: A library for handling gestures (swipes, drags, taps) in React Native, providing smooth, native-like interactions.
- **[Zod](https://github.com/colinhacks/zod)**: A TypeScript-first schema validation library that helps validate data types and structures at runtime. It is often used for input validation, ensuring that the data conforms to the expected structure.
- **[ESLint](https://eslint.org/)**: A static code analysis tool for identifying and fixing problems in JavaScript and TypeScript code. It helps maintain code quality by enforcing consistent coding standards and detecting errors early in the development process.

### **Other Notable Libraries**

- **[expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)**: A secure storage solution for storing sensitive data like tokens or credentials.
- **[expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/)**: Provides the ability to fetch device locale and language information, enabling better localization and internationalization support.
- **[expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)**: Allows customization of splash screens for both iOS and Android.
- **[expo-status-bar](https://docs.expo.dev/versions/latest/sdk/status-bar/)**: Provides the ability to customize the app's status bar, including style and visibility.
- **[react-native-toast-message](https://github.com/calintamas/react-native-toast-message)**: A library for showing toast messages in React Native apps with smooth animations and customizable styling.
- **[react-native-webview](https://github.com/react-native-webview/react-native-webview)**: A WebView component for displaying web content in your app, useful for showing web pages or embedded content.

## Out of the box Features

- **Default Font**: "Poppins" font set up and ready to use.
- **Dark Mode**: Dark mode is pre-configured, and the app switches automatically based on the system settings.
- **Supabase and React Query Setup**: Configuration for easy integration with Supabase (for database and authentication) and React Query (for data fetching).
- **App Status Handlers**: Handlers are set up for automatic re-fetching/reconnecting with React Query and auto-refresh for Supabase.
- **User Validation**: Built-in validation to check if the user is already logged in and redirect them to the appropriate screen if necessary.

## Deep Linking for Email Authentication

This template supports deep linking, providing a seamless email-based signup and login experience. It integrates Supabase with Expo Auth Session and Expo Linking for smooth redirection and automatic session creation.

### **How It Works**:

1. **Redirect URI Generation:**
   - During the signup process, the app generates a redirectUri using Expo Auth Session's makeRedirectUri function.
   - This URI is passed to Supabase's signUp API as the emailRedirectTo parameter, ensuring the email link redirects the user back to the app.
2. **Email Interaction:**
   - When the user receives the signup email, clicking the link on a mobile device opens the app via the deep link.
3. **Deep Link Handling:**
   - The `/src/app/auth/_layout.tsx` file listens for incoming deep links using Expo Linking's `useUrl` hook.
   - If a valid URL is detected, the app extracts user data (such as authentication tokens) from the link.
4. **Session Creation and Navigation:**
   - Upon extracting the user data, the app validates the information, creates a new user session, and redirects the user to the main screen.
   - This automated process eliminates the need for manual login after clicking the email link.

This feature enhances user experience by streamlining the signup and login processes, making it easy for users to authenticate without unnecessary steps.

## Folder Structure

The folder structure is organized to follow best practices for scalability and maintainability. Here's an overview of the main directories and their purpose:

### **/src**

The source directory contains all the core logic, components, and assets for the app.

- **/api**  
  Contains all queries, mutations, and procedures used with React Query. It's the place where you define API calls and manage how data is fetched, cached, and updated.

  - Example files: `useFetchUser.ts`, `useUpdateProfile.ts`, `useCreatePost.ts`.

- **/app**  
  This is the main folder for managing routing in your app using Expo Router. It holds the screens and page components, organized according to the route structure.

  - Example files: `Home.tsx`, `Profile.tsx`, `Settings.tsx`.

- **/components**  
  Contains reusable UI components that can be shared across multiple screens. This folder is subdivided into different sections based on component type:

  - **/UI**  
    Dumb components that are responsible only for rendering the UI. These components have no logic and are focused on presentation.

    - Example files: `Text.tsx`, `Button.tsx`, `Card.tsx`, `Spinner.tsx`.

  - **/Elements**  
    Smart components that encapsulate logic along with the UI. These components may handle state, effects, or interact with other services.

    - Example files: `UserProfileCard.tsx`, `PostItem.tsx`, `Modal.tsx`.

  - **/Modals**  
    Reusable modal components for displaying dynamic content in overlays.

    - Example files: `ConfirmModal.tsx`, `AlertModal.tsx`.

  - **/Form**  
    A conjunction of components related to a form, like inputs, checkboxes, radio buttons, and form validation.

    - Example files: `SignUpForm.tsx`, `SignInForm.tsx`.

- **/hooks**  
  Contains custom React hooks that encapsulate reusable logic, making it easy to share behavior across the app.

  - Example files: `useAuth.ts`, `useFetch.ts`, `useModal.ts`.

- **/libs**  
  Libraries and utilities that configure or extend app frameworks. This folder often includes integrations for external services or configurations that are reused throughout the app.

  - Example files: `supabaseClient.ts`, `reactQueryClient.ts`, `theme.ts`.

- **/locales**  
  Holds language files for internationalization (i18n). This folder contains all the translations for the app in various languages.

  - Example files: `en.json`, `es.json`, `fr.json`.

- **/theme**  
  Contains theme configuration files, including colors, fonts, and global styles. The theme setup enables the app to dynamically switch between light and dark modes.

  - Example files: `colors.ts`, `typography.ts`, `theme.ts`.

- **/types**  
  Contains TypeScript types and interfaces for the application, ensuring that the app uses strong typing for things like database structures and API responses.

  - Example files: `database.types.ts`, `user.types.ts`, `api.types.ts`.

## Default Components

This template comes with a set of pre-configured, reusable components that you can use to quickly build out your app's UI. These components support theming, animations, and accessibility features.

### **UI/Text**

- A highly customizable text component that supports:
  - **Theming**: Text styling can adapt to light or dark modes.
  - **Internationalization**: Built-in support for different languages.
  - **Animated Styles**: Easily apply animations to the text, such as fade-in or slide-up effects.

### **UI/Screen**

- A flexible screen layout component that helps organize content within a screen. It includes:
  - Automatic handling of safe areas (top and bottom margins).
  - Layout configuration to center content or adjust according to screen size.

### **UI/Button**

- A versatile button component with built-in support for:
  - **Theming**: Button colors change according to the active theme.
  - **Loading State**: Automatically show a loading spinner when an action is in progress.
  - **Customizable Styles**: Adjust the size, shape, and colors of the button as needed.

### **UI/BottomSheet**

- A draggable BottomSheet component that supports:
  - **Customizable Height**: Define the height of the BottomSheet for different screen sizes.
  - **Content Flexibility**: Pass any component inside the BottomSheet, making it perfect for modals, action sheets, or additional info panels.

### **UI/Card**

- A reusable card component that includes:
  - **Theming Support**: Easily adapt to light or dark modes.
  - **Animated Styles**: Cards can include hover, press, or fade effects.
  - **Customizable**: Card components can include any child elements like images, text, or buttons.

### **UI/Skeleton**

- A skeleton loader component used to show a placeholder layout while content is loading. This improves the user experience by indicating that data is being fetched or processed.
  - **Customizable**: You can adjust the size and shape of the skeleton loader based on your layout needs.
  - **Smooth Animation**: Includes smooth animation effects to mimic the loading process.

### **UI/Spinner**

- A spinner component to show a loading state in various parts of the app:
  - **Customizable Size**: Choose the size of the spinner based on your design.
  - **Color and Animation**: Can be styled to match the theme and adjusted to fit within loading states.

### **UI/Inputs/TextInput**

- A highly flexible text input field component:
  - **Theming Support**: Automatically adapts to light or dark themes.
  - **Animated Styles**: Apply animations when the text input is focused or blurred.
  - **Customizable**: Set input types, placeholders, and input validation logic.

### **UI/Inputs/Form/TextInputForm**

- A wrapper around the `TextInput` that integrates seamlessly with **React Hook Form** for form validation and state management.
  - **Form Validation**: Automatically integrates with React Hook Form validation methods.
  - **Animated Styles**: Text input fields support animations like focus and error states.
  - **Error Handling**: Displays validation error messages, making it easy to guide users during form submission.

These components are designed to be flexible and customizable, providing a foundation for building consistent and interactive UIs. You can extend or modify these components as needed to fit the unique requirements of your app.

## Supabase and React Query Configuration

Supabase Configuration: The template includes a preconfigured Supabase client for easy setup. Just provide your Supabase project URL and API key.

React Query Configuration: Automatic handling of auto-fetching, background data syncing, and re-fetching is included. React Query's query client is set up and can be customized as needed.

- App Status Handlers:

  - React Query automatically re-fetches data when the network status changes.
  - Supabase's client automatically refreshes sessions when needed.

- User Authentication:
  - Supabase authentication hooks are included to check if the user is logged in. If they are, they are redirected to the appropriate screen.

## Reactotron Configuration

[Reactotron](https://github.com/infinitered/reactotron) is configured out of the box for debugging. It allows you to track app states, monitor actions, and debug your app with ease. To get started, ensure you have the Reactotron app installed and connected to your app.

## Setup

This section covers the setup and installation of the template, as well as configuration details for various tools and libraries used in the project.

### Prerequisites

Before setting up the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: 18.x or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (To run the app on your device or simulator)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
    git clone https://github.com/macanhajc/rn-template.git
   ```
2. Navigate into the project directory:
   ```bash
    cd rn-template
   ```
3. Install the project dependencies:
   ```bash
     yarn install
   ```

### Running the Project

After installing the dependencies, you can run the app on your chosen platform (Android or iOS):

- For android:
  ```bash
    yarn android
  ```
- For android:
  ```bash
    yarn ios
  ```

### Generating supabase database types

To keep your database types up-to-date with your Supabase schema, use the provided script. Before running the script, replace $SUPABASE_KEY with your Supabase project ID in the package.json script section under supabase:generate.

Once updated, run the following command to generate the TypeScript definitions for your database:

```bash
   yarn supabase:generate
```

This will create or update the file at src/types/database.types.ts, ensuring your app has accurate type definitions for your Supabase database.

### Additional Configuration

- Supabase: The template comes with Supabase integration for backend functionality. Make sure to configure your Supabase project ID and API keys in the .env file.

- Reactotron: For debugging and monitoring, Reactotron is integrated. It provides an interactive interface for inspecting API requests, performance, and application state. You can start using it right after installation.

## Contributing

Feel free to open issues or submit pull requests for improvements and bug fixes. Contributions are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
