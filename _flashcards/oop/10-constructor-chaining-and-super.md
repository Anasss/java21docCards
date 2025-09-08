---
layout: flashcard
category: OOP and Encapsulation
learning_tip: '"No free lunch" - if parent needs arguments, children must provide
  them explicitly.'
order: 10
tags: []
title: Constructor Chaining and super()
---


**Rule:** If a constructor does not explicitly call `super()` or `this()`, the compiler inserts `super()` **only if the superclass has a no-arg constructor**.

```java
class Ancestor {
    Ancestor(String msg) {
        System.out.println("Ancestor: " + msg);
    }
    // No no-arg constructor available!
}

class Parent extends Ancestor {
    // ❌ This would cause compile error:
    // Parent() {} // Implicit super() call fails
    
    // ✅ Must explicitly call super with argument:
    Parent() {
        super("Default parent message"); // Explicit call required
    }
    
    Parent(String name) {
        super("Parent: " + name);       // Explicit call required
    }
}

class Child extends Parent {
    Child() {
        // ✅ Implicit super() works - Parent has no-arg constructor
        System.out.println("Child constructor");
    }
}
```

**Constructor execution order:**
```java
Child child = new Child();
// Output:
// Ancestor: Default parent message
// Child constructor
```

**💡 Learning Tip:** "No free lunch" - if parent needs arguments, children must provide them explicitly.

---
