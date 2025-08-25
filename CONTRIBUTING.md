# Contributing to Java 21 OCP Flashcards

Thank you for your interest in contributing to this project! This guide will help you get started with adding flashcards, quiz questions, and running the project locally.

## Quick Start

### Prerequisites
- Ruby (3.0+)
- Bundler gem
- Git

### Running Locally
```bash
# Clone the repository
git clone https://github.com/Anasss/java21docCards.git
cd java21docCards

# Install dependencies
bundle install

# Start the development server
bundle exec jekyll serve

# Open your browser to http://localhost:4000/java21docCards/
```

## Adding New Flashcards

### 1. Choose the Right Category
Place your flashcard in the appropriate directory:
- `_flashcards/collections/` - Collections & Generics
- `_flashcards/java21-features/` - Java 21 Features
- `_flashcards/streams/` - Streams & Functional Programming
- `_flashcards/oop/` - Object-Oriented Programming
- `_flashcards/exceptions/` - Exception Handling
- And other category directories...

### 2. Create Your Flashcard File
Use the naming convention: `##-descriptive-name.md`

Example: `15-pattern-matching-switch.md`

### 3. Use This Template
```markdown
---
title: "Your Concept Title"
category: "Category Name"
order: 15
tags: ["relevant", "tags", "here"]
learning_tip: "A memorable tip to remember this concept"
---

## 🃏 Your Concept Title

**Rule:** A clear statement of the key principle.

Brief explanation of what this concept does and why it matters.

### Code Example
```java
// Show practical usage with comments
public class Example {
    public void demonstrate() {
        // Explain key parts
        System.out.println("Clear example");
    }
}
```

**Learning Tip:** A memorable way to remember this concept.

**Q:** A common question about this topic?  
**A:** A clear, helpful answer.
```

### 4. Test Your Changes
```bash
# Run locally to verify your flashcard displays correctly
bundle exec jekyll serve

# Check that:
# - Your flashcard appears in the correct category
# - Navigation works between cards  
# - Code examples are properly formatted
# - No Jekyll build errors
```

## Adding Quiz Questions

### Add to the Question Database
Edit `_data/quiz/questions.yml` and add your question:

```yaml
- question: "Your question text here?"
  code: |
    // Optional code block
    public class Example {
        public static void main(String[] args) {
            System.out.println("Code example");
        }
    }
  options:
    - "Option A"
    - "Option B"
    - "Option C"
    - "Option D"
  correct: 1  # 0-based index (B is correct)
  explanation: "Clear explanation of why this answer is correct and others are wrong."
  category: "Category Name"
```

## Content Guidelines

### Writing Style
- Use clear, practical examples that compile and run
- Include both correct and incorrect usage patterns
- Provide memorable learning tips or mnemonics
- Focus on exam-relevant scenarios

### Code Examples
- Must be syntactically correct Java code
- Include helpful comments explaining key concepts
- Show realistic use cases, not contrived examples
- Use ✅ and ❌ to indicate good vs bad practices

### Learning Tips
- Create memorable phrases or acronyms
- Use analogies that help explain complex concepts
- Highlight common pitfalls or exam traps

## File Organization

### Directory Structure
```
_flashcards/
├── collections/          # Collections & Generics
├── datetime/            # Date, Time & Localization
├── enums/               # Enums
├── exceptions/          # Exception Handling
├── io/                  # I/O and NIO
├── java21-features/     # Java 21 Features
├── math/                # Math, Arrays, Wrappers
├── modules/             # Modules & Migration
├── oop/                 # OOP and Encapsulation
└── streams/             # Streams & Functional
```

### Naming Convention
- Use numbers with gaps: `05-`, `10-`, `15-` (allows easy insertion)
- Use descriptive names: `pattern-matching-switch.md`
- Keep filenames lowercase with hyphens

## Submission Process

### Before Submitting
- [ ] Test locally with `bundle exec jekyll serve`
- [ ] Verify all code examples work
- [ ] Check spelling and grammar
- [ ] Ensure consistent formatting
- [ ] Add appropriate tags and learning tips

### Pull Request Guidelines
1. **Fork the repository** on GitHub
2. **Create a feature branch**: `git checkout -b add-flashcard-topic-name`
3. **Make your changes** and test locally
4. **Commit with clear message**: `feat: Add flashcard for Optional operations`
5. **Push to your fork**: `git push origin add-flashcard-topic-name`
6. **Create a Pull Request** with description of what you added

### PR Description Template
```markdown
## Summary
Brief description of what this PR adds or changes.

## Type of Change
- [ ] New flashcard(s)
- [ ] New quiz question(s)
- [ ] Bug fix
- [ ] Documentation update

## Testing
- [ ] Tested locally with `bundle exec jekyll serve`
- [ ] All code examples compile and run correctly
- [ ] No Jekyll build errors
```

## Getting Help

- **Issues**: Create a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions about contributing
- **Documentation**: Check existing flashcards for examples

## Recognition

Contributors will be acknowledged in:
- GitHub contributor list
- Project documentation
- Release notes for significant contributions

---

**Ready to contribute?** Start by running the project locally, then pick a Java concept that needs a flashcard and create your first contribution!