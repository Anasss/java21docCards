---
layout: flashcard
category: Exception Handling
learning_tip: Remember "PRINT vs TRACE" - println() gives you the message, printStackTrace()
  gives you the journey.
order: 15
tags: []
title: Exception Output Methods
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