---
title: OOP and Encapsulation
parent: Java 21 OCP Flashcards
nav_order: 2
layout: default
---

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

## 🃏 Method Overriding Rules

**Rule:** Method overriding follows the **"IS-A substitution"** principle with specific visibility and exception rules.

- **Return type**: Must be **same type or covariant** (subtype)
- **Access modifier**: Must be **same or more accessible**
- **Exceptions**: Can only throw **same, fewer, or more specific checked exceptions**

```java
class Animal {
    protected Animal reproduce() throws IOException {
        return new Animal();
    }
    
    void makeSound() throws Exception {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    // ✅ Covariant return type (Dog is subtype of Animal)
    @Override
    public Dog reproduce() throws FileNotFoundException {  // More specific exception
        return new Dog();
    }
    
    // ✅ More accessible (protected -> public)
    @Override
    public void makeSound() {  // Fewer exceptions (Exception -> none)
        System.out.println("Woof!");
    }
}

// ❌ These would cause compile errors:
class BadDog extends Animal {
    // ❌ Less accessible (protected -> private)
    // private Animal reproduce() { return new BadDog(); }
    
    // ❌ Broader exception (IOException -> Exception)  
    // Animal reproduce() throws Exception { return new BadDog(); }
    
    // ❌ Different return type (Animal -> String)
    // String reproduce() { return "puppy"; }
}
```

**Access modifier rules:**
```java
// Accessibility levels (most to least restrictive):
// private -> default -> protected -> public

class Parent {
    protected void method() {}
}

class Child extends Parent {
    public void method() {}      // ✅ OK - more accessible
    // private void method() {}  // ❌ Error - less accessible
}
```

**💡 Learning Tip:** Remember "OVERRIDE = UPGRADE" - you can make methods more accessible, return more specific types, and throw fewer/more specific exceptions, but never the reverse.

**Q:** Can an overriding method throw a broader checked exception than the parent method?  
**A:** No — overriding methods can only throw the same, fewer, or more specific checked exceptions. Broader exceptions would violate the substitution principle.

---

## 🃏 Abstract Classes and Methods

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

## 🃏Nested Classes vs Inner Classes - Key Distinctions

**Rule:** Inner class = NON-STATIC nested class. All inner classes are nested, but not all nested classes are inner.

**Class Classification Hierarchy:**
* **Top-level class** → Not nested (declared at package level)
* **Nested class** → Declared inside another class/interface body
  * **Static nested class** → Explicitly declared static
  * **Inner class** → NOT static (non-static nested class)
    * Member inner class
    * Local inner class  
    * Anonymous inner class

**Code Examples:**

```java
// Top-level class
public class OuterClass {
    private String outerField = "outer";
    private static String staticField = "static";
    
    // Static nested class (NOT an inner class)
    static class StaticNestedClass {
        void display() {
            // Can access static members of outer class
            System.out.println(staticField); // ✅ Works
            // System.out.println(outerField); // ❌ Cannot access non-static
        }
    }
    
    // Inner class (non-static nested class)
    class MemberInnerClass {
        void display() {
            // Can access ALL members of outer class
            System.out.println(outerField);  // ✅ Works
            System.out.println(staticField); // ✅ Works
        }
    }
    
    void localMethod() {
        final String localVar = "local";
        
        // Local inner class
        class LocalInnerClass {
            void display() {
                System.out.println(outerField);  // ✅ Outer class members
                System.out.println(localVar);    // ✅ Final/effectively final locals
            }
        }
        
        // Anonymous inner class
        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println(outerField);  // ✅ Outer class members
                System.out.println(localVar);    // ✅ Final/effectively final locals
            }
        };
    }
}

// Interface with nested class
interface MyInterface {
    // Class inside interface is IMPLICITLY static
    class NestedInInterface {  // This is static by default!
        void method() {
            System.out.println("Inside interface nested class");
        }
    }
}
```

**Instantiation Examples:**

```java
// Static nested class - no outer instance needed
OuterClass.StaticNestedClass staticNested = new OuterClass.StaticNestedClass();

// Inner class - requires outer instance
OuterClass outer = new OuterClass();
OuterClass.MemberInnerClass inner = outer.new MemberInnerClass();

// Alternative syntax for inner class
OuterClass.MemberInnerClass inner2 = new OuterClass().new MemberInnerClass();

// Interface nested class - implicitly static
MyInterface.NestedInInterface interfaceNested = new MyInterface.NestedInInterface();
```

**Access Rules Summary:**

```java
public class AccessExample {
    private String instanceVar = "instance";
    private static String staticVar = "static";
    
    static class StaticNested {
        void test() {
            System.out.println(staticVar);     // ✅ Static members only
            // System.out.println(instanceVar); // ❌ No instance access
        }
    }
    
    class Inner {
        void test() {
            System.out.println(staticVar);     // ✅ Static members
            System.out.println(instanceVar);  // ✅ Instance members too
        }
    }
}
```

**Common Pitfalls:**

```java
// Pitfall 1: Confusing terminology
class Outer {
    static class Nested { }  // This is NOT an inner class!
    class Inner { }          // This IS an inner class
}

// Pitfall 2: Wrong instantiation syntax
// Outer.Inner wrong = new Outer.Inner();        // ❌ Missing outer instance
Outer.Inner correct = new Outer().new Inner();   // ✅ Correct

// Pitfall 3: Interface nested class confusion
interface Test {
    class Helper { }  // Implicitly static, not inner!
}

// Pitfall 4: Static nested accessing instance members
class Example {
    String field = "test";
    static class BadNested {
        void method() {
            // System.out.println(field);  // ❌ Cannot access instance field
        }
    }
}
```

**💡 Learning Tip:** "Static nested = NO instance access, Inner = FULL access" - Static nested classes can't access instance members, while inner classes can access everything in the outer class.

**Q:** What's the key difference between a static nested class and an inner class?  
**A:** A static nested class cannot access non-static members of the outer class and doesn't need an outer instance to be created, while an inner class (non-static nested) can access all outer class members and requires an outer instance.
