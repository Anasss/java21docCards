---
category: I/O and NIO
learning_tip: Remember "BYTE vs CHAR, BUFFER for SPEED" - use byte streams for binary
  data, character streams for text, and always add buffering for performance.
order: 20
tags:
- streams
- stream
- pattern
title: Stream I/O Classes Hierarchy
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