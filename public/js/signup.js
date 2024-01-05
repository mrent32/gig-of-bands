const formDisplay = (event) => {
  const id = event.target.id
  console.log(id)

  if (id === 'performer-signup-btn') {
    document.getElementById('venue').style.display = 'none'
    document.getElementById('band').style.display = 'block'
  } else {
    document.getElementById('band').style.display = 'none'
    document.getElementById('venue').style.display = 'block'
  }
}

const signupFormHandler = async (event) => {
  event.preventDefault()

  const name = document.querySelector('#name-signup').value.trim()
  const password = document.querySelector('#password-signup').value.trim()

  if (name && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/profile')
    } else {
      alert(response.statusText)
    }
  }
}

[...document.querySelectorAll('.signup-btn')]
  .forEach(button => button
  .addEventListener('click', formDisplay))

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler)
