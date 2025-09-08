---
layout: flashcard
category: OOP and Encapsulation
learning_tip: '"Static nested = NO instance access, Inner = FULL access" - Static
  nested classes (including implicitly static enums/records/interface classes) can''t
  access instance members, while inner classes can access everything in the outer
  class. Remember: "static" keyword only applies to nested types, never top-level
  types.'
order: 50
tags:
- record
title: Nested Classes vs Inner Classes - Key Distinctions
---

## 🃏 Nested Classes vs Inner Classes - Key Distinctions

**Rule:** Inner class = NON-STATIC nested class. All inner classes are nested, but not all nested classes are inner.

**Class Classification Hierarchy:**
* **Top-level class** → Not nested (declared at package level)
* **Nested class** → Declared inside another class/interface body
  * **Static nested class** → Explicitly declared static
  * **Inner class** → NOT static (non-static nested class)
    * Member inner class
    * Local inner class  
    * Anonymous inner class

**Important:** Classes inside interfaces, nested enums, and nested records are **implicitly static** (not inner classes). The "static" keyword only applies to nested types, never top-level types.

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
    
    // Nested enum - implicitly static
    enum Status { ACTIVE, INACTIVE }  // Cannot be inner class
    
    // Nested record - implicitly static  
    record Data(String name, int value) { }  // Cannot be inner class
}

// Class with nested enum and record
public class OuterWithSpecialTypes {
    private String field = "outer";
    
    // Nested enum - always implicitly static
    enum Priority { HIGH, MEDIUM, LOW }
    
    // Nested record - always implicitly static
    record Person(String name, int age) { }
    
    void testAccess() {
        // These cannot access instance fields because they're implicitly static
        // Priority.HIGH cannot access 'field'
        // Person cannot access 'field' in its methods
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

// Nested enum - implicitly static (no outer instance needed)
OuterWithSpecialTypes.Priority priority = OuterWithSpecialTypes.Priority.HIGH;

// Nested record - implicitly static (no outer instance needed)
OuterWithSpecialTypes.Person person = new OuterWithSpecialTypes.Person("John", 30);
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
    class Helper { }     // Implicitly static, not inner!
    enum Status { ON }   // Implicitly static, not inner!  
    record Info(String data) { }  // Implicitly static, not inner!
}

// Pitfall 4: Thinking you can make enum/record inner classes
class BadExample {
    // enum MyEnum { }     // Always implicitly static - cannot be inner!
    // record MyRecord() { } // Always implicitly static - cannot be inner!
}

// Pitfall 5: Static nested accessing instance members
class Example {
    String field = "test";
    static class BadNested {
        void method() {
            // System.out.println(field);  // ❌ Cannot access instance field
        }
    }
}
```

**💡 Learning Tip:** "Static nested = NO instance access, Inner = FULL access" - Static nested classes (including implicitly static enums/records/interface classes) can't access instance members, while inner classes can access everything in the outer class. Remember: "static" keyword only applies to nested types, never top-level types.

**Q:** What's the key difference between a static nested class and an inner class?  
**A:** A static nested class cannot access non-static members of the outer class and doesn't need an outer instance to be created, while an inner class (non-static nested) can access all outer class members and requires an outer instance. Enums, records, and classes inside interfaces are always implicitly static.