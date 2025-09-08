---
layout: flashcard
category: Modules & Migration
learning_tip: Bottom-up = "Foundation first" (solid but slow), Top-down = "Roof first"
  (fast but requires careful reinforcement later). Most projects should use top-down
  for practicality.
order: 10
tags:
- module
title: 'Module Migration Strategies: Bottom-Up vs Top-Down'
---


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
