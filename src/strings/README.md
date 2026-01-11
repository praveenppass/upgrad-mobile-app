# TypeScript-Safe String Management System

A fully type-safe string management system for React Native applications with zero runtime overhead and complete IntelliSense support.

---

> **🤖 Built with Cursor AI**  
> This comprehensive string management system was designed and implemented using Cursor AI, demonstrating advanced TypeScript patterns and automatic type inference without manual interface declarations.

---

## Features

✅ **100% TypeScript Safe** - No `any`, `unknown`, or `never` types  
✅ **Automatic Type Inference** - Types generated from actual string objects  
✅ **Path Autocomplete** - Full IntelliSense for all string paths  
✅ **Function Parameter Detection** - Automatic parameter validation  
✅ **Compile-Time Errors** - Invalid usage caught during build  
✅ **Zero Runtime Overhead** - Pure compile-time type generation  
✅ **No Manual Interfaces** - Add strings and get types automatically

## Usage

### Basic String Access

```typescript
import { getString } from "@strings";

// Static strings with autocomplete
const message = getString("common.skip"); // → "Skip"
const error = getString("auth.errors.invalidCredentials"); // → "Invalid credentials"
```

### Function Strings with Parameters

```typescript
// Functions with required parameters - TypeScript enforces exact parameter types
const errorCount = getString("common.toast.errorCount", 5); // expects: number
// → "There are 5 errors"

const userGreeting = getString("common.toast.userMessage", {
	name: "John", // required: string
	age: 25, // required: number
});
// → "Hello John, you are 25 years old"

const minLength = getString("common.validation.minLength", 8); // expects: number
// → "Minimum 8 characters required"
```

### Type Safety Examples

```typescript
// ❌ These will cause TypeScript errors:

// Invalid paths
getString("invalid.path"); // Error: Path doesn't exist
getString("common.nonexistent"); // Error: Path doesn't exist

// ❌ IMPORTANT: Intermediate object paths (new feature!)
getString("auth.errors"); // Error: "auth.errors" is an object, not a string/function
getString("common.toast"); // Error: "common.toast" is an object, not a string/function

// ✅ Only leaf paths are valid:
getString("auth.errors.invalidCredentials"); // ✅ Valid - leads to string
getString("common.toast.success"); // ✅ Valid - leads to string

// Missing required parameters
getString("common.toast.errorCount"); // Error: Missing required number parameter
getString("common.toast.userMessage"); // Error: Missing required object parameter

// Wrong parameter types
getString("common.toast.errorCount", "5"); // Error: Expected number, got string
getString("common.toast.userMessage", 123); // Error: Expected object, got number
getString("common.toast.userMessage", { name: "John" }); // Error: Missing 'age' property

// Unexpected parameters for static strings
getString("common.skip", "unexpected"); // Error: Static strings don't accept parameters
getString("auth.login", 123); // Error: Static strings don't accept parameters
```

## File Structure

```
src/strings/
├── utils/
│   ├── strings.interface.ts     # Core type definitions (with automatic inference)
│   ├── strings.utils.ts         # Utility functions
│   └── strings.constants.ts     # Constants and patterns
├── locales/
│   └── en/
│       ├── common.ts             # Common strings
│       ├── auth.ts               # Auth-related strings
│       └── index.ts              # Locale aggregation & type export
├── getString.ts                  # Main getString function (simplified)
└── README.md                     # This documentation
```

### Key Implementation Details

- **No Manual Overloads**: The system uses pure TypeScript inference without manual function overloads
- **Single Generic Function**: One `getString` function handles all cases through type inference
- **Automatic Path Validation**: Only valid leaf paths (strings/functions) are allowed, intermediate object paths are rejected
- **Zero Configuration**: Add strings to locale files and get full type safety automatically

## Adding New Strings

1. Simply add to the appropriate locale file - **types are automatically inferred**:

```typescript
// locales/en/common.ts
export const common = {
	newSection: {
		message: "New message",
		dynamicMessage: (count: number) => `${count} items`,
	},
	// ... existing sections
} as const;
```

2. **No manual interface updates needed!** TypeScript automatically infers types from your string objects.

3. Use with full type safety - IntelliSense will automatically include your new paths:

```typescript
const message = getString("common.newSection.message");
const dynamic = getString("common.newSection.dynamicMessage", 5);
```

## Type Utilities

```typescript
import type { IDeepKeys, IStringsType } from "@strings/utils/strings.interface";

// Get all available paths
type AllPaths = IDeepKeys<IStringsType>;

// Create domain-specific utilities
const getAuthString = <P extends `auth.${string}` & IDeepKeys<IStringsType>>(
	path: P,
	...args: any[] // Simple approach for domain utilities
) => getString(path, ...args);

// Example domain utility usage
const authLogin = getAuthString("auth.login");
const authError = getAuthString("auth.errors.invalidCredentials");
```

## Advanced Features

### Automatic Parameter Inference

The system automatically detects function parameters without any manual configuration:

```typescript
// Function signatures are automatically inferred from locale files
const errorCount = getString("common.toast.errorCount", 5); // number required
const userMsg = getString("common.toast.userMessage", {
	name: "John",
	age: 25,
}); // object with specific shape required
```

### Compile-Time Path Validation

Only valid leaf paths are accepted, preventing runtime errors:

```typescript
// ❌ Compile-time error - intermediate paths rejected
getString("auth.errors"); // TypeScript error: object path not allowed

// ✅ Valid - actual string/function paths accepted
getString("auth.errors.invalidCredentials"); // ✅ String value
getString("auth.errors.tooManyAttempts", 15); // ✅ Function value
```
