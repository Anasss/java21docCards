---
layout: flashcard
category: I/O and NIO
learning_tip: Remember "FILES = SIMPLE, STREAMS = CONTROL" - Files class for simple
  operations, streams for fine-grained control and large files.
order: 5
tags:
- streams
- stream
title: Java I/O - File Reading and Writing
---

## 🃏 Java I/O - File Reading and Writing

**Rule:** Java I/O provides **multiple ways** to read/write files with different performance characteristics.

- **Files.readString()/writeString()**: Simple text file operations (Java 11+)
- **BufferedReader/Writer**: Efficient line-by-line processing
- **FileInputStream/OutputStream**: Byte-level operations

```java
import java.nio.file.*;
import java.io.*;
import java.util.List;

// Simple file operations (Java 11+)
Path textFile = Path.of("data.txt");

// Write string to file
String content = "Hello\nWorld\nJava";
Files.writeString(textFile, content);

// Read entire file as string
String fileContent = Files.readString(textFile);
System.out.println(fileContent);

// Read all lines into List
List<String> lines = Files.readAllLines(textFile);
lines.forEach(System.out::println);

// Write lines to file
List<String> outputLines = List.of("Line 1", "Line 2", "Line 3");
Files.write(textFile, outputLines);
```

**Buffered I/O for large files:**
```java
// Efficient reading with BufferedReader
try (BufferedReader reader = Files.newBufferedReader(Path.of("large.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}

// Efficient writing with BufferedWriter
try (BufferedWriter writer = Files.newBufferedWriter(Path.of("output.txt"))) {
    writer.write("First line");
    writer.newLine();
    writer.write("Second line");
    writer.newLine();
}

// Stream processing for very large files
try (Stream<String> lines = Files.lines(Path.of("huge.txt"))) {
    lines.filter(line -> line.contains("important"))
         .map(String::toUpperCase)
         .forEach(System.out::println);
}
```

**Byte-level operations:**
```java
// Copy file using byte arrays
try (FileInputStream in = new FileInputStream("source.dat");
     FileOutputStream out = new FileOutputStream("dest.dat")) {
    
    byte[] buffer = new byte[1024];
    int bytesRead;
    while ((bytesRead = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
    }
}

// Files utility for copying
Files.copy(Path.of("source.txt"), Path.of("destination.txt"), 
          StandardCopyOption.REPLACE_EXISTING);
```

**💡 Learning Tip:** Remember "FILES = SIMPLE, STREAMS = CONTROL" - Files class for simple operations, streams for fine-grained control and large files.

**Q:** When should you use Files.readString() vs BufferedReader?  
**A:** Use Files.readString() for small files when you need the entire content. Use BufferedReader for large files or when processing line-by-line to avoid memory issues.

---