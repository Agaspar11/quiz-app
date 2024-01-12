const questions = [
        {
            question: "In the world of programming, what is a bug ?",
            options: ["A. A small insect that lives in computer hardware", "B. A feature that users don\'t like", "C. An error or flaw in a program\'s code", "D. A programming language mascot"],
            correctAnswer: "C. An error or flaw in a program\'s code"
        },
        {
            question: "Which markup language structures all web pages on the internet?",
            options: ["A. Java", "B. HTML", "C. CSS", "D. Python"],
            correctAnswer: "B. HTML"
        },
        {
            question: "What\'s a programmer\'s favorite song?",
            options: ["A. Hello World by Adele", "B. Coding in the Deep by Adele", "C. Don\'t Stop Believin\' by Journey", "D. Sweet Child o\' Mine by Guns N\' Roses (GnR)"],
            correctAnswer: "A. Hello World by Adele"
        },
        {
            question: "Which one of these HTML tags creates a paragraph?",
            options: ["A. &lt;button paragraph&gt;", "B. &lt;p&gt;", "C. &lt;paragraph&gt;", "D. make paragraph"],
            correctAnswer: "B. &lt;p&gt;"
        },
        {
            question: "Which one of these HTML tags creates a button?",
            options: ["A. &lt;h1&gt;", "B. &lt;b&gt;", "C. &lt;button&gt;", "D. make button"],
            correctAnswer: "C. &lt;button&gt;"
        },
        {
            question: "What do you think comes after the opening tag: &lt;button&gt;?",
            options: ["A. &lt;button&gt;", "B. close button", "C. button", "D. &lt;/button&gt;"],
            correctAnswer: "D. &lt;/button&gt;"
        },
        {
            question: "Which HTML tag is used to create a break?",
            options: ["A. &lt;br&gt;", "B. &lt;p&gt;", "C. &lt;b&gt;", "D. &lt;break&gt;"],
            correctAnswer: "A. &lt;br&gt;"
        },
        { question: "What does HTML stand for?", options: ["A. Hyperlink and Text Markup", "B. Hyper Text Markup Language", "C. Hypertext Markup Language"], correctAnswer: "C. Hypertext Markup Language" },
        { question: "Which HTML tag is used to define the header for a webpage or section?", options: ["A. &lt;head&gt;", "B. &lt;header&gt;", "C. &lt;h1&gt;", "D. header"], correctAnswer: "C. &lt;h1&gt;" },
        { question: "Which HTML tag is used for creating hyperlinks?", options: ["A. &lt;link&gt;", "B. &lt;a&gt;", "C. &lt;href&gt;", "D. &lt;url&gt;"], correctAnswer: "B. &lt;a&gt;" },
        { question: "Which tag is used to define a table in HTML?", options: ["A. &lt;table&gt;", "B. &lt;tr&gt;", "C. &lt;td&gt;", "D. &lt;th&gt;"], correctAnswer: "A. &lt;table&gt;" },
        { question: "What is the purpose of the &lt;head&gt; tag in an HTML document?", options: ["A. Define the main content", "B. Define the document title, styles, and meta-information", "C. Define a header section", "D. Specify the body of the document"], correctAnswer: "B. Define the document title, styles, and meta-information" },
        { question: "Which tag is used to define the definition list in HTML?", options: ["A. &lt;dl&gt;", "B. &lt;dt&gt;", "C. &lt;dd&gt;", "D. &lt;list&gt;"], correctAnswer: "A. &lt;dl&gt;" },
        { question: "Which HTML tag is used to define the main content of an HTML document?", options: ["A. &lt;content&gt;", "B. &lt;main&gt;", "C. &lt;body&gt;", "D. &lt;section&gt;"], correctAnswer: "B. &lt;main&gt;" },
        { question: "Which HTML tag is used to emphasize text and make it italic?", options: ["A. &lt;i&gt;", "B. &lt;italic&gt;", "C. &lt;em&gt;", "D. &lt;italics&gt;"], correctAnswer: "C. &lt;em&gt;" },
        ];

        
        let currentQuestion = 0;
        let userAnswers = [];

        function showQuestion() {
            const quiz = document.getElementById("quiz");
            const resultContainer = document.getElementById("result-container");

            // Shuffle questions only for the first question (initial load)
            if (currentQuestion === 0) {
                shuffleQuestions();
            }

            const questionData = questions[currentQuestion];

            quiz.innerHTML = `
                <div class="question">${questionData.question}</div>
                <div class="options">
                    ${questionData.options.map(option => `<div class="option" onclick="selectOption(this, '${option}')">${option}</div>`).join('')}
                </div>
                ${currentQuestion < questions.length - 1 ? '<button onclick="nextOrSubmit()">Next</button>' : '<button onclick="submitQuiz()">Submit</button>'}
            `;

            // Hide the result container while answering
            resultContainer.style.display = 'none';
        }

        function selectOption(optionElement, answer) {
            // Remove the "selected" class from all options
            const options = document.querySelectorAll('.option');
            options.forEach(option => option.classList.remove('selected'));

            // Add the "selected" class to the clicked option
            optionElement.classList.add('selected');

            // Decode HTML entities and store the user's answer
            const decodedAnswer = decodeEntities(answer);
            userAnswers[currentQuestion] = decodedAnswer;
        }

        // Function to decode HTML entities
        function decodeEntities(encodedString) {
            const textarea = document.createElement('textarea');
            textarea.innerHTML = encodedString;
            return textarea.value;
        }

        function nextOrSubmit() {
            // Check if the user has selected an answer before moving to the next question
            if (!userAnswers[currentQuestion]) {
                alert("Please select an answer before moving to the next question.");
                return;
            }

            currentQuestion++;

            if (currentQuestion < questions.length - 1) {
                showQuestion();
            } else {
                showResult();
            }
        }

        function showResult() {
            const resultContainer = document.getElementById("result-container");
            resultContainer.innerHTML = "<h2>Quiz Result</h2>";
        
            let correctAnswers = 0;
        
            questions.forEach((questionData, index) => {
                // Skip displaying the last question in the result
                if (index === questions.length - 1) {
                    return;
                }
        
                const userAnswer = userAnswers[index];
                const isCorrect = compareAnswers(userAnswer, questionData.correctAnswer);
        
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result-item');
        
                resultDiv.innerHTML += `
                    <p class="question">${questionData.question}</p>
                    <p>Your Answer: ${userAnswer}</p>
                    <p>Correct Answer: ${formatCorrectAnswer(questionData.correctAnswer)}</p>
                `;
        
                if (isCorrect) {
                    resultDiv.innerHTML += `<p class="correct">Correct!</p>`;
                    correctAnswers++;
                } else {
                    resultDiv.innerHTML += `<p class="incorrect">Incorrect!</p>`;
                }
        
                // Show all choices for the question with letters
                resultDiv.innerHTML += `<div class="question-choices">`;
                questionData.options.forEach((choice, i) => {
                    const isUserChoice = compareAnswers(userAnswer, decodeEntities(choice));
                    const isCorrectChoice = compareAnswers(questionData.correctAnswer, decodeEntities(choice));
        
                    const choiceClass = isUserChoice ? 'selected-choice' : '';
                    const choiceStatusClass = isCorrectChoice && isCorrect ? 'correct-choice' : (isUserChoice ? 'incorrect-choice' : '');
        
                    resultDiv.innerHTML += `<div class="choice ${choiceClass} ${choiceStatusClass}" onclick="selectOption(null, '${choice}')">${String.fromCharCode(65 + i)}. ${choice}</div>`;
                });
                resultDiv.innerHTML += `</div>`;
        
                resultContainer.appendChild(resultDiv);
            });
        
            // Display the total score
            resultContainer.innerHTML += `<p class="total-score">You're ${correctAnswers} out of ${questions.length - 1}</p>`;
        
            // Add a "Take Again" button
            resultContainer.innerHTML += `
                <button class="take-again" onclick="takeAgain()">Take Again</button>
            `;
        
            // Show the result container
            resultContainer.style.display = 'block';
        }
        

        function formatCorrectAnswer(answer) {
            // Format the correct answer to use normal font
            return answer.startsWith('<') ? answer.substring(1, answer.length - 1) : answer;
        }
        
        // Function to compare answers, considering option letter and ignoring case and extra spaces
function compareAnswers(userAnswer, correctAnswer) {
    const userOption = userAnswer.charAt(0).toLowerCase();
    const correctOption = correctAnswer.charAt(0).toLowerCase();
    return userOption === correctOption;
}


        function submitQuiz() {
            // Hide the last question
            document.getElementById("quiz").style.display = 'none';

            // Show the result directly
            showResult();
        }

        function takeAgain() {
            currentQuestion = 0;
            userAnswers = [];
            showQuestion();
            document.getElementById("result-container").innerHTML = "";

            // Show the quiz container again
            document.getElementById("quiz").style.display = 'block';

            // Hide the result container
            document.getElementById("result-container").style.display = 'none';
        }

        // Function to shuffle the questions
        function shuffleQuestions() {
            for (let i = questions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [questions[i], questions[j]] = [questions[j], questions[i]];
            }
        }

        // Initial load
        showQuestion();