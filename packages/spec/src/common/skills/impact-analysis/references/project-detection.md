# Project Detection - Auto-Adapt Impact Analysis

System to automatically detect and adapt Impact Analysis for different project types.

## Project Type Detection

### Detection Strategy

```javascript
// Auto-detect project type from files and dependencies
function detectProjectType(projectPath) {
  const indicators = {
    'react-native': [
      'package.json contains react-native',
      'android/ and ios/ folders exist',
      'App.tsx or App.js exists',
      'metro.config.js exists'
    ],
    'react-web': [
      'package.json contains react and react-dom',
      'src/index.tsx or src/index.js',
      'public/index.html',
      'No android/ios folders'
    ],
    'nextjs': [
      'package.json contains next',
      'pages/ or app/ folder',
      'next.config.js'
    ],
    'vue': [
      'package.json contains vue',
      'src/main.js or src/main.ts',
      'vue.config.js or vite.config.js'
    ],
    'angular': [
      'package.json contains @angular',
      'angular.json',
      'src/app/'
    ],
    'nodejs-api': [
      'package.json contains express or fastify or koa',
      'No frontend framework',
      'src/routes/ or src/api/'
    ],
    'nestjs': [
      'package.json contains @nestjs',
      'nest-cli.json',
      'src/main.ts'
    ],
    'python-django': [
      'requirements.txt or Pipfile',
      'manage.py',
      'settings.py'
    ],
    'python-fastapi': [
      'requirements.txt contains fastapi',
      'main.py with FastAPI'
    ],
    'laravel': [
      'composer.json contains laravel',
      'artisan',
      'app/Http/'
    ],
    'rails': [
      'Gemfile contains rails',
      'config/routes.rb',
      'app/controllers/'
    ]
  };
  
  // Check each indicator
  for (const [type, checks] of Object.entries(indicators)) {
    if (allChecksPass(checks, projectPath)) {
      return type;
    }
  }
  
  return 'generic';
}
```

## Project Profiles

### Profile Structure

```javascript
// Each project type has a profile
const projectProfiles = {
  'react-native': {
    name: 'React Native',
    description: 'Mobile app with React Native',
    
    // File patterns
    patterns: {
      backend: ['**/services/**', '**/api/**', '**/utils/**'],
      frontend: ['**/screens/**', '**/components/**', '**/navigation/**'],
      state: ['**/store/**', '**/context/**', '**/hooks/**'],
      config: ['**/*.config.js', '**/app.json', '**/package.json'],
      native: ['**/android/**', '**/ios/**']
    },
    
    // Feature detection
    features: {
      'Authentication': {
        patterns: ['**/screens/Auth/**', '**/screens/Login/**', '**/services/auth/**'],
        keywords: ['login', 'signin', 'authenticate', 'token', 'session']
      },
      'Navigation': {
        patterns: ['**/navigation/**', '**/routes/**'],
        keywords: ['navigate', 'useNavigation', 'Stack.Screen', 'Tab.Screen']
      },
      'Storage': {
        patterns: ['**/utils/storage/**', '**/services/storage/**'],
        keywords: ['AsyncStorage', '@react-native-async-storage', 'MMKV']
      },
      'Camera/Image': {
        patterns: ['**/utils/camera/**', '**/utils/image/**'],
        keywords: ['ImagePicker', 'launchCamera', 'Camera', 'Photo']
      },
      'Notifications': {
        patterns: ['**/services/notification/**', '**/utils/notification/**'],
        keywords: ['PushNotification', 'messaging', 'FCM', 'notification']
      }
    },
    
    // Edge cases
    edgeCases: [
      {
        category: 'Platform-Specific',
        checks: [
          'Platform.OS checks for iOS/Android',
          'SafeAreaView usage',
          'StatusBar handling',
          'Permission flows (iOS vs Android)'
        ]
      },
      {
        category: 'AsyncStorage',
        checks: [
          'Try-catch wrappers',
          'Null checks before JSON.parse',
          'Storage quota limits',
          'Migration handling'
        ]
      },
      {
        category: 'Navigation',
        checks: [
          'Params validation',
          'canGoBack() checks',
          'Deep link handling',
          'State persistence'
        ]
      },
      {
        category: 'Performance',
        checks: [
          'FlatList optimization (keyExtractor, getItemLayout)',
          'Image optimization',
          'Memory leaks (useEffect cleanup)',
          'Re-render optimization (useMemo, useCallback)'
        ]
      }
    ],
    
    // Test priorities
    testPriorities: {
      'Authentication': 'P0',
      'Core Features': 'P0',
      'Navigation': 'P1',
      'UI Components': 'P1',
      'Settings': 'P2'
    }
  },
  
  'react-web': {
    name: 'React Web App',
    description: 'Web application with React',
    
    patterns: {
      backend: ['**/services/**', '**/api/**', '**/utils/**'],
      frontend: ['**/pages/**', '**/components/**', '**/routes/**'],
      state: ['**/store/**', '**/context/**', '**/hooks/**'],
      config: ['**/*.config.js', '**/package.json'],
      styles: ['**/*.css', '**/*.scss', '**/*.module.css']
    },
    
    features: {
      'Authentication': {
        patterns: ['**/pages/auth/**', '**/components/Auth/**', '**/services/auth/**'],
        keywords: ['login', 'signin', 'authenticate', 'token', 'session']
      },
      'Routing': {
        patterns: ['**/routes/**', '**/router/**'],
        keywords: ['Route', 'useNavigate', 'useLocation', 'BrowserRouter']
      },
      'Forms': {
        patterns: ['**/components/Form/**', '**/pages/**/Form/**'],
        keywords: ['useForm', 'Formik', 'react-hook-form', 'validation']
      },
      'Data Fetching': {
        patterns: ['**/services/**', '**/api/**', '**/hooks/use*Query*'],
        keywords: ['fetch', 'axios', 'useQuery', 'useMutation', 'SWR']
      }
    },
    
    edgeCases: [
      {
        category: 'Browser Compatibility',
        checks: [
          'Cross-browser CSS',
          'Polyfills for older browsers',
          'Feature detection',
          'Graceful degradation'
        ]
      },
      {
        category: 'SEO',
        checks: [
          'Meta tags',
          'Server-side rendering',
          'Semantic HTML',
          'Accessibility (ARIA)'
        ]
      },
      {
        category: 'Performance',
        checks: [
          'Code splitting',
          'Lazy loading',
          'Image optimization',
          'Bundle size'
        ]
      }
    ],
    
    testPriorities: {
      'Authentication': 'P0',
      'Core Features': 'P0',
      'Forms': 'P1',
      'UI Components': 'P1',
      'SEO': 'P2'
    }
  },
  
  'nextjs': {
    name: 'Next.js',
    description: 'React framework with SSR/SSG',
    
    patterns: {
      backend: ['**/api/**', '**/lib/**', '**/utils/**'],
      frontend: ['**/pages/**', '**/app/**', '**/components/**'],
      state: ['**/store/**', '**/context/**', '**/hooks/**'],
      config: ['next.config.js', '**/package.json'],
      styles: ['**/*.css', '**/*.scss', '**/*.module.css']
    },
    
    features: {
      'API Routes': {
        patterns: ['**/pages/api/**', '**/app/api/**'],
        keywords: ['NextApiRequest', 'NextApiResponse', 'api handler']
      },
      'SSR/SSG': {
        patterns: ['**/pages/**', '**/app/**'],
        keywords: ['getServerSideProps', 'getStaticProps', 'generateStaticParams']
      },
      'Routing': {
        patterns: ['**/pages/**', '**/app/**'],
        keywords: ['useRouter', 'usePathname', 'useSearchParams']
      }
    },
    
    edgeCases: [
      {
        category: 'Hydration',
        checks: [
          'Server/client mismatch',
          'useEffect for client-only code',
          'Dynamic imports',
          'Hydration errors'
        ]
      },
      {
        category: 'Data Fetching',
        checks: [
          'getServerSideProps errors',
          'getStaticProps revalidation',
          'API route error handling',
          'Loading states'
        ]
      }
    ],
    
    testPriorities: {
      'API Routes': 'P0',
      'SSR Pages': 'P0',
      'Client Components': 'P1',
      'Static Pages': 'P2'
    }
  },
  
  'nodejs-api': {
    name: 'Node.js API',
    description: 'Backend API with Node.js',
    
    patterns: {
      backend: ['**/routes/**', '**/controllers/**', '**/services/**', '**/middleware/**'],
      database: ['**/models/**', '**/schemas/**', '**/migrations/**'],
      config: ['**/config/**', '**/*.config.js'],
      tests: ['**/*.test.js', '**/*.spec.js']
    },
    
    features: {
      'Authentication': {
        patterns: ['**/routes/auth/**', '**/middleware/auth/**', '**/services/auth/**'],
        keywords: ['jwt', 'passport', 'authenticate', 'authorize', 'token']
      },
      'Database': {
        patterns: ['**/models/**', '**/repositories/**'],
        keywords: ['mongoose', 'sequelize', 'prisma', 'typeorm', 'query']
      },
      'API Endpoints': {
        patterns: ['**/routes/**', '**/controllers/**'],
        keywords: ['router', 'app.get', 'app.post', 'express', 'fastify']
      }
    },
    
    edgeCases: [
      {
        category: 'Error Handling',
        checks: [
          'Try-catch in async routes',
          'Error middleware',
          'Validation errors',
          'Database errors'
        ]
      },
      {
        category: 'Security',
        checks: [
          'Input validation',
          'SQL injection prevention',
          'XSS prevention',
          'Rate limiting',
          'CORS configuration'
        ]
      },
      {
        category: 'Performance',
        checks: [
          'Database query optimization',
          'Caching strategy',
          'Connection pooling',
          'Memory leaks'
        ]
      }
    ],
    
    testPriorities: {
      'Authentication': 'P0',
      'Core API Endpoints': 'P0',
      'Database Operations': 'P0',
      'Middleware': 'P1',
      'Utilities': 'P2'
    }
  },
  
  'generic': {
    name: 'Generic Project',
    description: 'Auto-detected patterns',
    
    patterns: {
      backend: ['**/api/**', '**/services/**', '**/server/**'],
      frontend: ['**/components/**', '**/pages/**', '**/views/**'],
      database: ['**/models/**', '**/schemas/**', '**/migrations/**'],
      config: ['**/*.config.*', '**/package.json', '**/composer.json'],
      tests: ['**/*.test.*', '**/*.spec.*', '**/tests/**']
    },
    
    features: {
      // Auto-detect from file names and content
      'auto-detect': true
    },
    
    edgeCases: [
      {
        category: 'General',
        checks: [
          'Null/undefined handling',
          'Error handling',
          'Input validation',
          'Edge case boundaries'
        ]
      }
    ],
    
    testPriorities: {
      'Core Features': 'P0',
      'Secondary Features': 'P1',
      'Utilities': 'P2'
    }
  }
};
```

## Auto-Detection Algorithm

### Step 1: Detect Project Type

```bash
#!/bin/bash
# detect-project-type.sh

detect_project_type() {
  local project_path=$1
  
  # Check React Native
  if [ -f "$project_path/package.json" ] && \
     grep -q "react-native" "$project_path/package.json" && \
     [ -d "$project_path/android" ] && \
     [ -d "$project_path/ios" ]; then
    echo "react-native"
    return
  fi
  
  # Check Next.js
  if [ -f "$project_path/package.json" ] && \
     grep -q "next" "$project_path/package.json" && \
     [ -f "$project_path/next.config.js" ]; then
    echo "nextjs"
    return
  fi
  
  # Check React Web
  if [ -f "$project_path/package.json" ] && \
     grep -q "react" "$project_path/package.json" && \
     grep -q "react-dom" "$project_path/package.json" && \
     ! [ -d "$project_path/android" ]; then
    echo "react-web"
    return
  fi
  
  # Check Node.js API
  if [ -f "$project_path/package.json" ] && \
     (grep -q "express" "$project_path/package.json" || \
      grep -q "fastify" "$project_path/package.json") && \
     ! grep -q "react" "$project_path/package.json"; then
    echo "nodejs-api"
    return
  fi
  
  # Check Vue
  if [ -f "$project_path/package.json" ] && \
     grep -q "vue" "$project_path/package.json"; then
    echo "vue"
    return
  fi
  
  # Check Django
  if [ -f "$project_path/manage.py" ] && \
     [ -f "$project_path/requirements.txt" ]; then
    echo "python-django"
    return
  fi
  
  # Check Laravel
  if [ -f "$project_path/composer.json" ] && \
     grep -q "laravel" "$project_path/composer.json" && \
     [ -f "$project_path/artisan" ]; then
    echo "laravel"
    return
  fi
  
  # Default
  echo "generic"
}

PROJECT_TYPE=$(detect_project_type "$1")
echo "Detected project type: $PROJECT_TYPE"
```

### Step 2: Load Profile

```javascript
// Load profile based on detected type
function loadProfile(projectType) {
  const profile = projectProfiles[projectType] || projectProfiles['generic'];
  
  console.log(`📦 Project Type: ${profile.name}`);
  console.log(`📝 Description: ${profile.description}`);
  
  return profile;
}
```

### Step 3: Apply Profile

```javascript
// Apply profile to impact analysis
function applyProfile(profile, changedFiles) {
  // 1. Classify files using profile patterns
  const classified = classifyFiles(changedFiles, profile.patterns);
  
  // 2. Detect features using profile feature patterns
  const features = detectFeatures(changedFiles, profile.features);
  
  // 3. Check edge cases using profile edge case checks
  const edgeCases = checkEdgeCases(changedFiles, profile.edgeCases);
  
  // 4. Generate test scenarios with profile priorities
  const testScenarios = generateTests(features, profile.testPriorities);
  
  return {
    classified,
    features,
    edgeCases,
    testScenarios
  };
}
```

## Custom Config File (Optional)

### Project-Specific Override

```javascript
// impact-analysis.config.js (optional, in project root)

module.exports = {
  // Override detected type
  projectType: 'react-native', // or auto-detect
  
  // Extend or override patterns
  patterns: {
    // Add custom patterns
    'gift-features': ['**/screens/Gift/**', '**/services/gift/**'],
    'thankyou-features': ['**/screens/ThankYou/**', '**/services/thankyou/**']
  },
  
  // Extend or override features
  features: {
    'Gift Management': {
      patterns: ['**/screens/Gift/**', '**/services/gift/**'],
      keywords: ['gift', 'present', 'create gift'],
      userActions: ['Create Gift', 'View Gift', 'Edit Gift', 'Delete Gift'],
      priority: 'P0'
    },
    'Thank You Cards': {
      patterns: ['**/screens/ThankYou/**', '**/services/thankyou/**'],
      keywords: ['thank you', 'card', 'send card'],
      userActions: ['Send Card', 'View Sent Cards', 'Choose Template'],
      priority: 'P0'
    }
  },
  
  // Add custom edge cases
  edgeCases: {
    'Gift Creation': [
      'Image size > 5MB',
      'Multiple recipients',
      'Scheduled delivery',
      'Offline creation'
    ]
  },
  
  // Override test priorities
  testPriorities: {
    'Gift creation': 'P0',
    'Thank you sending': 'P0',
    'Profile update': 'P1'
  },
  
  // Custom risk thresholds
  riskThresholds: {
    high: ['Gift creation', 'Payment', 'Authentication'],
    medium: ['Profile', 'Notifications'],
    low: ['Settings', 'About']
  }
};
```

## Usage in Impact Analysis

### Integration Flow

```javascript
// In impact-analysis workflow

async function analyzeImpact(args) {
  // 1. Detect project type
  const projectType = await detectProjectType(process.cwd());
  console.log(`📦 Detected: ${projectType}`);
  
  // 2. Load profile
  let profile = loadProfile(projectType);
  
  // 3. Check for custom config
  const customConfig = await loadCustomConfig();
  if (customConfig) {
    console.log(`⚙️ Applying custom config`);
    profile = mergeProfile(profile, customConfig);
  }
  
  // 4. Detect changes
  const changedFiles = await detectChanges(args);
  
  // 5. Apply profile
  const analysis = applyProfile(profile, changedFiles);
  
  // 6. Generate report
  const report = generateReport(analysis, profile);
  
  return report;
}
```

## Benefits

### 1. Zero Configuration
- Auto-detect project type
- Apply appropriate patterns
- No setup required

### 2. Flexible
- Works with any project type
- Extensible via config file
- Custom patterns supported

### 3. Consistent
- Same workflow across projects
- Standardized reports
- Predictable behavior

### 4. Maintainable
- Profiles in one place
- Easy to add new project types
- Version controlled

## Example Output

```markdown
# Impact Analysis Report

**Project Type:** React Native (thanksgift-react-native)
**Profile:** Auto-detected + Custom config applied
**Config:** impact-analysis.config.js found ✓

## 📦 Project Profile

- **Type:** React Native Mobile App
- **Patterns:** 5 categories (backend, frontend, state, config, native)
- **Features:** 8 detected (Gift Management, Thank You Cards, ...)
- **Edge Cases:** 4 categories (Platform, AsyncStorage, Navigation, Performance)
- **Test Priorities:** P0 (2), P1 (3), P2 (2)

## 🎯 Detected Features (Custom)

### Gift Management (P0) ⭐
**Patterns Matched:**
- `src/screens/Gift/CreateGift.tsx`
- `src/services/gift/giftService.ts`

**User Actions:**
- Create Gift
- Upload Gift Photo
- View Gift Details

**Priority:** P0 (from custom config)

### Thank You Cards (P0) ⭐
**Patterns Matched:**
- `src/screens/ThankYou/SendCard.tsx`
- `src/services/thankyou/cardService.ts`

**User Actions:**
- Send Card
- Choose Template
- Add Message

**Priority:** P0 (from custom config)

## ⚠️ Edge Cases (Profile: React Native)

### Platform-Specific (from profile)
- [ ] Platform.OS checks
- [ ] SafeAreaView usage
- [ ] Permission flows

### Gift Creation (from custom config)
- [ ] Image size > 5MB
- [ ] Multiple recipients
- [ ] Offline creation

...
```

## Next Steps

1. **Implement auto-detection** in skill
2. **Add more project profiles** (Vue, Angular, Django, etc.)
3. **Support custom config** file
4. **Test with multiple projects**
5. **Document profile format**

