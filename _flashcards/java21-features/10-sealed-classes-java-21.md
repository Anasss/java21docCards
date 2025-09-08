---
layout: flashcard
category: Java 21 Features
learning_tip: Sealed = "Exclusive club" - only VIP classes (permits list) can join.
  Compiler knows all possibilities, enabling exhaustive pattern matching.
order: 10
tags:
- record
- sealed
- pattern
- switch
title: Sealed Classes (Java 21)
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