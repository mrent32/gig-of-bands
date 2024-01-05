const formDisplay = (event) => {
  const id = event.target.id

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
  
  const bandName = document.querySelector('#band-name-signup').value.trim()
  const bandGenre = document.querySelector('#band-genre-signup').value.trim()
  const venueName = document.querySelector('#venue-name-signup').value.trim()
  const bandUsername = document.querySelector('#band-username-signup').value.trim()
  const venueUsername = document.querySelector('#venue-username-signup').value.trim()
  const bandPassword = document.querySelector('#band-password-signup').value.trim()
  const venuePassword = document.querySelector('#venue-password-signup').value.trim()
  
  if (bandName && bandGenre && bandUsername && bandPassword) {
    const response = await fetch('/api/users/1', {
      method: 'POST',
      body: JSON.stringify({ bandName, bandGenre, bandUsername, bandPassword }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/profile')
    } else {
      alert(response.statusText)
    }
  }
  console.log(venueName, venueUsername, venuePassword)

  if (venueName && venueUsername && venuePassword) {
    const response = await fetch('/api/users/2', {
      method: 'POST',
      body: JSON.stringify({ venueName, venueUsername, venuePassword }),
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
  .addEventListener('click', formDisplay));

[...document.querySelectorAll('.submit-btn')]
  .forEach(button => button
  .addEventListener('click', signupFormHandler));
