---
category: OOP and Encapsulation
learning_tip: You can change the object's content through the reference, but you can't
  change where the original reference points.
order: 30
tags: []
title: StringBuilder Reference Behavior
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