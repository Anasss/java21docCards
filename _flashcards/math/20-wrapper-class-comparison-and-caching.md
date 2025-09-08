---
layout: flashcard
category: Math, Arrays, Wrappers
learning_tip: Remember "CACHE = CONFUSION" - small wrapper values may share references,
  so always use equals() for value comparison, not ==.
order: 20
tags: []
title: Wrapper Class Comparison and Caching
---


**Rule:** Wrapper classes have **reference equality quirks** due to object caching for small values.

- **Integer cache**: -128 to 127 are cached (same object references)
- **Boolean cache**: TRUE and FALSE are cached
- **Character cache**: 0 to 127 are cached

```java
// Integer caching behavior
Integer a1 = 127;
Integer b1 = 127;
System.out.println(a1 == b1);        // true (cached, same object)
System.out.println(a1.equals(b1));   // true (value comparison)

Integer a2 = 128;
Integer b2 = 128;
System.out.println(a2 == b2);        // false (not cached, different objects)
System.out.println(a2.equals(b2));   // true (value comparison)

// Forcing new objects
Integer a3 = new Integer(127);  // Deprecated in Java 9+
Integer b3 = new Integer(127);
System.out.println(a3 == b3);        // false (explicitly created new objects)

// valueOf vs constructor
Integer a4 = Integer.valueOf(127);    // Uses cache if available
Integer b4 = Integer.valueOf(127);
System.out.println(a4 == b4);        // true (cached)

// Boolean caching
Boolean bool1 = Boolean.valueOf(true);
Boolean bool2 = Boolean.valueOf(true);
System.out.println(bool1 == bool2);  // true (cached)

Boolean bool3 = new Boolean(true);   // Deprecated
Boolean bool4 = new Boolean(true);
System.out.println(bool3 == bool4);  // false (new objects)
```

**Safe comparison practices:**
```java
// Always use equals() for value comparison
Integer x = 200;
Integer y = 200;

// ❌ Unsafe - reference comparison
if (x == y) { /* may be false */ }

// ✅ Safe - value comparison  
if (x.equals(y)) { /* always correct */ }

// ✅ Safe - null-safe comparison (Java 7+)
if (Objects.equals(x, y)) { /* handles nulls */ }

// ✅ Safe - unbox to primitives
if (x.intValue() == y.intValue()) { /* primitive comparison */ }
```

**Parsing edge cases:**
```java
// NumberFormatException examples
try {
    Integer.parseInt("");          // ❌ NumberFormatException
    Integer.parseInt("12.5");      // ❌ NumberFormatException  
    Integer.parseInt("12L");       // ❌ NumberFormatException
    Integer.parseInt("twelve");    // ❌ NumberFormatException
    Integer.parseInt(null);        // ❌ NumberFormatException
} catch (NumberFormatException e) {
    System.out.println("Invalid number format");
}

// Valid parsing
int valid1 = Integer.parseInt("42");     // 42
int valid2 = Integer.parseInt("-123");   // -123
int valid3 = Integer.parseInt("+456");   // 456

// Radix parsing
int binary = Integer.parseInt("1010", 2);   // 10 (binary)
int hex = Integer.parseInt("FF", 16);       // 255 (hexadecimal)
int octal = Integer.parseInt("77", 8);      // 63 (octal)
```

**💡 Learning Tip:** Remember "CACHE = CONFUSION" - small wrapper values may share references, so always use equals() for value comparison, not ==.

**Q:** Why does `Integer a = 127; Integer b = 127; System.out.println(a == b)` print true, but the same code with 128 prints false?  
**A:** Integer caches values from -128 to 127 for performance. Values in this range return the same object reference, while values outside create new objects.
