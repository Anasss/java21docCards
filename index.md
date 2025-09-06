---
title: Java 21 OCP Flashcards
nav_order: 1
has_children: true
has_toc: false
layout: default
---

<div class="hero-section">
  <h1 class="hero-title">Java 21 OCP Flashcards</h1>
  <p class="hero-subtitle">A structured collection of flashcards to help you prepare for the Java 21 OCP certification exam.</p>
</div>

## Quick Start

<div class="quick-actions">
  <a href="{{ '/quiz/' | relative_url }}" class="btn btn-primary">
    🎯 Take Practice Quiz
  </a>
  <a href="{{ '/complete-java21-qa.html' | relative_url }}" class="btn btn-secondary">
    📚 Q&A Study Guide
  </a>
</div>

## 📖 Study strategy

<div style="margin-bottom: 25px;"></div>

1. **Start with Core Concepts**: Begin with [OOP and Encapsulation]({{ '/flashcards/05-instance-methods-vs-variables-and-static-methods/' | relative_url }}) fundamentals
2. **Explore Java 21 Features**: Master [records]({{ '/flashcards/15-records-java-21-features/' | relative_url }}), [sealed classes]({{ '/flashcards/10-sealed-classes-java-21/' | relative_url }}), and [pattern matching]({{ '/flashcards/05-pattern-matching-with-switch-java-21/' | relative_url }})
3. **Practice with Collections**: Understand [generics]({{ '/flashcards/05-generics-wildcards-reads/' | relative_url }}), [streams]({{ '/flashcards/05-stream-operations-and-exception-handling/' | relative_url }}), and [functional programming]({{ '/flashcards/20-lambda-target-types-runnable-vs-callable/' | relative_url }})
4. **Test Frequently**: Use the [quiz]({{ '/quiz/' | relative_url }}) to identify knowledge gaps
5. **Review and Reinforce**: Revisit weak areas using the [Q&A guide]({{ '/complete-java21-qa.html' | relative_url }})

## 📊 Learning Dashboard

<div class="stats-grid">
  {% assign total_flashcards = site.flashcards | size %}
  {% assign total_categories = site.flashcards | map: "category" | uniq | size %}
  {% assign total_questions = site.data.quiz.questions | size %}
  
  <div class="stat-card">
    <div class="stat-number">{{ total_flashcards }}</div>
    <div class="stat-label">Total Flashcard{% if total_flashcards != 1 %}s{% endif %}</div>
  </div>
  
  <div class="stat-card">
    <div class="stat-number">{{ total_questions }}</div>
    <div class="stat-label">Quiz Question{% if total_questions != 1 %}s{% endif %}</div>
  </div>
  
  <div class="stat-card">
    <div class="stat-number">{{ total_categories }}</div>
    <div class="stat-label">Categor{% if total_categories == 1 %}y{% else %}ies{% endif %}</div>
  </div>
</div>

## All Study Materials

<div class="materials-grid">
  <div class="material-section">
    <h3>🃏 Flashcards by Category</h3>
    <div class="flashcard-index">
      {% assign categories = site.flashcards | group_by: "category" | sort: "size" | reverse %}
      {% for category_group in categories %}
        {% assign category = category_group.name %}
        {% assign flashcards_in_category = category_group.items | sort: "order" %}
        
        <details class="category-details" id="{{ category | slugify }}">
          <summary class="category-summary">
            <span class="category-name">{{ category }}</span>
            <span class="category-count">{{ flashcards_in_category.size }} card{% if flashcards_in_category.size != 1 %}s{% endif %}</span>
          </summary>
          <div class="flashcard-list">
            {% for flashcard in flashcards_in_category %}
              <a href="{{ flashcard.url | relative_url }}" class="flashcard-link">
                <span class="flashcard-title">{{ flashcard.title }}</span>
                {% if flashcard.learning_tip %}
                  <span class="flashcard-tip">💡 {{ flashcard.learning_tip | truncate: 50 }}</span>
                {% endif %}
              </a>
            {% endfor %}
          </div>
        </details>
      {% endfor %}
    </div>
  </div>
</div>

## Resources & Support

<div class="resources-grid">
  <div class="resource-card">
    <h4>📚 Additional Materials</h4>
    <ul>
      <li><a href="{{ '/complete-java21-qa.html' | relative_url }}">Complete Q&A Study Guide</a></li>
      <li><a href="{{ '/quiz/' | relative_url }}">Interactive Practice Quiz</a></li>
    </ul>
  </div>
  
  <div class="resource-card">
    <h4>🤝 Contributing</h4>
    <p>Help improve this study resource:</p>
    <ul>
      <li><a href="https://github.com/Anasss/java21docCards/blob/main/CONTRIBUTING.md" target="_blank">Contribution Guide</a></li>
      <li><a href="https://github.com/Anasss/java21docCards/issues" target="_blank">Report Issues</a></li>
      <li><a href="https://github.com/Anasss/java21docCards" target="_blank">View Source Code</a></li>
    </ul>
  </div>
</div>

<style>
/* Clean Header Section */
.header-section {
  text-align: center;
  padding: 30px 20px 40px;
  margin-bottom: 40px;
}

.site-logo {
  max-width: 280px;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.site-logo:hover {
  transform: scale(1.02);
}

.site-subtitle {
  font-size: 1.2em;
  color: #6c757d;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

/* Button Styles */
.quick-actions {
  display: flex;
  gap: 15px;
  margin: 30px 0;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.btn {
  display: inline-block;
  padding: 16px 32px;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  font-size: 1.1em;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  min-width: 180px;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  text-decoration: none;
  color: white;
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}

.btn-secondary {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  color: #667eea;
  border: 2px solid #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  border-color: #667eea;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .quick-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .btn {
    font-size: 1em;
    padding: 14px 24px;
    min-width: unset;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .btn {
    padding: 12px 20px;
    font-size: 0.95em;
  }
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

/* Materials Grid */
.materials-grid {
  margin: 40px 0;
}

.material-section h3 {
  color: #2c3e50;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

/* Collapsible Categories */
.category-details {
  margin-bottom: 15px;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  overflow: hidden;
}

.category-summary {
  padding: 15px 20px;
  background: #f8f9fa;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
  list-style: none;
}

.category-summary::-webkit-details-marker {
  display: none;
}

.category-summary::marker {
  content: "";
}

.category-summary:hover {
  background: #e9ecef;
}

.category-name {
  font-weight: 600;
  color: #2c3e50;
}

.category-count {
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
}

.flashcard-list {
  padding: 10px;
  background: white;
}

.flashcard-link {
  display: block;
  padding: 15px;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.flashcard-link:last-child {
  border-bottom: none;
}

.flashcard-link:hover {
  background: #f8f9ff;
  color: #667eea;
  text-decoration: none;
  padding-left: 20px;
}

.flashcard-title {
  font-weight: 500;
  display: block;
}

.flashcard-tip {
  font-size: 0.85em;
  color: #666;
  font-style: italic;
  display: block;
  margin-top: 4px;
  line-height: 1.4;
}

/* Resources Grid */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.resource-card {
  padding: 20px;
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.resource-card h4 {
  color: #2c3e50;
  margin: 0 0 15px 0;
}

.resource-card ul {
  margin: 0;
  padding-left: 20px;
}

.resource-card li {
  margin-bottom: 8px;
}

.resource-card a {
  color: #667eea;
  text-decoration: none;
}

.resource-card a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-section {
    padding: 20px 15px 30px;
  }
  
  .site-logo {
    max-width: 250px;
  }
  
  .site-subtitle {
    font-size: 1.1em;
  }
  
  .quick-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .btn {
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
  
  .resources-grid {
    grid-template-columns: 1fr;
  }
  
  .category-summary {
    padding: 12px 15px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}

@media (max-width: 480px) {
  .site-logo {
    max-width: 150px;
  }
  
  .site-subtitle {
    font-size: 1em;
  }
}
</style>