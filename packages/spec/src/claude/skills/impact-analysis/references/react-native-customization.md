# React Native Customization - Impact Analysis

Hướng dẫn customize Impact Analysis cho React Native projects.

## React Native Project Structure

### Typical Structure
```
thanksgift-react-native/
├── src/
│   ├── components/          # React components
│   ├── screens/             # Screen components
│   ├── navigation/          # React Navigation
│   ├── services/            # API services
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utilities
│   ├── store/               # State management (Redux/Zustand/Context)
│   ├── types/               # TypeScript types
│   ├── assets/              # Images, fonts
│   └── constants/           # Constants
├── android/                 # Android native code
├── ios/                     # iOS native code
├── App.tsx                  # Root component
├── package.json
└── tsconfig.json
```

## Feature Mapping for React Native

### Pattern-Based Detection

| File Pattern | Feature | User Actions |
|-------------|---------|--------------|
| `**/screens/Auth/**`, `**/screens/Login/**` | Authentication & Login | Login, Logout, Sign Up, Password Reset, Biometric Auth |
| `**/screens/Profile/**`, `**/screens/User/**` | User Profile | View Profile, Edit Profile, Upload Avatar, Change Settings |
| `**/screens/Home/**`, `**/screens/Feed/**` | Home Feed | View Feed, Refresh, Pull to Refresh, Infinite Scroll |
| `**/screens/Product/**`, `**/screens/Item/**` | Product/Item Display | View Details, Add to Cart, Share, Favorite |
| `**/screens/Cart/**`, `**/screens/Checkout/**` | Shopping Cart | Add Item, Remove Item, Update Quantity, Checkout |
| `**/screens/Payment/**` | Payment | Select Payment Method, Process Payment, View Receipt |
| `**/screens/Order/**` | Order Management | View Orders, Track Order, Cancel Order |
| `**/navigation/**` | Navigation | Navigate Between Screens, Deep Linking, Tab Navigation |
| `**/services/api/**` | API Integration | Fetch Data, Post Data, Handle Errors, Retry Logic |
| `**/store/**`, `**/context/**` | State Management | Update State, Subscribe to Changes, Persist State |
| `**/hooks/use***` | Custom Hooks | Reusable Logic, Side Effects, State Management |
| `**/components/Button/**`, `**/components/Input/**` | UI Components | User Interaction, Form Input, Validation |
| `**/utils/storage/**` | Local Storage | Save Data, Load Data, Clear Data (AsyncStorage) |
| `**/utils/notification/**` | Push Notifications | Send Notification, Handle Notification, Request Permission |
| `**/utils/camera/**`, `**/utils/image/**` | Camera/Image | Take Photo, Pick Image, Upload Image |
| `**/utils/location/**` | Location Services | Get Location, Track Location, Request Permission |
| `**/android/**`, `**/ios/**` | Native Code | Native Modules, Permissions, Platform-Specific |

### Content-Based Detection

| Keywords | Feature | User Actions |
|----------|---------|--------------|
| `AsyncStorage`, `@react-native-async-storage` | Local Storage | Save, Load, Clear Data |
| `react-navigation`, `useNavigation`, `navigate` | Navigation | Navigate, Go Back, Reset Stack |
| `fetch`, `axios`, `api.` | API Calls | Fetch Data, Post Data, Handle Errors |
| `useState`, `useEffect`, `useContext` | State Management | Update State, Side Effects |
| `redux`, `useDispatch`, `useSelector` | Redux State | Dispatch Actions, Select State |
| `zustand`, `create` | Zustand Store | Update Store, Subscribe |
| `Camera`, `ImagePicker`, `launchCamera` | Camera/Image | Take Photo, Pick Image |
| `Geolocation`, `getCurrentPosition` | Location | Get Location, Track |
| `PushNotification`, `messaging` | Notifications | Send, Receive, Handle |
| `Linking`, `openURL` | Deep Linking | Open URL, Handle Deep Link |
| `PermissionsAndroid`, `request` | Permissions | Request, Check Permission |
| `Platform.OS`, `Platform.select` | Platform-Specific | iOS/Android Differences |
| `Animated`, `useAnimatedStyle` | Animations | Animate Views, Gestures |
| `FlatList`, `ScrollView`, `renderItem` | Lists | Render List, Scroll, Refresh |

## React Native Specific Edge Cases

### 1. Platform-Specific Issues

```typescript
// ❌ Not handling platform differences
const styles = StyleSheet.create({
  container: {
    paddingTop: 20 // Wrong on iOS with notch
  }
});

// ✅ Platform-specific handling
import { Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
  }
});
```

**Check:**
- [ ] Platform.OS checks for iOS/Android differences
- [ ] SafeAreaView for notch/home indicator
- [ ] StatusBar height handling
- [ ] Platform-specific permissions

### 2. AsyncStorage Issues

```typescript
// ❌ Not handling async errors
const data = await AsyncStorage.getItem('user');
const user = JSON.parse(data);

// ✅ Proper error handling
try {
  const data = await AsyncStorage.getItem('user');
  const user = data ? JSON.parse(data) : null;
  return user;
} catch (error) {
  console.error('AsyncStorage error:', error);
  return null;
}
```

**Check:**
- [ ] Try-catch for AsyncStorage operations
- [ ] Null checks before JSON.parse
- [ ] Storage quota limits
- [ ] Migration for storage schema changes

### 3. Navigation Issues

```typescript
// ❌ Navigation without safety checks
navigation.navigate('Profile', { userId: user.id });

// ✅ Safe navigation
if (navigation.canGoBack()) {
  navigation.goBack();
} else {
  navigation.navigate('Home');
}

// Check if user exists
if (user?.id) {
  navigation.navigate('Profile', { userId: user.id });
}
```

**Check:**
- [ ] Navigation params validation
- [ ] canGoBack() before goBack()
- [ ] Deep link handling
- [ ] Navigation state persistence

### 4. Image/Camera Issues

```typescript
// ❌ Not handling permissions
const result = await ImagePicker.launchCamera();

// ✅ Request permissions first
import { PermissionsAndroid, Platform } from 'react-native';

async function takePhoto() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission denied');
      return;
    }
  }
  
  const result = await ImagePicker.launchCamera();
  if (!result.cancelled) {
    // Handle image
  }
}
```

**Check:**
- [ ] Permission requests before camera/gallery
- [ ] Handle permission denied
- [ ] Image size limits
- [ ] Image compression
- [ ] Upload error handling

### 5. FlatList Performance

```typescript
// ❌ No optimization
<FlatList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
/>

// ✅ Optimized
<FlatList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item) => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
  initialNumToRender={10}
/>
```

**Check:**
- [ ] keyExtractor provided
- [ ] getItemLayout for fixed height items
- [ ] removeClippedSubviews enabled
- [ ] Pagination for large lists
- [ ] Memoized renderItem

### 6. State Management Issues

```typescript
// ❌ Direct state mutation
const [user, setUser] = useState({ name: 'John' });
user.name = 'Jane'; // Wrong!

// ✅ Immutable updates
setUser({ ...user, name: 'Jane' });

// ❌ Missing cleanup
useEffect(() => {
  const subscription = api.subscribe();
  // Missing cleanup!
}, []);

// ✅ Proper cleanup
useEffect(() => {
  const subscription = api.subscribe();
  return () => subscription.unsubscribe();
}, []);
```

**Check:**
- [ ] Immutable state updates
- [ ] useEffect cleanup functions
- [ ] Dependency arrays correct
- [ ] Avoid infinite loops

### 7. API/Network Issues

```typescript
// ❌ No timeout or retry
const response = await fetch(url);

// ✅ Timeout and retry logic
const fetchWithTimeout = async (url, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};
```

**Check:**
- [ ] Network timeout handling
- [ ] Retry logic for failed requests
- [ ] Offline mode handling
- [ ] Loading states
- [ ] Error messages user-friendly

## React Native Test Scenarios

### Template: Navigation Test

```markdown
## Test Scenario: Screen Navigation

**Objective:** Verify navigation works correctly

**Preconditions:**
- App launched
- User logged in (if required)

**Test Steps:**
1. Tap on {button/tab}
2. Verify screen transition
3. Verify screen content loaded
4. Tap back button
5. Verify returned to previous screen

**Expected Results:**
- Smooth transition animation
- No white flash
- Content loads within 2 seconds
- Back button works correctly
- Navigation state preserved

**Edge Cases:**
- Deep link navigation
- Navigation with params
- Navigation when offline
- Rapid taps (debouncing)

**Platforms:**
- [ ] iOS
- [ ] Android
```

### Template: Permission Test

```markdown
## Test Scenario: Camera Permission

**Objective:** Verify camera permission flow

**Preconditions:**
- App installed fresh (no permissions granted)

**Test Steps:**
1. Tap "Take Photo" button
2. Observe permission dialog
3. Grant permission
4. Verify camera opens
5. Take photo
6. Verify photo saved

**Expected Results:**
- Permission dialog shows
- Clear explanation why permission needed
- Camera opens after grant
- Photo captured successfully
- Photo displayed in app

**Edge Cases:**
- Permission denied
- Permission denied permanently (iOS)
- Permission revoked in settings
- Camera not available (simulator)

**Platforms:**
- [ ] iOS (different permission flow)
- [ ] Android (runtime permissions)
```

### Template: Offline Mode Test

```markdown
## Test Scenario: Offline Functionality

**Objective:** Verify app works offline

**Preconditions:**
- App has cached data
- Network connected initially

**Test Steps:**
1. Load screen with data
2. Turn off network (Airplane mode)
3. Navigate to different screens
4. Try to refresh data
5. Turn on network
6. Verify data syncs

**Expected Results:**
- Cached data displays offline
- Clear "offline" indicator shown
- Actions queued for later sync
- No crashes when offline
- Data syncs when online

**Edge Cases:**
- No cached data
- Partial sync failures
- Network switches during request
- Long offline period

**Platforms:**
- [ ] iOS
- [ ] Android
```

## Customization for thanksgift-react-native

### 1. Update Feature Mapping

Based on your project structure, update patterns in:
- `references/change-detection.md`
- Add React Native specific patterns

### 2. Add React Native Edge Cases

Add to `references/edge-case-identification.md`:
- Platform-specific issues
- AsyncStorage issues
- Navigation issues
- Permission issues
- Image/Camera issues
- FlatList performance

### 3. Add React Native Test Templates

Add to `references/test-scenario-generation.md`:
- Navigation tests
- Permission tests
- Offline mode tests
- Platform-specific tests

### 4. Create Custom Config (Optional)

Create `impact-analysis.config.js` in project root:

```javascript
module.exports = {
  // Custom feature patterns
  featurePatterns: {
    'Gift Management': ['**/screens/Gift/**', '**/services/gift/**'],
    'Thank You Cards': ['**/screens/ThankYou/**', '**/components/Card/**'],
    'User Profile': ['**/screens/Profile/**', '**/services/user/**'],
  },
  
  // Custom edge case checks
  edgeCaseChecks: [
    'AsyncStorage operations',
    'Platform.OS checks',
    'Permission requests',
    'Image upload size limits',
    'Navigation param validation',
  ],
  
  // Test priorities
  testPriorities: {
    'Gift creation': 'P0',
    'Thank you sending': 'P0',
    'Profile update': 'P1',
    'Settings': 'P2',
  }
};
```

## Implementation Steps

### Step 1: Analyze Project Structure

```bash
# Navigate to project
cd /Users/luutrungnghia/Desktop/thanksgift-react-native

# Check structure
ls -la src/

# Check dependencies
cat package.json | grep -A 20 "dependencies"
```

### Step 2: Identify Key Features

Look for:
- Main screens (src/screens/)
- API services (src/services/)
- State management (src/store/ or src/context/)
- Navigation structure (src/navigation/)
- Custom hooks (src/hooks/)

### Step 3: Customize Feature Patterns

Update patterns based on actual structure:
- Gift-related features
- Thank you card features
- User management
- Notification features
- Payment features (if any)

### Step 4: Add Project-Specific Edge Cases

Common for gift apps:
- Image upload for gift photos
- Push notifications for thank you reminders
- Offline gift creation
- Payment processing
- Social sharing

### Step 5: Create Test Scenarios

Focus on:
- Gift creation flow
- Thank you card sending
- Image upload
- Notifications
- Offline mode

## Next Steps

1. **Share project structure** - Copy project to workspace or share structure
2. **Identify key features** - List main features of thanksgift app
3. **Customize patterns** - Update feature mapping for your app
4. **Add edge cases** - Add gift-app specific edge cases
5. **Create test templates** - Create test scenarios for key flows

Would you like me to:
- Analyze specific parts of your project?
- Create custom feature patterns?
- Generate test scenarios for specific features?
