# 🧠 Quiz App

A simple and interactive **Quiz Application** built using **HTML, CSS, and JavaScript**.

The application loads quiz questions and answers dynamically from a JSON file, allows the user to select an answer, tracks the number of correct answers, includes a countdown timer for each question, and displays the final result when the quiz is completed.

---

## 🚀 Features

* 📚 Load questions dynamically from a JSON file.
* ❓ Display questions and four possible answers.
* 🔘 Select one answer for each question.
* ✅ Automatically check the selected answer.
* 📊 Track the user's score.
* ⏱️ Countdown timer for each question.
* 🔵 Display question progress using bullets.
* ⏭️ Move between questions using the **Submit** button.
* 🤖 Automatically move to the next question when the timer expires.
* 🏆 Display a final result based on the user's score.
* 📱 Simple and responsive user interface.

---

## 🛠️ Technologies Used

* **HTML5** — Structure of the application.
* **CSS3** — Styling and layout.
* **JavaScript (ES6)** — Quiz logic and DOM manipulation.
* **JSON** — Store questions and answers.
* **XMLHttpRequest (AJAX)** — Load quiz data from the JSON file.

---

## 📂 Project Structure

```text
Quiz-App/
│
├── index.html
├── style.css
├── main.js
├── html_questions.json
└── README.md
```

---

## 📋 JSON Data Structure

The questions are stored inside `html_questions.json`.

Each question contains a title, four answers, and the correct answer.

Example:

```json
[
  {
  "title": "Which Language Is Commonly Used for .NET Development?",
  "answer_1": "C#",
  "answer_2": "Python",
  "answer_3": "PHP",
  "answer_4": "Ruby",
  "right_answer": "C#"
  }
]
```

---

## ⚙️ How It Works

### 1. Load Questions

The application uses `XMLHttpRequest` to request the questions from:

```text
html_questions.json
```

The JSON response is then converted into a JavaScript object using:

```javascript
JSON.parse(this.responseText);
```

### 2. Create Question Bullets

The number of bullets is generated dynamically based on the number of questions.

```javascript
createBullets(qCount);
```

The current question is highlighted using the `on` class.

### 3. Display Questions and Answers

The `AddQuestionData()` function dynamically creates:

* Question title
* Four radio buttons
* Four answer labels

The answers are retrieved from the JSON object using template literals:

```javascript
obj[`answer_${i}`]
```

<img width="2137" height="1535" alt="Screenshot 2026-09-08 175141" src="https://github.com/user-attachments/assets/997869d8-e5ea-4d9a-a64c-9c68df2f2670" />

### 4. Check the Answer

When the user clicks **Submit**, the selected answer is compared with the correct answer stored in the JSON file.

```javascript
if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
}
```

### 5. Countdown Timer

Each question has a countdown timer.

If the timer reaches zero, the application automatically submits the current question:

```javascript
submitBtn.click();
```

This allows the quiz to continue without requiring the user to manually click the button.

### 6. Display the Final Result

After answering all questions, the application displays one of three results:

* 🟢 **Good**
* 🟣 **Perfect**
* 🔴 **Bad**

The final score is displayed as:

```text
Perfect , 10 From 10
```

---

## 🎯 Result System

The application evaluates the user's score using the following logic:

| Result  | Condition                                   |
| ------- | ------------------------------------------- |
| Perfect | All questions answered correctly            |
| Good    | More than half of the questions are correct |
| Bad     | Half or fewer questions are correct         |

<img width="2085" height="522" alt="Screenshot 2026-09-08 175217" src="https://github.com/user-attachments/assets/64db620d-8b5c-4d4a-bdd1-a75805223936" />

---

## ▶️ How to Run

### Option 1 — Live Server

1. Clone or download the project.
2. Open the project folder in **Visual Studio Code**.
3. Install the **Live Server** extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

> Using Live Server is recommended because the application loads the JSON file using an HTTP request.

---

## 🧪 Example

If the quiz contains **5 questions** and the user answers **4 correctly**, the final result will be:

```text
Good, 4 From 5
```

If all 5 answers are correct:

```text
Perfect, 5 From 5
```

---

## 👨‍💻 Author

**Omar Ahmed Sallam**

Junior Full-Stack (.NET & Angular) Developer

---

## 📄 License

This project is created for learning and educational purposes.
