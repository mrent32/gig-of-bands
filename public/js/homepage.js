const viewPage = (event) => {
    event.preventDefault()

    const id = event.target.id
    console.log(id)

    document.location.replace(`/api/${id}`)
}

[...document.querySelectorAll('.container')]
    .forEach(container => container
    .addEventListener('click', viewPage))
