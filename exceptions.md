---
title: Exception Handling
parent: Java 21 OCP Flashcards
nav_order: 2
layout: default
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

## 🃏 Stream Operations and Exception Handling

**Intermediate vs Terminal Operations:**

```java
// Intermediate Operations - return Stream (lazy):
Stream<String> words = Stream.of("apple", "banana", "cherry");

Stream<String> processed = words
    .filter(s -> s.startsWith("a"))     // Intermediate
    .map(String::toUpperCase)           // Intermediate  
    .limit(2);                          // Intermediate
    
// Nothing executed yet - streams are lazy!

// Terminal Operations - return result and close stream:
List<String> result = Stream.of("apple", "banana", "cherry")
    .filter(s -> s.length() > 5)       // Intermediate
    .collect(Collectors.toList());      // Terminal - execution happens here
```

**Stream Reuse Error:**
```java
Stream<String> stream = Stream.of("a", "b", "c");

stream.forEach(System.out::print);  // Terminal operation - stream is consumed
// stream.count();                  // ❌ IllegalStateException: stream has already been operated upon
```

**Optional Exception Handling:**
```java
private static void demonstrateOptionalExceptions() {
    // Safe stream that produces a result:
    Stream<Integer> numbers = Stream.of(1, 3, 7, 2, 8);
    Optional<Integer> maxOpt = numbers
        .filter(x -> x < 10)           // All numbers pass
        .max(Integer::compareTo);      // Find max: Optional[8]
    
    System.out.println(maxOpt.get()); // ✅ 8 - safe because Optional has value
    
    // Dangerous stream that produces empty Optional:
    Stream<Integer> emptyStream = Stream.of(15, 20, 25);
    Optional<Integer> emptyOpt = emptyStream
        .filter(x -> x < 5)           // No numbers pass filter
        .max(Integer::compareTo);     // Returns Optional.empty()
    
    // System.out.println(emptyOpt.get()); // ❌ NoSuchElementException!
    
    // Safe alternatives:
    System.out.println(emptyOpt.orElse(-1));              // -1 (default value)
    System.out.println(emptyOpt.orElseGet(() -> 0));      // 0 (computed default)
    emptyOpt.ifPresent(System.out::println);              // Does nothing if empty
}
```

**💡 Learning Tips:** 
- Intermediate = "keep the pipeline flowing", Terminal = "time for results"
- Optional.get() = "Russian roulette" - always check isPresent() or use orElse()/ifPresent()

---

## 🃏 Exception Output Methods

**Rule:** Exception output methods provide **different levels of detail** for debugging.
- **System.out.println(exception)**: Prints only **exception class name and message**.
- **exception.printStackTrace()**: Prints **complete method call chain** with line numbers.
- Stack trace shows the **full path** from thread start to where exception was created.

```java
class Parent {
    void callChild() {
        Child child = new Child();
        child.processFamily();  // Line 4
    }
}

class Child {
    void processFamily() {
        throw new RuntimeException("Family processing failed");  // Line 9
    }
}

public class FamilyApp {
    public static void main(String[] args) {
        try {
            Parent parent = new Parent();
            parent.callChild();  // Line 15
        } catch (RuntimeException e) {
            System.out.println(e);           // Output: java.lang.RuntimeException: Family processing failed
            System.out.println("---");
            e.printStackTrace();             // Output: Full stack trace with method names and line numbers
            /*
            java.lang.RuntimeException: Family processing failed
                at Child.processFamily(Child.java:9)
                at Parent.callChild(Parent.java:4)
                at FamilyApp.main(FamilyApp.java:15)
            */
        }
    }
}
```

**💡 Learning Tip:** Remember "PRINT vs TRACE" - println() gives you the message, printStackTrace() gives you the journey.

**Q:** What's the difference between printing an exception and calling printStackTrace()?  
**A:** println() shows only class name and message, printStackTrace() shows the complete method call chain with line numbers back to thread start.

---

## 🃏 Multi-Catch and Try-With-Resources Exception Flow

**⚠️ This code has a COMPILE ERROR!** Let's analyze why and fix it:

```java
5:  public static void main(String... unused) {
6:     System.out.print("1");                    // Always executes first
7:     try (StringBuilder resource1 = new StringBuilder()) {
8:        System.out.print("2");                 // Executes in try block
9:        throw new IllegalArgumentException();  // Throws RuntimeException
10:    } catch (Exception error1 | RuntimeException error2) {  // ❌ COMPILE ERROR!
11:       System.out.print("3");
12:       throw new FileNotFoundException();
13:    } finally {
14:       System.out.print("4");                 // Always executes
15: } }
```

**🚫 Compilation Error:** Line 10 is invalid because `RuntimeException` is a subclass of `Exception`. In multi-catch, you cannot have a subclass and superclass in the same statement.

**✅ Fixed Version 1 - Remove redundant RuntimeException:**
```java
5:  public static void main(String... unused) throws Exception {
6:     System.out.print("1");                    // Step 1: Print "1"
7:     try (StringBuilder resource1 = new StringBuilder()) {
8:        System.out.print("2");                 // Step 2: Print "2"  
9:        throw new IllegalArgumentException();  // Step 3: Throw RuntimeException
10:    } catch (Exception error1) {              // Step 4: Catch Exception (includes RuntimeException)
11:       System.out.print("3");                 // Step 5: Print "3"
12:       throw new FileNotFoundException();     // Step 6: Throw new exception
13:    } finally {
14:       System.out.print("4");                 // Step 7: Always print "4"
15: } }
// Output: "1234" then FileNotFoundException is thrown
```

**✅ Fixed Version 2 - Separate catch blocks:**
```java
5:  public static void main(String... unused) throws Exception {
6:     System.out.print("1");                    // Step 1: Print "1"
7:     try (StringBuilder resource1 = new StringBuilder()) {
8:        System.out.print("2");                 // Step 2: Print "2"
9:        throw new IllegalArgumentException();  // Step 3: Throw RuntimeException
10:    } catch (RuntimeException error1) {       // Step 4: Catch RuntimeException first
11:       System.out.print("3");                 // Step 5: Print "3"
12:       throw new FileNotFoundException();     // Step 6: Throw new exception
13:    } catch (Exception error2) {              // This would catch other Exceptions
14:       System.out.print("5");                 // Won't execute (RuntimeException caught above)
15:    } finally {
16:       System.out.print("4");                 // Step 7: Always print "4"
17: } }
// Output: "1234" then FileNotFoundException is thrown
```

**Exception Flow Analysis:**
```java
// Execution order breakdown:
// 1. Line 6: Print "1" 
// 2. Line 7: StringBuilder resource created (no exception in creation)
// 3. Line 8: Print "2"
// 4. Line 9: IllegalArgumentException thrown
// 5. Line 10: Exception caught (if fixed)
// 6. Line 11: Print "3" 
// 7. Line 12: FileNotFoundException thrown
// 8. Line 14: Finally block executes, print "4"
// 9. FileNotFoundException propagates up (method must declare throws Exception)

// Note: StringBuilder.close() is called automatically but does nothing
// (StringBuilder implements AutoCloseable but close() is empty)
```

**Key Learning Points:**

**Multi-catch rules:**
```java
// ❌ Invalid - subclass and superclass together:
catch (Exception e1 | RuntimeException e2) { }
catch (IOException e1 | FileNotFoundException e2) { }

// ✅ Valid - same level exceptions:
catch (IOException e1 | SQLException e2) { }
catch (IllegalArgumentException e1 | IllegalStateException e2) { }

// ✅ Valid - single variable name:
catch (IOException | SQLException error) { }  // Same variable name
```

**Try-with-resources execution order:**
```java
try (Resource1 res1 = new Resource1(); 
     Resource2 res2 = new Resource2()) {
    // try block code
} catch (Exception e) {
    // exception handling  
} finally {
    // finally block
}

// Execution order:
// 1. Create res1
// 2. Create res2  
// 3. Execute try block
// 4. If exception: close res2, then close res1 (reverse order)
// 5. Handle exception in catch
// 6. Execute finally block
// 7. Propagate any uncaught exceptions
```

**💡 Learning Tips:**
- **Multi-catch rule:** "No family hierarchy" - can't catch parent and child in same statement
- **Finally guarantee:** "Finally always runs" - even when exceptions thrown in catch blocks
- **Resource cleanup:** "LIFO cleanup" - resources closed in reverse creation order
- **Exception propagation:** "New exceptions replace old ones" - FileNotFoundException replaces IllegalArgumentException

**Common Exam Traps:**
1. **Multi-catch with inheritance hierarchy** - Always compile error
2. **Finally block execution** - Runs even when catch throws new exception  
3. **Exception masking** - New exception in catch/finally masks original
4. **Resource closing order** - Always reverse of creation order

---

## 🃏 Exception Chaining and Return Statement Flow

**Key Rule:** Exceptions thrown in **catch blocks are NOT caught** by subsequent catch blocks in the same try-catch structure. Only exceptions from the **try block** can be caught.

```java
public class FamilyReunion {
    public static void main(String[] args) {
        try {
            callGrandpa();  // This will throw an exception from TRY block
        } catch (IndexOutOfBoundsException father) {
            System.out.println("Father");           // Step 2: Catches exception from try block
            throw new NullPointerException();       // Step 3: Throws NEW exception from CATCH block
        } catch (NullPointerException mother) {
            System.out.println("Mother");           // ❌ WON'T EXECUTE! Exception not from try block
            return;                                 
        } catch (Exception grandma) {
            System.out.println("Grandma");          // ❌ WON'T EXECUTE! Exception not from try block
        } finally {
            System.out.println("Sister");           // Step 4: Always executes
        }
        System.out.println("FAMILY_GATHERING");    // ❌ WON'T EXECUTE! NullPointerException propagates
    }
    
    static void callGrandpa() {
        System.out.println("Grandpa speaks");      // Step 1: Always executes first
        throw new IndexOutOfBoundsException("Grandpa is grumpy!");
    }
}

// Output:
// Grandpa speaks
// Father  
// Sister
// Exception in thread "main" java.lang.NullPointerException
```

**Step-by-Step Execution Flow:**

```java
// Detailed execution breakdown:
public class FamilyReunion {
    public static void main(String[] args) {
        try {
            callGrandpa();                          // Step 1: Call method - throws IndexOutOfBoundsException
        } catch (IndexOutOfBoundsException father) {
            System.out.println("Father");           // Step 2: Catches exception FROM TRY BLOCK
            throw new NullPointerException();       // Step 3: NEW exception FROM CATCH BLOCK
        } catch (NullPointerException mother) {     // ❌ CANNOT catch exceptions from catch blocks!
            System.out.println("Mother");           // NEVER executes - exception not from try block
            return;                                 
        } catch (Exception grandma) {               // ❌ CANNOT catch exceptions from catch blocks!
            System.out.println("Grandma");          // NEVER executes - exception not from try block  
        } finally {
            System.out.println("Sister");           // Step 4: Always executes before exception propagates
        }
        System.out.println("FAMILY_GATHERING");    // NEVER executes - uncaught exception terminates method
    }
    
    static void callGrandpa() {
        System.out.println("Grandpa speaks");      // Step 1a: Method execution
        throw new IndexOutOfBoundsException("Grandpa is grumpy!");  // Step 1b: Exception FROM TRY BLOCK
    }
}
```

**🚨 Critical Concept:** **Only exceptions thrown in the TRY block can be caught by catch blocks!**

**Exception Source Matters:**
```java
try {
    throw new IOException("From try block");     // ✅ CAN be caught by catch blocks below
} catch (IOException e) {
    System.out.println("Caught from try");      // ✅ Executes - exception from try block
    throw new SQLException("From catch block"); // ❌ CANNOT be caught by catch blocks below  
} catch (SQLException e) {
    System.out.println("Caught from catch");    // ❌ NEVER executes - exception from catch block
} catch (Exception e) {
    System.out.println("Caught anything");      // ❌ NEVER executes - exception from catch block
}
// SQLException propagates up - uncaught!
```

**Key Exception Catching Rules:**

**✅ Exceptions that CAN be caught:**
```java
try {
    throw new RuntimeException("From try block");     // ✅ From try block
    methodThatThrows();                               // ✅ From method called in try block  
} catch (RuntimeException e) {
    // Will catch exceptions from try block
}
```

**❌ Exceptions that CANNOT be caught:**
```java
try {
    normalMethod(); // No exception from try block
} catch (IOException e) {
    throw new SQLException("From catch block");       // ❌ From catch block - won't be caught
} catch (SQLException e) {
    // NEVER executes - SQLException came from catch block
} finally {
    throw new IllegalStateException("From finally");  // ❌ From finally block - won't be caught  
}
```

**Nested Try-Catch Example:**
```java
// To catch exceptions from catch blocks, you need NESTED try-catch:
try {
    try {
        throw new IOException("Original problem");
    } catch (IOException e) {
        System.out.println("Caught original");
        throw new SQLException("New problem");        // This gets thrown to outer try
    }
} catch (SQLException e) {                           // ✅ This CAN catch it - different try block!
    System.out.println("Caught from inner catch");
}
```

**💡 Learning Tips:**
- **Try block rule:** "Only try block exceptions are catchable" - catch blocks can't catch exceptions from other catch blocks
- **Finally guarantee:** "Finally runs then exception propagates" - finally executes but doesn't catch exceptions
- **Propagation path:** "Up and out" - uncaught exceptions from catch/finally blocks propagate to calling method
- **Nested solution:** "Try within try" - use nested try-catch to handle exceptions from catch blocks

**Common Exam Traps:**
1. **Catch block exceptions** - Thinking subsequent catch blocks will handle exceptions thrown in earlier catch blocks
2. **Finally block exceptions** - Assuming finally can catch its own exceptions
3. **Exception propagation** - Not realizing uncaught exceptions terminate the method
4. **Nested try confusion** - Not understanding when you need nested try-catch structures

**Q:** Can a catch block catch an exception thrown by another catch block in the same try-catch structure?  
**A:** No! Only exceptions thrown in the try block can be caught by catch blocks. Exceptions from catch blocks propagate up uncaught.

---
