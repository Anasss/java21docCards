---
layout: flashcard
category: Collections & Generics
learning_tip: Think "MERGE = SMART PUT" - merge() handles both insertion and updating
  with custom logic.
order: 20
tags: []
title: Map Operations and Merge Method
---


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
