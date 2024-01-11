// 
const viewPage = (event) => {
    event.preventDefault()

    const id = event.target.id

    document.location.replace(`/api/${id}`)
}

[...document.querySelectorAll('.container')]
    .forEach(container => container
    .addEventListener('click', viewPage))

    const cal = document.getElementById('calendar2')

let calendar = new FullCalendar.Calendar(cal, {
  initialView: 'dayGridMonth',
  selectable: true,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek'
  },
  events: [
    {
      title: 'Jon Bovi live at Starlight Pavilion!',
      start: '2024-01-11'
    },
    {
        title: `Crimson Tide live at 
        Whispering Woods`,
        start: '2024-01-12'
    },
    {
        title: `The Stolling Rones live at 
        Harbor Lights Pavilion!`,
        start: '2024-01-13'
    },
    {
        title: `Pysychadelica live at
         Whirlwind Hall!`,
        start: '2024-01-14'
    },
    {
        title: `Epic Explorers live 
        at Sapphire Lounge!`,
        start: '2024-01-15'
    },
    {
        title: `Galactic Groovers live
         at Aurora Amphitheater`,
        start: '2024-01-16'
    },
    {
        title: `Radiant Rebels live at 
        Majestic Ballrom!`,
        start: '2024-01-17'
    },
    {
        title: `Lunar Lullabies live
         at Harmony Haven!`,
        start: '2024-01-19'
    },
    {
        title: `Sonic Boom live 
        at Crystal Palace!`,
        start: '2024-01-18'
    },
    {
        title: `Eclipse Enigma live
         at Rustic Retreat!`,
        start: '2024-01-20'
    },
    {
        title: `Mystic Melodies live at 
        Vivid Vista Lounge!`,
        start: '2024-01-21'
    },
    {
        title: `Electric Echoes live 
        at Ethereal Oasis!`,
        start: '2024-01-22'
    },

  ]
})
calendar.render()
