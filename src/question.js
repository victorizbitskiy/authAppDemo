export class Question {
  static create(question) {
    return fetch('https://authappdemo-1bad6-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        question.id = response.name
        return question
      })
      .then(addToLocalStorage(question))
      .then(Question.renderList)
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage()

    const html = questions.length ? questions.map(toCard).join('') : ` <div class="mui--text-headline">Вы пока ничего не спросили</div>`

    const list = document.getElementById('list')
    list.innerHTML = html
  }
}

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
  // в любом случае будем возвращать массив 
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
  return `
  <div class="mui--text-black-54">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}
  </div>
    <div>${question.text}</div>
    <br />
  </div>
  `
}