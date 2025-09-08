---
layout: flashcard
category: I/O and NIO
learning_tip: Mismatch = "Find the first difference" (-1 means no differences found).
order: 10
tags:
- stream
title: Files.mismatch() and Path Operations
---


**Files.mismatch()** - Compares two files **byte by byte**:
- Returns **index of first mismatching byte** (0-based)
- Returns **-1** if files are identical
- Throws `IOException` if paths are invalid or inaccessible

```java
import java.nio.file.*;
import java.io.IOException;

try {
    Path file1 = Path.of("document1.txt");  // Content: "Hello World"
    Path file2 = Path.of("document2.txt");  // Content: "Hello Mars"
    Path file3 = Path.of("document3.txt");  // Content: "Hello World"
    
    long result1 = Files.mismatch(file1, file2);  // Returns 6 (index of 'W' vs 'M')
    long result2 = Files.mismatch(file1, file3);  // Returns -1 (identical)
    
    System.out.println("Mismatch at byte: " + result1);  // 6
    System.out.println("Files identical: " + (result2 == -1));  // true
    
} catch (IOException e) {
    System.out.println("Error reading files: " + e.getMessage());
}
```

**Other useful Path/Files operations (Java 21):**
```java
// Path operations:
Path path = Path.of("users", "documents", "file.txt");
Path absolute = path.toAbsolutePath();
Path parent = path.getParent();
Path filename = path.getFileName();

// Files operations:
boolean exists = Files.exists(path);
boolean readable = Files.isReadable(path);
long size = Files.size(path);
String content = Files.readString(path);
List<String> lines = Files.readAllLines(path);

// Directory operations:
Files.createDirectories(Path.of("new/nested/directory"));
try (var stream = Files.walk(Path.of("."))) {
    stream.filter(Files::isRegularFile)
          .forEach(System.out::println);
}
```

**💡 Learning Tip:** Mismatch = "Find the first difference" (-1 means no differences found).

---
