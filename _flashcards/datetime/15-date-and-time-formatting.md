---
layout: flashcard
category: Date, Time, and Localization
learning_tip: Remember "PATTERN = PICTURE" - yyyy-MM-dd shows exactly how the output
  looks. DateTimeFormatter is thread-safe and should be reused.
order: 15
tags:
- stream
- pattern
title: Date and Time Formatting
---


**Rule:** DateTimeFormatter provides **flexible formatting and parsing** for date/time objects.

- **Predefined formatters**: ISO_LOCAL_DATE, ISO_LOCAL_TIME, etc.
- **Pattern-based formatters**: Custom patterns using letters (yyyy, MM, dd)
- **Localized formatters**: Locale-specific formatting

```java
import java.time.*;
import java.time.format.*;
import java.util.Locale;

LocalDateTime dateTime = LocalDateTime.of(2024, 3, 15, 14, 30, 45);

// Predefined formatters
System.out.println(dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE));      // 2024-03-15
System.out.println(dateTime.format(DateTimeFormatter.ISO_LOCAL_TIME));      // 14:30:45
System.out.println(dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)); // 2024-03-15T14:30:45

// Custom patterns
DateTimeFormatter custom1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
DateTimeFormatter custom2 = DateTimeFormatter.ofPattern("MMM dd, yyyy 'at' h:mm a");
DateTimeFormatter custom3 = DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy");

System.out.println(dateTime.format(custom1)); // 2024-03-15 14:30:45
System.out.println(dateTime.format(custom2)); // Mar 15, 2024 at 2:30 PM
System.out.println(dateTime.format(custom3)); // Friday, March 15, 2024

// Localized formatting
DateTimeFormatter usFormat = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
                                             .withLocale(Locale.US);
DateTimeFormatter frenchFormat = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
                                                 .withLocale(Locale.FRANCE);

System.out.println(dateTime.format(usFormat));    // Mar 15, 2024, 2:30:45 PM
System.out.println(dateTime.format(frenchFormat)); // 15 mars 2024, 14:30:45
```

**Parsing strings to date/time:**
```java
// Parse with predefined formatters
LocalDate date1 = LocalDate.parse("2024-03-15", DateTimeFormatter.ISO_LOCAL_DATE);
LocalTime time1 = LocalTime.parse("14:30:45", DateTimeFormatter.ISO_LOCAL_TIME);

// Parse with custom patterns
DateTimeFormatter parser = DateTimeFormatter.ofPattern("MM/dd/yyyy h:mm a");
LocalDateTime parsed = LocalDateTime.parse("03/15/2024 2:30 PM", parser);

// Case-insensitive parsing
DateTimeFormatter flexible = DateTimeFormatter.ofPattern("MMM dd, yyyy")
                                             .withResolverStyle(ResolverStyle.LENIENT)
                                             .withLocale(Locale.ENGLISH);
LocalDate flexible_date = LocalDate.parse("mar 15, 2024", flexible);

// Handling parse errors
try {
    LocalDate invalid = LocalDate.parse("invalid-date");
} catch (DateTimeParseException e) {
    System.out.println("Parse error: " + e.getMessage());
    System.out.println("Error index: " + e.getErrorIndex());
}
```

**Pattern symbols:**
```java
// Common pattern symbols
// y - year (yyyy = 2024, yy = 24)
// M - month (MM = 03, MMM = Mar, MMMM = March)
// d - day of month (dd = 15)
// H - hour 24-hour (HH = 14)
// h - hour 12-hour (hh = 02)
// m - minute (mm = 30)
// s - second (ss = 45)
// a - AM/PM marker
// E - day of week (EEE = Fri, EEEE = Friday)
// z - time zone name (PST, Pacific Standard Time)
// Z - time zone offset (-0800)

DateTimeFormatter complex = DateTimeFormatter.ofPattern(
    "EEEE, MMMM d, yyyy 'at' h:mm:ss a z"
);

ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("America/Los_Angeles"));
System.out.println(zdt.format(complex)); 
// Friday, March 15, 2024 at 2:30:45 PM PDT
```

**Thread safety and performance:**
```java
// DateTimeFormatter is immutable and thread-safe
public class DateFormatter {
    private static final DateTimeFormatter FORMATTER = 
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public String format(LocalDateTime dateTime) {
        return dateTime.format(FORMATTER);  // Safe to share
    }
}

// Reuse formatters for better performance
DateTimeFormatter reusable = DateTimeFormatter.ofPattern("yyyy-MM-dd");
List<LocalDate> dates = Arrays.asList(/* many dates */);

// ✅ Efficient - reuse formatter
dates.stream()
     .map(date -> date.format(reusable))
     .forEach(System.out::println);

// ❌ Inefficient - create new formatter each time
dates.stream()
     .map(date -> date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
     .forEach(System.out::println);
```

**💡 Learning Tip:** Remember "PATTERN = PICTURE" - yyyy-MM-dd shows exactly how the output looks. DateTimeFormatter is thread-safe and should be reused.

---
