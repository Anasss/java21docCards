---
category: OOP and Encapsulation
learning_tip: Remember "OVERRIDE = UPGRADE" - you can make methods more accessible,
  return more specific types, and throw fewer/more specific exceptions, but never
  the reverse.
order: 35
tags: []
title: Method Overriding Rules
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