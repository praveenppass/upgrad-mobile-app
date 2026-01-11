# 🎓 Lex Mobile App - upGrad Learning Platform

A comprehensive React Native educational mobile application built for upGrad's learning ecosystem with enterprise-grade architecture and modern development practices.

## 📋 Table of Contents

- [App Overview](#-app-overview)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Module Structure](#-module-structure)
- [Implementation Patterns](#-implementation-patterns)
- [Development Guidelines](#-development-guidelines)
- [Feature Implementation Guide](#-feature-implementation-guide)
- [WebView vs Native Components](#-webview-vs-native-components)
- [Environment Setup](#-environment-setup)
- [Figma Integration](#-figma-integration)
- [Build & Deployment](#-build--deployment)
- [Testing Guidelines](#-testing-guidelines)
- [Performance Best Practices](#-performance-best-practices)
- [Security Guidelines](#-security-guidelines)
- [Troubleshooting](#-troubleshooting)

## 🚀 App Overview

**Lex Mobile App** is upGrad's primary learning platform for mobile devices, featuring:

- **Course consumption** with video streaming, assessments, and progress tracking
- **Multi-format content** support (video, PDF, web content, quizzes)
- **Academic planning** with calendar integration and event management
- **User profile management** with personalization features
- **Offline capabilities** for content consumption
- **Social features** including doubt resolution and peer interaction

### Key Features

- 📚 **Course Library**: Browse and enroll in courses
- 🎥 **Video Streaming**: High-quality video playback with custom controls
- 📝 **Assessments**: Interactive quizzes and evaluations
- 📅 **Academic Planner**: Calendar-based event management
- 👤 **Profile Management**: Personal details, certificates, achievements
- 🤖 **AI Assistance**: Integrated doubt resolution bot
- 📱 **Cross-Platform**: iOS and Android support
- 🔄 **OTA Updates**: CodePush integration for seamless updates

## 🏗️ Architecture & Tech Stack

### Core Technologies

- **Framework**: React Native 0.78.2 with New Architecture enabled
- **Language**: TypeScript for type safety
- **State Management**: Redux Toolkit + Redux Saga
- **Navigation**: React Navigation v7 (Stack, Bottom Tabs, Drawer)
- **GraphQL Client**: Apollo Client with multi-endpoint support
- **Authentication**: Keycloak integration via `@react-keycloak/native`
- **UI Framework**: React Native Paper + Custom Design System
- **Storage**: MMKV for high-performance local storage
- **Analytics**: RudderStack for event tracking
- **Code Push**: Microsoft CodePush for OTA updates
- **Testing**: Jest + React Native Testing Library

### Architecture Patterns

- **MVC Pattern**: Model-View-Controller with custom hooks for business logic
- **Component Composition**: Higher-Order Components (HOCs) and render props
- **Feature-based Folder Structure**: Organized by domain and functionality
- **Atomic Design**: Components structured from atoms to organisms
- **Repository Pattern**: Centralized data access layer

## 📂 Module Structure

```
src/
├── 🎨 assets/                  # Static assets and design system
│   ├── animations/             # Lottie animations
│   ├── colors/                 # Color palette and theme definitions
│   ├── fonts/                  # Typography and font files
│   ├── icons/                  # SVG and PNG icons
│   ├── strings/                # Localization and text constants
│   ├── styles/                 # Global styles and theme components
│   └── themes/                 # Theme configurations
│
├── 🧩 components/              # Reusable UI components
│   ├── Reusable/              # Generic components (atomic level)
│   │   ├── Buttons/           # Button variants and states
│   │   ├── Video/             # Video player components
│   │   ├── Loaders/           # Loading states and skeletons
│   │   ├── Modals/            # Modal and bottom sheet components
│   │   └── TextInput/         # Input field variants
│   ├── asset/                 # Asset-specific components
│   │   ├── video/             # Video asset components
│   │   ├── pdf/               # PDF viewer components
│   │   ├── assessment/        # Quiz and evaluation components
│   │   └── htmlContent/       # Web content rendering
│   ├── academicPlanner/       # Calendar and event components
│   ├── Courses/               # Course-related components
│   ├── Home/                  # Home screen components
│   ├── MyProfile/             # Profile management components
│   └── Support/               # Help and support components
│
├── 📱 screens/                 # Screen components and controllers
│   ├── Auth/                  # Authentication flow screens
│   ├── Tabs/                  # Main tab navigation screens
│   │   ├── Home/             # Dashboard and home screens
│   │   ├── Courses/          # Course consumption screens
│   │   ├── AcademicPlanner/  # Calendar and events
│   │   ├── MyProfile/        # Profile management
│   │   └── Profile/          # Additional profile features
│   ├── SplashScreen/         # App initialization
│   ├── Video/                # Full-screen video player
│   └── Web/                  # WebView-based screens
│
├── 🧭 routes/                  # Navigation configuration
│   ├── stacks/                # Stack navigators
│   ├── tabs/                  # Tab navigation setup
│   └── options/               # Navigation options and configs
│
├── 🗄️ redux/                   # State management
│   ├── slices/                # Redux Toolkit slices
│   │   ├── auth.slice.ts     # Authentication state
│   │   ├── user.slice.ts     # User profile state
│   │   ├── app.slice.ts      # Global app state
│   │   ├── modal.slice.ts    # Modal management
│   │   └── snack.slice.ts    # Toast notifications
│   ├── saga/                  # Redux Saga middleware
│   └── store/                 # Store configuration
│
├── 🌐 graphql/                 # GraphQL operations
│   ├── query/                 # GraphQL queries
│   │   ├── asset/            # Asset-related queries
│   │   ├── user/             # User data queries
│   │   ├── courses/          # Course information queries
│   │   └── academicPlanner/  # Calendar and events queries
│   └── mutation/              # GraphQL mutations
│       ├── auth/             # Authentication mutations
│       ├── user/             # User profile updates
│       └── asset/            # Asset interaction mutations
│
├── 🪝 hooks/                   # Custom React hooks
│   ├── useAuth.ts             # Authentication logic
│   ├── useNetworkStatus.ts    # Network connectivity
│   ├── useAnalytics.ts        # Event tracking
│   └── useAppState.ts         # App lifecycle management
│
├── 🔧 services/                # External service integrations
│   ├── auth.ts                # Authentication services
│   ├── downloadDocument.ts    # File download handling
│   └── analytics.ts           # Analytics service wrapper
│
├── ⚙️ config/                  # Configuration files
│   ├── env.ts                 # Environment variables
│   ├── endpoints.ts           # API endpoint configurations
│   ├── apollo.ts              # GraphQL client setup
│   ├── keycloak.ts            # Authentication configuration
│   └── mmkvStorage.ts         # Local storage setup
│
├── 🔗 interface/               # TypeScript type definitions
│   ├── app.interface.ts       # Global app types
│   ├── user.interface.ts      # User-related types
│   ├── asset.interface.ts     # Asset content types
│   ├── web.interface.ts       # WebView integration types
│   └── types/                 # Navigation and utility types
│
├── 🛠️ utils/                   # Utility functions
│   ├── functions.ts           # Common utility functions
│   ├── web.utils.ts           # WebView communication utilities
│   ├── asset.utils.ts         # Asset processing utilities
│   └── analytics.utils.ts     # Analytics helper functions
│
├── 🎭 hoc/                     # Higher-Order Components
│   ├── withHeaderLxp.tsx      # Screen wrapper with header
│   ├── withAuthWrapper.tsx    # Authentication wrapper
│   └── withBackGroundGradient.tsx  # Background styling wrapper
│
└── 📦 constants/               # Application constants
    ├── storage.constants.ts    # Storage key definitions
    ├── web.constants.ts        # WebView communication constants
    └── regex.constants.ts      # Regular expression patterns
```

### Key Modules by Domain

#### 🎓 **Learning Module**

- **Components**: `src/components/asset/`, `src/components/Courses/`
- **Screens**: `src/screens/Tabs/Courses/`
- **State Management**: Asset consumption, progress tracking
- **Features**: Video playback, PDF viewing, assessments, quizzes

#### 📅 **Academic Planning Module**

- **Components**: `src/components/academicPlanner/`
- **Screens**: `src/screens/Tabs/AcademicPlanner/`
- **State Management**: Calendar events, session scheduling
- **Features**: Event calendar, session booking, reminders

#### 👤 **Profile Management Module**

- **Components**: `src/components/MyProfile/`
- **Screens**: `src/screens/Tabs/MyProfile/`
- **State Management**: User profile, personal details
- **Features**: Profile editing, achievements, certificates

#### 🌐 **Web Integration Module**

- **Components**: `src/components/web/`, `src/components/Reusable/Webview.tsx`
- **Screens**: `src/screens/Web/`
- **Utilities**: `src/utils/web.utils.ts`
- **Features**: Seamless web-native communication, hybrid screens

## 🎯 Implementation Patterns

### 1. **Screen Implementation Pattern**

#### Native Screen Pattern (Reference: MyProfileScreen)

```typescript
// Screen Structure
src/screens/Tabs/MyProfile/MyProfileScreen/
├── index.tsx                    # Main screen component
├── useMyProfileScreenController.ts  # Business logic hook
├── useMyProfileScreenModel.ts       # Data layer hook
└── myProfileScreen.styles.ts        # Screen-specific styles

// Implementation Pattern
const BodyComponent = () => {
  const { data, loading, handlers } = useScreenController();

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <>
          <HeaderComponent data={data} />
          <ContentComponent data={data} handlers={handlers} />
        </>
      )}
    </View>
  );
};

const MemoizedBodyComponent = memo(BodyComponent);

const ScreenName = () => (
  <WithHeaderLxp
    BodyComponent={MemoizedBodyComponent}
    showBack
    title="Screen Title"
  />
);
```

#### WebView Screen Pattern (Reference: LoginScreen)

```typescript
// WebView Screen Structure
const BodyComponent = () => {
  const webViewRef = useRef<WebView | null>(null);
  const { loading } = useSelector((state: RootState) => state.auth);

  const onMessage = useCallback(
    (event: WebViewMessageEvent) =>
      handleWebEvents({
        webViewRef,
        eventData: JSON.parse(event.nativeEvent.data),
        enableAuthNavigation: true,
      }),
    [],
  );

  return (
    <View style={styles.container}>
      <Webview
        webViewRef={webViewRef}
        url={ENV.webUrl}
        onMessage={onMessage}
        customJs={CUSTOM_JS}
      />
    </View>
  );
};

const MemoizedBodyComponent = memo(BodyComponent);

const WebScreenName = () => (
  <WithWebHeader BodyComponent={MemoizedBodyComponent} />
);
```

#### ScreenWrapper Usage Pattern

**ScreenWrapper** is a foundational component that provides consistent screen layout, safe area handling, and background configuration. Its usage depends on whether your screen has a header or not:

**🏛️ For Screens WITH Headers - Use `WithHeaderLxp` HOC:**

```typescript
// WithHeaderLxp automatically includes ScreenWrapper internally
const MemoizedBodyComponent = memo(BodyComponent);

const ScreenWithHeader = () => (
  <WithHeaderLxp
    BodyComponent={MemoizedBodyComponent}
    showBack={true}                    // Show back button
    title="Screen Title"               // Header title
    backgroundColor={colors.white}     // Screen background
    headerBackgroundColor={colors.blue} // Header background
    showBottomShadow={true}            // Header shadow
    removeBottomInset={false}          // Safe area management
  />
);
```

**🎯 For Screens WITHOUT Headers - Use ScreenWrapper directly:**

```typescript
import ScreenWrapper from '@components/Reusable/ScreenWrapper';

const ScreenWithoutHeader = () => {
  return (
    <ScreenWrapper
      backgroundColor={colors.white}
      removeBottomInset={false}
      headerBackgroundColor={colors.transparent}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Your screen content */}
        <CustomHeaderComponent />
        <ContentComponent />
      </View>
    </ScreenWrapper>
  );
};
```

**📱 ScreenWrapper Configuration Options:**

```typescript
interface ScreenWrapperProps {
	children: React.ReactNode;
	backgroundColor?: ColorValue; // Main background color
	headerBackgroundColor?: ColorValue; // Status bar area background
	removeBottomInset?: boolean; // Remove bottom safe area
	removeBackground?: boolean; // Remove default styling
}
```

**⚡ Key Features:**

- **Safe Area Management**: Handles notch and home indicator on modern devices
- **Status Bar Configuration**: Automatic status bar styling
- **Background Consistency**: Unified background colors across screens
- **Performance Optimized**: Minimal re-renders with proper memoization

### 2. **Component Architecture Pattern**

#### Atomic Design Structure

```typescript
// Atom Level (Basic UI elements)
src / components / Reusable / RNText.tsx;
src / components / Reusable / Loading.tsx;
src / components / CheckBox / AppCheckBox.tsx;

// Molecule Level (Component combinations)
src / components / Inputs / CommonButton.tsx;
src / components / Header / BasicHeader.tsx;
src / components / Reusable / CustomChip.tsx;

// Organism Level (Complex components)
src /
	components /
	Courses /
	CourseDetails /
	src /
	components /
	MyProfile /
	common /
	ProfileHeader.tsx;
src / components / asset / video / VideoPlayer.tsx;

// Template Level (Screen layouts)
src / hoc / withHeaderLxp.tsx;
src / components / Reusable / ScreenWrapper.tsx;
```

### 3. **State Management Pattern**

#### Redux Slice Structure

```typescript
// State Shape
type FeatureState = {
	data: FeatureData;
	loading: boolean;
	error?: string;
};

// Action Creators
const featureSlice = createSlice({
	name: "feature",
	initialState,
	reducers: {
		fetchData: (state) => {
			state.loading = true;
		},
		setData: (state, action) => {
			state.data = action.payload;
			state.loading = false;
		},
		setError: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

// Saga for async operations
function* fetchDataSaga(action: PayloadAction<FetchParams>) {
	try {
		const data = yield call(apiCall, action.payload);
		yield put(featureSlice.actions.setData(data));
	} catch (error) {
		yield put(featureSlice.actions.setError(error.message));
	}
}
```

### 4. **GraphQL Integration Pattern**

#### Query Implementation

```typescript
// GraphQL Query Definition
const GET_USER_DATA = gql`
	query GetUserData($userId: ID!) {
		user(id: $userId) {
			id
			firstName
			lastName
			email
			profilePicture
		}
	}
`;

// Hook Usage
const useUserData = (userId: string) => {
	const { data, loading, error, refetch } = useQuery(GET_USER_DATA, {
		variables: { userId },
		errorPolicy: "all",
	});

	return {
		userData: data?.user,
		loading,
		error,
		refetchUserData: refetch,
	};
};
```

## 📋 Development Guidelines

### **🔧 Code Style & Standards**

#### **Naming Conventions**

##### **File Naming**

- **Components**: PascalCase (`UserProfile.tsx`)
- **Screens**: PascalCase with 'Screen' suffix (`LoginScreen.tsx`)
- **Hooks**: camelCase starting with 'use' (`useUserData.ts`)
- **Utils**: domain.utils.ts format (`date.utils.ts`, `validation.utils.ts`)
- **Constants**: domain.constants.ts format (`api.constants.ts`, `date.constants.ts`)
- **Interfaces**: domain.interface.ts format (`user.interface.ts`, `api.interface.ts`)

##### **Variable & Constant Naming**

- **Constants**: UPPER_SNAKE_CASE

    ```typescript
    // ✅ Good
    export const API_BASE_URL = "https://api.example.com";
    export const MAX_RETRY_ATTEMPTS = 3;
    export const USER_STORAGE_KEY = "user_data";

    // ❌ Avoid
    export const apiBaseUrl = "https://api.example.com";
    export const maxRetryAttempts = 3;
    ```

- **Variables**: camelCase

    ```typescript
    const userName = "john_doe";
    const isLoggedIn = true;
    const userPreferences = {};
    ```

- **Functions**: camelCase

    ```typescript
    const handleUserLogin = () => {};
    const validateEmailAddress = () => {};
    const fetchUserData = async () => {};
    ```

- **Components**: PascalCase with descriptive names

    ```typescript
    ✅ ProfileScreenButtonList, VideoPlayerOverlay
    ❌ ButtonList, Overlay
    ```

- **Hooks**: camelCase starting with 'use'
    ```typescript
    ✅ useMyProfileScreenController, useVideoPlayerState
    ❌ MyProfileController, videoState
    ```

### **File Organization Rules**

#### **Maximum File Length**

- **Single file should not exceed 200 lines of code**
- If a file exceeds 200 lines, split it into smaller, focused modules
- Example breakdown:

```typescript
// ❌ Avoid - Large single file (250+ lines)
// userManagement.ts

// ✅ Good - Split into focused modules
// user.utils.ts (< 200 lines)
// user.constants.ts (< 200 lines)
// user.interface.ts (< 200 lines)
// user.service.ts (< 200 lines)
```

#### **File Splitting Strategy**

When a file exceeds 200 lines, split by:

1. **By Functionality**:

    ```
    // Original: authHelpers.ts (300 lines)
    auth.utils.ts          // Helper functions
    auth.constants.ts      // Auth constants
    auth.interface.ts      // Type definitions
    auth.validation.ts     // Validation logic
    ```

2. **By Domain**:

    ```
    // Original: apiHelpers.ts (400 lines)
    user.api.ts           // User API calls
    course.api.ts         // Course API calls
    assessment.api.ts     // Assessment API calls
    api.constants.ts      // Shared API constants
    ```

3. **By Component Parts**:
    ```
    // Original: ComplexComponent.tsx (350 lines)
    ComplexComponent.tsx       // Main component (< 200 lines)
    ComplexComponent.styles.ts // Styles
    ComplexComponent.hooks.ts  // Custom hooks
    ComplexComponent.utils.ts  // Helper functions
    ```

#### **TypeScript Guidelines**

- **Always define interfaces** for props and state
- **Use strict type checking** - avoid `any` type
- **Prefer interfaces over types** for object shapes
- **Use enums** for fixed sets of values

```typescript
// ✅ Good
interface UserProfileProps {
  user: UserData;
  onEdit: (field: string, value: string) => void;
}

enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

// ❌ Avoid
const UserProfile = (props: any) => { ... }
const userStatus = 'active' | 'inactive' | 'suspended';
```

#### **Component Guidelines**

- **Use functional components** with hooks
- **Implement memo** for performance optimization
- **Separate business logic** into custom hooks
- **Keep components focused** on single responsibility

```typescript
// ✅ Good Structure
const ProfileHeader = memo(({ user, progress }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <ProfileImage source={user.profilePicture} />
      <UserInfo name={user.firstName} email={user.email} />
      <ProgressIndicator progress={progress} />
    </View>
  );
});

// Custom hook for business logic
const useProfileData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Business logic here

  return { data, loading, refetch };
};
```

#### **Screen Layout Guidelines**

- **For screens WITH headers**: Use `WithHeaderLxp` HOC (ScreenWrapper included automatically)
- **For screens WITHOUT headers**: Use `ScreenWrapper` directly
- **Never use both**: ScreenWrapper is included in WithHeaderLxp, avoid double-wrapping
- **Consistent styling**: Use ScreenWrapper props for background and safe area configuration

```typescript
// ✅ Screen with header - use WithHeaderLxp
const MemoizedBodyComponent = memo(BodyComponent);
const MyProfileScreen = () => (
  <WithHeaderLxp
    BodyComponent={MemoizedBodyComponent}
    title="My Profile"
    showBack
    backgroundColor={colors.grey_02}
  />
);

// ✅ Screen without header - use ScreenWrapper directly
const SplashScreen = () => (
  <ScreenWrapper backgroundColor={colors.primary}>
    <StatusBar hidden />
    <View style={styles.container}>
      <LogoComponent />
    </View>
  </ScreenWrapper>
);

// ❌ Avoid - Don't use both together
const BadScreen = () => (
  <ScreenWrapper>
    <WithHeaderLxp BodyComponent={Component} />
  </ScreenWrapper>
);
```

### **🏛️ Architecture Guidelines**

#### **Folder Organization**

- **Group by feature**, not by file type
- **Keep related files together**
- **Use index files** for clean imports
- **Separate concerns** (UI, logic, data)
- **Maintain consistent import paths** using absolute imports

#### **Domain-Based Organization**

```
src/
├── components/
│   ├── user/
│   │   ├── UserProfile.tsx
│   │   ├── user.interface.ts
│   │   ├── user.utils.ts
│   │   └── user.constants.ts
│   └── course/
│       ├── CourseCard.tsx
│       ├── course.interface.ts
│       └── course.utils.ts
├── utils/
│   ├── date.utils.ts
│   ├── validation.utils.ts
│   └── string.utils.ts
├── constants/
│   ├── api.constants.ts
│   ├── storage.constants.ts
│   └── navigation.constants.ts
└── interfaces/
    ├── common.interface.ts
    ├── api.interface.ts
    └── navigation.interface.ts
```

#### **Screen Structure Pattern**

```
✅ Good Structure
src/screens/Profile/
├── index.tsx              # Main export
├── ProfileScreen.tsx      # UI component
├── useProfileController.ts # Business logic
├── useProfileModel.ts     # Data layer
├── profileScreen.styles.ts # Styles
└── components/            # Screen-specific components
    ├── ProfileHeader.tsx
    └── ProfileStats.tsx

❌ Avoid
src/
├── screens/
│   └── ProfileScreen.tsx
├── hooks/
│   └── useProfileController.ts
└── styles/
    └── profileStyles.ts
```

#### **State Management Rules**

- **Keep state as flat as possible**
- **Use Redux for global state**
- **Use local state for component-specific data**
- **Implement proper error handling**

```typescript
// ✅ Good Redux Structure
interface AppState {
	auth: AuthState;
	user: UserState;
	courses: CoursesState;
	ui: UIState;
}

// ❌ Avoid deep nesting
interface AppState {
	data: {
		user: {
			profile: {
				personal: {
					details: UserDetails;
				};
			};
		};
	};
}
```

### **🔒 Security Guidelines**

#### **Authentication & Authorization**

- **Never store sensitive data** in plain text
- **Use MMKV** for secure local storage
- **Implement token refresh** automatically
- **Handle authentication errors** gracefully

```typescript
// ✅ Secure token storage
import { storage } from "@config/mmkvStorage";

const storeToken = (token: string) => {
	storage.set(
		StorageKeys.USER_TOKEN,
		JSON.stringify({
			access_token: token,
			timestamp: Date.now(),
		}),
	);
};

// ✅ Auto token refresh
const authLink = setContext(async (_, { headers = {} }) => {
	const userToken = await storage.getString(StorageKeys.USER_TOKEN);

	if (!userToken) return { headers };

	const parsedToken = JSON.parse(userToken);

	return {
		headers: {
			...headers,
			authorization: `Bearer ${parsedToken.access_token}`,
		},
	};
});
```

#### **Data Validation**

- **Validate all inputs** from external sources
- **Sanitize data** before processing
- **Use TypeScript** for compile-time validation
- **Implement runtime validation** for critical data

### **🚀 Performance Guidelines**

#### **React Optimization Patterns**

##### **1. Component Memoization with `memo`**

```typescript
// ✅ Memoize components to prevent unnecessary re-renders
import { memo } from 'react';

const CourseCard = memo(({ course, onPress }: CourseCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(course.id)}>
      <Text>{course.title}</Text>
      <Text>{course.description}</Text>
    </TouchableOpacity>
  );
});

// ✅ Memoize with custom comparison function for complex props
const ExpensiveComponent = memo(({ data, settings }: Props) => {
  return <ComplexVisualization data={data} settings={settings} />;
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if data length changes
  return prevProps.data.length === nextProps.data.length &&
         prevProps.settings.theme === nextProps.settings.theme;
});

// ✅ Good: Memoize component and then pass it as a prop
const MyComponent = () => { /* ... */ };
const MemoizedMyComponent = memo(MyComponent);

const MyScreen = () => (
  <WrapperComponent
    BodyComponent={MemoizedMyComponent}
  />
);

// ❌ Anti-Pattern: Do not use `memo` inline in props
// This creates a new component type on every render, defeating the purpose of memoization.
const MyBadScreen = () => (
    <WrapperComponent
      BodyComponent={memo(MyComponent)} // Incorrect!
    />
);
```

##### **2. Callback Memoization with `useCallback`**

```typescript
// ✅ Memoize event handlers to prevent child re-renders
const CourseList = ({ courses }: CourseListProps) => {
  const navigation = useNavigation();

  // Memoize callback to prevent CourseCard re-renders
  const handleCoursePress = useCallback((courseId: string) => {
    navigation.navigate('CourseDetails', { courseId });
  }, [navigation]);

  // Memoize render function for FlashList
  const renderCourse = useCallback(({ item }: { item: Course }) => (
    <CourseCard
      key={item.id}
      course={item}
      onPress={handleCoursePress}
    />
  ), [handleCoursePress]);

  return (
    <FlashList
      data={courses}
      renderItem={renderCourse}
      estimatedItemSize={120}
      getItemType={(item) => item.type}
    />
  );
};
```

##### **3. Value Memoization with `useMemo`**

```typescript
// ✅ Memoize expensive calculations
const UserDashboard = ({ courses, assessments }: DashboardProps) => {
  // Expensive calculation - only recalculate when dependencies change
  const dashboardStats = useMemo(() => {
    const completedCourses = courses.filter(c => c.status === 'completed');
    const avgScore = assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length;
    const totalHours = courses.reduce((sum, c) => sum + c.duration, 0);

    return {
      completionRate: (completedCourses.length / courses.length) * 100,
      averageScore: avgScore,
      totalStudyHours: totalHours
    };
  }, [courses, assessments]);

  // Memoize filtered/sorted data
  const sortedCourses = useMemo(() => {
    return courses
      .filter(course => course.isActive)
      .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
  }, [courses]);

  return (
    <View>
      <StatsCard stats={dashboardStats} />
      <CourseList courses={sortedCourses} />
    </View>
  );
};
```

##### **4. List Optimization with FlashList**

```typescript
// ✅ Optimized list rendering with proper memoization
import { FlashList } from '@shopify/flash-list';

const OptimizedCourseList = ({ courses, onCoursePress }: Props) => {
  // Memoize the render function
  const renderItem = useCallback(({ item }: { item: Course }) => (
    <CourseCard course={item} onPress={onCoursePress} />
  ), [onCoursePress]);

  // Memoize key extractor
  const keyExtractor = useCallback((item: Course) => item.id, []);

  // Memoize get item type for heterogeneous lists
  const getItemType = useCallback((item: Course) => {
    return item.type; // 'video', 'pdf', 'assessment', etc.
  }, []);

  return (
    <FlashList
      data={courses}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemType={getItemType}
      estimatedItemSize={120}
      // Additional optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
    />
  );
};
```

##### **5. Image Optimization**

```typescript
// ✅ Use React Native's Image component with proper optimization
import { Image } from 'react-native';

const OptimizedImage = memo(({ source, style }: ImageProps) => (
  <Image
    source={{ uri: source }}
    style={style}
    resizeMode="cover"
    // Enable caching for better performance
    fadeDuration={0}
  />
));
```

##### **6. React Hook Optimization Best Practices**

```typescript
// ❌ Avoid - Creates new function on every render
const BadComponent = ({ items }) => {
  const handlePress = (id) => {
    console.log('Pressed:', id);
  };

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <ItemCard item={item} onPress={handlePress} />
      )}
    />
  );
};

// ✅ Good - Memoized functions prevent re-renders
const GoodComponent = ({ items }) => {
  const handlePress = useCallback((id) => {
    console.log('Pressed:', id);
  }, []);

  const renderItem = useCallback(({ item }) => (
    <ItemCard item={item} onPress={handlePress} />
  ), [handlePress]);

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
    />
  );
};
```

#### **React Native Specific Optimizations**

##### **1. List Performance Optimization**

```typescript
// ✅ FlatList/FlashList optimization
import { FlashList } from '@shopify/flash-list';

const OptimizedList = ({ data, onItemPress }: ListProps) => {
  const renderItem = useCallback(({ item, index }: { item: Item; index: number }) => (
    <ItemComponent
      item={item}
      index={index}
      onPress={onItemPress}
    />
  ), [onItemPress]);

  const keyExtractor = useCallback((item: Item) => item.id, []);

  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={ITEM_HEIGHT}
      getItemLayout={getItemLayout} // For fixed height items
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={10}
      windowSize={10}
      recycleItems={true} // FlashList specific
    />
  );
};
```

##### **2. Image Optimization**

```typescript
// ✅ React Native Image with proper caching and resizing
import { Image } from 'react-native';

const OptimizedImageComponent = memo(({ uri, style, placeholder }: ImageProps) => {
  return (
    <Image
      style={style}
      source={{ uri }}
      defaultSource={placeholder} // Local placeholder
      resizeMode="cover"
      fadeDuration={0} // Disable fade animation for better performance
      onLoad={() => console.log('Image loaded')}
      onError={() => console.log('Image failed to load')}
    />
  );
});

// ✅ Image preloading for better UX (using React Native's built-in caching)
const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach(uri => {
    Image.prefetch(uri)
      .then(() => console.log('Image prefetched:', uri))
      .catch(error => console.log('Failed to prefetch image:', uri, error));
  });
};
```

##### **3. Navigation Optimization**

```typescript
// ✅ Screen pre-loading and lazy initialization
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Lazy load heavy screens
const LazyExpensiveScreen = lazy(() => import('@screens/ExpensiveScreen'));

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      // Optimize navigation animations
      animationTypeForReplace: 'push',
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }}
  >
    <Stack.Screen
      name="Home"
      component={MyPrograms}
      options={{
        // Prevent unnecessary re-renders
        freezeOnBlur: true,
      }}
    />
    <Stack.Screen
      name="ExpensiveScreen"
      component={LazyExpensiveScreen}
      options={{
        // Lazy load heavy components
        lazy: true,
      }}
    />
  </Stack.Navigator>
);
```

##### **4. Bridge Communication Optimization**

```typescript
// ✅ Batch native calls to reduce bridge traffic
import { InteractionManager, Platform } from "react-native";

// ✅ Optimize AsyncStorage calls
import { storage } from "@config/mmkvStorage";

const batchNativeCalls = () => {
	// Wait for interactions to complete
	InteractionManager.runAfterInteractions(() => {
		// Batch multiple native operations
		requestAnimationFrame(() => {
			// Perform native operations here
			nativeModule.performBatchOperation();
		});
	});
};

const optimizedStorage = {
	// Batch storage operations
	batchSet: async (items: Array<[string, string]>) => {
		await Promise.all(items.map(([key, value]) => storage.set(key, value)));
	},

	// Cache frequently accessed data
	cachedGet: (() => {
		const cache = new Map();
		return async (key: string) => {
			if (cache.has(key)) return cache.get(key);
			const value = storage.getString(key);
			cache.set(key, value);
			return value;
		};
	})(),
};
```

##### **5. Animation Performance**

```typescript
// ✅ Use native driver for animations
import { Animated, Easing } from 'react-native';

const AnimatedComponent = () => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateSlide = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true, // Enable native driver
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          },
        ],
      }}
    >
      <Content />
    </Animated.View>
  );
};

// ✅ Use react-native-reanimated for complex animations
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

const ReanimatedComponent = () => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(offset.value * 255) }],
  }));

  return (
    <Animated.View style={[styles.box, animatedStyles]}>
      <Content />
    </Animated.View>
  );
};
```

##### **6. Memory Management**

```typescript
// ✅ Proper cleanup and memory management
const ComponentWithCleanup = () => {
  const [data, setData] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const result = await api.fetchData();
      // Check if component is still mounted
      if (isMountedRef.current) {
        setData(result);
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error('Fetch error:', error);
      }
    }
  }, []);

  // Cleanup subscriptions and timers
  useEffect(() => {
    const subscription = eventEmitter.addListener('dataUpdate', fetchData);
    const interval = setInterval(fetchData, 30000);

    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, [fetchData]);

  return <DataComponent data={data} />;
};
```

##### **7. Platform-Specific Optimizations**

```typescript
// ✅ Platform-specific performance optimizations
import { Platform } from 'react-native';

const PlatformOptimizedComponent = () => {
  // iOS specific optimizations
  const iosOptimizations = useMemo(() => {
    if (Platform.OS === 'ios') {
      return {
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      };
    }
    return {};
  }, []);

  // Android specific optimizations
  const androidOptimizations = useMemo(() => {
    if (Platform.OS === 'android') {
      return {
        elevation: 4,
        renderToHardwareTextureAndroid: true,
      };
    }
    return {};
  }, []);

  return (
    <View style={[
      styles.container,
      iosOptimizations,
      androidOptimizations,
    ]}>
      <Content />
    </View>
  );
};
```

##### **8. Bundle Size Optimization**

```typescript
// ✅ Tree shaking friendly imports
import { specificFunction } from "@utils/specificUtils";

// ✅ Code splitting and dynamic imports
const loadFeatureModule = async () => {
	const { FeatureComponent } = await import("@features/AdvancedFeature");
	return FeatureComponent;
};

// ✅ Conditional imports based on platform
const PlatformSpecificModule = Platform.select({
	ios: () => require("@modules/ios/SpecificModule"),
	android: () => require("@modules/android/SpecificModule"),
	default: () => require("@modules/common/DefaultModule"),
})();

// Instead of: import * as utils from '@utils/allUtils';
```

#### **Memory Management**

- **Clean up subscriptions** in useEffect
- **Remove event listeners** on unmount
- **Optimize image loading** and caching
- **Monitor memory usage** in development

```typescript
// ✅ Proper cleanup
useEffect(() => {
	const subscription = BackgroundTimer.setInterval(() => {
		// Timer logic
	}, 1000);

	return () => {
		BackgroundTimer.clearInterval(subscription);
	};
}, []);
```

## 🆕 Feature Implementation Guide

### **Step 1: Planning & Design**

1. **Define Requirements**
    - Identify user stories and acceptance criteria
    - Determine if feature needs native or web implementation
    - Plan API integration requirements
    - Consider offline functionality needs

2. **Create Technical Specification**
    - Define data models and interfaces
    - Plan component hierarchy
    - Identify state management needs
    - Design API contracts

### **Step 2: Environment Setup**

```bash
# 1. Create feature branch
git checkout -b feature/new-feature-name

# 2. Install dependencies (if needed)
yarn add package-name

# 3. Update environment configurations
# Add any new environment variables to .env files
```

### **Step 3: Implementation Steps**

#### **For Native Features:**

1. **Create Type Definitions**

```typescript
// src/interface/newFeature.interface.ts
export interface NewFeatureData {
	id: string;
	title: string;
	description: string;
	createdAt: string;
}

export interface NewFeatureState {
	data: NewFeatureData[];
	loading: boolean;
	error?: string;
}
```

2. **Create Redux Slice**

```typescript
// src/redux/slices/newFeature.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NewFeatureState = {
	data: [],
	loading: false,
	error: undefined,
};

export const newFeatureSlice = createSlice({
	name: "newFeature",
	initialState,
	reducers: {
		fetchData: (state) => {
			state.loading = true;
			state.error = undefined;
		},
		setData: (state, action: PayloadAction<NewFeatureData[]>) => {
			state.data = action.payload;
			state.loading = false;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});
```

3. **Create GraphQL Operations**

```typescript
// src/graphql/query/newFeature/getNewFeatureData.ts
import { gql } from "@apollo/client";

export const GET_NEW_FEATURE_DATA = gql`
	query GetNewFeatureData($filters: FeatureFilters) {
		newFeatureData(filters: $filters) {
			id
			title
			description
			createdAt
		}
	}
`;

export interface GetNewFeatureDataVariables {
	filters?: FeatureFilters;
}
```

4. **Create Custom Hooks**

```typescript
// src/hooks/useNewFeature.ts
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

export const useNewFeature = () => {
	const dispatch = useDispatch();
	const { data, loading, error } = useSelector((state) => state.newFeature);

	const { refetch } = useQuery(GET_NEW_FEATURE_DATA, {
		onCompleted: (result) => {
			dispatch(newFeatureSlice.actions.setData(result.newFeatureData));
		},
		onError: (error) => {
			dispatch(newFeatureSlice.actions.setError(error.message));
		},
	});

	const refreshData = useCallback(() => {
		dispatch(newFeatureSlice.actions.fetchData());
		refetch();
	}, [dispatch, refetch]);

	return {
		data,
		loading,
		error,
		refreshData,
	};
};
```

5. **Create Components**

```typescript
// src/components/NewFeature/NewFeatureCard.tsx
interface NewFeatureCardProps {
  item: NewFeatureData;
  onPress: (item: NewFeatureData) => void;
}

const NewFeatureCard = memo(({ item, onPress }: NewFeatureCardProps) => {
  const handlePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );
});
```

6. **Create Screen**

```typescript
// src/screens/NewFeatureScreen/index.tsx
const BodyComponent = () => {
  const { data, loading, refreshData } = useNewFeature();

  const handleItemPress = useCallback((item: NewFeatureData) => {
    // Handle item selection
    navigation.navigate('NewFeatureDetail', { item });
  }, [navigation]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => (
        <NewFeatureCard item={item} onPress={handleItemPress} />
      )}
      estimatedItemSize={100}
      onRefresh={refreshData}
      refreshing={loading}
    />
  );
};

const MemoizedBodyComponent = memo(BodyComponent);

const NewFeatureScreen = () => (
  <WithHeaderLxp
    BodyComponent={MemoizedBodyComponent}
    title="New Feature"
    showBack
  />
);
```

#### **For WebView Features:**

1. **Create Web Integration Utilities**

```typescript
// src/utils/newFeatureWeb.utils.ts
export const handleNewFeatureWebEvents = (eventData: any) => {
	switch (eventData.type) {
		case "NEW_FEATURE_ACTION":
			// Handle web-to-native communication
			break;
		default:
			break;
	}
};
```

2. **Create WebView Screen**

```typescript
// src/screens/Web/NewFeatureWebScreen.tsx
const BodyComponent = () => {
  const webViewRef = useRef<WebView | null>(null);

  const onMessage = useCallback((event: WebViewMessageEvent) => {
    const eventData = JSON.parse(event.nativeEvent.data);
    handleNewFeatureWebEvents(eventData);
  }, []);

  const customJs = `
    // Custom JavaScript for web integration
    window.nativeApp = {
      sendEvent: (type, data) => {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }));
      }
    };
  `;

  return (
    <Webview
      webViewRef={webViewRef}
      url={`${ENV.webAppUrl}/new-feature`}
      onMessage={onMessage}
      customJs={customJs}
    />
  );
};
```

### **Step 4: Navigation Integration**

```typescript
// Add to navigation stacks
// src/routes/stacks/homeStackNavigation.tsx
<Stack.Screen
  name="NewFeatureScreen"
  component={NewFeatureScreen}
  options={{ title: 'New Feature' }}
/>
```

### **Step 5: Testing**

1. **Unit Tests**

```typescript
// __tests__/components/NewFeatureCard.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import NewFeatureCard from '@components/NewFeature/NewFeatureCard';

describe('NewFeatureCard', () => {
  it('renders correctly', () => {
    const mockItem = { id: '1', title: 'Test', description: 'Test desc' };
    const mockOnPress = jest.fn();

    const { getByText } = render(
      <NewFeatureCard item={mockItem} onPress={mockOnPress} />
    );

    expect(getByText('Test')).toBeTruthy();
  });
});
```

2. **Integration Tests**

```typescript
// __tests__/hooks/useNewFeature.test.tsx
import { renderHook, waitFor } from "@testing-library/react-native";

import { useNewFeature } from "@hooks/useNewFeature";

describe("useNewFeature", () => {
	it("fetches data successfully", async () => {
		const { result } = renderHook(() => useNewFeature());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.data).toBeDefined();
		});
	});
});
```

### **Step 6: Documentation**

1. **Update Type Definitions**
2. **Add JSDoc Comments**
3. **Update Navigation Types**
4. **Document API Integration**

### **⚠️ Critical Guidelines & Precautions**

#### **Performance Considerations**

- **Monitor bundle size** - avoid adding heavy dependencies
- **Implement code splitting** for large features
- **Use React optimization patterns** (memo, useCallback, useMemo)
- **Optimize images** and assets

#### **Security Checklist**

- [ ] Validate all user inputs
- [ ] Secure API communications
- [ ] Handle sensitive data properly
- [ ] Implement proper error boundaries

#### **Testing Requirements**

- [ ] Unit tests for business logic
- [ ] Component tests for UI
- [ ] Integration tests for data flow
- [ ] E2E tests for critical user paths

#### **Code Review Checklist**

- [ ] Follow naming conventions
- [ ] Implement proper TypeScript types
- [ ] Add error handling
- [ ] Optimize performance
- [ ] Add documentation
- [ ] Test coverage > 80%

## 🌐 WebView vs Native Components

### **When to Use WebView Implementation**

#### **✅ Use WebView For:**

- **Complex forms** with dynamic validation
- **Rich text editors** and content creation
- **Third-party integrations** (payment gateways, social login)
- **Frequently changing UI** that needs rapid updates
- **Web-based tools** and utilities
- **Content that exists on web** and needs consistency

#### **WebView Implementation Pattern:**

```typescript
// Reference: LoginScreen implementation
const WebViewScreen = () => {
  const webViewRef = useRef<WebView | null>(null);

  // Custom JavaScript injection
  const customJs = `
    document.documentElement.style.overscrollBehavior = 'none';
    window.nativeApp = {
      sendMessage: (data) => {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }
    };
  `;

  // Handle messages from web
  const onMessage = useCallback((event: WebViewMessageEvent) => {
    handleWebEvents({
      webViewRef,
      eventData: JSON.parse(event.nativeEvent.data),
    });
  }, []);

  return (
    <Webview
      webViewRef={webViewRef}
      url={ENV.webUrl}
      onMessage={onMessage}
      customJs={customJs}
    />
  );
};
```

#### **WebView Communication Events:**

```typescript
// Web-to-Native Communication
export const WEB_EVENTS = {
	OPEN_PAGE_PATH: "open_page_path", // Navigate to specific page
	SHARE_PAGE: "share_page", // Share content
	OPEN_EXTERNAL_LINK: "open_external_link", // Open external URLs
	SEND_AUTH_TOKEN: "send_auth_token", // Authentication
	DOWNLOAD_FILE: "download_file", // File downloads
} as const;

// Usage in web content
window.nativeApp.sendMessage({
	type: "OPEN_PAGE_PATH",
	data: { path: "/courses", title: "Courses" },
});
```

### **When to Use Native Implementation**

#### **✅ Use Native For:**

- **Performance-critical features** (video playback, animations)
- **Device hardware access** (camera, sensors, file system)
- **Complex touch interactions** and gestures
- **Offline-first functionality**
- **Platform-specific UI patterns**
- **Real-time features** (chat, live updates)

#### **Native Implementation Pattern:**

```typescript
// Reference: MyProfileScreen implementation
const NativeScreen = () => {
  // Separate business logic into custom hooks
  const { data, loading, handlers } = useScreenController();

  // Memoize expensive computations
  const processedData = useMemo(() => {
    return processComplexData(data);
  }, [data]);

  // Handle loading states
  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <View style={styles.container}>
      <NativeHeaderComponent />
      <ScrollView>
        {processedData.map((item) => (
          <NativeListItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

// Wrap with HOC for consistent styling
const MemoizedNativeScreen = memo(NativeScreen);
const Screen = () => (
  <WithHeaderLxp
    BodyComponent={MemoizedNativeScreen}
    showBack
    title="Native Screen"
  />
);
```

### **Hybrid Approach - Best of Both Worlds**

#### **Smart Component Composition:**

```typescript
const HybridScreen = () => {
  const [viewMode, setViewMode] = useState<'native' | 'web'>('native');

  return (
    <View style={styles.container}>
      {/* Native header for consistent navigation */}
      <NativeHeader onToggleView={() => setViewMode(prev =>
        prev === 'native' ? 'web' : 'native'
      )} />

      {/* Conditional rendering based on requirements */}
      {viewMode === 'native' ? (
        <NativeContent />
      ) : (
        <WebViewContent />
      )}
    </View>
  );
};
```

### **Performance Comparison**

| Feature                  | Native       | WebView     | Recommendation                  |
| ------------------------ | ------------ | ----------- | ------------------------------- |
| **Startup Time**         | ⚡ Fast      | 🐌 Slower   | Native for critical paths       |
| **Memory Usage**         | 📱 Efficient | 🔋 Higher   | Native for resource-intensive   |
| **Development Speed**    | 🔧 Moderate  | ⚡ Fast     | WebView for rapid prototyping   |
| **Platform Consistency** | 🎯 Perfect   | ⚠️ Variable | Native for platform-specific UI |
| **Update Flexibility**   | 📱 App Store | 🌐 Instant  | WebView for frequent changes    |
| **Offline Support**      | ✅ Full      | ❌ Limited  | Native for offline features     |

## 🛠️ Environment Setup

### **Prerequisites**

- **Node.js**: >= 18.0.0
- **Yarn**: >= 1.22.0
- **React Native CLI**: Latest version
- **iOS**: Xcode 14+ (for iOS development)
- **Android**: Android Studio with SDK 31+ (for Android development)

### **Installation Steps**

```bash
# 1. Clone the repository
git clone <repository-url>
cd lex-mobile-app

# 2. Install dependencies
yarn install

# 3. Install Husky for pre-commit hooks
npx husky install

# 4. iOS Setup (macOS only)
cd ios && pod install && cd ..

# 5. Environment Configuration
cp .env.example .env.stage
cp .env.example .env.prod

# 6. Configure environment variables
# Edit .env.stage and .env.prod with appropriate values
```

### **Environment Variables**

```env
# .env.stage / .env.prod
ENV=stage
APP_BUNDLE_ID=com.upgrad.lexapp.stage
KEYCLOAK_REALM=upgrad-kh
RUDDER_STACK_KEY=your_rudder_stack_key
BRIGHTCOVE_ACCOUNT_ID=your_brightcove_account
CODEPUSH_KEY_IOS=your_codepush_key
PREFIXES_URL=khprismapp://
```

### **Development Scripts**

```bash
# Development
yarn start                    # Start Metro bundler
yarn android                  # Run on Android (staging)
yarn ios                      # Run on iOS (staging)

# Environment-specific builds
yarn android:stage           # Android staging
yarn android:prod           # Android production
yarn ios:stage              # iOS staging
yarn ios:prod               # iOS production

# Maintenance
yarn reset                   # Reset node_modules and reinstall
yarn clean:android          # Clean Android build
yarn clean:ios              # Clean iOS build and reinstall pods
yarn pod-install            # Install iOS dependencies

# Code Quality
yarn lint                    # Run ESLint
yarn prettier-format        # Format code with Prettier
yarn test                   # Run tests
```

## 🎨 Figma Integration

This project supports automatic Figma design implementation using [Framelink MCP](https://www.framelink.ai/docs/quickstart?utm_source=github&utm_medium=referral&utm_campaign=readme).

### **Quick Setup**

```bash
# Run the interactive setup script
npm run figma:setup
```

The setup script (`scripts/figma/setup.js`) will:

1. Guide you through getting your Figma access token
2. Directly configure Cursor MCP integration with your token
3. Set up everything in one step for immediate use

### **Manual Setup (Alternative)**

If you prefer manual setup, you can directly edit `.cursor/mcp_servers.json`:

1. **Get Figma Token**:
    - Go to Figma → Profile → Settings → Security tab
    - Generate a new personal access token
    - Enable "File content" and "Dev resources" permissions

2. **Configure Cursor**:

    ```bash
    mkdir -p .cursor
    # Edit .cursor/mcp_servers.json (see scripts/figma/README.md for format)
    # Restart Cursor
    ```

### **Usage**

1. **Copy Figma Link**: Right-click on any Figma frame/group → Copy/Paste as → Copy link
2. **Generate Code**: In Cursor, prompt the AI:
    ```
    "Implement this Figma frame: [paste link here]"
    ```
3. **AI Implementation**: The AI will automatically fetch design data and generate React Native components

### **Management Commands**

```bash
# Check integration status
npm run figma:status

# Temporarily disable integration
npm run figma:disable

# Re-enable integration
npm run figma:enable
```

### **Features**

- 🎯 **Direct Integration**: Works seamlessly with Cursor's AI
- 🔒 **Secure**: Tokens stored locally, never committed to git
- 🚀 **Fast Setup**: One command installation
- 👥 **Team Friendly**: Each developer uses their own token
- 📱 **React Native Optimized**: Generates mobile-ready components
- 🎨 **Design Accurate**: 90% data compression while maintaining fidelity

### **Example Workflow**

```typescript
// 1. Copy Figma link for a login screen design
// 2. Ask AI: "Implement this Figma frame as a React Native screen"
// Result: Complete LoginScreen component with:

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles automatically generated based on Figma design
const styles = StyleSheet.create({
  // ... responsive styles matching Figma specifications
});
```

## 🚀 Build & Deployment

### **CodePush Integration**

#### **Over-the-Air Updates**

```bash
# Release CodePush update
yarn code_push-standalone:release-OTA

# Create patch release
yarn code_push-standalone:patch

# View release history
yarn code_push-standalone:history
```

#### **CodePush Configuration**

```typescript
// App.tsx - CodePush setup
const codePushOptions = {
	checkFrequency: codePush.CheckFrequency.ON_APP_START,
	installMode: codePush.InstallMode.ON_NEXT_RESTART,
	mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
	minimumBackgroundDuration: 60 * 30, // 30 minutes
};

export default codePush(codePushOptions)(App);
```

### **Build Configurations**

#### **Android Build Variants**

```gradle
// android/app/build.gradle
android {
  flavorDimensions "version"
  productFlavors {
    stage {
      applicationIdSuffix ".stage"
      versionNameSuffix "-stage"
    }
    prod {
      // Production configuration
    }
  }
}
```

#### **iOS Schemes**

- **lexMobileAppStage**: Staging configuration
- **lexMobileApp**: Production configuration

### **Release Process**

1. **Pre-release Checklist**
    - [ ] Update version numbers
    - [ ] Test on multiple devices
    - [ ] Verify API integrations
    - [ ] Check performance metrics
    - [ ] Validate analytics tracking

2. **Build Commands**

```bash
# Android AAB for Play Store
yarn android:stage.build_aab    # Staging
yarn android:prod.build_aab     # Production

# iOS Archive for App Store
# Use Xcode for iOS archiving and distribution
```

## 🧪 Testing Guidelines

### **Testing Strategy**

- **Unit Tests**: Business logic and utilities
- **Component Tests**: UI components and interactions
- **Integration Tests**: Data flow and API integrations
- **E2E Tests**: Critical user journeys

### **Testing Setup**

```json
// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testMatch: ['**/__tests__/**/*.test.{js,jsx,ts,tsx}'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### **Test Examples**

```typescript
// Component Test
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '@redux/store/store';

const renderWithStore = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

// Hook Test
import { renderHook, act } from '@testing-library/react-hooks';
import { useMyProfileScreenController } from '../useMyProfileScreenController';

describe('useMyProfileScreenController', () => {
  it('should handle logout correctly', async () => {
    const { result } = renderHook(() => useMyProfileScreenController());

    act(() => {
      result.current.handleLogout();
    });

    // Assert logout behavior
  });
});
```

## ⚡ Performance Best Practices

### **React Native Optimization**

#### **List Performance**

```typescript
// Use FlashList for better performance
import { FlashList } from '@shopify/flash-list';

const OptimizedList = ({ data }: { data: Item[] }) => {
  const renderItem = useCallback(({ item }: { item: Item }) => (
    <ItemComponent key={item.id} item={item} />
  ), []);

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      estimatedItemSize={100}
      getItemType={(item) => item.type} // For heterogeneous lists
    />
  );
};
```

#### **Image Optimization**

```typescript
// Use React Native's Image component for better performance
import { Image } from 'react-native';

const OptimizedImage = ({ source, style }: ImageProps) => (
  <Image
    source={{ uri: source }}
    style={style}
    resizeMode="cover"
    fadeDuration={0} // Disable fade animation for better performance
  />
);
```

#### **Memory Management**

```typescript
// Proper cleanup in useEffect
useEffect(() => {
	const timer = BackgroundTimer.setInterval(() => {
		// Timer logic
	}, 1000);

	return () => {
		BackgroundTimer.clearInterval(timer);
	};
}, []);

// Memoization for expensive calculations
const expensiveValue = useMemo(() => {
	return computeExpensiveValue(data);
}, [data]);
```

### **Bundle Optimization**

- **Code Splitting**: Organize code into logical chunks for efficient loading
- **Asset Optimization**: Compress images and use appropriate formats
- **Dependency Analysis**: Remove unused dependencies

## 🔒 Security Guidelines

### **Data Protection**

```typescript
// Secure storage using MMKV
import { storage } from "@config/mmkvStorage";

// Store sensitive data securely
const storeSecureData = (key: string, value: any) => {
	storage.set(key, JSON.stringify(value));
};

// Retrieve and validate data
const getSecureData = (key: string) => {
	try {
		const data = storage.getString(key);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.error("Failed to retrieve secure data", error);
		return null;
	}
};
```

### **Network Security**

```typescript
// Certificate pinning and secure headers
const apolloClient = new ApolloClient({
	link: ApolloLink.from([
		authLink,
		errorLink,
		new HttpLink({
			uri: ENV.endpoint,
			credentials: "same-origin",
		}),
	]),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			errorPolicy: "all",
		},
	},
});
```

### **Input Validation**

```typescript
// Validate and sanitize inputs
const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email.trim());
};

const sanitizeInput = (input: string): string => {
	return input.trim().replace(/[<>]/g, "");
};
```

## 🐛 Troubleshooting

### **Common Issues & Solutions**

#### **Environment Issues**

```bash
# Issue: Environment not updating
# Solution: Clean builds and reset
yarn clean:android
yarn clean:ios
yarn reset
```

#### **iOS Build Issues**

```bash
# Issue: Pod installation failures
cd ios
rm -rf Pods Podfile.lock
pod install

# Issue: Derived data issues
rm -rf ~/Library/Developer/Xcode/DerivedData
```

#### **Android Build Issues**

```bash
# Issue: Gradle build failures
cd android
./gradlew clean
rm -rf app/build

# Issue: Metro bundler cache
yarn start --reset-cache
```

#### **Performance Issues**

- **Enable Flipper** for debugging in development
- **Use performance profiler** to identify bottlenecks
- **Monitor memory usage** and optimize accordingly

### **Debug Tools**

- **Flipper**: Network inspection, Redux state, layout debugging
- **React DevTools**: Component hierarchy and state inspection
- **Chrome DevTools**: JavaScript debugging and profiling

### **Logging & Monitoring**

```typescript
// Error tracking with Crashlytics
import crashlytics from "@react-native-firebase/crashlytics";

const logError = (error: Error, context?: string) => {
	if (__DEV__) {
		console.error(error);
	} else {
		crashlytics().recordError(error);
		if (context) {
			crashlytics().log(context);
		}
	}
};
```

---

## 🤝 Contributing

Please read our contributing guidelines and ensure all pull requests follow the established patterns and pass the required tests.

## 📄 License

This project is proprietary software owned by upGrad Education Private Limited.

---

**Happy Coding! 🚀**
