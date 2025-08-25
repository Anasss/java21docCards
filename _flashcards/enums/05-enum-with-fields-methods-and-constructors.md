---
category: Enums
learning_tip: Think "ENUM = SPECIAL CLASS" - enums are classes with predefined instances
  (constants) that can have fields, methods, and constructors.
order: 5
tags: []
title: Enum with Fields, Methods, and Constructors
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