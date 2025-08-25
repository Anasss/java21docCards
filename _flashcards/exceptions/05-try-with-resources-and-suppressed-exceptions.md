---
category: Exception Handling
learning_tip: Primary exception is the "star of the show" - suppressed exceptions
  are the "supporting cast."
order: 5
tags: []
title: Try-With-Resources and Suppressed Exceptions
---

## 🃏 Try-With-Resources and Suppressed Exceptions

The **exception in the try block is primary**. Exceptions thrown by `close()` are **suppressed** and attached to the primary exception.

```java
class MyResource implements AutoCloseable {
    private String name;
    
    MyResource(String name) { this.name = name; }
    
    void doWork() throws Exception {
        throw new RuntimeException("Work failed in " + name);
    }
    
    @Override
    public void close() throws Exception {
        throw new RuntimeException("Close failed for " + name);
    }
}

// Example usage:
try (MyResource res = new MyResource("Database")) {
    res.doWork();  // Throws primary exception
    // close() will be called automatically and its exception suppressed
} catch (Exception e) {
    System.out.println("Primary: " + e.getMessage());  // Work failed in Database
    
    // Check suppressed exceptions:
    for (Throwable suppressed : e.getSuppressed()) {
        System.out.println("Suppressed: " + suppressed.getMessage()); // Close failed for Database
    }
}
```

**Multiple resources example:**
```java
try (MyResource r1 = new MyResource("DB1");
     MyResource r2 = new MyResource("DB2")) {
    // Resources closed in reverse order: r2.close(), then r1.close()
    throw new RuntimeException("Business logic error");
} catch (Exception e) {
    // Primary: Business logic error
    // Suppressed: Close failed for DB2, Close failed for DB1
}
```

**💡 Learning Tip:** Primary exception is the "star of the show" - suppressed exceptions are the "supporting cast."

---