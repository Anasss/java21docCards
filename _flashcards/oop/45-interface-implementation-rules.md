---
category: OOP and Encapsulation
learning_tip: Think "INTERFACE = CONTRACT" - defines what must be done (public methods)
  but allows flexibility in how (default methods provide optional behavior).
order: 45
tags:
- optional
title: Interface Implementation Rules
---

## 🃏 Interface Implementation Rules

**Rule:** Interfaces define **contracts** that implementing classes must fulfill with specific rules for method implementation.

- All interface methods are **implicitly public abstract** (unless default/static)
- Implementing classes must provide **public implementations**
- Interfaces can have **default methods, static methods, and private methods** (Java 8+)

```java
interface Flyable {
    // Implicitly public abstract
    void fly();
    void land();
    
    // Default method (Java 8+)
    default void glide() {
        System.out.println("Gliding smoothly");
    }
    
    // Static method (Java 8+)
    static void checkWeather() {
        System.out.println("Weather is good for flying");
    }
    
    // Private method (Java 9+) - helper for default methods
    private void prepareForFlight() {
        System.out.println("Pre-flight check complete");
    }
}

class Bird implements Flyable {
    // Must be public - cannot reduce visibility
    @Override
    public void fly() {
        System.out.println("Bird is flying");
    }
    
    @Override
    public void land() {
        System.out.println("Bird is landing");
    }
    
    // Can override default method (optional)
    @Override
    public void glide() {
        System.out.println("Bird glides with grace");
    }
}

// ❌ This would cause compile error:
class BadBird implements Flyable {
    // ❌ Cannot reduce visibility (public -> protected)
    // protected void fly() { System.out.println("Flying"); }
}
```

**Multiple interface implementation:**
```java
interface Swimmable {
    void swim();
    default void dive() { System.out.println("Diving deep"); }
}

interface Walkable {
    void walk();
    default void run() { System.out.println("Running fast"); }
}

class Duck implements Flyable, Swimmable, Walkable {
    @Override
    public void fly() { System.out.println("Duck flies"); }
    
    @Override
    public void land() { System.out.println("Duck lands"); }
    
    @Override
    public void swim() { System.out.println("Duck swims"); }
    
    @Override
    public void walk() { System.out.println("Duck walks"); }
    
    // Inherits default methods: glide(), dive(), run()
}
```

**Default method conflict resolution:**
```java
interface A {
    default void method() { System.out.println("A"); }
}

interface B {
    default void method() { System.out.println("B"); }
}

class Implementation implements A, B {
    // ❌ Compile error without explicit resolution
    // Must override to resolve conflict
    @Override
    public void method() {
        A.super.method();  // Call A's version
        // or B.super.method();  // Call B's version
        // or provide own implementation
    }
}
```

**💡 Learning Tip:** Think "INTERFACE = CONTRACT" - defines what must be done (public methods) but allows flexibility in how (default methods provide optional behavior).

**Q:** What happens if a class implements two interfaces with conflicting default methods?  
**A:** Compile error — the class must override the conflicting method to explicitly resolve which implementation to use or provide its own.