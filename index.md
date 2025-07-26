# Java OCP 21 Flashcards

## Table of Contents

- **Java 21 New Features**
  - [Pattern Matching with switch (Java 21)](#-pattern-matching-with-switch-java-21)
  - [Sealed Classes (Java 21)](#-sealed-classes-java-21)
  - [Records (Java 21 Features)](#-records-java-21-features)
  - [Virtual Threads vs Platform Threads](#-virtual-threads-vs-platform-threads)
  - [Text Blocks (Java 21)](#-text-blocks-java-21)
  - [Stream Collectors and Function.identity()](#-stream-collectors-and-functionidentity)
  - [Module Migration Strategies: Bottom-Up vs Top-Down](#-module-migration-strategies-bottom-up-vs-top-down)
  - [ExecutorService with Lambdas - submit() Method Overloading](#-executorservice-with-lambdas---submit-method-overloading)
  - [Stream Lazy Evaluation - Intermediate vs Terminal Operations](#-stream-lazy-evaluation---intermediate-vs-terminal-operations)
  - [StringBuilder Reference Behavior](#-stringbuilder-reference-behavior)

- **OOP and Encapsulation**
  - [Instance Methods vs Variables and Static Methods](#-instance-methods-vs-variables-and-static-methods)
  - [Constructor Chaining and super()](#-constructor-chaining-and-super)
  - [equals() Method Behavior](#-equals-method-behavior)
  - [protected Access Across Packages](#-protected-access-across-packages)
  - [Static Field Access and Class Initialization](#-static-field-access-and-class-initialization)

- **Streams and Functional Programming**
  - [Stream Operations and Exception Handling](#-stream-operations-and-exception-handling)
  - [Stream Lazy Evaluation - Intermediate vs Terminal Operations](#-stream-lazy-evaluation---intermediate-vs-terminal-operations)
  - [Stream Collectors and Function.identity()](#-stream-collectors-and-functionidentity)
  - [Lambda Target Types - Runnable vs Callable](#-lambda-target-types---runnable-vs-callable)

- **Exceptions and Try-With-Resources**
  - [Try-With-Resources and Suppressed Exceptions](#-try-with-resources-and-suppressed-exceptions)
  - [Multi-Catch and Try-With-Resources Exception Flow](#-multi-catch-and-try-with-resources-exception-flow)
  - [Exception Output Methods](#-exception-output-methods)

- **Collections and Generics**
  - [Generics: Bounded Wildcards (PECS Rule)](#-generics-bounded-wildcards-pecs-rule)
  - [Deque Stack vs Queue Operations](#-deque-stack-vs-queue-operations)
  - [Set Operations and Characteristics](#-set-operations-and-characteristics)
  - [Map Operations and Merge Method](#-map-operations-and-merge-method)

- **Date, Time and Localization**
  - [LocalDate and LocalTime Operations (Date-Time API)](#-localdate-and-localtime-operations-date-time-api)
  - [Localization - Locale and Resource Bundles](#-localization---locale-and-resource-bundles)

- **I/O and NIO**
  - [Files.mismatch() and Path Operations](#-filesmismatch-and-path-operations)
  - [Java I/O - File Reading and Writing](#-java-io---file-reading-and-writing)

- **Math and Wrapper APIs**
  - [Math API and Wrapper Classes](#-math-api-and-wrapper-classes)
  - [Arrays.binarySearch() and Arrays.compare()](#-arraysbinarysearch-and-arrayscompare)

- **Enums and Constants**
  - [Enum with Fields, Methods, and Constructors](#-enum-with-fields-methods-and-constructors)

- **Modules and Migration**
  - [Module System - Basic Declaration and Dependencies](#-module-system---basic-declaration-and-dependencies)
  - [Module Migration Strategies: Bottom-Up vs Top-Down](#-module-migration-strategies-bottom-up-vs-top-down)


## 🃏 Instance Methods vs Variables and Static Methods

**Rule:** Instance methods are **overridden**, while **variables and static methods are hidden**.

- The method invoked depends on the **actual object type** (runtime)
- The field accessed depends on the **reference type** (compile-time)

```java
class Parent {
    String role = "Parent";
    static String familyName() { return "Smith"; }
    String introduce() { return "I am a Parent"; }
}

class Child extends Parent {
    String role = "Child";                      // Field hiding
    static String familyName() { return "Johnson"; }  // Method hiding
    String introduce() { return "I am a Child"; }     // Method overriding
}

Parent member = new Child();
System.out.println(member.role);        // Parent (field access - compile-time)
System.out.println(member.familyName()); // Smith (static method - compile-time)
System.out.println(member.introduce());  // I am a Child (instance method - runtime)
```

**💡 Learning Tip:** Remember "HIDE vs OVERRIDE" - static methods and fields are HIDDEN (reference type matters), instance methods are OVERRIDDEN (object type matters).

**Q:** Does overriding a method replace the original method call even if the reference is of parent type?  
**A:** Yes — overridden instance methods use the object type at runtime (dynamic dispatch). Static methods use the reference type (they are hidden, not overridden).

---

## 🃏 Generics: Bounded Wildcards (PECS Rule)

**PECS Rule:** **P**roducer **E**xtends, **C**onsumer **S**uper

- `? extends T`: **READ-ONLY** - Can read items of type T or its subtypes. Cannot add anything (except `null`)
- `? super T`: **WRITE-ONLY** - Can write T or its subtypes. Cannot safely read (except `Object`)

```java
// Producer Extends - Reading from a collection
List<? extends Number> numbers = List.of(1, 2.0, 3L);
Number n = numbers.get(0);    // ✅ OK - can read as Number
// numbers.add(3);            // ❌ Compile error - cannot write

// Consumer Super - Writing to a collection  
List<? super Integer> values = new ArrayList<Number>();
values.add(10);       // ✅ OK - can write Integer/subtypes
values.add(42);       // ✅ OK - can write Integer/subtypes
// Integer i = values.get(0);  // ❌ Compile error - can only read as Object
Object obj = values.get(0);   // ✅ OK - can read as Object
```

**💡 Learning Tip:** Think of wildcards as "one-way streets" - extends for reading OUT, super for writing IN.

---

## 🃏 Constructor Chaining and super()

**Rule:** If a constructor does not explicitly call `super()` or `this()`, the compiler inserts `super()` **only if the superclass has a no-arg constructor**.

```java
class Ancestor {
    Ancestor(String msg) {
        System.out.println("Ancestor: " + msg);
    }
    // No no-arg constructor available!
}

class Parent extends Ancestor {
    // ❌ This would cause compile error:
    // Parent() {} // Implicit super() call fails
    
    // ✅ Must explicitly call super with argument:
    Parent() {
        super("Default parent message"); // Explicit call required
    }
    
    Parent(String name) {
        super("Parent: " + name);       // Explicit call required
    }
}

class Child extends Parent {
    Child() {
        // ✅ Implicit super() works - Parent has no-arg constructor
        System.out.println("Child constructor");
    }
}
```

**Constructor execution order:**
```java
Child child = new Child();
// Output:
// Ancestor: Default parent message
// Child constructor
```

**💡 Learning Tip:** "No free lunch" - if parent needs arguments, children must provide them explicitly.

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

## 🃏 Pattern Matching with switch (Java 21)

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

## 🃏 Sealed Classes (Java 21)

**Purpose:** Restrict which classes can extend/implement a type.

```java
// Sealed class - only specific classes can extend
public sealed class Shape 
    permits Circle, Rectangle, Triangle {
}

// Permitted subclasses must be: final, sealed, or non-sealed
final class Circle extends Shape {
    private final double radius;
    Circle(double radius) { this.radius = radius; }
}

sealed class Rectangle extends Shape 
    permits Square {
    protected final double width, height;
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
}

final class Square extends Rectangle {
    Square(double side) { super(side, side); }
}

non-sealed class Triangle extends Shape {
    // non-sealed allows further extension
}

class IsoscelesTriangle extends Triangle {} // ✅ OK - Triangle is non-sealed
// class Pentagon extends Shape {} // ❌ Compile error - not permitted
```

**Sealed interfaces:**
```java
public sealed interface Vehicle 
    permits Car, Truck, Motorcycle {
}

record Car(String model) implements Vehicle {}
record Truck(int capacity) implements Vehicle {}
record Motorcycle(boolean hasSidecar) implements Vehicle {}
```

**Pattern matching with sealed types:**
```java
static double calculateArea(Shape shape) {
    return switch (shape) {
        case Circle(var radius) -> Math.PI * radius * radius;
        case Rectangle(var width, var height) -> width * height;
        case Triangle t -> 10.0; // Simplified calculation
        // No default needed - compiler knows all possibilities!
    };
}
```

**💡 Learning Tip:** Sealed = "Exclusive club" - only VIP classes (permits list) can join. Compiler knows all possibilities, enabling exhaustive pattern matching.

---

## 🃏 Records (Java 21 Features)

**Basic record syntax:**
```java
// Compact record declaration
public record Person(String name, int age) {
    // Automatically generates:
    // - Constructor: Person(String name, int age)
    // - Accessors: name(), age()
    // - equals(), hashCode(), toString()
}

// Usage:
Person person = new Person("Alice", 25);
System.out.println(person.name()); // Alice
System.out.println(person.age());  // 25
```

**Record with validation and custom methods:**
```java
public record BankAccount(String accountNumber, double balance) {
    // Compact constructor for validation
    public BankAccount {
        if (balance < 0) {
            throw new IllegalArgumentException("Balance cannot be negative");
        }
        if (accountNumber == null || accountNumber.isBlank()) {
            throw new IllegalArgumentException("Account number required");
        }
    }
    
    // Custom methods allowed
    public boolean isOverdrawn() {
        return balance < 0;
    }
    
    public BankAccount withdraw(double amount) {
        return new BankAccount(accountNumber, balance - amount);
    }
}
```

**Records with pattern matching:**
```java
record Point(int x, int y) {}
record ColoredPoint(Point point, String color) {}

static String describe(Object obj) {
    return switch (obj) {
        case Point(int x, int y) -> "Point at (" + x + ", " + y + ")";
        case ColoredPoint(Point(int x, int y), String color) -> 
            color + " point at (" + x + ", " + y + ")";
        default -> "Unknown";
    };
}
```

**💡 Learning Tip:** Records = "Data class on autopilot" - automatic constructor, accessors, equals/hashCode/toString. Perfect for immutable data carriers.

---

## 🃏 Text Blocks (Java 21)

**Multi-line strings with preserved formatting:**

```java
// Traditional string concatenation:
String html1 = "<html>\n" +
               "  <body>\n" +
               "    <h1>Hello World</h1>\n" +
               "  </body>\n" +
               "</html>";

// Text block (Java 15+):
String html2 = """
    <html>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
    """;

// JSON example:
String json = """
    {
      "name": "John Doe",
      "age": 30,
      "city": "New York"
    }
    """;

// SQL example:
String query = """
    SELECT users.name, users.email, orders.total
    FROM users
    JOIN orders ON users.id = orders.user_id
    WHERE orders.date >= ?
    ORDER BY orders.total DESC
    """;
```

**Text block processing methods:**
```java
String textBlock = """
    Line 1
    Line 2
    Line 3
    """;

// String methods work normally:
String[] lines = textBlock.lines().toArray(String[]::new);
String trimmed = textBlock.strip();
boolean contains = textBlock.contains("Line 2");

// Formatted text blocks:
String template = """
    Hello %s,
    Your balance is $%.2f
    Account: %s
    """;
String message = template.formatted("Alice", 1234.56, "ACC-123");
```

**💡 Learning Tip:** Text blocks = "What you see is what you get" - preserves formatting, perfect for HTML, JSON, SQL. Triple quotes mark the boundaries.

---

## 🃏 Try-With-Resources and Suppressed Exceptions

The **exception in the try block is primary**. Exceptions thrown by `close()` are **suppressed** and attached to the primary exception.

```java
class MyResource implements AutoCloseable {
    private String name;
    
    MyResource(String name) { this.name = name; }
    
    void doWork() throws Exception {
        throw new RuntimeException("Work failed in " + name);
    }
    
    @Override
    public void close() throws Exception {
        throw new RuntimeException("Close failed for " + name);
    }
}

// Example usage:
try (MyResource res = new MyResource("Database")) {
    res.doWork();  // Throws primary exception
    // close() will be called automatically and its exception suppressed
} catch (Exception e) {
    System.out.println("Primary: " + e.getMessage());  // Work failed in Database
    
    // Check suppressed exceptions:
    for (Throwable suppressed : e.getSuppressed()) {
        System.out.println("Suppressed: " + suppressed.getMessage()); // Close failed for Database
    }
}
```

**Multiple resources example:**
```java
try (MyResource r1 = new MyResource("DB1");
     MyResource r2 = new MyResource("DB2")) {
    // Resources closed in reverse order: r2.close(), then r1.close()
    throw new RuntimeException("Business logic error");
} catch (Exception e) {
    // Primary: Business logic error
    // Suppressed: Close failed for DB2, Close failed for DB1
}
```

**💡 Learning Tip:** Primary exception is the "star of the show" - suppressed exceptions are the "supporting cast."

---

## 🃏 protected Access Across Packages

- **Same package:** accessible anywhere
- **Different package:** only accessible from **subclass**, and only via **subclass reference** (not parent reference)

```java
// File: family/Parent.java
package family;

public class Parent {
    protected void guide() { System.out.println("Parent guidance"); }
    protected String advice = "Listen to your parents";
}

// File: extended/Child.java  
package extended;
import family.Parent;

public class Child extends Parent {
    void test() {
        // ✅ Accessing through subclass (this):
        guide();                    // OK - implicit this.guide()
        this.guide();              // OK - explicit this
        System.out.println(advice); // OK - inherited field
        
        // ✅ Accessing through subclass reference:
        Child child = new Child();
        child.guide();             // OK - subclass reference
        
        // ❌ Accessing through parent reference (different package):
        Parent parent = new Parent();
        // parent.guide();         // Compile error!
        // parent.advice;          // Compile error!
        
        // ✅ But this works (casting):
        Parent parentRef = new Child();
        // parentRef.guide();      // Still compile error - reference type matters
    }
}
```

**💡 Learning Tip:** Protected across packages = "Family only, and only through your own family line."

---

## 🃏 Files.mismatch() and Path Operations

**Files.mismatch()** - Compares two files **byte by byte**:
- Returns **index of first mismatching byte** (0-based)
- Returns **-1** if files are identical
- Throws `IOException` if paths are invalid or inaccessible

```java
import java.nio.file.*;
import java.io.IOException;

try {
    Path file1 = Path.of("document1.txt");  // Content: "Hello World"
    Path file2 = Path.of("document2.txt");  // Content: "Hello Mars"
    Path file3 = Path.of("document3.txt");  // Content: "Hello World"
    
    long result1 = Files.mismatch(file1, file2);  // Returns 6 (index of 'W' vs 'M')
    long result2 = Files.mismatch(file1, file3);  // Returns -1 (identical)
    
    System.out.println("Mismatch at byte: " + result1);  // 6
    System.out.println("Files identical: " + (result2 == -1));  // true
    
} catch (IOException e) {
    System.out.println("Error reading files: " + e.getMessage());
}
```

**Other useful Path/Files operations (Java 21):**
```java
// Path operations:
Path path = Path.of("users", "documents", "file.txt");
Path absolute = path.toAbsolutePath();
Path parent = path.getParent();
Path filename = path.getFileName();

// Files operations:
boolean exists = Files.exists(path);
boolean readable = Files.isReadable(path);
long size = Files.size(path);
String content = Files.readString(path);
List<String> lines = Files.readAllLines(path);

// Directory operations:
Files.createDirectories(Path.of("new/nested/directory"));
try (var stream = Files.walk(Path.of("."))) {
    stream.filter(Files::isRegularFile)
          .forEach(System.out::println);
}
```

**💡 Learning Tip:** Mismatch = "Find the first difference" (-1 means no differences found).

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

## 🃏 StringBuilder Reference Behavior

Java is **pass-by-value** for references. You get a copy of the reference, not the reference itself.

```java
public class StringBuilderExample {
    static void modifyContent(StringBuilder sb) {
        sb.append(" modified");     // ✅ Modifies the object - caller sees this
        System.out.println("Inside method after append: " + sb);
    }
    
    static void reassignReference(StringBuilder sb) {
        sb.append(" first");        // ✅ Modifies original object
        sb = new StringBuilder("completely new");  // ❌ Only changes local copy of reference
        sb.append(" content");      // ❌ Modifies the new object, not original
        System.out.println("Inside method after reassign: " + sb);
    }
    
    public static void main(String[] args) {
        StringBuilder original = new StringBuilder("start");
        
        modifyContent(original);
        System.out.println("After modifyContent: " + original);  // "start modified"
        
        reassignReference(original);  
        System.out.println("After reassignReference: " + original);  // "start modified first"
        // Note: "completely new content" is lost!
    }
}
```

**💡 Learning Tip:** You can change the object's content through the reference, but you can't change where the original reference points.

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

---

## 🃏 Module Migration Strategies: Bottom-Up vs Top-Down

**Bottom-Up:** Start with **leaf dependencies** (no dependencies), work up to main app.  
**Top-Down:** Start with **main application**, dependencies become automatic modules.

```java
// BOTTOM-UP: Convert dependencies first
// Step 1: UtilLib (leaf) -> DatabaseLib -> ServiceLayer -> MainApp
module com.company.util {
    exports com.company.util.string;
    // No requires - leaf module
}

// TOP-DOWN: Convert main app first, deps are automatic modules
module com.company.myapp {
    requires service.layer;      // automatic module from service-layer.jar
    requires commons.lang3;      // automatic module from commons-lang3.jar
}

// Automatic module naming: "jackson-core-2.13.jar" -> "jackson.core"
```

**✅ Bottom-Up:** Guaranteed to work, lower risk, clear dependencies  
**❌ Bottom-Up:** Slower benefits, need to wait for third-party libs

**✅ Top-Down:** Quick wins, immediate benefits, independent of third parties  
**❌ Top-Down:** Automatic module names can change, less predictable

**💡 Learning Tip:** Bottom-up = "Foundation first" (solid but slow), Top-down = "Roof first" (fast but requires careful reinforcement later). Most projects should use top-down for practicality.

---

## 🃏 Virtual Threads vs Platform Threads

**Virtual Threads (Java 21):** Lightweight threads managed by JVM, not OS.

```java
// Creating virtual threads:
Thread.ofVirtual().start(() -> System.out.println("Virtual thread"));
Thread.startVirtualThread(() -> System.out.println("Virtual thread"));

// Platform thread (traditional):
Thread.ofPlatform().start(() -> System.out.println("Platform thread"));
new Thread(() -> System.out.println("Platform thread")).start();

// ExecutorService with virtual threads:
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 1000; i++) {
        executor.submit(() -> {
            // Simulate I/O work
            try { Thread.sleep(1000); } catch (InterruptedException e) {}
            System.out.println("Task completed by " + Thread.currentThread());
        });
    }
}
```

**Key Differences:**
- **Virtual:** Millions possible, cheap creation, JVM-managed, perfect for I/O-bound tasks
- **Platform:** ~1000s max, expensive creation, OS-managed, better for CPU-bound tasks

**💡 Learning Tip:** Virtual = "Featherweight boxer" (many, fast), Platform = "Heavyweight boxer" (few, powerful).

---

## 🃏 CyclicBarrier - Synchronization Point

**Purpose:** Multiple threads wait for each other at a common barrier point.

```java
import java.util.concurrent.CyclicBarrier;

// Create barrier for 3 threads
CyclicBarrier barrier = new CyclicBarrier(3, () -> {
    System.out.println("All threads reached barrier! Proceeding...");
});

Runnable task = () -> {
    String name = Thread.currentThread().getName();
    System.out.println(name + " working...");
    
    try {
        Thread.sleep(1000); // Simulate work
        System.out.println(name + " finished work, waiting at barrier");
        
        barrier.await(); // Wait here until all 3 threads arrive
        
        System.out.println(name + " proceeding after barrier!");
    } catch (Exception e) {
        e.printStackTrace();
    }
};

// Start 3 threads - they'll all wait at barrier, then proceed together
Thread.startVirtualThread(task);
Thread.startVirtualThread(task);  
Thread.startVirtualThread(task);
```

**CyclicBarrier vs CountDownLatch:**
```java
// CyclicBarrier - reusable, threads wait for each other
CyclicBarrier barrier = new CyclicBarrier(3);
barrier.await(); // Thread waits for others
// After all reach barrier, it resets for next use

// CountDownLatch - one-time use, threads wait for countdown
CountDownLatch latch = new CountDownLatch(3);
latch.countDown(); // Decrement counter
latch.await();     // Wait until counter reaches 0
```

**💡 Learning Tip:** CyclicBarrier = "Group photo" - everyone waits until all are ready, then proceed together. "Cyclic" = reusable for multiple rounds.

---

## 🃏 Exception Output Methods

**Rule:** Exception output methods provide **different levels of detail** for debugging.
- **System.out.println(exception)**: Prints only **exception class name and message**.
- **exception.printStackTrace()**: Prints **complete method call chain** with line numbers.
- Stack trace shows the **full path** from thread start to where exception was created.

```java
class Parent {
    void callChild() {
        Child child = new Child();
        child.processFamily();  // Line 4
    }
}

class Child {
    void processFamily() {
        throw new RuntimeException("Family processing failed");  // Line 9
    }
}

public class FamilyApp {
    public static void main(String[] args) {
        try {
            Parent parent = new Parent();
            parent.callChild();  // Line 15
        } catch (RuntimeException e) {
            System.out.println(e);           // Output: java.lang.RuntimeException: Family processing failed
            System.out.println("---");
            e.printStackTrace();             // Output: Full stack trace with method names and line numbers
            /*
            java.lang.RuntimeException: Family processing failed
                at Child.processFamily(Child.java:9)
                at Parent.callChild(Parent.java:4)
                at FamilyApp.main(FamilyApp.java:15)
            */
        }
    }
}
```

**💡 Learning Tip:** Remember "PRINT vs TRACE" - println() gives you the message, printStackTrace() gives you the journey.

**Q:** What's the difference between printing an exception and calling printStackTrace()?  
**A:** println() shows only class name and message, printStackTrace() shows the complete method call chain with line numbers back to thread start.

---

## 🃏 Multi-Catch and Try-With-Resources Exception Flow

**⚠️ This code has a COMPILE ERROR!** Let's analyze why and fix it:

```java
5:  public static void main(String... unused) {
6:     System.out.print("1");                    // Always executes first
7:     try (StringBuilder resource1 = new StringBuilder()) {
8:        System.out.print("2");                 // Executes in try block
9:        throw new IllegalArgumentException();  // Throws RuntimeException
10:    } catch (Exception error1 | RuntimeException error2) {  // ❌ COMPILE ERROR!
11:       System.out.print("3");
12:       throw new FileNotFoundException();
13:    } finally {
14:       System.out.print("4");                 // Always executes
15: } }
```

**🚫 Compilation Error:** Line 10 is invalid because `RuntimeException` is a subclass of `Exception`. In multi-catch, you cannot have a subclass and superclass in the same statement.

**✅ Fixed Version 1 - Remove redundant RuntimeException:**
```java
5:  public static void main(String... unused) throws Exception {
6:     System.out.print("1");                    // Step 1: Print "1"
7:     try (StringBuilder resource1 = new StringBuilder()) {
8:        System.out.print("2");                 // Step 2: Print "2"  
9:        throw new IllegalArgumentException();  // Step 3: Throw RuntimeException
10:    } catch (Exception error1) {              // Step 4: Catch Exception (includes RuntimeException)
11:       System.out.print("3");                 // Step 5: Print "3"
12:       throw new FileNotFoundException();     // Step 6: Throw new exception
13:    } finally {
14:       System.out.print("4");                 // Step 7: Always print "4"
15: } }
// Output: "1234" then FileNotFoundException is thrown
```

**✅ Fixed Version 2 - Separate catch blocks:**
```java
5:  public static void main(String... unused) throws Exception {
6:     System.out.print("1");                    // Step 1: Print "1"
7:     try (StringBuilder resource1 = new StringBuilder()) {
8:        System.out.print("2");                 // Step 2: Print "2"
9:        throw new IllegalArgumentException();  // Step 3: Throw RuntimeException
10:    } catch (RuntimeException error1) {       // Step 4: Catch RuntimeException first
11:       System.out.print("3");                 // Step 5: Print "3"
12:       throw new FileNotFoundException();     // Step 6: Throw new exception
13:    } catch (Exception error2) {              // This would catch other Exceptions
14:       System.out.print("5");                 // Won't execute (RuntimeException caught above)
15:    } finally {
16:       System.out.print("4");                 // Step 7: Always print "4"
17: } }
// Output: "1234" then FileNotFoundException is thrown
```

**Exception Flow Analysis:**
```java
// Execution order breakdown:
// 1. Line 6: Print "1" 
// 2. Line 7: StringBuilder resource created (no exception in creation)
// 3. Line 8: Print "2"
// 4. Line 9: IllegalArgumentException thrown
// 5. Line 10: Exception caught (if fixed)
// 6. Line 11: Print "3" 
// 7. Line 12: FileNotFoundException thrown
// 8. Line 14: Finally block executes, print "4"
// 9. FileNotFoundException propagates up (method must declare throws Exception)

// Note: StringBuilder.close() is called automatically but does nothing
// (StringBuilder implements AutoCloseable but close() is empty)
```

**Key Learning Points:**

**Multi-catch rules:**
```java
// ❌ Invalid - subclass and superclass together:
catch (Exception e1 | RuntimeException e2) { }
catch (IOException e1 | FileNotFoundException e2) { }

// ✅ Valid - same level exceptions:
catch (IOException e1 | SQLException e2) { }
catch (IllegalArgumentException e1 | IllegalStateException e2) { }

// ✅ Valid - single variable name:
catch (IOException | SQLException error) { }  // Same variable name
```

**Try-with-resources execution order:**
```java
try (Resource1 res1 = new Resource1(); 
     Resource2 res2 = new Resource2()) {
    // try block code
} catch (Exception e) {
    // exception handling  
} finally {
    // finally block
}

// Execution order:
// 1. Create res1
// 2. Create res2  
// 3. Execute try block
// 4. If exception: close res2, then close res1 (reverse order)
// 5. Handle exception in catch
// 6. Execute finally block
// 7. Propagate any uncaught exceptions
```

**💡 Learning Tips:**
- **Multi-catch rule:** "No family hierarchy" - can't catch parent and child in same statement
- **Finally guarantee:** "Finally always runs" - even when exceptions thrown in catch blocks
- **Resource cleanup:** "LIFO cleanup" - resources closed in reverse creation order
- **Exception propagation:** "New exceptions replace old ones" - FileNotFoundException replaces IllegalArgumentException

**Common Exam Traps:**
1. **Multi-catch with inheritance hierarchy** - Always compile error
2. **Finally block execution** - Runs even when catch throws new exception  
3. **Exception masking** - New exception in catch/finally masks original
4. **Resource closing order** - Always reverse of creation order

---

## 🃏 Sealed Classes - Location Requirements

**Rule:** Sealed classes have **strict location requirements** for permitted subclasses based on module association.

- **Named module**: All permitted classes must be in the **same module** as the sealed class
- **Unnamed module**: All permitted classes must be in the **same package** as the sealed class

```java
// Named module example
module com.example.shapes {
    exports com.example.shapes;
}

// In named module - permitted classes must be in same module
package com.example.shapes;
public sealed class Shape permits Circle, Rectangle { }  // ✅ Valid

// In different module - compile error
module com.other.module { }
package com.other.shapes;
public final class Triangle extends Shape { }  // ❌ Compile error

// Unnamed module example (no module-info.java)
package com.example.animals;
public sealed class Animal permits Dog, Cat { }  // ✅ Valid

package com.different.package;
public final class Bird extends Animal { }  // ❌ Compile error - different package
```

**💡 Learning Tip:** Think "SAME BOUNDARY" - named modules enforce module boundary, unnamed modules enforce package boundary.

**Q:** Can a sealed class in a named module permit a subclass from a different module?  
**A:** No — all permitted subclasses must be in the same module as the sealed class, or a compile-time error occurs.

---

## 🃏 Records - Basic Rules and Restrictions

**Rule:** Records are **restricted classes** that define simple aggregates with **implicit components**.

- Record declarations create **private final fields** and **public accessor methods**
- Records **extend Record class** and are **implicitly final**
- **Cannot be abstract, sealed, or non-sealed** and **cannot extend other classes**

```java
public record Parent(int age, String name) { }  // Record header with components

// Roughly equivalent to:
public final class Parent extends Record {
    private final int age;     // Component field
    private final String name; // Component field
    
    public Parent(int age, String name) {  // Canonical constructor
        this.age = age;
        this.name = name;
    }
    
    public int age() { return age; }      // Accessor (not getAge())
    public String name() { return name; } // Accessor (not getName())
    
    // hashCode(), equals(), toString() provided by compiler
}
```

**💡 Learning Tip:** Think "SIMPLE AGGREGATE" - records automatically generate fields, constructor, accessors, and Object methods.

**Q:** Do record accessor methods follow JavaBeans naming convention?  
**A:** No — accessors have the same name as the field (age(), name()), not prefixed with "get".

---

## 🃏 Records - Constructor Rules

**Rule:** Records have **strict constructor rules** with canonical and non-canonical forms.

- **Canonical constructor**: Takes all record components as parameters
- **Compact form**: No parameter list, implicit field initialization after body
- **Non-canonical constructors**: Must call canonical or another constructor on first line

```java
public record Child(int age, String parent) {
    // Compact canonical constructor
    public Child {  // No parameter list
        if (age < 0) throw new IllegalArgumentException();
        // Fields implicitly initialized after this block
    }
    
    // Non-canonical constructors must delegate
    public Child() {
        this(0, "Unknown");  // Must call canonical or another constructor
    }
    
    public Child(int age) {
        this(age, "Unknown");  // Must delegate
    }
}

// This would cause compile error:
public record Child(int age, String parent) {
    public Child {  // Compact form
        age = age + 1;  // ❌ Cannot assign to parameter in compact form
    }
    
    public Child(int age, String parent) {  // ❌ Cannot have both compact and regular canonical
        this.age = age;
    }
}
```

**💡 Learning Tip:** Remember "DELEGATE OR CANONICAL" - non-canonical constructors must delegate, canonical can be compact or regular.

**Q:** Can a record have both compact and regular forms of the canonical constructor?  
**A:** No — you can only have one canonical constructor, either in compact or regular form, not both.

---

## 🃏 Records - Field and Method Restrictions

**Rule:** Records have **specific restrictions** on fields, methods, and component names.

- **Cannot declare instance fields** (static fields allowed)
- **Cannot have instance initializers** (static initializers allowed)
- **Cannot use reserved component names** from Object class methods

```java
public record Family(int size, String surname) {
    static String defaultSurname = "Unknown";  // ✅ Static field allowed
    static { defaultSurname = "Smith"; }       // ✅ Static initializer allowed
    
    // int extraField;                         // ❌ Instance field not allowed
    // { size = 10; }                          // ❌ Instance initializer not allowed
    
    public static String getDefaultSurname() { return defaultSurname; }  // ✅ Static method
    public String fullInfo() { return size + " " + surname; }            // ✅ Instance method
    
    // public abstract void process();         // ❌ Abstract methods not allowed
    // public native void nativeMethod();      // ❌ Native methods not allowed
}

// These component names would cause compile errors:
// public record BadChild(String clone, int hashCode) { }     // ❌ Reserved names
// public record BadParent(Object toString, String wait) { }  // ❌ Reserved names
```

**💡 Learning Tip:** Think "NO INSTANCE STUFF" - no instance fields, initializers, or Object method names as components.

**Q:** Can records have static fields and methods?  
**A:** Yes — records can have static fields, methods, and initializers, but no instance fields or initializers.

---

## 🃏 Static Field Access and Class Initialization

**Rule:** Accessing a static field only initializes the class that **declares** the field, not the class through which it's accessed.
- Class initialization is triggered by accessing a field **declared by that class**.
- Inherited static fields do **not** trigger subclass initialization.
- The reference used (`Child.familyName`) doesn't matter - only the **declaring class** matters.

```java
class Parent { 
    static String familyName = "Johnson"; 
}

class Child extends Parent {
    static { 
        System.out.print("Child initialized"); 
    }
}

public class FamilyTest {
    public static void main(String[] args) {
        System.out.println(Child.familyName);  // Accesses inherited field
    }
}

// Output: Johnson
// NOT: Child initializedJohnson
```

**💡 Learning Tip:** Remember "DECLARES WINS" - only the class that declares the static field gets initialized, even when accessed through a subclass reference.

**Q:** Does accessing Child.familyName initialize the Child class if familyName is declared in Parent?  
**A:** No — only Parent gets initialized because Parent declares the field. Child inherits it but doesn't declare it.

---

## 🃏 Deque Stack vs Queue Operations

**Rule:** Deque can act as both **Stack (LIFO)** and **Queue (FIFO)** with different method behaviors.
- **Stack operations**: `push()` and `pop()` work at the **front/head** (LIFO - Last In First Out).
- **Queue operations**: `offer()/add()` at **tail**, `poll()/remove()` at **head** (FIFO - First In First Out).
- **Mixed usage** can cause confusion - know which end each method operates on.

```java
public class FamilyLineup {
    public static void main(String[] args) {
        Deque<String> familyLine = new ArrayDeque<>();
        
        // Using Stack operations (all work at FRONT/HEAD)
        familyLine.push("Father");    // [Father]
        familyLine.push("Mother");    // [Mother, Father] - Mother at front
        familyLine.push("Child");     // [Child, Mother, Father] - Child at front
        
        // Mixed operations - be careful!
        System.out.println(familyLine.pollFirst());  // Child (removes from front/head)
        System.out.println(familyLine.poll());       // Mother (poll() = pollFirst(), removes from front/head)
        System.out.println(familyLine.pollLast());   // Father (removes from back/tail)
        
        // Output:
        // Child
        // Mother  
        // Father
    }
}

// Stack view: [Child, Mother, Father] (Child is top/front)
// Queue view: [Child, Mother, Father] (Child is head, Father is tail)
```

**💡 Learning Tip:** Remember "STACK FRONT, QUEUE ENDS" - Stack operations (push/pop) work at front only, Queue operations work at opposite ends (add tail, remove head).

**Q:** If you push three elements then call pollFirst(), poll(), and pollLast(), what's the removal order?  
**A:** First element pushed, second element pushed, third element pushed - because pollFirst() and poll() both remove from head, pollLast() from tail.

---

## 🃏 LocalDate and LocalTime Operations (Date-Time API)

**Rule:** LocalDate/LocalTime/LocalDateTime are **immutable** - all methods return **new instances**.

- **LocalDate**: Date only (year, month, day)
- **LocalTime**: Time only (hour, minute, second, nanosecond)  
- **LocalDateTime**: Date and time combined

```java
import java.time.*;

// Creating date/time objects
LocalDate today = LocalDate.now();                    // Current date
LocalDate birthday = LocalDate.of(2000, 5, 15);       // May 15, 2000
LocalTime now = LocalTime.now();                       // Current time
LocalTime lunch = LocalTime.of(12, 30);               // 12:30 PM
LocalDateTime meeting = LocalDateTime.of(2024, 3, 20, 14, 30); // Mar 20, 2024 at 2:30 PM

// All methods return NEW instances (immutable)
LocalDate tomorrow = today.plusDays(1);               // Add 1 day
LocalDate nextMonth = today.plusMonths(1);            // Add 1 month
LocalTime later = lunch.plusHours(2);                 // Add 2 hours
LocalDate earlier = birthday.minusYears(5);           // Subtract 5 years

// Original objects unchanged
System.out.println(today);     // Still original date
System.out.println(lunch);     // Still 12:30
```

**Period and Duration:**
```java
// Period - date-based amounts (years, months, days)
Period age = Period.between(birthday, today);
System.out.println("Age: " + age.getYears() + " years");

Period twoWeeks = Period.ofDays(14);
LocalDate vacation = today.plus(twoWeeks);

// Duration - time-based amounts (hours, minutes, seconds)
Duration workDay = Duration.ofHours(8);
LocalTime endWork = LocalTime.of(9, 0).plus(workDay);  // 9:00 AM + 8 hours = 5:00 PM

Duration between = Duration.between(lunch, now);
System.out.println("Hours since lunch: " + between.toHours());
```

**💡 Learning Tip:** Remember "IMMUTABLE TIME" - LocalDate/Time classes never change, they always return new instances. Period for dates, Duration for time.

**Q:** If you call `birthday.plusYears(10)` without assigning the result, does birthday change?  
**A:** No — LocalDate is immutable. The method returns a new LocalDate instance, but birthday remains unchanged.

---

## 🃏 Map Operations and Merge Method

**Rule:** Map provides various methods for **conditional updates** and **bulk operations**.

- **compute methods**: Update based on key/value computation
- **merge()**: Combine new value with existing value using a function
- **putIfAbsent()**: Only put if key doesn't exist

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 92);

// merge() - combines values when key exists, inserts when key doesn't exist
scores.merge("Alice", 10, Integer::sum);    // 85 + 10 = 95 (key exists)
scores.merge("Charlie", 88, Integer::sum);  // Just inserts 88 (key doesn't exist)

System.out.println(scores); // {Alice=95, Bob=92, Charlie=88}

// computeIfAbsent - only compute if key missing
scores.computeIfAbsent("David", k -> k.length() * 10);  // David=50 (5 chars * 10)
scores.computeIfAbsent("Alice", k -> k.length() * 10);  // No change (Alice exists)

// computeIfPresent - only compute if key exists  
scores.computeIfPresent("Bob", (k, v) -> v + 5);        // Bob=97 (92 + 5)
scores.computeIfPresent("Eve", (k, v) -> v + 5);        // No change (Eve doesn't exist)

// compute - always computes (can return null to remove)
scores.compute("Alice", (k, v) -> v == null ? 100 : v - 10);  // Alice=85 (95 - 10)
```

**Bulk operations:**
```java
Map<String, String> defaults = Map.of("theme", "dark", "lang", "en");
Map<String, String> userPrefs = new HashMap<>();
userPrefs.put("theme", "light");

// putAll vs merge behavior
userPrefs.putAll(defaults);  // Overwrites existing keys
// Result: {theme=dark, lang=en} - theme overwritten!

// Better: merge each entry
defaults.forEach((k, v) -> userPrefs.merge(k, v, (old, new_) -> old));
// Result: {theme=light, lang=en} - keeps existing theme
```

**💡 Learning Tip:** Think "MERGE = SMART PUT" - merge() handles both insertion and updating with custom logic.

**Q:** What happens when you call merge() with a key that doesn't exist in the map?  
**A:** The new value is simply inserted (put), and the merge function is not called since there's no existing value to merge with.

---

## 🃏 Set Operations and Characteristics

**Rule:** Set implementations have **different ordering and performance characteristics**.

- **HashSet**: No ordering, O(1) operations, allows null
- **LinkedHashSet**: Insertion order, O(1) operations, allows null  
- **TreeSet**: Natural/comparator ordering, O(log n) operations, no null

```java
// HashSet - no ordering guaranteed
Set<String> hashSet = new HashSet<>();
hashSet.addAll(List.of("zebra", "apple", "banana"));
System.out.println(hashSet); // Could be: [banana, apple, zebra] (any order)

// LinkedHashSet - maintains insertion order
Set<String> linkedSet = new LinkedHashSet<>();
linkedSet.addAll(List.of("zebra", "apple", "banana"));
System.out.println(linkedSet); // [zebra, apple, banana] (insertion order)

// TreeSet - natural ordering (sorted)
Set<String> treeSet = new TreeSet<>();
treeSet.addAll(List.of("zebra", "apple", "banana"));
System.out.println(treeSet); // [apple, banana, zebra] (sorted)

// Set operations
Set<Integer> set1 = new HashSet<>(List.of(1, 2, 3, 4));
Set<Integer> set2 = new HashSet<>(List.of(3, 4, 5, 6));

// Union (all elements from both sets)
Set<Integer> union = new HashSet<>(set1);
union.addAll(set2);  // {1, 2, 3, 4, 5, 6}

// Intersection (common elements)
Set<Integer> intersection = new HashSet<>(set1);
intersection.retainAll(set2);  // {3, 4}

// Difference (elements in set1 but not set2)
Set<Integer> difference = new HashSet<>(set1);
difference.removeAll(set2);  // {1, 2}
```

**💡 Learning Tip:** Remember "HASH-LINKED-TREE" order: HashSet (no order), LinkedHashSet (insertion order), TreeSet (sorted order).

**Q:** Which Set implementation should you use if you need both fast lookups and predictable iteration order?  
**A:** LinkedHashSet — provides O(1) operations like HashSet but maintains insertion order unlike HashSet.

---

## 🃏 Enum with Fields, Methods, and Constructors

**Rule:** Enums can have **fields, methods, and constructors** like regular classes, but with restrictions.

- Enum constructors are **implicitly private**
- Enum constants are **created first**, then other elements
- Each enum constant can **override methods**

```java
public enum Planet {
    // Enum constants with constructor arguments - must come first
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);
    
    // Fields
    private final double mass;   // in kilograms
    private final double radius; // in meters
    
    // Constructor - implicitly private
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }
    
    // Methods
    public double getMass() { return mass; }
    public double getRadius() { return radius; }
    
    public double surfaceGravity() {
        final double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }
    
    public double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}

// Usage:
double earthWeight = 175.0;
double mass = earthWeight / Planet.EARTH.surfaceGravity();

for (Planet p : Planet.values()) {
    System.out.printf("Weight on %s is %f%n", p, p.surfaceWeight(mass));
}
```

**Enum with method overriding:**
```java
public enum Operation {
    PLUS("+") {
        public double apply(double x, double y) { return x + y; }
    },
    MINUS("-") {
        public double apply(double x, double y) { return x - y; }
    },
    TIMES("*") {
        public double apply(double x, double y) { return x * y; }
    },
    DIVIDE("/") {
        public double apply(double x, double y) { return x / y; }
    };
    
    private final String symbol;
    
    Operation(String symbol) { this.symbol = symbol; }
    
    // Abstract method - each constant must implement
    public abstract double apply(double x, double y);
    
    public String getSymbol() { return symbol; }
}

// Usage:
double result = Operation.PLUS.apply(1, 2);  // 3.0
System.out.println(Operation.TIMES.getSymbol()); // "*"
```

**💡 Learning Tip:** Think "ENUM = SPECIAL CLASS" - enums are classes with predefined instances (constants) that can have fields, methods, and constructors.

**Q:** Can you call an enum constructor directly with the `new` keyword?  
**A:** No — enum constructors are implicitly private and can only be called when declaring enum constants.

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

## 🃏 Module System - Basic Declaration and Dependencies

**Rule:** Modules control **access and dependencies** through module-info.java declarations.

- **requires**: Declares dependency on another module
- **exports**: Makes packages visible to other modules
- **provides/uses**: Service provider framework

```java
// File: module-info.java in src/main/java
module com.company.myapp {
    // Dependencies - modules this module needs
    requires java.base;          // Implicit - always available
    requires java.logging;       // Explicit dependency
    requires transitive java.sql; // Transitive - modules depending on myapp get java.sql too
    
    // Exports - packages visible to other modules
    exports com.company.myapp.api;           // Public API
    exports com.company.myapp.util to        // Qualified export
        com.company.client,
        com.company.test;
    
    // Services
    provides com.company.myapp.api.Service 
        with com.company.myapp.impl.ServiceImpl;
    uses com.company.external.Logger;
    
    // Reflection access
    opens com.company.myapp.model;           // For frameworks like Spring/Hibernate
    opens com.company.myapp.config to 
        com.fasterxml.jackson.databind;      // Qualified opens
}
```

**Automatic vs Named Modules:**
```java
// Named module (has module-info.java)
module com.example.named {
    requires java.base;
    exports com.example.api;
}

// Automatic module (JAR without module-info.java on module path)
// Name derived from JAR filename: "commons-lang3-3.12.jar" -> "commons.lang3"
module com.example.app {
    requires commons.lang3;      // Automatic module
    requires java.logging;       // Platform module
}

// Unnamed module (classpath, not module path)
// Can read all other modules but cannot be required by named modules
```

**Migration strategies:**
```java
// Bottom-up: Convert dependencies first
module leaf.utility {
    exports leaf.util;  // No requires (except implicit java.base)
}

module middle.service {
    requires leaf.utility;
    exports middle.service;
}

// Top-down: Convert main app first, dependencies become automatic
module main.application {
    requires some.library;       // Automatic module
    requires another.framework;  // Automatic module
    exports main.app.api;
}
```

**💡 Learning Tip:** Think "MODULE = CONTROLLED VISIBILITY" - modules explicitly declare what they need (requires) and what they share (exports).

**Q:** What's the difference between a named module and an automatic module?  
**A:** Named modules have module-info.java and explicit declarations; automatic modules are JARs on the module path without module-info.java, getting an automatic name derived from the JAR filename.

---

## 🃏 Java I/O - File Reading and Writing

**Rule:** Java I/O provides **multiple ways** to read/write files with different performance characteristics.

- **Files.readString()/writeString()**: Simple text file operations (Java 11+)
- **BufferedReader/Writer**: Efficient line-by-line processing
- **FileInputStream/OutputStream**: Byte-level operations

```java
import java.nio.file.*;
import java.io.*;
import java.util.List;

// Simple file operations (Java 11+)
Path textFile = Path.of("data.txt");

// Write string to file
String content = "Hello\nWorld\nJava";
Files.writeString(textFile, content);

// Read entire file as string
String fileContent = Files.readString(textFile);
System.out.println(fileContent);

// Read all lines into List
List<String> lines = Files.readAllLines(textFile);
lines.forEach(System.out::println);

// Write lines to file
List<String> outputLines = List.of("Line 1", "Line 2", "Line 3");
Files.write(textFile, outputLines);
```

**Buffered I/O for large files:**
```java
// Efficient reading with BufferedReader
try (BufferedReader reader = Files.newBufferedReader(Path.of("large.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}

// Efficient writing with BufferedWriter
try (BufferedWriter writer = Files.newBufferedWriter(Path.of("output.txt"))) {
    writer.write("First line");
    writer.newLine();
    writer.write("Second line");
    writer.newLine();
}

// Stream processing for very large files
try (Stream<String> lines = Files.lines(Path.of("huge.txt"))) {
    lines.filter(line -> line.contains("important"))
         .map(String::toUpperCase)
         .forEach(System.out::println);
}
```

**Byte-level operations:**
```java
// Copy file using byte arrays
try (FileInputStream in = new FileInputStream("source.dat");
     FileOutputStream out = new FileOutputStream("dest.dat")) {
    
    byte[] buffer = new byte[1024];
    int bytesRead;
    while ((bytesRead = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
    }
}

// Files utility for copying
Files.copy(Path.of("source.txt"), Path.of("destination.txt"), 
          StandardCopyOption.REPLACE_EXISTING);
```

**💡 Learning Tip:** Remember "FILES = SIMPLE, STREAMS = CONTROL" - Files class for simple operations, streams for fine-grained control and large files.

**Q:** When should you use Files.readString() vs BufferedReader?  
**A:** Use Files.readString() for small files when you need the entire content. Use BufferedReader for large files or when processing line-by-line to avoid memory issues.

---

## 🃏 Localization - Locale and Resource Bundles

**Rule:** Localization uses **Locale** for region/language and **ResourceBundle** for externalized text.

- **Locale**: Represents language and country (e.g., en_US, fr_FR)
- **ResourceBundle**: Loads localized text from properties files
- **Fallback mechanism**: Searches for most specific to most general

```java
import java.util.*;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;

// Creating Locales
Locale english = Locale.ENGLISH;                    // en
Locale french = Locale.FRENCH;                      // fr  
Locale usEnglish = Locale.US;                       // en_US
Locale canadianFrench = Locale.CANADA_FRENCH;       // fr_CA
Locale custom = new Locale("es", "MX");             // es_MX (Spanish Mexico)

// Resource bundles (properties files)
// messages_en.properties: greeting=Hello
// messages_fr.properties: greeting=Bonjour
// messages.properties: greeting=Hi (default fallback)

ResourceBundle bundle = ResourceBundle.getBundle("messages", Locale.FRENCH);
String greeting = bundle.getString("greeting");  // "Bonjour"

// Fallback search order for Locale("fr", "CA"):
// 1. messages_fr_CA.properties
// 2. messages_fr.properties  
// 3. messages.properties (default)
```

**Number and currency formatting:**
```java
double amount = 1234.56;

// Number formatting per locale
NumberFormat usNumber = NumberFormat.getNumberInstance(Locale.US);
NumberFormat frenchNumber = NumberFormat.getNumberInstance(Locale.FRANCE);

System.out.println(usNumber.format(amount));     // 1,234.56
System.out.println(frenchNumber.format(amount)); // 1 234,56

// Currency formatting
NumberFormat usCurrency = NumberFormat.getCurrencyInstance(Locale.US);
NumberFormat euroCurrency = NumberFormat.getCurrencyInstance(Locale.FRANCE);

System.out.println(usCurrency.format(amount));   // $1,234.56
System.out.println(euroCurrency.format(amount)); // 1 234,56 €

// Percentage formatting
NumberFormat percent = NumberFormat.getPercentInstance(Locale.US);
System.out.println(percent.format(0.75));        // 75%
```

**Date/time formatting:**
```java
LocalDateTime now = LocalDateTime.now();

// US format: MM/dd/yyyy
DateTimeFormatter usFormat = DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)
                                             .withLocale(Locale.US);

// French format: dd/MM/yyyy  
DateTimeFormatter frenchFormat = DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)
                                                 .withLocale(Locale.FRANCE);

System.out.println(now.format(usFormat));     // 03/20/2024
System.out.println(now.format(frenchFormat)); // 20/03/2024
```

**💡 Learning Tip:** Think "LOCALE = WHERE, BUNDLE = WHAT" - Locale specifies location/language, ResourceBundle provides localized content with automatic fallback.

**Q:** If you request a ResourceBundle for Locale("de", "CH") but only have messages_de.properties and messages.properties, which file is used?  
**A:** messages_de.properties — the search falls back from de_CH to de to default, using the most specific match found.

---
