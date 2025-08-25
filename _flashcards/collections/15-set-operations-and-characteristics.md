---
category: Collections & Generics
learning_tip: 'Remember "HASH-LINKED-TREE" order: HashSet (no order), LinkedHashSet
  (insertion order), TreeSet (sorted order).'
order: 15
tags: []
title: Set Operations and Characteristics
---

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