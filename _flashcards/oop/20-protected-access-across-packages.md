---
layout: flashcard
category: OOP and Encapsulation
learning_tip: Protected across packages = "Family only, and only through your own
  family line."
order: 20
tags: []
title: protected Access Across Packages
---

## 🃏 protected Access Across Packages

- **Same package:** accessible anywhere
- **Different package:** only accessible from **subclass**, and only via **subclass reference** (not parent reference)

```java
// File: family/Parent.java
package family;

public class Parent {
    protected void guide() { System.out.println("Parent guidance"); }
    protected String advice = "Listen to your parents";
}

// File: extended/Child.java  
package extended;
import family.Parent;

public class Child extends Parent {
    void test() {
        // ✅ Accessing through subclass (this):
        guide();                    // OK - implicit this.guide()
        this.guide();              // OK - explicit this
        System.out.println(advice); // OK - inherited field
        
        // ✅ Accessing through subclass reference:
        Child child = new Child();
        child.guide();             // OK - subclass reference
        
        // ❌ Accessing through parent reference (different package):
        Parent parent = new Parent();
        // parent.guide();         // Compile error!
        // parent.advice;          // Compile error!
        
        // ✅ But this works (casting):
        Parent parentRef = new Child();
        // parentRef.guide();      // Still compile error - reference type matters
    }
}
```

**💡 Learning Tip:** Protected across packages = "Family only, and only through your own family line."

---