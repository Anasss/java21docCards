---
title: Date, Time, and Localization
parent: Java 21 OCP Flashcards
nav_order: 2
layout: default
---

## 🃏 LocalDate and LocalTime Operations (Date-Time API)

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

## 🃏 ZonedDateTime and Time Zones

**Rule:** ZonedDateTime handles **time zones and daylight saving time** transitions automatically.

- **ZoneId**: Represents a time zone (e.g., "America/New_York")
- **ZoneOffset**: Fixed offset from UTC (e.g., "+05:30")
- **ZonedDateTime**: LocalDateTime + ZoneId with DST handling

```java
import java.time.*;

// Creating ZonedDateTime
ZonedDateTime nyTime = ZonedDateTime.now(ZoneId.of("America/New_York"));
ZonedDateTime tokyoTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
ZonedDateTime utcTime = ZonedDateTime.now(ZoneId.of("UTC"));

// Convert between time zones
ZonedDateTime meeting = ZonedDateTime.of(2024, 3, 15, 14, 30, 0, 0, 
                                        ZoneId.of("America/Los_Angeles"));
ZonedDateTime meetingInNY = meeting.withZoneSameInstant(ZoneId.of("America/New_York"));
ZonedDateTime meetingInTokyo = meeting.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));

System.out.println("LA: " + meeting);        // 2024-03-15T14:30-08:00[America/Los_Angeles]
System.out.println("NY: " + meetingInNY);    // 2024-03-15T17:30-04:00[America/New_York]
System.out.println("Tokyo: " + meetingInTokyo); // 2024-03-16T06:30+09:00[Asia/Tokyo]

// DST handling
ZoneId nyZone = ZoneId.of("America/New_York");
ZonedDateTime beforeDST = ZonedDateTime.of(2024, 3, 10, 1, 30, 0, 0, nyZone);
ZonedDateTime afterDST = beforeDST.plusHours(2);  // Automatically handles "spring forward"

System.out.println("Before: " + beforeDST);  // 2024-03-10T01:30-05:00
System.out.println("After: " + afterDST);    // 2024-03-10T04:30-04:00 (skips 2:30-3:30)
```

**OffsetDateTime vs ZonedDateTime:**
```java
// OffsetDateTime - fixed offset, no DST awareness
OffsetDateTime fixedOffset = OffsetDateTime.of(2024, 6, 15, 10, 30, 0, 0, 
                                              ZoneOffset.of("+05:30"));

// ZonedDateTime - full time zone with DST rules
ZonedDateTime zonedTime = ZonedDateTime.of(2024, 6, 15, 10, 30, 0, 0, 
                                          ZoneId.of("America/New_York"));

// Convert between them
ZonedDateTime fromOffset = fixedOffset.atZoneSameInstant(ZoneId.of("UTC"));
OffsetDateTime fromZoned = zonedTime.toOffsetDateTime();
```

**Time zone operations:**
```java
// Available time zones
Set<String> allZones = ZoneId.getAvailableZoneIds();
allZones.stream()
    .filter(zone -> zone.contains("America"))
    .sorted()
    .forEach(System.out::println);

// System default zone
ZoneId systemZone = ZoneId.systemDefault();
System.out.println("System zone: " + systemZone);

// UTC and GMT
ZoneId utc = ZoneId.of("UTC");
ZoneId gmt = ZoneId.of("GMT");
ZoneId zulu = ZoneId.of("Z");  // Same as UTC

// Custom offsets
ZoneOffset plus5_30 = ZoneOffset.of("+05:30");  // India Standard Time
ZoneOffset minus8 = ZoneOffset.ofHours(-8);     // PST
```

**💡 Learning Tip:** Remember "ZONED = SMART, OFFSET = SIMPLE" - ZonedDateTime handles DST automatically, OffsetDateTime uses fixed offsets.

---

## 🃏 Date and Time Formatting

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

## 🃏 Daylight Saving Time "Fall Back" Calculations

**Rule:** When DST ends ("fall back"), the **same local time occurs twice**, creating a 25-hour day where time calculations must account for the repeated hour.

**Timeline Visualization for November 5, 2023 DST End in America/Chicago:**

```
Regular Timeline:          DST "Fall Back" Timeline:
12:00 AM ──────────────►   12:00 AM ──────────────►
01:00 AM ──────────────►   01:00 AM ──────────────►
02:00 AM ──────────────►   02:00 AM (first occurrence) ──┐
03:00 AM ──────────────►                                  │ Clock jumps back
04:00 AM ──────────────►   01:00 AM (after fall back) ──┘
                           02:00 AM (second occurrence) ──►
                           03:00 AM ──────────────►
```

**The Problem:** When calculating time between 3:00 AM and 1:00 AM on DST end day:

```java
import java.time.*;
import java.time.temporal.ChronoUnit;

// DST ends November 5, 2023 at 2:00 AM in America/Chicago
// Clock "falls back" from 2:00 AM to 1:00 AM

LocalDateTime morning = LocalDateTime.of(2023, Month.NOVEMBER, 5, 3, 0);    // 3:00 AM
ZonedDateTime chicagoMorning = ZonedDateTime.of(morning, ZoneId.of("America/Chicago"));

LocalDateTime early = LocalDateTime.of(2023, Month.NOVEMBER, 5, 1, 0);      // 1:00 AM  
ZonedDateTime chicagoEarly = ZonedDateTime.of(early, ZoneId.of("America/Chicago"));

long hoursBetween = ChronoUnit.HOURS.between(chicagoMorning, chicagoEarly);
System.out.println("Hours from 3:00 AM to 1:00 AM: " + hoursBetween);  // -2
```

**Why the result is -2:**

**Step-by-step timeline:**
1. **3:00 AM** (starting point)
2. Go back 1 hour → **2:00 AM** (second occurrence, after fall back)
3. Go back 1 more hour → **1:00 AM** (after the repeated hour)

**Total:** 2 hours backward = **-2**

**The Key Insight:** 
- From 3:00 AM to 1:00 AM normally would be -2 hours
- On DST "fall back" day, there's an extra hour (1:00-2:00 AM occurs twice)
- ZonedDateTime automatically picks the **later occurrence** (after fall back)
- So we still need -2 hours to go from 3:00 AM to the 1:00 AM that comes after the time change

**Extended example with different times:**
```java
// DST ends March 26, 2023 at 3:00 AM in Europe/Berlin (falls back to 2:00 AM)
LocalDateTime breakfast = LocalDateTime.of(2023, Month.MARCH, 26, 4, 30);   // 4:30 AM
ZonedDateTime berlinBreakfast = ZonedDateTime.of(breakfast, ZoneId.of("Europe/Berlin"));

LocalDateTime midnight = LocalDateTime.of(2023, Month.MARCH, 26, 2, 15);    // 2:15 AM
ZonedDateTime berlinMidnight = ZonedDateTime.of(midnight, ZoneId.of("Europe/Berlin"));

long minutesDiff = ChronoUnit.MINUTES.between(berlinBreakfast, berlinMidnight);
System.out.println("Minutes from 4:30 AM to 2:15 AM: " + minutesDiff);    // -195

// Breakdown: 4:30 AM → 2:15 AM = -2 hours 15 minutes = -135 minutes
// But DST adds an extra hour, so -135 - 60 = -195 minutes
```

**Visual Timeline for the Calculation:**
```
DST End Day (25-hour day):
├─ 12:00 AM
├─ 01:00 AM  
├─ 02:00 AM (first time) ──┐
├─ 02:00 AM (repeated)    ──┘ ← Extra hour here!
├─ 02:15 AM (our target) ────────┐
├─ 03:00 AM                      │
├─ 04:00 AM                      │ 195 minutes difference
└─ 04:30 AM (our start) ────────┘
```

**💡 Learning Tip:** Remember "FALL BACK = EXTRA HOUR" - When DST ends, one hour is repeated (1:00-2:00 AM happens twice), making time calculations longer than expected.

**Q:** On DST end day, if you calculate hours between 4:00 AM and 2:00 AM, why might the result be -3 instead of -2?  
**A:** Because the 2:00 AM hour occurs twice on DST end day. Going from 4:00 AM to 2:00 AM crosses the repeated hour, requiring an extra hour: 4→3→2(first)→2(repeated) = 3 hours backward = -3.

---

## 🃏 Localization - Locale and Resource Bundles

**Rule:** Localization uses **Locale** for region/language and **ResourceBundle** for externalized text.

- **Locale**: Represents language and country (e.g., en_US, fr_FR)
- **ResourceBundle**: Loads localized text from properties files
- **Fallback mechanism**: Searches for most specific to most general

```java
import java.util.*;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;

// Creating Locales
Locale english = Locale.ENGLISH;                    // en
Locale french = Locale.FRENCH;                      // fr  
Locale usEnglish = Locale.US;                       // en_US
Locale canadianFrench = Locale.CANADA_FRENCH;       // fr_CA
Locale custom = new Locale("es", "MX");             // es_MX (Spanish Mexico)

// Resource bundles (properties files)
// messages_en.properties: greeting=Hello
// messages_fr.properties: greeting=Bonjour
// messages.properties: greeting=Hi (default fallback)

ResourceBundle bundle = ResourceBundle.getBundle("messages", Locale.FRENCH);
String greeting = bundle.getString("greeting");  // "Bonjour"

// Fallback search order for Locale("fr", "CA"):
// 1. messages_fr_CA.properties
// 2. messages_fr.properties  
// 3. messages.properties (default)
```

**Number and currency formatting:**
```java
double amount = 1234.56;

// Number formatting per locale
NumberFormat usNumber = NumberFormat.getNumberInstance(Locale.US);
NumberFormat frenchNumber = NumberFormat.getNumberInstance(Locale.FRANCE);

System.out.println(usNumber.format(amount));     // 1,234.56
System.out.println(frenchNumber.format(amount)); // 1 234,56

// Currency formatting
NumberFormat usCurrency = NumberFormat.getCurrencyInstance(Locale.US);
NumberFormat euroCurrency = NumberFormat.getCurrencyInstance(Locale.FRANCE);

System.out.println(usCurrency.format(amount));   // $1,234.56
System.out.println(euroCurrency.format(amount)); // 1 234,56 €

// Percentage formatting
NumberFormat percent = NumberFormat.getPercentInstance(Locale.US);
System.out.println(percent.format(0.75));        // 75%
```

**Date/time formatting:**
```java
LocalDateTime now = LocalDateTime.now();

// US format: MM/dd/yyyy
DateTimeFormatter usFormat = DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)
                                             .withLocale(Locale.US);

// French format: dd/MM/yyyy  
DateTimeFormatter frenchFormat = DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)
                                                 .withLocale(Locale.FRANCE);

System.out.println(now.format(usFormat));     // 03/20/2024
System.out.println(now.format(frenchFormat)); // 20/03/2024
```

**💡 Learning Tip:** Think "LOCALE = WHERE, BUNDLE = WHAT" - Locale specifies location/language, ResourceBundle provides localized content with automatic fallback.

**Q:** If you request a ResourceBundle for Locale("de", "CH") but only have messages_de.properties and messages.properties, which file is used?  
**A:** messages_de.properties — the search falls back from de_CH to de to default, using the most specific match found.