---
category: Exception Handling
order: 10
tags:
- streams
- stream
- optional
title: Stream Operations and Exception Handling
---

## 🃏 Stream Operations and Exception Handling

**Intermediate vs Terminal Operations:**

```java
// Intermediate Operations - return Stream (lazy):
Stream<String> words = Stream.of("apple", "banana", "cherry");

Stream<String> processed = words
    .filter(s -> s.startsWith("a"))     // Intermediate
    .map(String::toUpperCase)           // Intermediate  
    .limit(2);                          // Intermediate
    
// Nothing executed yet - streams are lazy!

// Terminal Operations - return result and close stream:
List<String> result = Stream.of("apple", "banana", "cherry")
    .filter(s -> s.length() > 5)       // Intermediate
    .collect(Collectors.toList());      // Terminal - execution happens here
```

**Stream Reuse Error:**
```java
Stream<String> stream = Stream.of("a", "b", "c");

stream.forEach(System.out::print);  // Terminal operation - stream is consumed
// stream.count();                  // ❌ IllegalStateException: stream has already been operated upon
```

**Optional Exception Handling:**
```java
private static void demonstrateOptionalExceptions() {
    // Safe stream that produces a result:
    Stream<Integer> numbers = Stream.of(1, 3, 7, 2, 8);
    Optional<Integer> maxOpt = numbers
        .filter(x -> x < 10)           // All numbers pass
        .max(Integer::compareTo);      // Find max: Optional[8]
    
    System.out.println(maxOpt.get()); // ✅ 8 - safe because Optional has value
    
    // Dangerous stream that produces empty Optional:
    Stream<Integer> emptyStream = Stream.of(15, 20, 25);
    Optional<Integer> emptyOpt = emptyStream
        .filter(x -> x < 5)           // No numbers pass filter
        .max(Integer::compareTo);     // Returns Optional.empty()
    
    // System.out.println(emptyOpt.get()); // ❌ NoSuchElementException!
    
    // Safe alternatives:
    System.out.println(emptyOpt.orElse(-1));              // -1 (default value)
    System.out.println(emptyOpt.orElseGet(() -> 0));      // 0 (computed default)
    emptyOpt.ifPresent(System.out::println);              // Does nothing if empty
}
```

**💡 Learning Tips:** 
- Intermediate = "keep the pipeline flowing", Terminal = "time for results"
- Optional.get() = "Russian roulette" - always check isPresent() or use orElse()/ifPresent()

---