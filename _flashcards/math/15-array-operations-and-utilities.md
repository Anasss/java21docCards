---
layout: flashcard
category: Math, Arrays, Wrappers
learning_tip: Remember "ARRAYS = UTILITY BELT" - Arrays class has tools for every
  common array operation. Use deepEquals() and deepToString() for multi-dimensional
  arrays.
order: 15
tags: []
title: Array Operations and Utilities
---


**Rule:** Arrays class provides **utility methods** for common array operations like sorting, searching, and comparison.

{% raw %}
```java
import java.util.Arrays;

// Array creation and initialization
int[] numbers = {5, 2, 8, 1, 9};
String[] names = new String[3];
Arrays.fill(names, "Unknown");  // Fill entire array with value

// Sorting
Arrays.sort(numbers);           // [1, 2, 5, 8, 9]
String[] words = {"zebra", "apple", "banana"};
Arrays.sort(words);             // [apple, banana, zebra]

// Partial sorting
int[] partialSort = {5, 2, 8, 1, 9, 3, 7};
Arrays.sort(partialSort, 1, 4); // Sort indices 1-3: [5, 1, 2, 8, 9, 3, 7]

// Array copying
int[] original = {1, 2, 3, 4, 5};
int[] copy1 = Arrays.copyOf(original, 3);        // [1, 2, 3]
int[] copy2 = Arrays.copyOf(original, 7);        // [1, 2, 3, 4, 5, 0, 0]
int[] copy3 = Arrays.copyOfRange(original, 1, 4); // [2, 3, 4]

// Array equality
int[] arr1 = {1, 2, 3};
int[] arr2 = {1, 2, 3};
int[] arr3 = {1, 2, 4};

System.out.println(arr1 == arr2);              // false (reference comparison)
System.out.println(Arrays.equals(arr1, arr2)); // true (content comparison)
System.out.println(Arrays.equals(arr1, arr3)); // false (different content)

// Multi-dimensional arrays
int[][] matrix1 = {{1, 2}, {3, 4}};
int[][] matrix2 = {{1, 2}, {3, 4}};

System.out.println(Arrays.equals(matrix1, matrix2));     // false (shallow comparison)
System.out.println(Arrays.deepEquals(matrix1, matrix2)); // true (deep comparison)
```

**Array to String conversion:**
```java
int[] array = {1, 2, 3, 4, 5};
System.out.println(array);                    // [I@hashcode (not useful)
System.out.println(Arrays.toString(array));   // [1, 2, 3, 4, 5]

int[][] twoDArray = {{1, 2}, {3, 4}};
System.out.println(Arrays.toString(twoDArray));     // [references] (not useful)
System.out.println(Arrays.deepToString(twoDArray)); // [[1, 2], [3, 4]]
```
{% endraw %}

**💡 Learning Tip:** Remember "ARRAYS = UTILITY BELT" - Arrays class has tools for every common array operation. Use deepEquals() and deepToString() for multi-dimensional arrays.

**Q:** What's the difference between Arrays.equals() and Arrays.deepEquals()?  
**A:** equals() does shallow comparison (one level), while deepEquals() recursively compares multi-dimensional arrays.

---
