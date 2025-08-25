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
    Take the Quiz
  </a>
  <a href="{{ '/complete-java21-qa.html' | relative_url }}" class="btn btn-secondary">
    Q&A Study Guide
  </a>
  <a href="#browse-flashcards" class="btn btn-secondary">
    Browse Flashcards
  </a>
</div>

## Study Progress Overview

<div class="stats-grid">
  {% assign total_flashcards = site.flashcards | size %}
  {% assign total_categories = site.flashcards | map: "category" | uniq | size %}
  
  <div class="stat-card">
    <div class="stat-number">{{ total_flashcards }}</div>
    <div class="stat-label">Total Flashcards</div>
  </div>
  
  <div class="stat-card">
    <div class="stat-number">32</div>
    <div class="stat-label">Quiz Questions</div>
  </div>
  
  <div class="stat-card">
    <div class="stat-number">{{ total_categories }}</div>
    <div class="stat-label">Categories</div>
  </div>
</div>

## Getting Started

1. **Start with the basics**: Begin with Java 21 Features if you're new to the latest version
2. **Use the flashcards**: Study each card thoroughly, paying attention to the code examples  
3. **Test yourself**: Take the quiz to assess your knowledge
4. **Review weak areas**: Focus on topics where you scored lower
5. **Practice regularly**: Consistent study is key to certification success

## <a id="browse-flashcards"></a>Browse Flashcards by Category

<div class="category-grid">
  {% assign categories = site.flashcards | map: "category" | uniq | sort %}
  {% for category in categories %}
    {% assign flashcards_in_category = site.flashcards | where: "category", category | sort: "order" %}
    
    <div class="category-card">
      <div class="category-header">
        <h3 class="category-title">{{ category }}</h3>
        <span class="category-count">{{ flashcards_in_category | size }} cards</span>
      </div>
      
      <div class="category-preview">
        {% for flashcard in flashcards_in_category limit: 3 %}
          <a href="{{ flashcard.url | relative_url }}" class="flashcard-link">
            {{ flashcard.title | truncate: 40 }}
          </a>
        {% endfor %}
        
        {% if flashcards_in_category.size > 3 %}
          <span class="more-cards">... and {{ flashcards_in_category.size | minus: 3 }} more</span>
        {% endif %}
      </div>
      
      <a href="#" onclick="showCategoryModal('{{ category | slugify }}')" class="view-all-btn">
        View All {{ flashcards_in_category | size }} Cards
      </a>
    </div>
  {% endfor %}
</div>

## Contributing

We welcome contributions! Check out our [contributing guide](https://github.com/Anasss/java21docCards/blob/main/CONTRIBUTING.md) for details on how to:

- Add new flashcards
- Improve existing content  
- Add quiz questions
- Report issues

## License

This project is open-source and available under the MIT License.

<!-- Category Modal (Hidden by default) -->
<div id="categoryModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <div id="modalContent"></div>
  </div>
</div>

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

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.stat-card {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e1e8ed;
}

.stat-number {
  font-size: 2.5em;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.category-card {
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  padding: 20px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.category-title {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2em;
}

.category-count {
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
}

.category-preview {
  margin-bottom: 15px;
}

.flashcard-link {
  display: block;
  color: #555;
  text-decoration: none;
  padding: 4px 0;
  font-size: 0.9em;
  border-bottom: 1px solid transparent;
  transition: color 0.3s ease;
}

.flashcard-link:hover {
  color: #667eea;
  text-decoration: none;
  border-bottom-color: #667eea;
}

.more-cards {
  color: #888;
  font-style: italic;
  font-size: 0.85em;
}

.view-all-btn {
  display: inline-block;
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 16px;
  border: 2px solid #667eea;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-size: 0.9em;
}

.view-all-btn:hover {
  background: #667eea;
  color: white;
  text-decoration: none;
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: black;
}

/* Responsive */
@media (max-width: 768px) {
  .quick-links {
    flex-direction: column;
  }
  
  .btn {
    text-align: center;
  }
  
  .category-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .modal-content {
    width: 95%;
    margin: 10% auto;
  }
}
</style>

<script>
// Modal functionality for category details
function showCategoryModal(categorySlug) {
  const modal = document.getElementById('categoryModal');
  const modalContent = document.getElementById('modalContent');
  
  // Build category content
  {% assign categories = site.flashcards | map: "category" | uniq | sort %}
  {% for category in categories %}
    {% assign flashcards_in_category = site.flashcards | where: "category", category | sort: "order" %}
    if ('{{ category | slugify }}' === categorySlug) {
      modalContent.innerHTML = `
        <h2>{{ category }}</h2>
        <p>{{ flashcards_in_category | size }} flashcards in this category:</p>
        <div class="modal-flashcard-list">
          {% for flashcard in flashcards_in_category %}
            <a href="{{ flashcard.url | relative_url }}" class="modal-flashcard-item">
              <strong>{{ flashcard.title }}</strong>
              {% if flashcard.learning_tip %}<br><small>{{ flashcard.learning_tip | truncate: 80 }}</small>{% endif %}
            </a>
          {% endfor %}
        </div>
      `;
    }
  {% endfor %}
  
  modal.style.display = 'block';
}

// Close modal when clicking X or outside
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('categoryModal');
  const closeBtn = document.querySelector('.close');
  
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }
  
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }
});
</script>