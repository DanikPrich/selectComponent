// class Select {
//   constructor(params) {
//     this.selector = params.selector,
//     this.label = params.label,
//     this.url = params.url
//   }
// }

// const select = new Select({
//   selector: '#select',
//   label: 'Выберите технологию',
//   url: 'https://vladilen-dev.firebaseio.com/technologies.json',
//   onSelect(selectedItem) {}
// })

async function fetchData(url) {
  try {
    //server with data is not responding - added hardkode
    return ['Angular', 'Vuex', 'ReactJS', 'JQuery', 'React Native', 'Angular', 'Vuex', 'ReactJS', 'JQuery', 'React Native']

  } catch (error) {
    throw new Error(error)
  }
}

fetchData('https://vladilen-dev.firebaseio.com/technologies.json')
  .then(response => {
    response.forEach((item) => {
      const element = document.createElement('div')
      element.classList.add('select-card__item')
      element.textContent = item
      selectItemsCard.appendChild(element)
    })
  })
  
const selectElement = document.querySelector('#select')
selectElement.className = 'select'

const label = document.createElement('span')
label.innerText = 'Select item'
label.classList.add('select__label')

const selectedItem = document.createElement('span')
selectedItem.classList.add('select__value')

const arrowIcon = new Image
arrowIcon.src = 'https://icons.veryicon.com/png/o/miscellaneous/data-product-icon-library/arrow-bottom-4.png'
arrowIcon.classList.add('select__arrow')

const selectItemsCard = document.createElement('div')
selectItemsCard.classList.add('select-card')


selectElement.append(label, selectedItem, arrowIcon, selectItemsCard)


const actionBtns = document.querySelectorAll('[data-type]')

actionBtns.forEach((button) => {
  button.addEventListener('click', actionsCallback)
})

function actionsCallback(event) {
  const actionType = event.target.getAttribute('data-type')

  switch (actionType) {
    case 'open': 
      openSelect()
      break;
    case 'close': 
      closeSelect()
      break;
  }
}




function openSelect() {
  selectItemsCard.classList.add('select-card_active')
  label.classList.add('select__label_opened')
  arrowIcon.classList.add('select__arrow_opened')
}

function closeSelect() {
  selectItemsCard.classList.remove('select-card_active')
  label.classList.remove('select__label_opened')
  arrowIcon.classList.remove('select__arrow_opened')
}

function toggleSelect() {
  selectItemsCard.classList.toggle('select-card_active')
  label.classList.toggle('select__label_opened')
  arrowIcon.classList.toggle('select__arrow_opened')
}

function selectItem(newValue) {
  selectedItem.innerText = newValue
  label.classList.add('select__label_selected')
}


selectElement.addEventListener('click', (event) => {
  toggleSelect()

  if(event.target.classList.contains('select-card__item')) {
    selectItem(event.target.textContent)
  }
})



