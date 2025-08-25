---
category: Streams & Functional
learning_tip: partitioningBy = "split in half", groupingBy = "organize by category",
  identity = "keep as-is".
order: 15
tags:
- stream
- lambda
title: Stream Collectors and Function.identity()
---

## 🃏 Stream Collectors and Function.identity()

**Collectors.partitioningBy()** - Always creates exactly **2 groups** based on a boolean predicate:

```java
import java.util.stream.*;
import java.util.*;
import java.util.function.Function;

List<String> words = List.of("a", "bb", "ccc", "dddd", "e");

// Partition by length > 2:
Map<Boolean, List<String>> byLength = words.stream()
    .collect(Collectors.partitioningBy(word -> word.length() > 2));

System.out.println(byLength);
// {false=[a, bb, e], true=[ccc, dddd]}
```

**Function.identity()** - Returns a function that returns its input unchanged:

```java
// These are equivalent:
Function.identity()           // Method reference
x -> x                       // Lambda expression  
Function.<String>identity()  // With explicit type

// Common usage - as key mapper in toMap():
List<String> fruits = List.of("apple", "banana", "cherry");

// Map each string to its uppercase version:
Map<String, String> fruitMap = fruits.stream()
    .collect(Collectors.toMap(
        Function.identity(),    // key = original string
        String::toUpperCase     // value = uppercase string
    ));
// {apple=APPLE, banana=BANANA, cherry=CHERRY}
```

**Comparison with groupingBy():**
```java
// partitioningBy - exactly 2 groups (boolean):
Map<Boolean, List<String>> partitioned = words.stream()
    .collect(Collectors.partitioningBy(w -> w.length() > 2));

// groupingBy - multiple groups (any classifier):
Map<Integer, List<String>> grouped = words.stream()
    .collect(Collectors.groupingBy(String::length));
// {1=[a, e], 2=[bb], 3=[ccc], 4=[dddd]}
```

**💡 Learning Tip:** partitioningBy = "split in half", groupingBy = "organize by category", identity = "keep as-is".

---