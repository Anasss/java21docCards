---
layout: flashcard
category: OOP and Encapsulation
learning_tip: Classes that don't override equals() are doing reference comparison.
  StringBuilder is a famous example!
order: 15
tags: []
title: equals() Method Behavior
---

## 🃏 equals() Method Behavior

When a class **does not override** `equals()` from `Object`, `.equals()` compares **references**, just like `==`.

```java
class Person {
    String name;
    Person(String name) { this.name = name; }
    // No equals() override - inherits Object.equals()
}

Person a = new Person("John");
Person b = new Person("John");
Person c = a;

System.out.println(a.equals(b));  // false - different objects
System.out.println(a == b);       // false - different objects  
System.out.println(a.equals(c));  // true - same reference
System.out.println(a == c);       // true - same reference

// Compare with String (which DOES override equals):
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1.equals(s2)); // true - content comparison
System.out.println(s1 == s2);      // false - different objects
```

**Examples of classes that DON'T override equals():**
- `StringBuilder` - reference comparison only
- `StringBuffer` - reference comparison only
- Most custom classes (unless explicitly overridden)

**💡 Learning Tip:** Classes that don't override equals() are doing reference comparison. StringBuilder is a famous example!

---