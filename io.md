---
title: I/O and NIO
parent: Java 21 OCP Flashcards
nav_order: 2
layout: default
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

## 🃏 Files.mismatch() and Path Operations

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

## 🃏 Stream I/O Classes Hierarchy

**Rule:** Java I/O uses **decorator pattern** with byte streams (InputStream/OutputStream) and character streams (Reader/Writer).

- **Byte streams**: Handle raw binary data (images, videos, executables)
- **Character streams**: Handle text data with encoding support
- **Buffered streams**: Add buffering for performance
- **Bridge streams**: Convert between byte and character streams

```java
import java.io.*;

// Byte streams hierarchy
// InputStream <- FileInputStream, BufferedInputStream, ObjectInputStream
// OutputStream <- FileOutputStream, BufferedOutputStream, ObjectOutputStream

// Reading bytes
try (FileInputStream fis = new FileInputStream("data.bin");
     BufferedInputStream bis = new BufferedInputStream(fis)) {
    
    int byteValue;
    while ((byteValue = bis.read()) != -1) {
        // Process byte (0-255 or -1 for EOF)
        System.out.print(byteValue + " ");
    }
}

// Writing bytes
try (FileOutputStream fos = new FileOutputStream("output.bin");
     BufferedOutputStream bos = new BufferedOutputStream(fos)) {
    
    byte[] data = {65, 66, 67, 68, 69}; // ASCII for ABCDE
    bos.write(data);
    bos.flush(); // Ensure data is written
}

// Character streams hierarchy
// Reader <- FileReader, BufferedReader, InputStreamReader
// Writer <- FileWriter, BufferedWriter, OutputStreamWriter

// Reading characters
try (FileReader fr = new FileReader("text.txt");
     BufferedReader br = new BufferedReader(fr)) {
    
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}

// Writing characters
try (FileWriter fw = new FileWriter("output.txt");
     BufferedWriter bw = new BufferedWriter(fw)) {
    
    bw.write("Hello World");
    bw.newLine();
    bw.write("Java I/O");
    bw.flush();
}
```

**Bridge streams - converting between byte and character:**
```java
// InputStreamReader - byte stream to character stream
try (FileInputStream fis = new FileInputStream("input.txt");
     InputStreamReader isr = new InputStreamReader(fis, StandardCharsets.UTF_8);
     BufferedReader br = new BufferedReader(isr)) {
    
    String line = br.readLine();
    System.out.println(line);
}

// OutputStreamWriter - character stream to byte stream  
try (FileOutputStream fos = new FileOutputStream("output.txt");
     OutputStreamWriter osw = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
     BufferedWriter bw = new BufferedWriter(osw)) {
    
    bw.write("Unicode text: 你好");
    bw.flush();
}

// System streams
BufferedReader console = new BufferedReader(new InputStreamReader(System.in));
PrintWriter output = new PrintWriter(System.out);

String userInput = console.readLine();
output.println("You entered: " + userInput);
output.flush();
```

**Object serialization:**
```java
// Serializable class
class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// Write object
try (FileOutputStream fos = new FileOutputStream("person.ser");
     ObjectOutputStream oos = new ObjectOutputStream(fos)) {
    
    Person person = new Person("Alice", 30);
    oos.writeObject(person);
}

// Read object
try (FileInputStream fis = new FileInputStream("person.ser");
     ObjectInputStream ois = new ObjectInputStream(fis)) {
    
    Person person = (Person) ois.readObject();
    System.out.println(person); // Person{name='Alice', age=30}
}
```

**Performance considerations:**
```java
// ❌ Slow - unbuffered I/O
try (FileReader fr = new FileReader("largefile.txt")) {
    int ch;
    while ((ch = fr.read()) != -1) {  // Each read() is a system call
        System.out.print((char) ch);
    }
}

// ✅ Fast - buffered I/O
try (FileReader fr = new FileReader("largefile.txt");
     BufferedReader br = new BufferedReader(fr)) {
    
    int ch;
    while ((ch = br.read()) != -1) {  // Reads from internal buffer
        System.out.print((char) ch);
    }
}

// ✅ Fastest - read lines at once
try (FileReader fr = new FileReader("largefile.txt");
     BufferedReader br = new BufferedReader(fr)) {
    
    String line;
    while ((line = br.readLine()) != null) {  // Read entire lines
        System.out.println(line);
    }
}
```

**💡 Learning Tip:** Remember "BYTE vs CHAR, BUFFER for SPEED" - use byte streams for binary data, character streams for text, and always add buffering for performance.

**Q:** When should you use InputStreamReader vs FileReader?  
**A:** Use InputStreamReader when you need explicit encoding control or are wrapping a byte stream. FileReader is a convenience class that uses the platform default encoding.