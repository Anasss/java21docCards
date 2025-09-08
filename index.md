---
title: Java 21 OCP Flashcards
nav_order: 1
has_children: true
has_toc: false
layout: default
---

<div class="hero-section">
  <h1 class="hero-title">Java 21 OCP Flashcards</h1>
  <p class="hero-subtitle">A structured collection of flashcards to help you prepare for the Java 21 OCP certification exam (1Z0-830)</p>
</div>

## 🎬 Quick Start

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
/* Hero Section */
.hero-section {
  text-align: left;
  padding: 40px 20px;
  margin-bottom: 40px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.hero-title {
  font-size: 2.5em;
  color: #667eea;
  margin: 0 0 15px 0;
  font-weight: 700;
  text-align: left;
  letter-spacing: 0.5px;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.2em;
  color: #764ba2;
  margin: 0 0 0 0;
  max-width: 600px;
  line-height: 1.6;
  text-align: left;
  font-weight: 500;
  letter-spacing: 0.2px;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  gap: 20px;
  margin: 40px 0;
  padding: 25px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  border: 1px solid #e1e8ed;
}

/* Button Base Styles */
.btn {
  display: inline-block;
  padding: 16px 32px;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  font-size: 1.15em;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  min-width: 180px;
  flex: 1;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Stats Dashboard */
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

/* Category Controls */
.category-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.category-control-btn {
  padding: 8px 16px;
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s ease;
}

.category-control-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* Category Details */
.category-details {
  margin-bottom: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.category-details[open] {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.category-summary {
  padding: 18px 24px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  font-size: 1.05em;
  list-style: none;
}

.category-summary::-webkit-details-marker,
.category-summary::marker {
  content: "";
  display: none;
}

.category-summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 10px;
  transition: transform 0.3s ease;
  font-size: 0.8em;
}

.category-details[open] .category-summary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.category-details[open] .category-summary::before {
  transform: rotate(90deg);
}

.category-name {
  font-weight: 600;
  color: #2c3e50;
}

.category-details[open] .category-name {
  color: white;
}

.category-count {
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
}

.category-details[open] .category-count {
  background: white;
  color: #667eea;
}

/* Flashcard List */
.flashcard-list {
  padding: 0;
  background: white;
  max-height: 400px;
  overflow-y: auto;
}

.flashcard-list::-webkit-scrollbar {
  width: 6px;
}

.flashcard-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.flashcard-list::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 3px;
}

.flashcard-list::-webkit-scrollbar-thumb:hover {
  background: #5a67d8;
}

.flashcard-link {
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  position: relative;
}

.flashcard-link::after {
  content: '→';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.2s ease;
  color: #667eea;
  font-size: 1.2em;
}

.flashcard-link:hover {
  background: linear-gradient(to right, #f8f9ff, #ffffff);
  padding-left: 30px;
  text-decoration: none;
}

.flashcard-link:hover::after {
  opacity: 1;
  right: 15px;
}

.flashcard-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
  font-size: 1em;
}

.flashcard-link:hover .flashcard-title {
  color: #667eea;
}

.flashcard-tip {
  font-size: 0.85em;
  color: #888;
  opacity: 0.9;
}

/* Resources Section */
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
  .hero-section {
    padding: 30px 15px;
  }
  
  .hero-title {
    font-size: 2em;
  }
  
  .hero-subtitle {
    font-size: 1.1em;
  }
  
  .quick-actions {
    flex-direction: column;
    padding: 20px;
    gap: 10px;
  }
  
  .btn {
    font-size: 1em;
    padding: 12px 20px;
    min-width: unset;
    width: 100%;
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
    padding: 15px 20px;
    font-size: 1em;
  }
  
  .flashcard-list {
    max-height: 300px;
  }
  
  .flashcard-link {
    padding: 14px 20px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8em;
  }
  
  .hero-subtitle {
    font-size: 1em;
  }
  
  .btn {
    padding: 12px 20px;
    font-size: 0.95em;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Create control buttons
  const flashcardIndex = document.querySelector('.flashcard-index');
  if (flashcardIndex) {
    const controls = document.createElement('div');
    controls.className = 'category-controls';
    controls.innerHTML = `
      <button class="category-control-btn" onclick="expandAllCategories()">Expand All</button>
      <button class="category-control-btn" onclick="collapseAllCategories()">Collapse All</button>
    `;
    flashcardIndex.insertBefore(controls, flashcardIndex.firstChild);
  }
});

function expandAllCategories() {
  document.querySelectorAll('.category-details').forEach(details => {
    details.open = true;
  });
}

function collapseAllCategories() {
  document.querySelectorAll('.category-details').forEach(details => {
    details.open = false;
  });
}
</script>