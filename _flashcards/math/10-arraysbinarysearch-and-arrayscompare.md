---
category: Math, Arrays, Wrappers
order: 10
tags: []
title: Arrays.binarySearch() and Arrays.compare()
---

## 🃏 Arrays.binarySearch() and Arrays.compare()

**Arrays.binarySearch()** - Requires **sorted array**:
- **Positive index** if element found
- **Negative value** if not found: `-(insertion point) - 1`

```java
int[] sorted = {10, 20, 30, 40, 50};

// Element found:
int found = Arrays.binarySearch(sorted, 30);    // Returns 2
System.out.println("Found at index: " + found);

// Element not found:
int notFound = Arrays.binarySearch(sorted, 25); // Returns -3
int insertionPoint = -notFound - 1;             // -(-3) - 1 = 2
System.out.println("Would insert at index: " + insertionPoint);
```

**Arrays.compare() vs Arrays.mismatch():**

```java
int[] a = {1, 2, 3, 4};
int[] b = {1, 2, 3, 4};
int[] c = {1, 2, 5, 4};

// Arrays.compare() - lexicographic comparison:
System.out.println(Arrays.compare(a, b));   // 0 (equal)
System.out.println(Arrays.compare(a, c));   // -2 (3 < 5, so negative)

// Arrays.mismatch() - find difference location:
System.out.println(Arrays.mismatch(a, b));  // -1 (no mismatch)
System.out.println(Arrays.mismatch(a, c));  // 2 (differ at index 2)
```

**💡 Learning Tips:** 
- binarySearch: "Negative means missing" - use `-(result) - 1` for insertion point
- compare() tells you "who wins", mismatch() tells you "where they differ"

---