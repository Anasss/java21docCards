---
layout: flashcard
category: OOP and Encapsulation
learning_tip: Remember "HIDE vs OVERRIDE" - static methods and fields are HIDDEN (reference
  type matters), instance methods are OVERRIDDEN (object type matters).
order: 5
tags: []
title: Instance Methods vs Variables and Static Methods
---


**Rule:** Instance methods are **overridden**, while **variables and static methods are hidden**.

- The method invoked depends on the **actual object type** (runtime)
- The field accessed depends on the **reference type** (compile-time)

```java
class Parent {
    String role = "Parent";
    static String familyName() { return "Smith"; }
    String introduce() { return "I am a Parent"; }
}

class Child extends Parent {
    String role = "Child";                      // Field hiding
    static String familyName() { return "Johnson"; }  // Method hiding
    String introduce() { return "I am a Child"; }     // Method overriding
}

Parent member = new Child();
System.out.println(member.role);        // Parent (field access - compile-time)
System.out.println(member.familyName()); // Smith (static method - compile-time)
System.out.println(member.introduce());  // I am a Child (instance method - runtime)
```

**💡 Learning Tip:** Remember "HIDE vs OVERRIDE" - static methods and fields are HIDDEN (reference type matters), instance methods are OVERRIDDEN (object type matters).

**Q:** Does overriding a method replace the original method call even if the reference is of parent type?  
**A:** Yes — overridden instance methods use the object type at runtime (dynamic dispatch). Static methods use the reference type (they are hidden, not overridden).

---
