const questions = [
    {
        question: "O que significa HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language", 
            "Hyper Transfer Markup Language"
        ],
        correct: 0
    },
    {
        question: "Qual tag é usada para criar um link?",
        options: [
            "&lt;link&gt;",
            "&lt;a&gt;", 
            "&lt;href&gt;"
        ],
        correct: 1
    },
    {
        question: "Como se declara uma variável em JavaScript?",
        options: [
            "variable x;",
            "var x;", 
            "x = variable;"
        ],
        correct: 1
    }
];

function displayQuestion(questionIndex) {
    const question = questions[questionIndex];
    
    document.getElementById('question-number').textContent = questionIndex + 1;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="answer" value="${index}">
            ${option}
        `;
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement('br'));
    });
    
    // Mostra/oculta botões
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'block';
}

function checkAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert('Selecione uma resposta!');
        return;
    }
    
    const answer = parseInt(selected.value);
    const question = questions[currentQuestion];
    const feedback = document.getElementById('feedback');
    
    if (answer === question.correct) {
        feedback.innerHTML = '✅ <strong>Correto!</strong> Parabéns!';
        feedback.style.backgroundColor = '#d4edda';
        feedback.style.color = '#155724';
        score += 33.33; // Cada pergunta vale ~33.33%
    } else {
        feedback.innerHTML = '❌ <strong>Incorreto!</strong> Tente novamente na próxima.';
        feedback.style.backgroundColor = '#f8d7da';
        feedback.style.color = '#721c24';
    }
    
    feedback.style.display = 'block';
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        displayQuestion(currentQuestion);
    } else {
        // Quiz finalizado - calcula nota final
        const finalScore = Math.min(100, Math.round(score));
        
        // Salva no localStorage para a tela de conclusão
        localStorage.setItem('quizScore', finalScore);
        
        // Vai para tela de resultados
        window.location.href = 'conclusion.html';
    }
}

// Função para reiniciar o quiz (caso queira usar em outros lugares)
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    localStorage.removeItem('quizScore');
    window.location.href = 'index.html';
}