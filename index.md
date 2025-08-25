---
title: Java 21 OCP Flashcards
nav_order: 1
has_children: true
layout: default
---

# Java 21 OCP Flashcards

A structured collection of flashcards to help you prepare for the Java 21 OCP certification exam.

## 🎯 Quick Links

<div style="display: flex; gap: 15px; margin: 30px 0; flex-wrap: wrap;">
  <a href="{{ '/quiz/' | relative_url }}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
    🧪 Take the Quiz
  </a>
  <a href="{{ '/complete-java21-qa.html' | relative_url }}" style="display: inline-block; padding: 12px 24px; background: #6c757d; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
    📚 Q&A Study Guide
  </a>
</div>

## 📖 Flashcard Categories

{% assign categories = site.flashcards | map: "category" | uniq | sort %}
{% for category in categories %}
  {% assign flashcards_in_category = site.flashcards | where: "category", category | sort: "order" %}
  
### {{ category }}
{% for flashcard in flashcards_in_category %}
- [{{ flashcard.title }}]({{ flashcard.url | relative_url }})
{% endfor %}
{% endfor %}

## 🚀 Getting Started

1. **Start with the basics**: Begin with Java 21 Features if you're new to the latest version
2. **Use the flashcards**: Study each card thoroughly, paying attention to the code examples  
3. **Test yourself**: Take the quiz to assess your knowledge
4. **Review weak areas**: Focus on topics where you scored lower
5. **Practice regularly**: Consistent study is key to certification success

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to:

- Add new flashcards
- Improve existing content  
- Add quiz questions
- Report issues

## 📝 License

This project is open-source and available under the MIT License.

<style>
.quick-links {
  display: flex;
  gap: 15px;
  margin: 30px 0;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  text-decoration: none;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
  text-decoration: none;
  color: white;
}

@media (max-width: 768px) {
  .quick-links {
    flex-direction: column;
  }
  
  .btn {
    text-align: center;
  }
}
</style>