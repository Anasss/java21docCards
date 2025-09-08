---
layout: flashcard
category: Math, Arrays, Wrappers
learning_tip: Remember "MATH = STATIC UTILITY" - Math methods are all static and work
  with primitives. Wrapper classes bridge primitives and objects.
order: 5
tags: []
title: Math API and Wrapper Classes
---

## 🃏 Math API and Wrapper Classes

**Rule:** Math class provides **static methods** for mathematical operations, while wrapper classes handle **autoboxing/unboxing**.

- **Math methods**: All static, work with primitives
- **Autoboxing**: Automatic conversion between primitives and wrapper objects
- **Parsing**: Wrapper classes convert strings to primitives

```java
// Math class operations
double result1 = Math.pow(2, 3);           // 8.0 (2^3)
double result2 = Math.sqrt(16);            // 4.0
int result3 = Math.abs(-42);               // 42
double result4 = Math.max(10.5, 20.3);     // 20.3
double result5 = Math.min(10.5, 20.3);     // 10.5
double result6 = Math.round(3.7);          // 4.0
double result7 = Math.ceil(3.1);           // 4.0 (round up)
double result8 = Math.floor(3.9);          // 3.0 (round down)

// Random number generation
double random1 = Math.random();            // 0.0 <= x < 1.0
int random2 = (int)(Math.random() * 6) + 1; // Dice roll: 1-6

// Wrapper class autoboxing/unboxing
Integer wrapper = 42;        // Autoboxing: int -> Integer
int primitive = wrapper;     // Unboxing: Integer -> int

// Parsing strings to primitives
int parsed1 = Integer.parseInt("123");       // 123
double parsed2 = Double.parseDouble("45.6"); // 45.6
boolean parsed3 = Boolean.parseBoolean("true"); // true

// Wrapper class utility methods
String binary = Integer.toBinaryString(10);  // "1010"
String hex = Integer.toHexString(255);       // "ff"
Integer maxInt = Integer.MAX_VALUE;          // 2147483647
Integer minInt = Integer.MIN_VALUE;          // -2147483648
```

**Autoboxing gotchas:**
```java
// Watch out for null pointer exceptions
Integer wrapper = null;
// int primitive = wrapper;  // ❌ NullPointerException during unboxing

// Watch out for object equality vs value equality
Integer a = 127;
Integer b = 127;
System.out.println(a == b);        // true (cached values -128 to 127)

Integer c = 128;
Integer d = 128; 
System.out.println(c == d);        // false (not cached, different objects)
System.out.println(c.equals(d));   // true (value comparison)
```

**💡 Learning Tip:** Remember "MATH = STATIC UTILITY" - Math methods are all static and work with primitives. Wrapper classes bridge primitives and objects.

**Q:** What's the difference between `Math.round()`, `Math.ceil()`, and `Math.floor()`?  
**A:** `round()` rounds to nearest integer, `ceil()` always rounds up, `floor()` always rounds down.

---