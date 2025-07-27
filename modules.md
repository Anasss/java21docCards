---
title: Modules & Migration
parent: Java 21 OCP Flashcards
nav_order: 2
layout: default
---

## 🃏 Module System - Basic Declaration and Dependencies

**Rule:** Modules control **access and dependencies** through module-info.java declarations.

- **requires**: Declares dependency on another module
- **exports**: Makes packages visible to other modules
- **provides/uses**: Service provider framework

```java
// File: module-info.java in src/main/java
module com.company.myapp {
    // Dependencies - modules this module needs
    requires java.base;          // Implicit - always available
    requires java.logging;       // Explicit dependency
    requires transitive java.sql; // Transitive - modules depending on myapp get java.sql too
    
    // Exports - packages visible to other modules
    exports com.company.myapp.api;           // Public API
    exports com.company.myapp.util to        // Qualified export
        com.company.client,
        com.company.test;
    
    // Services
    provides com.company.myapp.api.Service 
        with com.company.myapp.impl.ServiceImpl;
    uses com.company.external.Logger;
    
    // Reflection access
    opens com.company.myapp.model;           // For frameworks like Spring/Hibernate
    opens com.company.myapp.config to 
        com.fasterxml.jackson.databind;      // Qualified opens
}
```

**Automatic vs Named Modules:**
```java
// Named module (has module-info.java)
module com.example.named {
    requires java.base;
    exports com.example.api;
}

// Automatic module (JAR without module-info.java on module path)
// Name derived from JAR filename: "commons-lang3-3.12.jar" -> "commons.lang3"
module com.example.app {
    requires commons.lang3;      // Automatic module
    requires java.logging;       // Platform module
}

// Unnamed module (classpath, not module path)
// Can read all other modules but cannot be required by named modules
```

**Migration strategies:**
```java
// Bottom-up: Convert dependencies first
module leaf.utility {
    exports leaf.util;  // No requires (except implicit java.base)
}

module middle.service {
    requires leaf.utility;
    exports middle.service;
}

// Top-down: Convert main app first, dependencies become automatic
module main.application {
    requires some.library;       // Automatic module
    requires another.framework;  // Automatic module
    exports main.app.api;
}
```

**💡 Learning Tip:** Think "MODULE = CONTROLLED VISIBILITY" - modules explicitly declare what they need (requires) and what they share (exports).

**Q:** What's the difference between a named module and an automatic module?  
**A:** Named modules have module-info.java and explicit declarations; automatic modules are JARs on the module path without module-info.java, getting an automatic name derived from the JAR filename.

---

## 🃏 Module Migration Strategies: Bottom-Up vs Top-Down

**Bottom-Up:** Start with **leaf dependencies** (no dependencies), work up to main app.  
**Top-Down:** Start with **main application**, dependencies become automatic modules.

```java
// BOTTOM-UP: Convert dependencies first
// Step 1: UtilLib (leaf) -> DatabaseLib -> ServiceLayer -> MainApp
module com.company.util {
    exports com.company.util.string;
    // No requires - leaf module
}

// TOP-DOWN: Convert main app first, deps are automatic modules
module com.company.myapp {
    requires service.layer;      // automatic module from service-layer.jar
    requires commons.lang3;      // automatic module from commons-lang3.jar
}

// Automatic module naming: "jackson-core-2.13.jar" -> "jackson.core"
```

**✅ Bottom-Up:** Guaranteed to work, lower risk, clear dependencies  
**❌ Bottom-Up:** Slower benefits, need to wait for third-party libs

**✅ Top-Down:** Quick wins, immediate benefits, independent of third parties  
**❌ Top-Down:** Automatic module names can change, less predictable

**💡 Learning Tip:** Bottom-up = "Foundation first" (solid but slow), Top-down = "Roof first" (fast but requires careful reinforcement later). Most projects should use top-down for practicality.

---

## 🃏 Module Access Control and Visibility

**Rule:** Modules create **strong encapsulation** - internal packages are completely hidden unless explicitly exported.

- **Exported packages**: Accessible to dependent modules
- **Non-exported packages**: Internal implementation, not accessible
- **Qualified exports**: Selective visibility to specific modules

```java
// Library module
module com.library {
    exports com.library.api;           // Public API - visible to all
    exports com.library.spi to         // Service Provider Interface - limited visibility
        com.plugin.provider,
        com.extension.framework;
    
    // com.library.internal - NOT exported, completely hidden
    // com.library.impl - NOT exported, completely hidden
}

// Client module
module com.client {
    requires com.library;
    
    // Can access:
    // - com.library.api (exported to all)
    // Cannot access:
    // - com.library.spi (not exported to this module)
    // - com.library.internal (not exported at all)
    // - com.library.impl (not exported at all)
}

// Plugin module
module com.plugin.provider {
    requires com.library;
    
    // Can access:
    // - com.library.api (exported to all)
    // - com.library.spi (qualified export includes this module)
}
```

**Reflection and opens directive:**
```java
// Framework-friendly module
module com.app.model {
    exports com.app.model.api;
    
    // Opens entire package for reflection (Spring, Hibernate, etc.)
    opens com.app.model.entity;
    
    // Opens specific package to specific modules
    opens com.app.model.config to 
        com.fasterxml.jackson.databind,
        spring.core;
        
    // Private implementation remains closed
    // com.app.model.internal - not opened or exported
}

// Without opens, frameworks cannot access private fields/constructors
class User {
    private String name;  // Reflection blocked without opens
    private int age;      // Reflection blocked without opens
    
    // Public API still works
    public String getName() { return name; }
}
```

**Service loader pattern:**
```java
// Service interface module
module com.service.api {
    exports com.service.api;
}

// Service provider module
module com.service.impl {
    requires com.service.api;
    
    provides com.service.api.Logger 
        with com.service.impl.FileLogger,
             com.service.impl.ConsoleLogger;
}

// Service consumer module
module com.app {
    requires com.service.api;
    
    uses com.service.api.Logger;  // Will discover implementations
}

// Service loading code
ServiceLoader<Logger> loggers = ServiceLoader.load(Logger.class);
for (Logger logger : loggers) {
    logger.log("Message");  // Uses discovered implementations
}
```

**💡 Learning Tip:** Think "FORT WITH GATES" - modules are like fortified walls with specific gates (exports) and visitor passes (opens) for controlled access.

**Q:** What's the difference between exports and opens?  
**A:** exports makes packages visible for normal access, while opens allows deep reflection access to private members - needed for frameworks like Spring and Jackson.

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

## 🃏 Module Compilation and Packaging

**Rule:** Modular applications require **specific compilation and packaging** commands different from traditional Java applications.

- **Multi-module compilation**: Compile all modules together
- **Module JARs**: JARs with module-info.class in root
- **JLink**: Create custom runtime images

```java
// Project structure
myapp/
├── src/
│   ├── com.myapp.core/
│   │   ├── module-info.java
│   │   └── com/myapp/core/
│   ├── com.myapp.service/
│   │   ├── module-info.java
│   │   └── com/myapp/service/
│   └── com.myapp.main/
│       ├── module-info.java
│       └── com/myapp/main/
├── lib/
└── out/

// Multi-module compilation
javac --module-path lib \
      --module-source-path src \
      -d out \
      src/*/module-info.java src/*/**/*.java

// Alternative: compile each module separately
javac --module-path lib:out \
      --module-source-path src \
      -d out \
      --module com.myapp.core

javac --module-path lib:out \
      --module-source-path src \
      -d out \
      --module com.myapp.service

javac --module-path lib:out \
      --module-source-path src \
      -d out \
      --module com.myapp.main
```

**Creating modular JARs:**
```java
// Create module JARs
jar --create \
    --file lib/com.myapp.core.jar \
    --main-class com.myapp.core.Main \
    -C out/com.myapp.core .

jar --create \
    --file lib/com.myapp.service.jar \
    -C out/com.myapp.service .

jar --create \
    --file lib/com.myapp.main.jar \
    --main-class com.myapp.main.Application \
    -C out/com.myapp.main .

// Verify module info
jar --describe-module \
    --file lib/com.myapp.core.jar

// Output shows:
// com.myapp.core jar:file:///path/lib/com.myapp.core.jar
// requires java.base mandated
// exports com.myapp.core.api
// main-class com.myapp.core.Main
```

**Running modular applications:**
```java
// Run from compiled modules
java --module-path out:lib \
     --module com.myapp.main/com.myapp.main.Application

// Run from modular JARs
java --module-path lib \
     --module com.myapp.main/com.myapp.main.Application

// Run with additional options
java --module-path lib \
     --add-modules ALL-SYSTEM \
     --module com.myapp.main/com.myapp.main.Application

// Debug module loading
java --module-path lib \
     --show-module-resolution \
     --module com.myapp.main/com.myapp.main.Application
```

**JLink - Custom Runtime Images:**
```java
// Create custom JRE with only required modules
jlink --module-path $JAVA_HOME/jmods:lib \
      --add-modules com.myapp.main \
      --output myapp-runtime \
      --launcher myapp=com.myapp.main/com.myapp.main.Application

// Directory structure created:
myapp-runtime/
├── bin/
│   ├── java
│   └── myapp        # Custom launcher
├── conf/
├── lib/
└── release

// Run the custom runtime
./myapp-runtime/bin/myapp

// Or use java directly
./myapp-runtime/bin/java --module com.myapp.main
```

**Advanced JLink options:**
```java
// Optimize and compress
jlink --module-path $JAVA_HOME/jmods:lib \
      --add-modules com.myapp.main \
      --output myapp-runtime \
      --launcher myapp=com.myapp.main/com.myapp.main.Application \
      --compress=2 \              # Maximum compression
      --strip-debug \             # Remove debug info
      --no-header-files \         # Remove header files
      --no-man-pages             # Remove man pages

// List available modules
java --list-modules

// Show module dependencies
jdeps --module-path lib \
      --print-module-deps \
      lib/com.myapp.main.jar
```

**Maven integration:**
```xml
<!-- pom.xml for modular project -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <configuration>
        <release>21</release>
        <compilerArgs>
            <arg>--module-path</arg>
            <arg>${project.build.directory}/modules</arg>
        </compilerArgs>
    </configuration>
</plugin>

<plugin>
    <groupId>org.moditect</groupId>
    <artifactId>moditect-maven-plugin</artifactId>
    <version>1.0.0.RC2</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>create-runtime-image</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

**💡 Learning Tip:** Think "ASSEMBLY LINE" - compile modules, package into JARs, link into custom runtime. Each step builds on the previous one.

**Q:** What's the advantage of using JLink to create a custom runtime image?  
**A:** JLink creates a minimal JRE containing only the modules your application needs, reducing size and improving startup time while making deployment easier.