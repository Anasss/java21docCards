---
layout: flashcard
category: Modules & Migration
learning_tip: Think "MODULE = CONTROLLED VISIBILITY" - modules explicitly declare
  what they need (requires) and what they share (exports).
order: 5
tags:
- module
title: Module System - Basic Declaration and Dependencies
---


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
