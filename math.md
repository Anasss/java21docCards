---
title: Math, Arrays, Wrappers
parent: Java 21 OCP Flashcards
nav_order: 2
layout: default
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

## 🃏 Arrays.binarySearch() and Arrays.compare()

**Arrays.binarySearch()** - Requires **sorted array**:
- **Positive index** if element found
- **Negative value** if not found: `-(insertion point) - 1`

```java
int[] sorted = {10, 20, 30, 40, 50};

// Element found:
int found = Arrays.binarySearch(sorted, 30);    // Returns 2
System.out.println("Found at index: " + found);

// Element not found:
int notFound = Arrays.binarySearch(sorted, 25); // Returns -3
int insertionPoint = -notFound - 1;             // -(-3) - 1 = 2
System.out.println("Would insert at index: " + insertionPoint);
```

**Arrays.compare() vs Arrays.mismatch():**

```java
int[] a = {1, 2, 3, 4};
int[] b = {1, 2, 3, 4};
int[] c = {1, 2, 5, 4};

// Arrays.compare() - lexicographic comparison:
System.out.println(Arrays.compare(a, b));   // 0 (equal)
System.out.println(Arrays.compare(a, c));   // -2 (3 < 5, so negative)

// Arrays.mismatch() - find difference location:
System.out.println(Arrays.mismatch(a, b));  // -1 (no mismatch)
System.out.println(Arrays.mismatch(a, c));  // 2 (differ at index 2)
```

**💡 Learning Tips:** 
- binarySearch: "Negative means missing" - use `-(result) - 1` for insertion point
- compare() tells you "who wins", mismatch() tells you "where they differ"

---

## 🃏 Array Operations and Utilities

**Rule:** Arrays class provides **utility methods** for common array operations like sorting, searching, and comparison.

{% raw %}
```java
import java.util.Arrays;

// Array creation and initialization
int[] numbers = {5, 2, 8, 1, 9};
String[] names = new String[3];
Arrays.fill(names, "Unknown");  // Fill entire array with value

// Sorting
Arrays.sort(numbers);           // [1, 2, 5, 8, 9]
String[] words = {"zebra", "apple", "banana"};
Arrays.sort(words);             // [apple, banana, zebra]

// Partial sorting
int[] partialSort = {5, 2, 8, 1, 9, 3, 7};
Arrays.sort(partialSort, 1, 4); // Sort indices 1-3: [5, 1, 2, 8, 9, 3, 7]

// Array copying
int[] original = {1, 2, 3, 4, 5};
int[] copy1 = Arrays.copyOf(original, 3);        // [1, 2, 3]
int[] copy2 = Arrays.copyOf(original, 7);        // [1, 2, 3, 4, 5, 0, 0]
int[] copy3 = Arrays.copyOfRange(original, 1, 4); // [2, 3, 4]

// Array equality
int[] arr1 = {1, 2, 3};
int[] arr2 = {1, 2, 3};
int[] arr3 = {1, 2, 4};

System.out.println(arr1 == arr2);              // false (reference comparison)
System.out.println(Arrays.equals(arr1, arr2)); // true (content comparison)
System.out.println(Arrays.equals(arr1, arr3)); // false (different content)

// Multi-dimensional arrays
int[][] matrix1 = {{1, 2}, {3, 4}};
int[][] matrix2 = {{1, 2}, {3, 4}};

System.out.println(Arrays.equals(matrix1, matrix2));     // false (shallow comparison)
System.out.println(Arrays.deepEquals(matrix1, matrix2)); // true (deep comparison)
```

**Array to String conversion:**
```java
int[] array = {1, 2, 3, 4, 5};
System.out.println(array);                    // [I@hashcode (not useful)
System.out.println(Arrays.toString(array));   // [1, 2, 3, 4, 5]

int[][] twoDArray = {{1, 2}, {3, 4}};
System.out.println(Arrays.toString(twoDArray));     // [references] (not useful)
System.out.println(Arrays.deepToString(twoDArray)); // [[1, 2], [3, 4]]
```
{% endraw %}

**💡 Learning Tip:** Remember "ARRAYS = UTILITY BELT" - Arrays class has tools for every common array operation. Use deepEquals() and deepToString() for multi-dimensional arrays.

**Q:** What's the difference between Arrays.equals() and Arrays.deepEquals()?  
**A:** equals() does shallow comparison (one level), while deepEquals() recursively compares multi-dimensional arrays.

---

## 🃏 Wrapper Class Comparison and Caching

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