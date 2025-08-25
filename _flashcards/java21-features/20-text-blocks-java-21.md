---
category: Java 21 Features
learning_tip: Text blocks = "What you see is what you get" - preserves formatting,
  perfect for HTML, JSON, SQL. Triple quotes mark the boundaries.
order: 20
tags: []
title: Text Blocks (Java 21)
---

## 🃏 Text Blocks (Java 21)

**Multi-line strings with preserved formatting:**

```java
// Traditional string concatenation:
String html1 = "<html>\n" +
               "  <body>\n" +
               "    <h1>Hello World</h1>\n" +
               "  </body>\n" +
               "</html>";

// Text block (Java 15+):
String html2 = """
    <html>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
    """;

// JSON example:
String json = """
    {
      "name": "John Doe",
      "age": 30,
      "city": "New York"
    }
    """;

// SQL example:
String query = """
    SELECT users.name, users.email, orders.total
    FROM users
    JOIN orders ON users.id = orders.user_id
    WHERE orders.date >= ?
    ORDER BY orders.total DESC
    """;
```

**Text block processing methods:**
```java
String textBlock = """
    Line 1
    Line 2
    Line 3
    """;

// String methods work normally:
String[] lines = textBlock.lines().toArray(String[]::new);
String trimmed = textBlock.strip();
boolean contains = textBlock.contains("Line 2");

// Formatted text blocks:
String template = """
    Hello %s,
    Your balance is $%.2f
    Account: %s
    """;
String message = template.formatted("Alice", 1234.56, "ACC-123");
```

**💡 Learning Tip:** Text blocks = "What you see is what you get" - preserves formatting, perfect for HTML, JSON, SQL. Triple quotes mark the boundaries.

---