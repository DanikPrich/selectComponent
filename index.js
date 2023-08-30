const initial = () => {
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

  const cardLoading = document.createElement('div')
  cardLoading.classList.add('select-card__loading')
  cardLoading.textContent = 'Loading...'
  selectItemsCard.appendChild(cardLoading)

  const wrapper = document.querySelector('.wrap')

  return [selectElement, label, selectedItem, arrowIcon, selectItemsCard, wrapper, cardLoading]
}

async function fetchData(url) {
  try {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })

    //server with data is not responding - added hardkode
    return ['Angular', 'Vuex', 'ReactJS', 'JQuery', 'React Native', 'Angular', 'Vuex', 'ReactJS', 'JQuery', 'React Native']
    

  } catch (error) {
    throw new Error(error)
  }
}



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


const [selectElement, label, selectedItem, arrowIcon, selectItemsCard, wrapper, cardLoading] = initial()
const actionBtns = document.querySelectorAll('[data-type]')

selectElement.append(label, selectedItem, arrowIcon, selectItemsCard)

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

function setCardLoading(isLoading) {
  if(isLoading) {
    cardLoading.classList.add('select-card__loading_active')
  } else {
    cardLoading.classList.remove('select-card__loading_active')
  }
}

setCardLoading(true)

fetchData('https://vladilen-dev.firebaseio.com/technologies.json')
  .then(response => {
    setCardLoading(false)

    response.forEach((item) => {
      const element = document.createElement('div')
      element.classList.add('select-card__item')
      element.textContent = item
      selectItemsCard.appendChild(element)
    })
  })


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

wrapper.addEventListener('click', (event) => {
  const { target } = event

  if (![selectElement, label, arrowIcon, selectedItem].includes(target) && ![...actionBtns].includes(target)) {
    closeSelect()
  }
})

selectElement.addEventListener('click', (event) => {
  toggleSelect()

  if(event.target.classList.contains('select-card__item')) {
    selectItem(event.target.textContent)
  }
})



