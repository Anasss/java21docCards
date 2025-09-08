---
layout: flashcard
category: Date, Time, and Localization
learning_tip: Think "LOCALE = WHERE, BUNDLE = WHAT" - Locale specifies location/language,
  ResourceBundle provides localized content with automatic fallback.
order: 25
tags: []
title: Localization - Locale and Resource Bundles
---


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
