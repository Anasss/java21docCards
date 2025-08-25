---
category: Collections & Generics
order: 10
tags: []
title: 'Deque: Stack vs Queue Operations'
---

## 🃏 Deque: Stack vs Queue Operations

**Rule:** Deque can act as both **Stack (LIFO)** and **Queue (FIFO)** - you can mix operations but understand which end each method operates on.

### Core Structures:
- **Queue (FIFO)**: Add to tail, remove from head - `offer()/add()` and `poll()/remove()`
- **Stack (LIFO)**: Add and remove from head - `push()` and `pop()`

### All Available Methods:
- **Queue methods**: `offer(e)`, `add(e)` (add to tail), `poll()`, `remove()` (remove from head)
- **Stack methods**: `push(e)` (add to head), `pop()` (remove from head)
- **Deque-specific**: `addFirst(e)`, `addLast(e)`, `removeFirst()`, `removeLast()`
- **Flexible**: `offerFirst(e)`, `offerLast(e)`, `pollFirst()`, `pollLast()`
- **Peek methods**: `peek()`, `peekFirst()`, `peekLast()`, `element()` (look without removing)

### Key Differences:
- **Exception vs null**: `add()/remove()` throw exceptions when fail, `offer()/poll()` return false/null
- **Same operations**: `poll()` = `pollFirst()`, `add()` = `addLast()`, `offer()` = `offerLast()`

```java
public class FamilyDequeDemo {
    public static void main(String[] args) {
        Deque<String> family = new ArrayDeque<>();
        
        // Stack operations (LIFO)
        family.push("Grandpa");     // [Grandpa] (head)
        family.push("Dad");         // [Dad, Grandpa] (Dad at head)
        family.push("Son");         // [Son, Dad, Grandpa] (Son at head)
        
        // Queue operations mixed with stack
        family.offerLast("Aunt");   // [Son, Dad, Grandpa, Aunt] (Aunt at tail)
        family.addFirst("Uncle");   // [Uncle, Son, Dad, Grandpa, Aunt] (Uncle at head)
        
        // Various removal methods
        System.out.println(family.pop());        // Uncle (stack: remove from head)
        System.out.println(family.pollFirst());  // Son (queue: remove from head)
        System.out.println(family.poll());       // Dad (same as pollFirst())
        System.out.println(family.removeLast()); // Aunt (deque: remove from tail)
        System.out.println(family.pollLast());   // Grandpa (remove from tail)
        
        // Peek operations (non-destructive)
        family.offer("Mom");
        family.push("Baby");        // [Baby, Mom]
        System.out.println(family.peek());      // Baby (peek at head)
        System.out.println(family.peekLast());  // Mom (peek at tail)
        System.out.println(family.element());   // Baby (same as peek, but throws if empty)
        
        // Output: Uncle, Son, Dad, Aunt, Grandpa, Baby, Mom, Baby
    }
}
```

**💡 Learning Tips:**
- **Method naming logic**: `offer`/`poll` = Queue style, `push`/`pop` = Stack style, `First`/`Last` = specify end
- **You can mix operations**: Use stack methods and queue methods on the same Deque
- **Exception handling**: Methods ending in exception (`remove`, `add`, `element`) vs safe (`poll`, `offer`, `peek`)

**Q:** What happens when you `push()` then `poll()`?  
**A:** Both operate on the head, so `poll()` removes what `push()` just added - like using it as a stack.