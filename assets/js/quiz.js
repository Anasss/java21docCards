// Quiz functionality - Fixed question display
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;

// Track per-question scoring and selected answers
let scoredMap = new Array(questions.length).fill(false);
let selectedAnswers = new Array(questions.length).fill(null);

function initQuiz() {
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('maxScore').textContent = questions.length;
    updateScore();
    displayQuestion();
}

function displayQuestion() {
    const container = document.getElementById('questionContainer');
    const question = questions[currentQuestionIndex];
    
    let html = '<div class="question active">';
    html += '<div class="question-header">';
    html += '<span class="question-number">Question ' + (currentQuestionIndex + 1) + '</span>';
    if (question.category) {
        html += '<span class="question-category">' + question.category + '</span>';
    }
    if (question.difficulty) {
        html += '<span class="difficulty-badge difficulty-' + question.difficulty + '">' + 
                question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1) + '</span>';
    }
    html += '</div>';
    
    // Fixed: Properly display the question text
    html += '<div class="question-text">' + question.question + '</div>';
    
    // Display code block if present
    if (question.code) {
        html += '<div class="code-block">' + escapeHtml(question.code) + '</div>';
    }
    
    // Display options
    html += '<div class="options" id="options">';
    for (let i = 0; i < question.options.length; i++) {
        html += '<div class="option" onclick="selectOption(' + i + ')">';
        html += '<span class="option-label">' + String.fromCharCode(65 + i) + '.</span>';
        html += question.options[i];
        html += '</div>';
    }
    html += '</div>';
    
    // Explanation section (initially hidden)
    html += '<div class="explanation" id="explanation">';
    html += '<h4>Explanation:</h4>';
    html += '<p>' + question.explanation + '</p>';
    html += '</div>';
    html += '</div>';
    
    container.innerHTML = html;
    
    updateProgress();
    updateControls();

    // Restore previously selected answer if exists
    if (selectedAnswers[currentQuestionIndex] !== null) {
        selectOption(selectedAnswers[currentQuestionIndex], true);
    } else {
        selectedAnswer = null;
        answered = false;
        document.getElementById('nextBtn').disabled = true;
        document.getElementById('nextBtn').textContent = "Next Question";
    }
}

function selectOption(index, restoring = false) {
    if (answered && !restoring) return;

    const options = document.querySelectorAll('.option');
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('selected', 'correct', 'incorrect');
    }
    options[index].classList.add('selected');
    
    selectedAnswer = index;
    selectedAnswers[currentQuestionIndex] = index;

    const question = questions[currentQuestionIndex];

    // Mark correct/incorrect options
    for (let i = 0; i < options.length; i++) {
        if (i === question.correct) {
            options[i].classList.add('correct');
        } else if (i === selectedAnswer && i !== question.correct) {
            options[i].classList.add('incorrect');
        }
    }

    // Show explanation
    document.getElementById('explanation').classList.add('show');

    // Score only once per question
    if (!scoredMap[currentQuestionIndex] && selectedAnswer === question.correct) {
        score++;
        scoredMap[currentQuestionIndex] = true;
        updateScore();
    }

    answered = true;

    document.getElementById('nextBtn').disabled = false;
    document.getElementById('nextBtn').textContent = 
        currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question';
}

function nextQuestion() {
    if (!answered) return;

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
}

function updateControls() {
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
}

function updateScore() {
    document.getElementById('currentScore').textContent = score;
}

function showResults() {
    document.getElementById('questionContainer').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('results').classList.add('show');
    
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById('finalScore').textContent = score + '/' + questions.length;
    
    let message = '';
    if (percentage >= 90) {
        message = 'Excellent! You\'re ready for the OCP exam!';
    } else if (percentage >= 75) {
        message = 'Good job! Review the topics you missed and you\'ll be ready!';
    } else if (percentage >= 60) {
        message = 'Not bad! Study more and practice additional questions.';
    } else {
        message = 'Keep studying! Focus on the fundamentals and try again.';
    }
    
    document.getElementById('scoreMessage').textContent = message;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    answered = false;
    scoredMap = new Array(questions.length).fill(false);
    selectedAnswers = new Array(questions.length).fill(null);
    
    document.getElementById('results').classList.remove('show');
    document.getElementById('questionContainer').style.display = 'block';
    document.querySelector('.controls').style.display = 'flex';
    
    updateScore();
    displayQuestion();
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', initQuiz);