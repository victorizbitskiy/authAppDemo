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
        console.log(response)
      })
  }
}