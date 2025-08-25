---
category: Streams & Functional
learning_tip: '"Runnable runs and forgets, Callable calls and tells" - Runnable for
  actions, Callable for computations with results.'
order: 20
tags:
- lambda
title: Lambda Target Types - Runnable vs Callable
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