---
layout: flashcard
category: Date, Time, and Localization
learning_tip: Remember "IMMUTABLE TIME" - LocalDate/Time classes never change, they
  always return new instances. Period for dates, Duration for time.
order: 5
tags: []
title: LocalDate and LocalTime Operations (Date-Time API)
---


**Rule:** LocalDate/LocalTime/LocalDateTime are **immutable** - all methods return **new instances**.

- **LocalDate**: Date only (year, month, day)
- **LocalTime**: Time only (hour, minute, second, nanosecond)  
- **LocalDateTime**: Date and time combined

```java
import java.time.*;

// Creating date/time objects
LocalDate today = LocalDate.now();                    // Current date
LocalDate birthday = LocalDate.of(2000, 5, 15);       // May 15, 2000
LocalTime now = LocalTime.now();                       // Current time
LocalTime lunch = LocalTime.of(12, 30);               // 12:30 PM
LocalDateTime meeting = LocalDateTime.of(2024, 3, 20, 14, 30); // Mar 20, 2024 at 2:30 PM

// All methods return NEW instances (immutable)
LocalDate tomorrow = today.plusDays(1);               // Add 1 day
LocalDate nextMonth = today.plusMonths(1);            // Add 1 month
LocalTime later = lunch.plusHours(2);                 // Add 2 hours
LocalDate earlier = birthday.minusYears(5);           // Subtract 5 years

// Original objects unchanged
System.out.println(today);     // Still original date
System.out.println(lunch);     // Still 12:30
```

**Period and Duration:**
```java
// Period - date-based amounts (years, months, days)
Period age = Period.between(birthday, today);
System.out.println("Age: " + age.getYears() + " years");

Period twoWeeks = Period.ofDays(14);
LocalDate vacation = today.plus(twoWeeks);

// Duration - time-based amounts (hours, minutes, seconds)
Duration workDay = Duration.ofHours(8);
LocalTime endWork = LocalTime.of(9, 0).plus(workDay);  // 9:00 AM + 8 hours = 5:00 PM

Duration between = Duration.between(lunch, now);
System.out.println("Hours since lunch: " + between.toHours());
```

**💡 Learning Tip:** Remember "IMMUTABLE TIME" - LocalDate/Time classes never change, they always return new instances. Period for dates, Duration for time.

**Q:** If you call `birthday.plusYears(10)` without assigning the result, does birthday change?  
**A:** No — LocalDate is immutable. The method returns a new LocalDate instance, but birthday remains unchanged.

---
