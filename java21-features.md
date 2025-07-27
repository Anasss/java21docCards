---
title: Java 21 New Features
parent: Java 21 OCP Flashcards
nav_order: 1
layout: default
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

