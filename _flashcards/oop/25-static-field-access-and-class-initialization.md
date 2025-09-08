---
layout: flashcard
category: OOP and Encapsulation
learning_tip: Remember "DECLARES WINS" - only the class that declares the static field
  gets initialized, even when accessed through a subclass reference.
order: 25
tags: []
title: Static Field Access and Class Initialization
---


**Rule:** Accessing a static field only initializes the class that **declares** the field, not the class through which it's accessed.
- Class initialization is triggered by accessing a field **declared by that class**.
- Inherited static fields do **not** trigger subclass initialization.
- The reference used (`Child.familyName`) doesn't matter - only the **declaring class** matters.

```java
class Parent { 
    static String familyName = "Johnson"; 
}

class Child extends Parent {
    static { 
        System.out.print("Child initialized"); 
    }
}

public class FamilyTest {
    public static void main(String[] args) {
        System.out.println(Child.familyName);  // Accesses inherited field
    }
}

// Output: Johnson
// NOT: Child initializedJohnson
```

**💡 Learning Tip:** Remember "DECLARES WINS" - only the class that declares the static field gets initialized, even when accessed through a subclass reference.

**Q:** Does accessing Child.familyName initialize the Child class if familyName is declared in Parent?  
**A:** No — only Parent gets initialized because Parent declares the field. Child inherits it but doesn't declare it.

---
