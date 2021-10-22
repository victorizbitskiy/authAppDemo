import { Question } from './question'
import { createModal, isValid } from './utils'
import './styles.css'
import { authWithEmailAndPasword, getAuthForm } from './auth'

const form = document.getElementById('form')
const modalBtn = document.getElementById('modal-btn')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
  event.preventDefault() // чтобы страница не перезагружалась

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    }

    submitBtn.disabled = true
    // Async request to server to save question
    Question.create(question).then(() => {
      console.log('Question', question)
      input.value = ''
      input.className = ''
      submitBtn.disabled = false
    })
  }
}

function openModal() {
  createModal('Авторизация', getAuthForm())
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler) // чтобы событие было добавлено 1 раз
}

function authFormHandler(event) {
  event.preventDefault()

  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value

  authWithEmailAndPasword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
}

function renderModalAfterAuth(content) {
  console.log('Content', content)

}
