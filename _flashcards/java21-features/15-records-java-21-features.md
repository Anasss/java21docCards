---
layout: flashcard
category: Java 21 Features
learning_tip: Records = "Data class on autopilot" - automatic constructor, accessors,
  equals/hashCode/toString. Perfect for immutable data carriers.
order: 15
tags:
- record
- switch
- pattern
title: Records (Java 21 Features)
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