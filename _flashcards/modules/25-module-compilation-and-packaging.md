---
layout: flashcard
category: Modules & Migration
learning_tip: Think "ASSEMBLY LINE" - compile modules, package into JARs, link into
  custom runtime. Each step builds on the previous one.
order: 25
tags:
- module
title: Module Compilation and Packaging
---


**Rule:** Modular applications require **specific compilation and packaging** commands different from traditional Java applications.

- **Multi-module compilation**: Compile all modules together
- **Module JARs**: JARs with module-info.class in root
- **JLink**: Create custom runtime images

```java
// Project structure
myapp/
├── src/
│   ├── com.myapp.core/
│   │   ├── module-info.java
│   │   └── com/myapp/core/
│   ├── com.myapp.service/
│   │   ├── module-info.java
│   │   └── com/myapp/service/
│   └── com.myapp.main/
│       ├── module-info.java
│       └── com/myapp/main/
├── lib/
└── out/

// Multi-module compilation
javac --module-path lib \
      --module-source-path src \
      -d out \
      src/*/module-info.java src/*/**/*.java

// Alternative: compile each module separately
javac --module-path lib:out \
      --module-source-path src \
      -d out \
      --module com.myapp.core

javac --module-path lib:out \
      --module-source-path src \
      -d out \
      --module com.myapp.service

javac --module-path lib:out \
      --module-source-path src \
      -d out \
      --module com.myapp.main
```

**Creating modular JARs:**
```java
// Create module JARs
jar --create \
    --file lib/com.myapp.core.jar \
    --main-class com.myapp.core.Main \
    -C out/com.myapp.core .

jar --create \
    --file lib/com.myapp.service.jar \
    -C out/com.myapp.service .

jar --create \
    --file lib/com.myapp.main.jar \
    --main-class com.myapp.main.Application \
    -C out/com.myapp.main .

// Verify module info
jar --describe-module \
    --file lib/com.myapp.core.jar

// Output shows:
// com.myapp.core jar:file:///path/lib/com.myapp.core.jar
// requires java.base mandated
// exports com.myapp.core.api
// main-class com.myapp.core.Main
```

**Running modular applications:**
```java
// Run from compiled modules
java --module-path out:lib \
     --module com.myapp.main/com.myapp.main.Application

// Run from modular JARs
java --module-path lib \
     --module com.myapp.main/com.myapp.main.Application

// Run with additional options
java --module-path lib \
     --add-modules ALL-SYSTEM \
     --module com.myapp.main/com.myapp.main.Application

// Debug module loading
java --module-path lib \
     --show-module-resolution \
     --module com.myapp.main/com.myapp.main.Application
```

**JLink - Custom Runtime Images:**
```java
// Create custom JRE with only required modules
jlink --module-path $JAVA_HOME/jmods:lib \
      --add-modules com.myapp.main \
      --output myapp-runtime \
      --launcher myapp=com.myapp.main/com.myapp.main.Application

// Directory structure created:
myapp-runtime/
├── bin/
│   ├── java
│   └── myapp        # Custom launcher
├── conf/
├── lib/
└── release

// Run the custom runtime
./myapp-runtime/bin/myapp

// Or use java directly
./myapp-runtime/bin/java --module com.myapp.main
```

**Advanced JLink options:**
```java
// Optimize and compress
jlink --module-path $JAVA_HOME/jmods:lib \
      --add-modules com.myapp.main \
      --output myapp-runtime \
      --launcher myapp=com.myapp.main/com.myapp.main.Application \
      --compress=2 \              # Maximum compression
      --strip-debug \             # Remove debug info
      --no-header-files \         # Remove header files
      --no-man-pages             # Remove man pages

// List available modules
java --list-modules

// Show module dependencies
jdeps --module-path lib \
      --print-module-deps \
      lib/com.myapp.main.jar
```

**Maven integration:**
```xml
<!-- pom.xml for modular project -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <configuration>
        <release>21</release>
        <compilerArgs>
            <arg>--module-path</arg>
            <arg>${project.build.directory}/modules</arg>
        </compilerArgs>
    </configuration>
</plugin>

<plugin>
    <groupId>org.moditect</groupId>
    <artifactId>moditect-maven-plugin</artifactId>
    <version>1.0.0.RC2</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>create-runtime-image</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

**💡 Learning Tip:** Think "ASSEMBLY LINE" - compile modules, package into JARs, link into custom runtime. Each step builds on the previous one.

**Q:** What's the advantage of using JLink to create a custom runtime image?  
**A:** JLink creates a minimal JRE containing only the modules your application needs, reducing size and improving startup time while making deployment easier.
