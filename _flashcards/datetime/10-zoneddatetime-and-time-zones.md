---
layout: flashcard
category: Date, Time, and Localization
learning_tip: Remember "ZONED = SMART, OFFSET = SIMPLE" - ZonedDateTime handles DST
  automatically, OffsetDateTime uses fixed offsets.
order: 10
tags:
- stream
title: ZonedDateTime and Time Zones
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