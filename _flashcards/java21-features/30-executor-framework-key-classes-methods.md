---
category: Java 21 Features
learning_tip: '"NEW executors create, SUBMIT callables" - Executors factory methods
  start with ''new'', ExecutorService can ''submit'' Callables (not basic Executor).'
order: 30
tags: []
title: Executor Framework - Key Classes & Methods
---

## 🃏 Executor Framework - Key Classes & Methods

**Rule:** Understand the relationship between Executor, ExecutorService, and Executors utility class.

**Class Hierarchy:**
* `Executor` interface → executes `Runnable` only
* `ExecutorService` interface → extends Executor, executes both `Runnable` and `Callable`
* `Executors` utility class → provides static factory methods (all start with "new")

**Essential Executors Factory Methods:**

```java
import java.util.concurrent.*;

// Fixed thread pool - reuses fixed number of threads
ExecutorService fixed = Executors.newFixedThreadPool(4);

// Single thread executor - sequential execution
ExecutorService single = Executors.newSingleThreadExecutor();

// Cached thread pool - creates threads as needed, reuses idle ones
ExecutorService cached = Executors.newCachedThreadPool();

// Scheduled executors for delayed/periodic tasks
ScheduledExecutorService singleScheduled = Executors.newSingleThreadScheduledExecutor();
ScheduledExecutorService multiScheduled = Executors.newScheduledThreadPool(3);

// Virtual threads (Java 21) - lightweight threads
ExecutorService virtual = Executors.newVirtualThreadPerTaskExecutor();
```

**Practical Example:**

```java
// Basic Executor - only Runnable
Executor basicExecutor = Executors.newSingleThreadExecutor();
basicExecutor.execute(() -> System.out.println("Running task"));

// ExecutorService - both Runnable and Callable
ExecutorService service = Executors.newFixedThreadPool(2);

// Execute Runnable
service.execute(() -> System.out.println("Runnable task"));

// Submit Callable
Future<String> result = service.submit(() -> {
    Thread.sleep(1000);
    return "Callable result";
});

try {
    System.out.println(result.get()); // "Callable result"
} catch (Exception e) {
    e.printStackTrace();
} finally {
    service.shutdown();
}
```

**Thread Pool Comparison:**

```java
// newFixedThreadPool(4) - exactly 4 threads, queues excess tasks
ExecutorService fixed = Executors.newFixedThreadPool(4);

// newCachedThreadPool() - creates threads as needed, kills idle ones after 60s
ExecutorService cached = Executors.newCachedThreadPool();

// newSingleThreadExecutor() - exactly 1 thread, tasks execute sequentially
ExecutorService single = Executors.newSingleThreadExecutor();

// newVirtualThreadPerTaskExecutor() - creates new virtual thread per task
ExecutorService virtual = Executors.newVirtualThreadPerTaskExecutor();
```

**Common Pitfalls:**

```java
// Pitfall 1: Trying to submit Callable to basic Executor
Executor executor = Executors.newSingleThreadExecutor();
// executor.submit(() -> "result"); // ❌ Executor doesn't have submit()

// Pitfall 2: Forgetting shutdown
ExecutorService service = Executors.newFixedThreadPool(2);
service.submit(() -> "task");
// Missing service.shutdown(); // ❌ JVM won't terminate

// Pitfall 3: Wrong method name
// Executors.createFixedThreadPool(4); // ❌ No such method
ExecutorService correct = Executors.newFixedThreadPool(4); // ✅
```

**💡 Learning Tip:** "NEW executors create, SUBMIT callables" - Executors factory methods start with 'new', ExecutorService can 'submit' Callables (not basic Executor).

**Q:** What's the difference between Executor and ExecutorService interfaces?  
**A:** Executor only executes Runnable with execute(), while ExecutorService extends Executor and can submit both Runnable and Callable, returning Future objects.