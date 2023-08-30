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
    return ['Angular', 'Vuex', 'ReactJS', 'JQuery', 'React Native', 'NodeJS', 'HTML', 'SASS', 'Webpack', 'Redux']
    

  } catch (error) {
    throw new Error(error)
  }
}

const [selectElement, label, selectedItem, arrowIcon, selectItemsCard, wrapper, cardLoading] = initial()
const actionBtns = document.querySelectorAll('[data-type]')

let selectItems = []

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

function selectItemByIndex(index) {
  if (selectItems[index]) {
    selectItem(selectItems[index])
  }
}

function getSelected() {
  if(selectedItem.textContent) alert(selectedItem.textContent)
}

function clearSelect() {
  selectedItem.innerText = ''
  label.classList.remove('select__label_opened')
  label.classList.remove('select__label_selected')
  arrowIcon.classList.remove('select__arrow_opened')
}

function destroySelect() {
  selectElement.remove()
}

wrapper.addEventListener('click', (event) => {
  const { target } = event

  if (![selectElement, label, arrowIcon, selectedItem].includes(target) && ![...actionBtns].includes(target)) {
    closeSelect()
  }
})

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

    selectItems = response
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
    case 'set': 
      selectItemByIndex(5)
      break;
    case 'get': 
      getSelected()
      break;
    case 'clear': 
      clearSelect()
      break;
    case 'destroy': 
      destroySelect()
      break;
  }
}

selectElement.addEventListener('click', (event) => {
  toggleSelect()

  if(event.target.classList.contains('select-card__item')) {
    selectItem(event.target.textContent)
  }
})



