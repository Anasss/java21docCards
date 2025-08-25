---
title: Java 21 OCP Flashcards
nav_order: 1
has_children: true
layout: default
---

# Java 21 OCP Flashcards

A structured collection of flashcards to help you prepare for the Java 21 OCP certification exam.

## Quick Links

<div class="quick-links">
  <a href="{{ '/quiz/' | relative_url }}" class="btn btn-primary">
    🎯 Take the Quiz
  </a>
  <a href="{{ '/complete-java21-qa.html' | relative_url }}" class="btn btn-secondary">
    📚 Q&A Study Guide
  </a>
  <a href="#all-flashcards" class="btn btn-secondary">
    🃏 Browse All Cards
  </a>
</div>

## Study Progress Overview

<div class="stats-grid">
  {% assign total_flashcards = site.flashcards | size %}
  {% assign total_categories = site.flashcards | map: "category" | uniq | size %}
  
  <div class="stat-card">
    <div class="stat-number">{{ total_flashcards }}</div>
    <div class="stat-label">Total Flashcard{% if total_flashcards != 1 %}s{% endif %}</div>
  </div>
  
  <div class="stat-card">
    <div class="stat-number">32</div>
    <div class="stat-label">Quiz Questions</div>
  </div>
  
  <div class="stat-card">
    <div class="stat-number">{{ total_categories }}</div>
    <div class="stat-label">Categor{% if total_categories == 1 %}y{% else %}ies{% endif %}</div>
  </div>
</div>

## Getting Started

1. **📖 Start with fundamentals**: Begin with OOP and Encapsulation or Java 21 Features
2. **🔄 Study systematically**: Work through each category, focusing on code examples
3. **🎯 Test your knowledge**: Take the quiz to identify weak areas
4. **📝 Review and practice**: Use the Q&A guide for deeper understanding
5. **🔁 Repeat and refine**: Regular review is key to exam success

## <a id="all-flashcards"></a>All Flashcards

<div class="flashcard-index">
  {% assign categories = site.flashcards | map: "category" | uniq | sort %}
  {% for category in categories %}
    {% assign flashcards_in_category = site.flashcards | where: "category", category | sort: "order" %}
    
    <div class="category-section">
      <h3 class="category-heading">{{ category }}</h3>
      <div class="flashcard-grid">
        {% for flashcard in flashcards_in_category %}
          <a href="{{ flashcard.url | relative_url }}" class="flashcard-item">
            <div class="flashcard-title">{{ flashcard.title }}</div>
            {% if flashcard.learning_tip %}
              <div class="flashcard-tip">💡 {{ flashcard.learning_tip | truncate: 60 }}</div>
            {% endif %}
          </a>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>

## Contributing

We welcome contributions! Check out our [contributing guide](https://github.com/Anasss/java21docCards/blob/main/CONTRIBUTING.md) for details on how to:

- Add new flashcards and improve existing content
- Add quiz questions and enhance the Q&A guide
- Report issues and suggest improvements

## License

This project is open-source and available under the MIT License.

<style>
/* Quick Links */
.quick-links {
  display: flex;
  gap: 15px;
  margin: 30px 0;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 14px 28px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  font-size: 1.1em;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: 2px solid transparent;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  text-decoration: none;
  color: white;
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  text-decoration: none;
  transform: translateY(-2px);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.stat-card {
  text-align: center;
  padding: 25px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.8em;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 8px;
}

.stat-label {
  color: #666;
  font-size: 0.95em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

/* Flashcard Index */
.flashcard-index {
  margin: 40px 0;
}

.category-section {
  margin-bottom: 40px;
}

.category-heading {
  color: #2c3e50;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.4em;
}

.flashcard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}

.flashcard-item {
  display: block;
  padding: 18px;
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
}

.flashcard-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
  text-decoration: none;
  color: #667eea;
}

.flashcard-title {
  font-weight: 600;
  font-size: 1.05em;
  margin-bottom: 8px;
  color: inherit;
}

.flashcard-tip {
  font-size: 0.85em;
  color: #666;
  line-height: 1.4;
  margin-bottom: 8px;
  font-style: italic;
}

.flashcard-meta {
  font-size: 0.8em;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .quick-links {
    flex-direction: column;
  }
  
  .btn {
    text-align: center;
    font-size: 1em;
    padding: 12px 20px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 15px;
  }
  
  .stat-card {
    padding: 20px 15px;
  }
  
  .stat-number {
    font-size: 2.2em;
  }
  
  .flashcard-grid {
    grid-template-columns: 1fr;
  }
  
  .category-heading {
    font-size: 1.2em;
  }
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Focus states for accessibility */
.btn:focus,
.flashcard-item:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
</style>