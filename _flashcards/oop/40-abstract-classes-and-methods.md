---
layout: flashcard
category: OOP and Encapsulation
learning_tip: Think "ABSTRACT = BLUEPRINT" - defines the structure but leaves implementation
  details to subclasses. Like architectural blueprints, you can't build from them
  directly but they guide construction.
order: 40
tags: []
title: Abstract Classes and Methods
---


**Rule:** Abstract classes **cannot be instantiated** and may contain both abstract and concrete methods.

- Abstract methods **must be implemented** by concrete subclasses
- Abstract classes can have **constructors, fields, and concrete methods**
- A class with any abstract method must be declared abstract

```java
abstract class Shape {
    protected String color;
    
    // Constructor in abstract class
    protected Shape(String color) {
        this.color = color;
    }
    
    // Abstract method - no implementation
    public abstract double getArea();
    public abstract double getPerimeter();
    
    // Concrete method - has implementation
    public String getColor() {
        return color;
    }
    
    public void displayInfo() {
        System.out.println("Color: " + color + ", Area: " + getArea());
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);  // Call parent constructor
        this.radius = radius;
    }
    
    // Must implement all abstract methods
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }
}

// Usage:
// Shape shape = new Shape("red");     // ❌ Cannot instantiate abstract class
Shape circle = new Circle("blue", 5);  // ✅ OK - concrete subclass
circle.displayInfo();                  // Uses both inherited and overridden methods
```

**Abstract class inheritance rules:**
```java
abstract class Animal {
    abstract void makeSound();
    void sleep() { System.out.println("Sleeping..."); }
}

abstract class Mammal extends Animal {
    // Can choose not to implement makeSound() - remains abstract
    abstract void giveBirth();  // Add new abstract method
}

class Dog extends Mammal {
    // Must implement ALL abstract methods from hierarchy
    @Override
    void makeSound() { System.out.println("Woof!"); }
    
    @Override
    void giveBirth() { System.out.println("Giving birth to puppies"); }
}
```

**💡 Learning Tip:** Think "ABSTRACT = BLUEPRINT" - defines the structure but leaves implementation details to subclasses. Like architectural blueprints, you can't build from them directly but they guide construction.

**Q:** Can an abstract class have a constructor?  
**A:** Yes — abstract classes can have constructors that are called when concrete subclasses are instantiated via super().

---
