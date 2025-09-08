---
layout: flashcard
category: I/O and NIO
learning_tip: Think "PATH = GPS DIRECTIONS" - Path operations calculate routes and
  relationships between locations without checking if the locations actually exist.
order: 15
tags: []
title: Path Operations and Resolution
---

## 🃏 Path Operations and Resolution

**Rule:** Path provides methods for **manipulating file system paths** without accessing the actual file system.

- **Path operations** are purely **textual** - they don't check if files exist
- **Path.resolve()** combines paths intelligently
- **Path.relativize()** finds relative path between two paths

```java
import java.nio.file.Path;

// Path creation
Path path1 = Path.of("home", "user", "documents");          // home/user/documents
Path path2 = Path.of("/usr/local/bin");                     // /usr/local/bin
Path path3 = Path.of("C:", "Users", "John", "file.txt");    // C:\Users\John\file.txt (Windows)

// Path components
Path fullPath = Path.of("/home/user/documents/file.txt");
System.out.println("Root: " + fullPath.getRoot());         // /
System.out.println("Parent: " + fullPath.getParent());     // /home/user/documents
System.out.println("Filename: " + fullPath.getFileName()); // file.txt
System.out.println("Name count: " + fullPath.getNameCount()); // 4
System.out.println("Name(1): " + fullPath.getName(1));     // user

// Path resolution
Path base = Path.of("/home/user");
Path relative = Path.of("documents/file.txt");
Path absolute = Path.of("/etc/config");

Path resolved1 = base.resolve(relative);    // /home/user/documents/file.txt
Path resolved2 = base.resolve(absolute);    // /etc/config (absolute path wins)
Path resolved3 = base.resolve("temp.txt");  // /home/user/temp.txt
```

**Path normalization and relativization:**
```java
// Normalize - removes redundant elements
Path messy = Path.of("/home/user/../user/./documents/../documents/file.txt");
Path clean = messy.normalize();  // /home/user/documents/file.txt

// Relativize - find relative path between two paths
Path from = Path.of("/home/user/documents");
Path to = Path.of("/home/user/pictures/vacation.jpg");
Path relative = from.relativize(to);  // ../pictures/vacation.jpg

Path from2 = Path.of("/home/user");
Path to2 = Path.of("/home/user/documents/file.txt");
Path relative2 = from2.relativize(to2);  // documents/file.txt

// Absolute paths
Path abs1 = Path.of("/home/user/docs");
Path abs2 = Path.of("/var/log/app.log");
Path relative3 = abs1.relativize(abs2);  // ../../../var/log/app.log
```

**Path comparison and testing:**
```java
Path path1 = Path.of("documents/file.txt");
Path path2 = Path.of("documents", "file.txt");
Path path3 = Path.of("DOCUMENTS/FILE.TXT");

System.out.println(path1.equals(path2));        // true (same path)
System.out.println(path1.equals(path3));        // false (case sensitive on Unix)

// Check path characteristics (textual, not file system)
System.out.println(path1.isAbsolute());         // false
System.out.println(Path.of("/home").isAbsolute());  // true

// startsWith/endsWith work on path elements, not strings
Path fullPath = Path.of("/home/user/documents/file.txt");
System.out.println(fullPath.startsWith("/home"));       // true
System.out.println(fullPath.startsWith("/ho"));         // false (not complete element)
System.out.println(fullPath.endsWith("file.txt"));      // true
System.out.println(fullPath.endsWith("uments/file.txt")); // false (not complete elements)
```

**💡 Learning Tip:** Think "PATH = GPS DIRECTIONS" - Path operations calculate routes and relationships between locations without checking if the locations actually exist.

**Q:** What's the difference between `path1.resolve(path2)` when path2 is relative vs absolute?  
**A:** If path2 is relative, it's appended to path1. If path2 is absolute, path2 is returned unchanged (absolute paths "win").

---