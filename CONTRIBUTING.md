# Contributing to Java 21 OCP Flashcards

Thank you for your interest in contributing!

## Adding New Flashcards

1. Choose the appropriate category directory under `_flashcards/`
2. Create a new file using the naming convention: `##-descriptive-name.md`
3. Use the template in `_templates/flashcard-template.md`
4. Test locally with `bundle exec jekyll serve`

## Adding Quiz Questions

Add questions to `_data/quiz/questions.yml` following the existing format:

```yaml
- question: "Your question text?"
  options:
    - "Option A"
    - "Option B"
    - "Option C"
    - "Option D"
  correct: 1  # 0-based index
  explanation: "Explanation of the correct answer"
  category: "Category Name"
```

## Guidelines

- Use clear, practical examples
- Include explanations for all concepts
- Follow existing formatting patterns
- Test code examples before submitting

See the full contribution guide for detailed instructions.
