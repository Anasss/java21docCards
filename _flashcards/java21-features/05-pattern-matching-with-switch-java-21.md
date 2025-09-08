---
layout: flashcard
category: Java 21 Features
learning_tip: Guarded patterns are checked in order. Always have a fallback case or
  default to avoid MatchException.
order: 5
tags:
- record
- switch
- pattern
title: Pattern Matching with switch (Java 21)
---


**Guarded Patterns:** Use `when` to add conditions to case labels.

```java
static String categorize(Object obj) {
    return switch (obj) {
        case String s when s.length() > 5 -> "Long string: " + s;
        case String s when s.isEmpty() -> "Empty string";
        case String s -> "Short string: " + s;
        case Integer i when i > 100 -> "Big number: " + i;
        case Integer i -> "Small number: " + i;
        case null -> "Null value";
        default -> "Unknown type: " + obj.getClass().getSimpleName();
    };
}

// Testing:
System.out.println(categorize("Hi"));         // Short string: Hi
System.out.println(categorize("Hello World")); // Long string: Hello World
System.out.println(categorize(150));          // Big number: 150
System.out.println(categorize(50));           // Small number: 50
System.out.println(categorize(null));         // Null value
```

**⚠️ Dangerous Example - Missing default:**
```java
static String broken(Object obj) {
    return switch (obj) {
        case String s when s.startsWith("A") -> "A-String";
        case String s when s.startsWith("B") -> "B-String";
        // ❌ What if string starts with "C"? MatchException at runtime!
    };
}
```

**Pattern matching with records (Java 21):**
```java
record Point(int x, int y) {}

static String describePoint(Object obj) {
    return switch (obj) {
        case Point(int x, int y) when x == 0 && y == 0 -> "Origin";
        case Point(int x, int y) when x == y -> "Diagonal point";
        case Point(int x, int y) -> "Point at (" + x + ", " + y + ")";
        default -> "Not a point";
    };
}
```

**💡 Learning Tip:** Guarded patterns are checked in order. Always have a fallback case or default to avoid MatchException.

---
