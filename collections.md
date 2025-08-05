---
title: Collections & Generics
parent: Java 21 OCP Flashcards
nav_order: 2
layout: default
---

## 🃏 Generics: Bounded Wildcards (PECS Rule)

**PECS Rule:** **P**roducer **E**xtends, **C**onsumer **S**uper

- `? extends T`: **READ-ONLY** - Can read items of type T or its subtypes. Cannot add anything (except `null`)
- `? super T`: **WRITE-ONLY** - Can write T or its subtypes. Cannot safely read (except as `Object`)

### Basic PECS Example
```java
// Producer Extends - Reading from a collection
List<? extends Number> numbers = List.of(1, 2.0, 3L);
Number n = numbers.get(0);    // ✅ OK - can read as Number
// numbers.add(3);            // ❌ Compile error - cannot write

// Consumer Super - Writing to a collection  
List<? super Integer> values = new ArrayList<Number>();
values.add(10);       // ✅ OK - can write Integer/subtypes
values.add(42);       // ✅ OK - can write Integer/subtypes
// Integer i = values.get(0);  // ❌ Compile error - can only read as Object
Object obj = values.get(0);   // ✅ OK - can read as Object
```

### Family Hierarchy Example
```java
class Grandparent {
}
class Parent extends Grandparent {
}
class Child extends Parent {
}

public class FamilyGenericTest {
    Grandparent grandparent = new Grandparent();
    Child child = new Child();
    
    public void acceptOlderGenerations(List<? super Parent> familyList) {
        // Can ADD Parent and younger generations (Child)
        familyList.add(new Parent());     // ✅ OK - Parent is exactly Parent
        familyList.add(child);            // ✅ OK - Child is subtype of Parent
        // familyList.add(grandparent);   // ❌ NO - Grandparent is not assignable to Parent
        
        // Can only READ as Object (safest common type)
        Object obj = familyList.get(0);   // ✅ OK - everything is Object
        // Parent p = familyList.get(0);  // ❌ NO - could be List<Grandparent>
        // Child c = familyList.get(0);   // ❌ NO - definitely wrong
    }
    
    public void acceptYoungerGenerations(List<? extends Parent> familyList) {
        // Cannot ADD anything except null
        // familyList.add(grandparent);   // ❌ NO - cannot add to ? extends
        // familyList.add(new Parent());  // ❌ NO - cannot add to ? extends  
        // familyList.add(child);         // ❌ NO - cannot add to ? extends
        familyList.add(null);             // ✅ OK - null is allowed
        
        // Can READ as Parent or higher in hierarchy
        Parent p = familyList.get(0);     // ✅ OK - could be Parent or Child
        Grandparent gp = familyList.get(0); // ✅ OK - Parent extends Grandparent
        // Child c = familyList.get(0);   // ❌ NO - could be just Parent, not Child
    }
}
```

### Why This Works
- **`? super Parent`**: List could be `List<Parent>` or `List<Grandparent>` 
  - **Safe to write**: Parent/Child can go into either list type
  - **Unsafe to read**: Don't know if it's Parent or Grandparent, so can only read as Object

- **`? extends Parent`**: List could be `List<Parent>` or `List<Child>`
  - **Unsafe to write**: Don't know exact type, so can't add anything safely
  - **Safe to read**: Whatever comes out is at least a Parent

**💡 Learning Tip:** 
- **`? super T`** = "I accept T and its parents" (write T, read Object)
- **`? extends T`** = "I contain T and its children" (read T, write nothing)

**Q:** In `List<? super Parent> family`, why can't you read the result as `Parent`?  
**A:** Because the list could actually be `List<Grandparent>`, and reading a Grandparent as Parent would be unsafe downcasting.


## 🃏 Deque Stack vs Queue Operations

**Rule:** Deque can act as both **Stack (LIFO)** and **Queue (FIFO)** with different method behaviors.
- **Stack operations**: `push()` and `pop()` work at the **front/head** (LIFO - Last In First Out).
- **Queue operations**: `offer()/add()` at **tail**, `poll()/remove()` at **head** (FIFO - First In First Out).
- **Mixed usage** can cause confusion - know which end each method operates on.

```java
public class FamilyLineup {
    public static void main(String[] args) {
        Deque<String> familyLine = new ArrayDeque<>();
        
        // Using Stack operations (all work at FRONT/HEAD)
        familyLine.push("Father");    // [Father]
        familyLine.push("Mother");    // [Mother, Father] - Mother at front
        familyLine.push("Child");     // [Child, Mother, Father] - Child at front
        
        // Mixed operations - be careful!
        System.out.println(familyLine.pollFirst());  // Child (removes from front/head)
        System.out.println(familyLine.poll());       // Mother (poll() = pollFirst(), removes from front/head)
        System.out.println(familyLine.pollLast());   // Father (removes from back/tail)
        
        // Output:
        // Child
        // Mother  
        // Father
    }
}

// Stack view: [Child, Mother, Father] (Child is top/front)
// Queue view: [Child, Mother, Father] (Child is head, Father is tail)
```

**💡 Learning Tip:** Remember "STACK FRONT, QUEUE ENDS" - Stack operations (push/pop) work at front only, Queue operations work at opposite ends (add tail, remove head).

**Q:** If you push three elements then call pollFirst(), poll(), and pollLast(), what's the removal order?  
**A:** First element pushed, second element pushed, third element pushed - because pollFirst() and poll() both remove from head, pollLast() from tail.

## 🃏 Set Operations and Characteristics

**Rule:** Set implementations have **different ordering and performance characteristics**.

- **HashSet**: No ordering, O(1) operations, allows null
- **LinkedHashSet**: Insertion order, O(1) operations, allows null  
- **TreeSet**: Natural/comparator ordering, O(log n) operations, no null

```java
// HashSet - no ordering guaranteed
Set<String> hashSet = new HashSet<>();
hashSet.addAll(List.of("zebra", "apple", "banana"));
System.out.println(hashSet); // Could be: [banana, apple, zebra] (any order)

// LinkedHashSet - maintains insertion order
Set<String> linkedSet = new LinkedHashSet<>();
linkedSet.addAll(List.of("zebra", "apple", "banana"));
System.out.println(linkedSet); // [zebra, apple, banana] (insertion order)

// TreeSet - natural ordering (sorted)
Set<String> treeSet = new TreeSet<>();
treeSet.addAll(List.of("zebra", "apple", "banana"));
System.out.println(treeSet); // [apple, banana, zebra] (sorted)

// Set operations
Set<Integer> set1 = new HashSet<>(List.of(1, 2, 3, 4));
Set<Integer> set2 = new HashSet<>(List.of(3, 4, 5, 6));

// Union (all elements from both sets)
Set<Integer> union = new HashSet<>(set1);
union.addAll(set2);  // {1, 2, 3, 4, 5, 6}

// Intersection (common elements)
Set<Integer> intersection = new HashSet<>(set1);
intersection.retainAll(set2);  // {3, 4}

// Difference (elements in set1 but not set2)
Set<Integer> difference = new HashSet<>(set1);
difference.removeAll(set2);  // {1, 2}
```

**💡 Learning Tip:** Remember "HASH-LINKED-TREE" order: HashSet (no order), LinkedHashSet (insertion order), TreeSet (sorted order).

**Q:** Which Set implementation should you use if you need both fast lookups and predictable iteration order?  
**A:** LinkedHashSet — provides O(1) operations like HashSet but maintains insertion order unlike HashSet.

## 🃏 Map Operations and Merge Method

**Rule:** Map provides various methods for **conditional updates** and **bulk operations**.

- **compute methods**: Update based on key/value computation
- **merge()**: Combine new value with existing value using a function
- **putIfAbsent()**: Only put if key doesn't exist

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 92);

// merge() - combines values when key exists, inserts when key doesn't exist
scores.merge("Alice", 10, Integer::sum);    // 85 + 10 = 95 (key exists)
scores.merge("Charlie", 88, Integer::sum);  // Just inserts 88 (key doesn't exist)

System.out.println(scores); // {Alice=95, Bob=92, Charlie=88}

// computeIfAbsent - only compute if key missing
scores.computeIfAbsent("David", k -> k.length() * 10);  // David=50 (5 chars * 10)
scores.computeIfAbsent("Alice", k -> k.length() * 10);  // No change (Alice exists)

// computeIfPresent - only compute if key exists  
scores.computeIfPresent("Bob", (k, v) -> v + 5);        // Bob=97 (92 + 5)
scores.computeIfPresent("Eve", (k, v) -> v + 5);        // No change (Eve doesn't exist)

// compute - always computes (can return null to remove)
scores.compute("Alice", (k, v) -> v == null ? 100 : v - 10);  // Alice=85 (95 - 10)
```

**Bulk operations:**
```java
Map<String, String> defaults = Map.of("theme", "dark", "lang", "en");
Map<String, String> userPrefs = new HashMap<>();
userPrefs.put("theme", "light");

// putAll vs merge behavior
userPrefs.putAll(defaults);  // Overwrites existing keys
// Result: {theme=dark, lang=en} - theme overwritten!

// Better: merge each entry
defaults.forEach((k, v) -> userPrefs.merge(k, v, (old, new_) -> old));
// Result: {theme=light, lang=en} - keeps existing theme
```

**💡 Learning Tip:** Think "MERGE = SMART PUT" - merge() handles both insertion and updating with custom logic.

**Q:** What happens when you call merge() with a key that doesn't exist in the map?  
**A:** The new value is simply inserted (put), and the merge function is not called since there's no existing value to merge with.

---
