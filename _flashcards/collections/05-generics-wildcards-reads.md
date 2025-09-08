---
layout: flashcard
title: "Generics: Bounded Wildcards (READ-WRITE Rule)"
category: "Collections & Generics"
order: 5
tags: ["generics", "wildcards", "collections"]
learning_tip: "READ-WRITE Rule: **R**ead **E**xtends, **W**rite **S**uper"
---


**READ-WRITE Rule:** **R**ead **E**xtends, **W**rite **S**uper

- `? extends T`: **READ-ONLY** - Can read items of type T or its subtypes. Cannot add anything (except `null`)
- `? super T`: **WRITE-ONLY** - Can write T or its subtypes. Cannot safely read (except as `Object`)

### Basic READ-WRITE Example
```java
// Read Extends - Reading from a collection
List numbers = List.of(1, 2.0, 3L);
Number n = numbers.get(0);    // ✅ OK - can read as Number
// numbers.add(3);            // ❌ Compile error - cannot write

// Write Super - Writing to a collection  
List values = new ArrayList();
values.add(10);       // ✅ OK - can write Integer/subtypes
values.add(42);       // ✅ OK - can write Integer/subtypes
// Integer i = values.get(0);  // ❌ Compile error - can only read as Object
Object obj = values.get(0);   // ✅ OK - can read as Object
```

### Family Hierarchy Example
```java
class Grandparent {
}
class Parent extends Grandparent {
}
class Child extends Parent {
}

public class FamilyGenericTest {
    Grandparent grandparent = new Grandparent();
    Child child = new Child();
    
    public void acceptOlderGenerations(List familyList) {
        // Can WRITE Parent and younger generations (Child)
        familyList.add(new Parent());     // ✅ OK - Parent is exactly Parent
        familyList.add(child);            // ✅ OK - Child is subtype of Parent
        // familyList.add(grandparent);   // ❌ NO - Grandparent is not assignable to Parent
        
        // Can only READ as Object (safest common type)
        Object obj = familyList.get(0);   // ✅ OK - everything is Object
        // Parent p = familyList.get(0);  // ❌ NO - could be List
        // Child c = familyList.get(0);   // ❌ NO - definitely wrong
    }
    
    public void acceptYoungerGenerations(List familyList) {
        // Cannot WRITE anything except null
        // familyList.add(grandparent);   // ❌ NO - cannot add to ? extends
        // familyList.add(new Parent());  // ❌ NO - cannot add to ? extends  
        // familyList.add(child);         // ❌ NO - cannot add to ? extends
        familyList.add(null);             // ✅ OK - null is allowed
        
        // Can READ as Parent or higher in hierarchy
        Parent p = familyList.get(0);     // ✅ OK - could be Parent or Child
        Grandparent gp = familyList.get(0); // ✅ OK - Parent extends Grandparent
        // Child c = familyList.get(0);   // ❌ NO - could be just Parent, not Child
    }
}
```

### Why This Works
- **`? super Parent`**: List could be `List<Parent>` or `List<Grandparent>` 
  - **Safe to write**: Parent/Child can go into either list type
  - **Unsafe to read**: Don't know if it's Parent or Grandparent, so can only read as Object

- **`? extends Parent`**: List could be `List<Parent>` or `List<Child>`
  - **Unsafe to write**: Don't know exact type, so can't add anything safely
  - **Safe to read**: Whatever comes out is at least a Parent

**💡 Learning Tip:** 
- **`? super T`** = "I can WRITE T and its children to this" (write T, read Object)
- **`? extends T`** = "I can READ T and its children from this" (read T, write nothing)

**Q:** In `List<? super Parent> family`, why can't you read the result as `Parent`?  
**A:** Because the list could actually be `List<Grandparent>`, and reading a Grandparent as Parent would be unsafe downcasting.
