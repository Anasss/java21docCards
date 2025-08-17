---
title: Q&A Study Guide
parent: Java 21 OCP Flashcards
nav_order: 3
layout: default
---

# Java 21 OCP - Questions & Answers

## Collections & Generics

### Q1: What is the READ-WRITE rule for bounded wildcards?
**Answer:** **R**ead **E**xtends, **W**rite **S**uper
- `? extends T`: **READ-ONLY** - Can read items as type T, cannot add anything (except null)
- `? super T`: **WRITE-ONLY** - Can write T and subtypes, can only read as Object

**Example:**
```java
List<? extends Number> readList = List.of(1, 2.0, 3L);
Number n = readList.get(0);    // ✅ Can read as Number
// readList.add(4);            // ❌ Cannot write

List<? super Integer> writeList = new ArrayList<Number>();
writeList.add(42);             // ✅ Can write Integer
Object obj = writeList.get(0); // ✅ Can only read as Object
```

---

### Q2: How do Deque stack and queue operations work together?
**Answer:** Deque can act as both Stack (LIFO) and Queue (FIFO) simultaneously:

- **Stack operations:** `push()` and `pop()` work on the **head**
- **Queue operations:** `offer()`/`add()` work on **tail**, `poll()`/`remove()` work on **head**
- You can mix operations on the same Deque

**Example:**
```java
Deque<String> deque = new ArrayDeque<>();
deque.push("First");        // [First] (head)
deque.offerLast("Last");    // [First, Last] (tail)
deque.push("New First");    // [New First, First, Last] (head)
System.out.println(deque.poll()); // "New First" (removes from head)
```

---

### Q3: What are the differences between HashSet, LinkedHashSet, and TreeSet?
**Answer:**
- **HashSet**: No ordering, O(1) operations, allows null
- **LinkedHashSet**: Insertion order, O(1) operations, allows null  
- **TreeSet**: Natural/comparator ordering, O(log n) operations, no null

**Memory tip:** "HASH-LINKED-TREE" = No order → Insertion order → Sorted order

---

### Q4: How does Map.merge() work when the key exists vs doesn't exist?
**Answer:** 
- **Key exists:** Combines existing value with new value using the merge function
- **Key doesn't exist:** Simply inserts the new value (merge function not called)

```java
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 85);
map.merge("Alice", 10, Integer::sum);    // 85 + 10 = 95 (key exists)
map.merge("Bob", 88, Integer::sum);      // Just inserts 88 (key doesn't exist)
```

---

## Enums

### Q5: Can enum constructors be called directly with the new keyword?
**Answer:** No – enum constructors are **implicitly private** and can only be called when declaring enum constants.

```java
public enum Planet {
    EARTH(5.976e+24, 6.37814e6),  // ✅ Constructor called here
    MARS(6.421e+23, 3.3972e6);
    
    private final double mass;
    private final double radius;
    
    Planet(double mass, double radius) {  // Implicitly private
        this.mass = mass;
        this.radius = radius;
    }
}

// Planet p = new Planet(1.0, 2.0);  // ❌ Compile error
```

**Key insight:** Enum constants are the only instances that can ever exist.

---

### Q6: How can enum constants override methods?
**Answer:** Each enum constant can provide its own implementation of methods by using an anonymous class body:

```java
public enum Operation {
    PLUS("+") {
        public double apply(double x, double y) { return x + y; }
    },
    MINUS("-") {
        public double apply(double x, double y) { return x - y; }
    };
    
    private final String symbol;
    Operation(String symbol) { this.symbol = symbol; }
    
    public abstract double apply(double x, double y);  // Must be implemented by each constant
}
```

**Usage:** `Operation.PLUS.apply(2, 3)` returns `5.0`

---

## I/O and NIO

### Q7: What does Files.mismatch() return and when should you use it?
**Answer:** `Files.mismatch()` compares two files **byte by byte**:
- Returns **index of first mismatching byte** (0-based)
- Returns **-1** if files are identical
- Throws `IOException` if paths are invalid

```java
Path file1 = Path.of("doc1.txt");  // Content: "Hello World"
Path file2 = Path.of("doc2.txt");  // Content: "Hello Mars"

long result = Files.mismatch(file1, file2);  // Returns 6 (index of 'W' vs 'M')
```

**Use case:** Efficient file comparison without loading entire files into memory.

---

### Q8: When should you use Files.readString() vs BufferedReader?
**Answer:** 
- **Files.readString()**: Small files when you need the entire content at once
- **BufferedReader**: Large files or line-by-line processing to avoid memory issues

```java
// For small files:
String content = Files.readString(Path.of("small.txt"));

// For large files:
try (BufferedReader reader = Files.newBufferedReader(Path.of("large.txt"))) {
    reader.lines()
          .filter(line -> line.contains("important"))
          .forEach(System.out::println);
}
```

---

### Q9: What's the difference between Path.resolve() with relative vs absolute paths?
**Answer:** 
- **Relative path:** Appended to the base path
- **Absolute path:** The absolute path is returned unchanged (absolute paths "win")

```java
Path base = Path.of("/home/user");
Path resolved1 = base.resolve("documents/file.txt");    // /home/user/documents/file.txt
Path resolved2 = base.resolve("/etc/config");           // /etc/config (absolute wins)
```

---

### Q10: When should you use InputStreamReader vs FileReader?
**Answer:** 
- **InputStreamReader**: When you need explicit encoding control or wrapping a byte stream
- **FileReader**: Convenience class that uses platform default encoding

```java
// Explicit encoding control:
try (FileInputStream fis = new FileInputStream("file.txt");
     InputStreamReader isr = new InputStreamReader(fis, StandardCharsets.UTF_8)) {
    // Process with UTF-8 encoding
}

// Platform default encoding:
try (FileReader fr = new FileReader("file.txt")) {
    // Uses system default encoding
}
```

**Best practice:** Use InputStreamReader with explicit encoding for cross-platform compatibility.

---

## Streams & Functional Programming

### Q11: What happens if you chain multiple intermediate operations without a terminal operation?
**Answer:** Nothing executes – intermediate operations are **lazy**. The pipeline is built but remains dormant until a terminal operation triggers evaluation.

```java
Stream<String> pipeline = Stream.of("a", "bb", "ccc")
    .filter(s -> {
        System.out.println("Filtering: " + s);  // This WON'T print!
        return s.length() > 1;
    })
    .map(String::toUpperCase);

System.out.println("Pipeline created");  // This prints

// Only when terminal operation is called:
List<String> result = pipeline.collect(Collectors.toList());  // NOW filtering prints
```

---

### Q12: What's the difference between Collectors.partitioningBy() and groupingBy()?
**Answer:**
- **partitioningBy()**: Always creates exactly **2 groups** based on boolean predicate
- **groupingBy()**: Creates **multiple groups** based on classifier function

```java
List<String> words = List.of("a", "bb", "ccc", "dddd");

// Partition - exactly 2 groups:
Map<Boolean, List<String>> partitioned = words.stream()
    .collect(Collectors.partitioningBy(w -> w.length() > 2));
// {false=[a, bb], true=[ccc, dddd]}

// Group - multiple groups:
Map<Integer, List<String>> grouped = words.stream()
    .collect(Collectors.groupingBy(String::length));
// {1=[a], 2=[bb], 3=[ccc], 4=[dddd]}
```

---

### Q13: What determines whether a lambda implements Runnable or Callable?
**Answer:** The **target type** of the assignment context:
- **Runnable**: Lambda returns no value (`void run()`)
- **Callable<T>**: Lambda returns a value (`T call()`)

```java
// Same lambda, different target types:
Runnable task1 = () -> System.out.println("Hello");        // void return - Runnable
Callable<String> task2 = () -> "Hello World";              // String return - Callable<String>
```

---

### Q14: What's the difference between ExecutorService submit(Runnable) and submit(Callable) return types?
**Answer:**
- `submit(Runnable)` → `Future<?>` (result is always null)
- `submit(Callable<T>)` → `Future<T>` (result is of type T)

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Future<?> future1 = executor.submit(() -> System.out.println("Task"));  // Future<?> - null result
Future<String> future2 = executor.submit(() -> "Completed");            // Future<String> - String result
```

---

### Q15: Why can't you call Optional.get() safely without checking?
**Answer:** `Optional.get()` throws **NoSuchElementException** if the Optional is empty. Always use safe alternatives:

```java
Optional<String> empty = Optional.empty();

// ❌ Dangerous:
// String value = empty.get();  // NoSuchElementException!

// ✅ Safe alternatives:
String safe1 = empty.orElse("default");              // Returns "default"
String safe2 = empty.orElseGet(() -> "computed");    // Returns "computed" 
empty.ifPresent(System.out::println);                // Does nothing if empty
```

---

## Date, Time, and Localization

### Q16: Why are LocalDate/LocalTime objects immutable and how does this affect method calls?
**Answer:** LocalDate/LocalTime/LocalDateTime are immutable - all methods return **new instances**. The original object never changes.

```java
LocalDate today = LocalDate.now();
today.plusDays(1);          // ❌ Result ignored - today unchanged
LocalDate tomorrow = today.plusDays(1); // ✅ Correct - assigns new instance
```

**Impact:** You must always assign the result of date/time operations, or they have no effect.

---

### Q17: How does DST "fall back" affect time calculations?
**Answer:** When DST ends, one hour (typically 1:00-2:00 AM) occurs **twice**, creating a 25-hour day. This affects calculations crossing the repeated hour.

**Example:** From 3:00 AM to 1:00 AM on DST end day:
- Normal day: -2 hours  
- DST fall back day: Still -2 hours (ZonedDateTime picks the later 1:00 AM occurrence)

**Key insight:** The repeated hour makes some time differences longer than expected.

---

### Q18: How does ResourceBundle fallback mechanism work?
**Answer:** ResourceBundle searches from **most specific to most general**:

For Locale("fr", "CA"):
1. `messages_fr_CA.properties`
2. `messages_fr.properties`  
3. `messages.properties` (default)

Uses the **most specific match found**. If only `messages_fr.properties` and `messages.properties` exist, it uses the French version.

---

### Q19: What are the key differences between DateTimeFormatter patterns?
**Answer:** Common pattern symbols:
- **y** - year (yyyy = 2024, yy = 24)
- **M** - month (MM = 03, MMM = Mar, MMMM = March)  
- **d** - day (dd = 15)
- **H** - hour 24-hour (HH = 14)
- **h** - hour 12-hour (hh = 02) 
- **a** - AM/PM marker
- **E** - day of week (EEE = Fri, EEEE = Friday)

**Thread safety:** DateTimeFormatter is immutable and thread-safe - reuse instances for performance.

---

## Exception Handling

### Q20: In try-with-resources, which exception takes priority when both try block and close() throw exceptions?
**Answer:** The **try block exception is primary**. Exceptions from `close()` are **suppressed** and attached to the primary exception.

```java
try (MyResource res = new MyResource()) {
    throw new RuntimeException("Primary");  // This becomes the main exception
    // close() throws RuntimeException("Close") - this gets suppressed
} catch (Exception e) {
    // e.getMessage() returns "Primary"
    // e.getSuppressed()[0].getMessage() returns "Close"
}
```

---

### Q21: Why can't catch blocks catch exceptions thrown by other catch blocks in the same try-catch?
**Answer:** Only exceptions thrown in the **try block** can be caught by catch blocks. Exceptions from catch blocks propagate up **uncaught**.

```java
try {
    throw new IOException();           // ✅ Can be caught
} catch (IOException e) {
    throw new SQLException();          // ❌ Cannot be caught by next catch
} catch (SQLException e) {             // Never executes - SQLException from catch block
    System.out.println("Won't run");
}
```

**Solution:** Use nested try-catch to handle exceptions from catch blocks.

---

### Q22: What's the difference between printing an exception and calling printStackTrace()?
**Answer:**
- **System.out.println(exception)**: Shows only exception class name and message
- **exception.printStackTrace()**: Shows complete method call chain with line numbers

```java
// Output of println(exception): java.lang.RuntimeException: Error message
// Output of printStackTrace():
//   java.lang.RuntimeException: Error message
//       at Method.name(File.java:line)
//       at Caller.method(File.java:line)
//       at Main.main(File.java:line)
```

---

## Java 21 Features

### Q23: How do guarded patterns work in switch expressions?
**Answer:** Guarded patterns use `when` to add conditions. Patterns are checked **in order** until one matches.

```java
return switch (obj) {
    case String s when s.length() > 5 -> "Long string";
    case String s when s.isEmpty() -> "Empty string";  
    case String s -> "Short string: " + s;            // Catches remaining strings
    default -> "Not a string";
};
```

**Critical:** Always provide a fallback case or `default` to avoid `MatchException`.

---

### Q24: What are the key rules for sealed classes?
**Answer:** Sealed classes restrict inheritance through the `permits` clause:

1. **Permitted subclasses must be:** `final`, `sealed`, or `non-sealed`
2. **All permitted classes** must extend/implement the sealed type
3. **Compiler knows all possibilities** - enables exhaustive pattern matching

```java
public sealed class Shape permits Circle, Rectangle, Triangle {}

final class Circle extends Shape {}           // Cannot be extended further
sealed class Rectangle extends Shape permits Square {} // Can only be extended by Square  
non-sealed class Triangle extends Shape {}    // Can be extended by anyone
```

---

### Q25: What do records automatically generate and what are the validation options?
**Answer:** Records automatically generate:
- **Constructor** with all fields as parameters
- **Accessor methods** (not getters - just field names)
- **equals()**, **hashCode()**, **toString()**

**Validation:** Use compact constructor syntax:
```java
public record Person(String name, int age) {
    public Person {  // Compact constructor
        if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Name required");
    }
}
```

---

### Q26: When should you use text blocks and what are the syntax rules?
**Answer:** Use text blocks for multi-line strings like HTML, JSON, SQL:

**Syntax rules:**
- Start with `"""` followed by line terminator
- Content preserves formatting and indentation
- End with `"""` (can be on same line as content or separate line)

```java
String html = """
    <html>
        <body>
            <h1>Hello World</h1>
        </body>
    </html>
    """;
```

**Benefits:** Preserves formatting, reduces concatenation, improves readability.

---

## Math, Arrays, Wrappers

### Q27: How does Arrays.binarySearch() indicate when an element is not found?
**Answer:** Returns `-(insertion point) - 1` when element not found.

**Formula:** If result is negative: `insertion point = -result - 1`

```java
int[] sorted = {% raw %}{10, 20, 30, 40, 50}{% endraw %};
int result = Arrays.binarySearch(sorted, 25);  // Returns -3
int insertionPoint = -result - 1;              // -(-3) - 1 = 2
// 25 would be inserted at index 2 (between 20 and 30)
```

---

### Q28: What are the wrapper class caching rules and why do they matter?
**Answer:** Wrapper classes cache small values for performance:
- **Integer**: -128 to 127
- **Boolean**: TRUE and FALSE  
- **Character**: 0 to 127

**Impact:** Cached values return same object reference (== is true), non-cached create new objects.

```java
Integer a = 127, b = 127;    // Same cached object
Integer c = 128, d = 128;    // Different objects

System.out.println(a == b);  // true (cached)
System.out.println(c == d);  // false (not cached)
System.out.println(c.equals(d)); // true (value comparison)
```

**Best practice:** Always use `.equals()` for wrapper comparisons, never `==`.

---

### Q29: What's the difference between Arrays.equals() and Arrays.deepEquals()?
**Answer:**
- **Arrays.equals()**: Shallow comparison - one level only
- **Arrays.deepEquals()**: Deep comparison - recursively compares multi-dimensional arrays

```java
int[][] array1 = {% raw %}{{1, 2}, {3, 4}}{% endraw %};
int[][] array2 = {% raw %}{{1, 2}, {3, 4}}{% endraw %};

Arrays.equals(array1, array2);     // false (compares references of sub-arrays)
Arrays.deepEquals(array1, array2); // true (compares content recursively)
```

**Rule:** Use `deepEquals()` and `deepToString()` for multi-dimensional arrays.

---

## Modules & Migration

### Q30: What's the difference between named modules, automatic modules, and the unnamed module?
**Answer:**
- **Named module**: Has `module-info.java`, explicit declarations
- **Automatic module**: JAR on module path without `module-info.java`, gets automatic name from JAR filename
- **Unnamed module**: Code on classpath (not module path), can read all modules but cannot be required

**Example automatic module naming:**
`jackson-core-2.13.jar` → `jackson.core`

---

### Q31: What's the difference between bottom-up and top-down module migration?
**Answer:**
- **Bottom-up**: Convert leaf dependencies first, work up to main app
  - ✅ Guaranteed to work, clear dependencies
  - ❌ Slower benefits, need to wait for third parties

- **Top-down**: Convert main app first, dependencies become automatic modules  
  - ✅ Quick wins, immediate benefits, independent of third parties
  - ❌ Automatic module names can change, less predictable

**Recommendation:** Most projects should use top-down for practicality.

---

### Q32: What's the difference between exports and opens in module declarations?
**Answer:**
- **exports**: Makes packages visible for normal access (public API)
- **opens**: Allows deep reflection access to private members (for frameworks)

```java
module com.myapp {
    exports com.myapp.api;           // Public API - normal access
    opens com.myapp.model;           // For Spring/Hibernate reflection
    opens com.myapp.config to        // Qualified opens - specific modules only
        com.fasterxml.jackson.databind;
}
```

**Without opens:** Frameworks cannot access private fields/constructors via reflection.

---

## OOP and Encapsulation

### Q33: What's the difference between method hiding and method overriding?
**Answer:**
- **Instance methods**: Overridden - resolved at runtime based on object type
- **Static methods**: Hidden - resolved at compile time based on reference type  
- **Fields**: Always hidden - resolved at compile time based on reference type

```java
Parent ref = new Child();
ref.instanceMethod();  // Child's version (overridden - runtime)  
ref.staticMethod();    // Parent's version (hidden - compile time)
ref.field;             // Parent's field (hidden - compile time)
```

---

### Q34: When is super() automatically inserted by the compiler?
**Answer:** The compiler inserts `super()` **only if**:
1. Constructor doesn't explicitly call `super()` or `this()`
2. **AND** the superclass has a no-argument constructor

**If parent has only parameterized constructors:** You **must** explicitly call `super(args)`.

```java
class Parent {
    Parent(String msg) { /* ... */ }  // No no-arg constructor
}

class Child extends Parent {
    Child() {
        super("required");  // ✅ Must explicitly call super with args
    }
    // Child() {} // ❌ Compile error - implicit super() fails
}
```

---

### Q35: How does protected access work across packages?
**Answer:** Protected access across packages has special rules:
- **Same package**: Accessible everywhere
- **Different package**: Only accessible from subclass, and only via **subclass reference**

```java
// Different package
class Child extends Parent {
    void test() {
        this.protectedMethod();           // ✅ Via subclass reference (this)
        new Child().protectedMethod();    // ✅ Via subclass reference
        new Parent().protectedMethod();   // ❌ Via parent reference - compile error
    }
}
```

---

### Q36: What's the key difference between static nested classes and inner classes?
**Answer:**
- **Static nested class**: Cannot access non-static outer members, no outer instance needed
- **Inner class**: Can access all outer members, requires outer instance

```java
class Outer {
    private String field = "outer";
    
    static class StaticNested {
        // Cannot access 'field' - no outer instance
    }
    
    class Inner {
        void method() { 
            System.out.println(field); // ✅ Can access outer field
        }
    }
}

// Instantiation:
Outer.StaticNested sn = new Outer.StaticNested();           // No outer instance
Outer.Inner inner = new Outer().new Inner();               // Requires outer instance
```

**Special note:** Classes in interfaces, enums, and records are **implicitly static** (not inner classes).

---

## Advanced Collections Topics

### Q37: What happens when you try to add null to different Collection types?
**Answer:**
- **ArrayList, LinkedList, HashSet, LinkedHashSet**: Allow null values
- **TreeSet**: Throws **NullPointerException** (cannot compare null)
- **HashMap, LinkedHashMap**: Allow null keys and values
- **TreeMap**: Throws **NullPointerException** for null keys
- **ConcurrentHashMap**: Throws **NullPointerException** for null keys/values

```java
List<String> list = new ArrayList<>();
list.add(null);              // ✅ OK

Set<String> hashSet = new HashSet<>();
hashSet.add(null);           // ✅ OK

Set<String> treeSet = new TreeSet<>();
// treeSet.add(null);        // ❌ NullPointerException
```

---

### Q38: What's the difference between fail-fast and fail-safe iterators?
**Answer:**
- **Fail-fast**: Throws **ConcurrentModificationException** if collection is modified during iteration
- **Fail-safe**: Works on a copy/snapshot, doesn't throw exceptions

```java
List<String> list = new ArrayList<>(List.of("a", "b", "c"));

// Fail-fast iterator:
for (String s : list) {
    list.add("d");           // ❌ ConcurrentModificationException
}

// Safe approach:
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    it.remove();             // ✅ OK - using iterator's remove method
}
```

**Fail-safe collections:** ConcurrentHashMap, CopyOnWriteArrayList, etc.

---

### Q39: What's the difference between Comparable and Comparator?
**Answer:**
- **Comparable**: Single, **natural ordering** defined by the class itself
- **Comparator**: Multiple **custom orderings** defined externally

```java
// Comparable - natural ordering
class Person implements Comparable<Person> {
    String name;
    int age;
    
    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);  // Natural: by name
    }
}

// Comparator - custom orderings
Comparator<Person> byAge = Comparator.comparing(p -> p.age);
Comparator<Person> byNameDesc = Comparator.comparing((Person p) -> p.name).reversed();

Collections.sort(people);          // Uses Comparable (by name)
Collections.sort(people, byAge);   // Uses Comparator (by age)
```

---

## Advanced Stream Operations

### Q40: What's the difference between findFirst() and findAny()?
**Answer:**
- **findFirst()**: Returns the **first element** in encounter order
- **findAny()**: Returns **any element** (optimized for parallel streams)

```java
List<String> words = List.of("apple", "banana", "cherry");

Optional<String> first = words.stream().findFirst();        // "apple"
Optional<String> any = words.stream().findAny();            // "apple" (sequential)

// In parallel streams:
Optional<String> parallelAny = words.parallelStream().findAny();  // Could be any element
```

**Use findAny() for better performance** when you don't care about which element.

---

### Q41: What's the difference between reduce() with and without identity?
**Answer:**
- **With identity**: Returns **T** (never empty)
- **Without identity**: Returns **Optional<T>** (could be empty)

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

// With identity:
int sum = numbers.stream().reduce(0, Integer::sum);           // 15 (int)

// Without identity:
Optional<Integer> sum2 = numbers.stream().reduce(Integer::sum); // Optional[15]

// Empty stream:
List<Integer> empty = List.of();
int emptySum = empty.stream().reduce(0, Integer::sum);        // 0 (identity)
Optional<Integer> emptySum2 = empty.stream().reduce(Integer::sum); // Optional.empty()
```

---

### Q42: What's the difference between map() and flatMap()?
**Answer:**
- **map()**: One-to-one transformation (T → R)
- **flatMap()**: One-to-many transformation, then flattens (T → Stream<R>)

```java
List<String> sentences = List.of("Hello world", "Java streams");

// map() - transforms each sentence to its length:
List<Integer> lengths = sentences.stream()
    .map(String::length)                    // Stream<Integer>
    .collect(Collectors.toList());          // [11, 12]

// flatMap() - splits sentences into words and flattens:
List<String> words = sentences.stream()
    .flatMap(s -> Arrays.stream(s.split(" ")))  // Stream<String> of words
    .collect(Collectors.toList());              // [Hello, world, Java, streams]
```

---

## Concurrency Fundamentals

### Q43: What's the difference between Runnable and Callable interfaces?
**Answer:**
- **Runnable**: `void run()` - no return value, no checked exceptions
- **Callable**: `V call() throws Exception` - returns value, can throw checked exceptions

```java
// Runnable:
Runnable task1 = () -> System.out.println("Running");

// Callable:
Callable<String> task2 = () -> {
    Thread.sleep(1000);  // Can throw InterruptedException
    return "Done";
};

ExecutorService executor = Executors.newSingleThreadExecutor();
Future<?> future1 = executor.submit(task1);        // Future<?> - no meaningful result
Future<String> future2 = executor.submit(task2);   // Future<String> - String result
```

---

### Q44: What happens when you submit more tasks than thread pool capacity?
**Answer:** Tasks are **queued** and executed when threads become available. The behavior depends on the queue type:

```java
// Fixed thread pool with queue:
ExecutorService executor = Executors.newFixedThreadPool(2);  // Only 2 threads

// Submit 5 tasks:
for (int i = 0; i < 5; i++) {
    final int taskId = i;
    executor.submit(() -> {
        System.out.println("Task " + taskId + " executing");
        Thread.sleep(2000);  // Simulate work
    });
}
// First 2 tasks execute immediately, remaining 3 wait in queue
```

**Queue types:**
- **Unbounded queue**: Tasks wait indefinitely (can cause memory issues)
- **Bounded queue**: Rejects tasks when full (throws RejectedExecutionException)

---

### Q45: What's the difference between execute() and submit()?
**Answer:**
- **execute()**: Fire-and-forget, no return value, for Runnable only
- **submit()**: Returns Future for result/status tracking, works with Runnable and Callable

```java
ExecutorService executor = Executors.newSingleThreadExecutor();

// execute() - no feedback:
executor.execute(() -> System.out.println("Fire and forget"));

// submit() - returns Future:
Future<?> future = executor.submit(() -> System.out.println("Trackable"));
future.get();  // Wait for completion and handle exceptions
```

---

## Pattern Matching and Switch

### Q46: What's the difference between traditional switch and pattern matching switch?
**Answer:**
- **Traditional switch**: Only works with constants (int, String, enum)
- **Pattern matching switch**: Works with types, patterns, and guards

```java
// Traditional switch:
switch (day) {
    case "MONDAY":
    case "TUESDAY":
        return "Weekday";
    default:
        return "Other";
}

// Pattern matching switch:
return switch (obj) {
    case String s when s.length() > 5 -> "Long string: " + s;
    case String s -> "Short string: " + s;
    case Integer i when i > 100 -> "Big number: " + i;
    case Integer i -> "Small number: " + i;
    case null -> "Null value";
    default -> "Unknown type";
};
```

---

### Q47: What is the significance of the "exhaustiveness" requirement in pattern matching?
**Answer:** The compiler must verify that **all possible values are handled** to prevent runtime MatchException. This is especially important with sealed classes:

```java
public sealed class Result permits Success, Error {}
final class Success extends Result { String data; }
final class Error extends Result { String message; }

// ✅ Exhaustive - compiler knows all possibilities:
String handle(Result result) {
    return switch (result) {
        case Success s -> "Got: " + s.data;
        case Error e -> "Error: " + e.message;
        // No default needed - all cases covered
    };
}

// ❌ Non-exhaustive without default:
String handleBad(Object obj) {
    return switch (obj) {
        case String s -> "String: " + s;
        case Integer i -> "Number: " + i;
        // Missing default - compile error!
    };
}
```

**Key insight:** Sealed classes enable exhaustive checking without default cases.

---

## Advanced Exception Handling

### Q48: What are the rules for multi-catch exception handling?
**Answer:** Multi-catch allows handling multiple exception types in one catch block with restrictions:

**Rules:**
1. Exception types must **not be subclasses** of each other
2. The variable is **implicitly final**
3. Common operations only (intersection of all types)

```java
try {
    riskyOperation();
} catch (IOException | SQLException e) {  // ✅ No inheritance relationship
    logger.error("Operation failed", e);   // Common method
    // e = new IOException();              // ❌ e is implicitly final
}

// ❌ Invalid - IOException is parent of FileNotFoundException:
// catch (IOException | FileNotFoundException e) {}
```

---

### Q49: What happens with exception handling in method overriding?
**Answer:** Overriding methods have **stricter exception rules**:

1. **Checked exceptions**: Can only throw same or **subclasses** of parent's exceptions
2. **Unchecked exceptions**: No restrictions
3. **Cannot add new checked exceptions**

```java
class Parent {
    void method() throws IOException { }
}

class Child extends Parent {
    @Override
    void method() throws FileNotFoundException { }  // ✅ Subclass of IOException
    
    // @Override
    // void method() throws SQLException { }        // ❌ New checked exception
    
    // @Override  
    // void method() throws RuntimeException { }    // ✅ Unchecked - allowed
}
```

---

### Q50: What's the difference between throw and throws?
**Answer:**
- **throw**: Actually throws an exception (executable statement)
- **throws**: Declares that a method might throw exceptions (method signature)

```java
public void processFile(String filename) throws IOException {  // declares possible exception
    if (filename == null) {
        throw new IllegalArgumentException("Filename cannot be null");  // actually throws
    }
    
    // Code that might throw IOException
    Files.readString(Path.of(filename));  // IOException propagates up
}
```

---

## Advanced Generics

### Q51: What is type erasure and how does it affect generics at runtime?
**Answer:** **Type erasure** removes generic type information at runtime for backward compatibility:

```java
List<String> strings = new ArrayList<>();
List<Integer> numbers = new ArrayList<>();

// At runtime, both are just List:
System.out.println(strings.getClass() == numbers.getClass());  // true

// Cannot check generic type at runtime:
// if (list instanceof List<String>) {}  // ❌ Compile error

// But can check raw type:
if (list instanceof List) { }  // ✅ OK

// Generic information lost:
Method method = List.class.getMethod("add", Object.class);  // Parameter is Object, not T
```

**Implications:**
- No generic type checking at runtime
- Cannot create arrays of generic types
- Cannot use generics with instanceof (except wildcards)

---

### Q52: What's the difference between <?> and <? extends Object>?
**Answer:** They are **functionally equivalent** but have different semantics:

- **<?>**: "Unknown type" (preferred for readability)
- **<? extends Object>**: "Some type that extends Object" (verbose)

```java
List<?> list1 = new ArrayList<String>();         // ✅ More idiomatic
List<? extends Object> list2 = new ArrayList<String>(); // ✅ Same meaning, verbose

// Both have same limitations:
// list1.add("hello");  // ❌ Cannot add anything except null
// list2.add("hello");  // ❌ Cannot add anything except null

Object obj1 = list1.get(0);  // ✅ Can read as Object
Object obj2 = list2.get(0);  // ✅ Can read as Object
```

**Recommendation:** Use <?> for cleaner code.

---

### Q53: Can you create a generic array? Why or why not?
**Answer:** **No**, you cannot create generic arrays due to type erasure and array covariance:

```java
// ❌ Compile error:
// List<String>[] array = new List<String>[10];

// ❌ Would be unsafe:
// Object[] objArray = array;
// objArray[0] = new ArrayList<Integer>();  // Runtime: fine, Compile: disaster

// ✅ Workarounds:
List<String>[] array = new List[10];  // Raw type array
List<String>[] array2 = (List<String>[]) new List[10];  // Unchecked cast

// ✅ Better alternative:
List<List<String>> listOfLists = new ArrayList<>();
```

**Reason:** Arrays are covariant (String[] is a Object[]) but generics are invariant (List<String> is not a List<Object>).

---

## Advanced Date/Time

### Q54: What's the difference between Instant and ZonedDateTime?
**Answer:**
- **Instant**: Point in time on UTC timeline (machine time)
- **ZonedDateTime**: Point in time with timezone context (human time)

```java
// Same moment in time, different representations:
Instant instant = Instant.now();                    // 2024-03-15T14:30:45.123Z
ZonedDateTime tokyo = instant.atZone(ZoneId.of("Asia/Tokyo"));      // 2024-03-15T23:30:45.123+09:00
ZonedDateTime ny = instant.atZone(ZoneId.of("America/New_York"));   // 2024-03-15T10:30:45.123-04:00

System.out.println(instant.equals(tokyo.toInstant()));  // true - same moment
System.out.println(instant.equals(ny.toInstant()));     // true - same moment
```

**Use cases:**
- **Instant**: Database timestamps, logging, calculations
- **ZonedDateTime**: User interfaces, scheduling, display

---

### Q55: How do you handle timezone-aware date arithmetic correctly?
**Answer:** Always use **ZonedDateTime** for timezone-aware calculations to handle DST transitions:

```java
// ❌ Wrong - loses timezone information:
LocalDateTime local = LocalDateTime.of(2024, 3, 10, 1, 30);  // DST spring forward day
LocalDateTime later = local.plusHours(2);  // Just adds 2 hours mechanically

// ✅ Correct - respects timezone rules:
ZonedDateTime zoned = ZonedDateTime.of(2024, 3, 10, 1, 30, 0, 0, 
                                     ZoneId.of("America/New_York"));
ZonedDateTime zonedLater = zoned.plusHours(2);  // Handles DST transition correctly

// On DST spring forward, 2:00 AM becomes 3:00 AM, so adding 1 hour to 1:30 AM gives 3:30 AM
```

---

### Q56: What's the difference between Period and Duration?
**Answer:**
- **Period**: Date-based amount (years, months, days)
- **Duration**: Time-based amount (hours, minutes, seconds)

```java
// Period - for dates:
Period period = Period.of(1, 2, 15);  // 1 year, 2 months, 15 days
LocalDate date = LocalDate.of(2024, 1, 1);
LocalDate later = date.plus(period);  // 2025-03-16

// Duration - for time:
Duration duration = Duration.ofHours(2).plusMinutes(30);
Instant instant = Instant.now();
Instant laterInstant = instant.plus(duration);

// ❌ Wrong combinations:
// LocalDate.now().plus(Duration.ofHours(1));  // Compile error
// LocalTime.now().plus(Period.ofDays(1));     // Compile error
```

**Rule:** Use Period with date-based types, Duration with time-based types.

---

## Advanced I/O Operations

### Q57: What's the difference between character encoding in FileReader vs InputStreamReader?
**Answer:**
- **FileReader**: Always uses **platform default encoding** (can't be changed)
- **InputStreamReader**: Allows **explicit encoding specification**

```java
// FileReader - platform dependent:
try (FileReader fr = new FileReader("file.txt")) {
    // Uses system default encoding (UTF-8 on Linux/Mac, Windows-1252 on Windows)
}

// InputStreamReader - explicit encoding:
try (FileInputStream fis = new FileInputStream("file.txt");
     InputStreamReader isr = new InputStreamReader(fis, StandardCharsets.UTF_8)) {
    // Guaranteed UTF-8 regardless of platform
}

// Modern alternative - Files with explicit encoding:
String content = Files.readString(Path.of("file.txt"), StandardCharsets.UTF_8);
```

**Best practice:** Always specify encoding explicitly for cross-platform compatibility.

---

### Q58: What's the difference between Files.move() vs Files.copy() followed by Files.delete()?
**Answer:**
- **Files.move()**: **Atomic operation** when source and target are on same filesystem
- **copy() + delete()**: **Two separate operations**, not atomic

```java
Path source = Path.of("source.txt");
Path target = Path.of("target.txt");

// Atomic move (same filesystem):
Files.move(source, target, StandardCopyOption.REPLACE_EXISTING);

// Non-atomic alternative:
Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
Files.delete(source);  // If this fails, file exists in both locations!
```

**When to use each:**
- **move()**: When you need atomicity, renaming files
- **copy() + delete()**: When you need the original to remain temporarily, or need different error handling

---

### Q59: What's the difference between Path.toAbsolutePath() and Path.toRealPath()?
**Answer:**
- **toAbsolutePath()**: Resolves to absolute path **textually** (doesn't check filesystem)
- **toRealPath()**: Resolves to **canonical path** (checks filesystem, resolves links)

```java
// Create symbolic link: link.txt -> target.txt
Path link = Path.of("link.txt");
Path relative = Path.of("../docs/file.txt");

// toAbsolutePath() - textual resolution:
Path abs1 = link.toAbsolutePath();        // /current/dir/link.txt
Path abs2 = relative.toAbsolutePath();    // /current/dir/../docs/file.txt

// toRealPath() - filesystem resolution:  
Path real1 = link.toRealPath();           // /current/dir/target.txt (follows symlink)
Path real2 = relative.toRealPath();       // /current/docs/file.txt (normalizes ..)
```

**toRealPath() can throw IOException** if path doesn't exist or permission denied.

---

## Functional Programming Concepts

### Q60: What's the difference between Function, Predicate, Consumer, and Supplier?
**Answer:** These are core functional interfaces with different signatures:

```java
// Function<T, R> - transforms input to output:
Function<String, Integer> length = String::length;
Function<String, String> upper = String::toUpperCase;

// Predicate<T> - tests condition, returns boolean:
Predicate<String> isEmpty = String::isEmpty;
Predicate<Integer> isEven = n -> n % 2 == 0;

// Consumer<T> - consumes input, returns nothing:
Consumer<String> printer = System.out::println;
Consumer<List<String>> clearer = List::clear;

// Supplier<T> - supplies output, takes no input:
Supplier<String> randomUuid = () -> UUID.randomUUID().toString();
Supplier<LocalDateTime> now = LocalDateTime::now;

// Usage in streams:
List<String> words = List.of("hello", "world", "java");
words.stream()
     .filter(isEmpty.negate())    // Predicate
     .map(upper)                  // Function
     .forEach(printer);           // Consumer
```

---

### Q61: How do method references work and when should you use them?
**Answer:** Method references are shorthand for lambdas when calling existing methods:

**Four types:**
1. **Static method**: `ClassName::methodName`
2. **Instance method of particular object**: `object::methodName`
3. **Instance method of arbitrary object**: `ClassName::methodName`
4. **Constructor**: `ClassName::new`

```java
List<String> words = List.of("apple", "banana", "cherry");

// 1. Static method reference:
words.stream().map(String::valueOf);           // String.valueOf(s)
// vs lambda: words.stream().map(s -> String.valueOf(s));

// 2. Instance method of particular object:
PrintStream out = System.out;
words.forEach(out::println);                   // out.println(s)
// vs lambda: words.forEach(s -> out.println(s));

// 3. Instance method of arbitrary object:
words.stream().map(String::toUpperCase);       // s.toUpperCase()
// vs lambda: words.stream().map(s -> s.toUpperCase());

// 4. Constructor reference:
words.stream().map(StringBuilder::new);        // new StringBuilder(s)
// vs lambda: words.stream().map(s -> new StringBuilder(s));
```

**When to use:** When the lambda just calls a single method without additional logic.

---

### Q62: What is currying and how can it be implemented in Java?
**Answer:** **Currying** transforms a function with multiple parameters into a series of functions with single parameters:

```java
// Regular function with 3 parameters:
static int multiply(int a, int b, int c) {
    return a * b * c;
}

// Curried version using Function composition:
static Function<Integer, Function<Integer, Function<Integer, Integer>>> curriedMultiply() {
    return a -> b -> c -> a * b * c;
}

// Usage:
Function<Integer, Function<Integer, Function<Integer, Integer>>> curried = curriedMultiply();

// Step by step:
Function<Integer, Function<Integer, Integer>> step1 = curried.apply(2);
Function<Integer, Integer> step2 = step1.apply(3);
Integer result = step2.apply(4);  // 24

// Or all at once:
Integer result2 = curriedMultiply().apply(2).apply(3).apply(4);  // 24

// Practical example - partially applied functions:
Function<Integer, Function<Integer, Integer>> multiplyBy5 = curriedMultiply().apply(5);
Function<Integer, Integer> multiplyBy5And3 = multiplyBy5.apply(3);

int result3 = multiplyBy5And3.apply(2);  // 5 * 3 * 2 = 30
```

**Use case:** Creating specialized functions from general ones.

---

## Advanced Concurrency

### Q63: What's the difference between CountDownLatch and CyclicBarrier?
**Answer:**
- **CountDownLatch**: One-time use, threads wait for countdown to zero
- **CyclicBarrier**: Reusable, threads wait for each other, then all proceed together

```java
// CountDownLatch - wait for multiple tasks to complete:
CountDownLatch latch = new CountDownLatch(3);  // Wait for 3 tasks

// Worker threads:
executor.submit(() -> { 
    doWork(); 
    latch.countDown();  // Decrease count
});

// Main thread waits:
latch.await();  // Blocks until count reaches 0
System.out.println("All tasks completed");

// CyclicBarrier - coordinate multiple threads:
CyclicBarrier barrier = new CyclicBarrier(3, () -> 
    System.out.println("All threads reached barrier"));

// Each thread:
executor.submit(() -> {
    doPhase1();
    barrier.await();  // Wait for other threads
    doPhase2();       // All threads start phase2 together
});
```

**Key differences:**
- **Latch**: N-to-1 (N threads signal 1 waiting thread)
- **Barrier**: N-to-N (N threads wait for each other)

---

### Q64: What happens when you don't shut down an ExecutorService?
**Answer:** The **JVM won't terminate** because executor threads are still alive, even if main() completes:

```java
public static void main(String[] args) {
    ExecutorService executor = Executors.newFixedThreadPool(2);
    
    executor.submit(() -> System.out.println("Task executed"));
    
    // ❌ Without shutdown:
    System.out.println("Main finished");  // Prints, but JVM doesn't exit
    
    // ✅ Proper shutdown:
    executor.shutdown();
    try {
        if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
            executor.shutdownNow();  // Force shutdown if tasks don't finish
        }
    } catch (InterruptedException e) {
        executor.shutdownNow();
    }
}
```

**Best practice:** Always shutdown executors, preferably in try-with-resources or finally blocks.

---

### Q65: What's the difference between parallelStream() and regular streams with parallel execution?
**Answer:**
- **parallelStream()**: Creates parallel stream from collection
- **stream().parallel()**: Converts existing stream to parallel

**Both use ForkJoinPool.commonPool()** by default:

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);

// Method 1 - parallel from start:
int sum1 = numbers.parallelStream()
                 .filter(n -> n % 2 == 0)
                 .mapToInt(Integer::intValue)
                 .sum();

// Method 2 - convert to parallel:
int sum2 = numbers.stream()
                 .parallel()
                 .filter(n -> n % 2 == 0)
                 .mapToInt(Integer::intValue)
                 .sum();

// Both are equivalent and use the same thread pool
```

**When to use parallel streams:**
- ✅ Large datasets (10,000+ elements)
- ✅ CPU-intensive operations
- ❌ I/O operations (blocking)
- ❌ Small datasets (overhead > benefit)

---
