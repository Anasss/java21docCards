---
layout: flashcard
category: Streams & Functional
order: 10
tags:
- streams
- stream
title: Stream Lazy Evaluation - Intermediate vs Terminal Operations
---

## 🃏 Stream Lazy Evaluation - Intermediate vs Terminal Operations

**Rule:** Intermediate operations are **lazy** — they define **what** should be done, but not **when** it's done. They are only evaluated when a terminal operation is invoked.

- **Intermediate operations**: Return a new Stream and are lazily evaluated
- **Terminal operations**: Trigger the processing of the stream and produce a result or side effect

```java
// Intermediate operations - define the pipeline but don't execute
Stream<String> words = Stream.of("apple", "banana", "cherry", "apricot");

Stream<String> pipeline = words
    .filter(s -> {
        System.out.println("Filtering: " + s);  // This won't print yet!
        return s.startsWith("a");
    })
    .map(s -> {
        System.out.println("Mapping: " + s);    // This won't print yet!
        return s.toUpperCase();
    });

System.out.println("Pipeline created, but nothing executed yet");

// Terminal operation - triggers execution of entire pipeline
List<String> result = pipeline.collect(Collectors.toList());
// NOW the filtering and mapping print statements execute
// Output: APPLE, APRICOT
```

**Stream Operations Reference:**

| **Intermediate Operations (Lazy)** | **Description** | **Terminal Operations (Eager)** | **Description** |
|-----------------------------------|-----------------|----------------------------------|-----------------|
| `filter()` | Filters elements based on predicate | `collect()` | Collects elements into collection |
| `map()` | Transforms elements | `forEach()` | Performs action on each element |
| `flatMap()` | Flattens nested streams | `reduce()` | Reduces elements to single value |
| `distinct()` | Removes duplicates (stateful) | `count()` | Counts elements |
| `sorted()` | Sorts elements (stateful) | `findFirst()` | Finds first element |
| `limit()` | Limits number of elements (stateful) | `findAny()` | Finds any element |
| `skip()` | Skips first n elements (stateful) | `anyMatch()` | Checks if any element matches |
| `peek()` | Performs action without consuming | `allMatch()` | Checks if all elements match |
| `takeWhile()` | Takes elements while condition true | `noneMatch()` | Checks if no elements match |
| `dropWhile()` | Drops elements while condition true | `min()` | Finds minimum element |
| | | `max()` | Finds maximum element |
| | | `toArray()` | Converts to array |

**Lazy Evaluation Example:**
```java
// This creates an infinite stream but doesn't hang!
Stream<Integer> infiniteStream = Stream.iterate(1, n -> n + 1)
    .filter(n -> n % 2 == 0)  // Intermediate - lazy
    .map(n -> n * 2);         // Intermediate - lazy

// Only when we add a terminal operation does execution begin
List<Integer> first5Even = infiniteStream
    .limit(5)                 // Intermediate - lazy
    .collect(Collectors.toList());  // Terminal - triggers execution

System.out.println(first5Even); // [4, 8, 12, 16, 20]
```

**Stream Reuse Warning:**
```java
Stream<String> stream = Stream.of("a", "b", "c");

stream.forEach(System.out::print);  // Terminal - stream consumed
// stream.count();                  // ❌ IllegalStateException!

// Must create new stream for additional operations
Stream.of("a", "b", "c").count();   // ✅ OK - new stream
```

**💡 Learning Tips:**
- **Lazy evaluation**: "Build the recipe, cook when ordered" - intermediate operations build the pipeline, terminal operations execute it
- **Stateful vs Stateless**: Stateful operations (distinct, sorted, limit) may need to see all elements before producing results
- **One-time use**: Streams are consumed by terminal operations and cannot be reused
- **Performance benefit**: Lazy evaluation allows for optimizations like short-circuiting and fusion

**Q:** What happens if you chain multiple intermediate operations without a terminal operation?  
**A:** Nothing executes — the pipeline is built but remains dormant until a terminal operation triggers evaluation.

---