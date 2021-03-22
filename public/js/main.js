document.querySelector('.datePicker').valueAsDate = new Date()

fetch('/feelings')
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    if (data.length > 0) {
      document.querySelector('.hideTable').style.display = 'block'
      document.querySelector('#tableWrapper').style.display = 'block'
      let moodTable = document.querySelector('.mood')
      data.forEach( (day) => {
        // console.log(day);
        let tableBody = document.querySelector('.tableBody')

          let newRow = document.createElement('tr')
          let date = document.createElement('td')
          let mood = document.createElement('td')
          let message = document.createElement('td')
          date.innerText = day[2]
          mood.innerText = day[0]
          message.innerText = day[1]

          newRow.appendChild(date)
          // newRow.appendChild(genderAncestry)
          newRow.appendChild(mood)
          newRow.appendChild(message)
          tableBody.appendChild(newRow)

      // console.log(data)

      });
    }
    else{
      document.querySelector('.hideTable').style.display = 'none'
      document.querySelector('#tableWrapper').style.display = 'none'
    }

  })
  .catch(err => {
    console.log(`error ${err}`)
  })
