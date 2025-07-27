---
title: Streams & Functional
parent: Java 21 OCP Flashcards
nav_order: 2
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

## 🃏 Lambda Target Types - Runnable vs Callable

**Rule:** Java determines which functional interface a lambda implements based on **target type** - the expected type from the context where the lambda is used.

- **Runnable**: `void run()` - lambda returns **no value**
- **Callable<T>**: `T call()` - lambda **returns a value** of type T

```java
// Same lambda expression, different target types
() -> System.out.println("Hello")

// Target type: Runnable (void return)
Runnable task1 = () -> System.out.println("Hello");        // ✅ Matches void run()
Thread thread = new Thread(() -> System.out.println("Hello")); // ✅ Constructor expects Runnable

// Target type: Callable<Void> (explicit Void return)
Callable<Void> task2 = () -> {
    System.out.println("Hello");
    return null;  // Must return null for Void
};

// Different lambda - returns a value
() -> "Hello World"

// Target type: Callable<String> (String return)
Callable<String> task3 = () -> "Hello World";              // ✅ Matches String call()
// Runnable task4 = () -> "Hello World";                   // ❌ Compile error - void expected
```

**Functional Interface Signatures:**
```java
@FunctionalInterface
public interface Runnable {
    void run();  // No parameters, void return
}

@FunctionalInterface  
public interface Callable<V> {
    V call() throws Exception;  // No parameters, returns V, can throw Exception
}
```

**💡 Learning Tip:** "Runnable runs and forgets, Callable calls and tells" - Runnable for actions, Callable for computations with results.

**Q:** What determines whether a lambda implements Runnable or Callable?  
**A:** The **target type** of the assignment. A lambda returning **no value** matches Runnable, while a lambda **returning a value** matches Callable<T>.

---

## 🃏 ExecutorService with Lambdas - submit() Method Overloading

**Rule:** ExecutorService.submit() is overloaded to handle both Runnable and Callable, with different return types.

- `submit(Runnable)` → `Future<?>` (result is always null)
- `submit(Callable<T>)` → `Future<T>` (result is of type T)

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

// Lambda matches Runnable - no return value
Future<?> future1 = executor.submit(() -> {
    System.out.println("Task executing...");
    // No return statement
});

// Lambda matches Callable<String> - returns String
Future<String> future2 = executor.submit(() -> {
    Thread.sleep(1000);
    return "Task completed!";  // Returns String
});

// Lambda matches Callable<Integer> - returns Integer
Future<Integer> future3 = executor.submit(() -> {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    return sum;  // Returns Integer
});

// Retrieving results:
try {
    Object result1 = future1.get();     // null (Runnable returns nothing)
    String result2 = future2.get();     // "Task completed!"
    Integer result3 = future3.get();    // 55
} catch (Exception e) {
    e.printStackTrace();
}
```

**Common Pitfalls:**
```java
// Pitfall 1: Forgetting return statement for Callable
Callable<String> badTask = () -> {
    String result = "Hello";
    // Missing return statement - compile error!
};

// Pitfall 2: Runnable with return statement
Runnable badRunnable = () -> {
    return "Hello";  // ❌ Runnable must return void
};

// Pitfall 3: Ambiguous context
// var task = () -> "Hello";  // ❌ Compiler can't infer target type
Callable<String> task = () -> "Hello";  // ✅ Explicit target type
```

**💡 Learning Tip:** "Future tells the future" - Future<?> means no meaningful result, Future<T> means result of type T is coming.

**Q:** What's the difference between submit(Runnable) and submit(Callable) return types?  
**A:** submit(Runnable) returns Future<?> with null result, while submit(Callable<T>) returns Future<T> with a meaningful result of type T.