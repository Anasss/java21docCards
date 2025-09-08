---
layout: flashcard
category: Modules & Migration
learning_tip: Think "HIGHWAY vs CITY STREETS" - module path is like controlled highway
  with explicit on/off ramps (requires/exports), classpath is like city streets where
  everything connects to everything.
order: 20
tags:
- module
- pattern
title: Module Path vs Classpath
---

## 🃏 Module Path vs Classpath

**Rule:** Modules use **module path** while legacy code uses **classpath**, with different visibility and loading rules.

- **Module path**: Strong encapsulation, explicit dependencies
- **Classpath**: Flat namespace, all classes visible to each other
- **Mixed mode**: Named modules can depend on automatic modules

```java
// Compilation commands
// Classpath (legacy)
javac -cp lib/commons-lang.jar:lib/jackson.jar src/**/*.java

// Module path (Java 9+)
javac --module-path lib --module-source-path src -d out --module com.myapp

// Runtime commands
// Classpath
java -cp out:lib/* com.myapp.Main

// Module path
java --module-path out:lib --module com.myapp/com.myapp.Main
```

**Module visibility rules:**
```java
// Named module on module path
module com.named {
    requires java.base;      // Explicit dependency
    requires java.logging;   // Must be declared
    exports com.named.api;   // Controlled exports
    
    // Can only access:
    // - Exported packages from required modules
    // - Own packages
}

// Automatic module (JAR on module path without module-info.java) 
// - Gets automatic name from JAR filename
// - Exports all packages
// - Requires all other modules
// - Can access all other automatic modules and named modules

// Unnamed module (classpath)
// - Can access all automatic modules and their exported packages
// - Cannot access named modules (unless via automatic modules)
// - All classes in flat namespace
```

**Migration scenarios:**
```java
// Scenario 1: Pure modular
// All JARs on module path with module-info.java
java --module-path libs --module com.myapp/com.myapp.Main

// Scenario 2: Mixed (recommended for migration)
// Application is modular, libraries are automatic modules
java --module-path libs --module com.myapp/com.myapp.Main

// Scenario 3: Legacy
// Everything on classpath
java -cp "libs/*:myapp.jar" com.myapp.Main

// Scenario 4: Gradual migration
// Some modules modular, some on classpath
java --module-path modulelibs --class-path legacylibs/* --module com.myapp/com.myapp.Main
```

**Automatic module naming:**
```java
// JAR filename -> Automatic module name
"commons-lang3-3.12.jar"        -> "commons.lang3"
"jackson-databind-2.14.jar"     -> "jackson.databind"
"spring-boot-starter-2.7.jar"   -> "spring.boot.starter"
"my-custom-lib-1.0-SNAPSHOT.jar" -> "my.custom.lib"

// Rules:
// 1. Remove version suffix
// 2. Replace non-alphanumeric with dots
// 3. Remove consecutive dots
// 4. Remove leading/trailing dots
```

**Common migration patterns:**
```java
// Pattern 1: Top-down migration
module com.myapp {
    // Start with automatic modules for dependencies
    requires commons.lang3;      // commons-lang3.jar (automatic)
    requires jackson.databind;   // jackson-databind.jar (automatic)
    requires spring.boot;        // spring-boot.jar (automatic)
    
    exports com.myapp.api;
}

// Pattern 2: Create module for legacy JAR
// Add module-info.java to existing JAR
module legacy.library {
    exports legacy.library.api;
    requires java.base;
    // Don't export internal implementation packages
}

// Pattern 3: Split large applications
module com.myapp.core {
    exports com.myapp.core.api;
}

module com.myapp.web {
    requires com.myapp.core;
    requires spring.web;
}

module com.myapp.data {
    requires com.myapp.core;
    requires java.sql;
}
```

**💡 Learning Tip:** Think "HIGHWAY vs CITY STREETS" - module path is like controlled highway with explicit on/off ramps (requires/exports), classpath is like city streets where everything connects to everything.

**Q:** Can a named module access classes from the classpath?  
**A:** Not directly - named modules can only access other modules on the module path. However, automatic modules can bridge between named modules and classpath content.

---