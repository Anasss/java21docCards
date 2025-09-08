---
layout: flashcard
category: Exception Handling
order: 20
tags: []
title: Multi-Catch and Try-With-Resources Exception Flow
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