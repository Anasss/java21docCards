---
layout: flashcard
category: Modules & Migration
learning_tip: Think "FORT WITH GATES" - modules are like fortified walls with specific
  gates (exports) and visitor passes (opens) for controlled access.
order: 15
tags:
- module
- pattern
title: Module Access Control and Visibility
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