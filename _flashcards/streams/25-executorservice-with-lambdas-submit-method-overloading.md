---
category: Streams & Functional
learning_tip: '"Future tells the future" - Future<?> means no meaningful result, Future<T>
  means result of type T is coming.'
order: 25
tags:
- lambda
title: ExecutorService with Lambdas - submit() Method Overloading
---

## 🃏 ExecutorService with Lambdas - submit() Method Overloading

**Rule:** ExecutorService.submit() is overloaded to handle both Runnable and Callable, with different return types.

- `submit(Runnable)` → `Future<?>` (result is always null)
- `submit(Callable<T>)` → `Future<T>` (result is of type T)

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

// Lambda matches Runnable - no return value
Future<?> future1 = executor.submit(() -> {
    System.out.println("Task executing...");
    // No return statement
});

// Lambda matches Callable<String> - returns String
Future<String> future2 = executor.submit(() -> {
    Thread.sleep(1000);
    return "Task completed!";  // Returns String
});

// Lambda matches Callable<Integer> - returns Integer
Future<Integer> future3 = executor.submit(() -> {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    return sum;  // Returns Integer
});

// Retrieving results:
try {
    Object result1 = future1.get();     // null (Runnable returns nothing)
    String result2 = future2.get();     // "Task completed!"
    Integer result3 = future3.get();    // 55
} catch (Exception e) {
    e.printStackTrace();
}
```

**Common Pitfalls:**
```java
// Pitfall 1: Forgetting return statement for Callable
Callable<String> badTask = () -> {
    String result = "Hello";
    // Missing return statement - compile error!
};

// Pitfall 2: Runnable with return statement
Runnable badRunnable = () -> {
    return "Hello";  // ❌ Runnable must return void
};

// Pitfall 3: Ambiguous context
// var task = () -> "Hello";  // ❌ Compiler can't infer target type
Callable<String> task = () -> "Hello";  // ✅ Explicit target type
```

**💡 Learning Tip:** "Future tells the future" - Future<?> means no meaningful result, Future<T> means result of type T is coming.

**Q:** What's the difference between submit(Runnable) and submit(Callable) return types?  
**A:** submit(Runnable) returns Future<?> with null result, while submit(Callable<T>) returns Future<T> with a meaningful result of type T.