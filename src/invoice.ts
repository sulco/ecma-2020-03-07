import { getValueByName } from './utils/dom'

const tbody = document.querySelector('tbody')!

addItem()

tbody.addEventListener('input', event => {
  const target = event.target as HTMLInputElement

  if (['net', 'vat', 'quantity'].includes(target.name)) {
    const trEl = (event.target as HTMLInputElement).closest('tr')!

    const gross = ['net', 'vat', 'quantity']
      .map(name => getValueByName(name, trEl))
      .reduce((acc, val) => acc * val, 1)

    trEl.querySelector<HTMLInputElement>('[name=gross]')!.value = gross.toFixed(
      2,
    )
  }
})

tbody.addEventListener('click', event => {
  const el = event.target as HTMLElement

  switch (el.dataset.action) {
    case 'add':
      addItem()
      enumerate()
      break

    case 'remove':
      removeItem(el)
      if (tbody.childElementCount === 1) {
        addItem()
      }
      enumerate()
      break
  }

  el.dataset.action && event.preventDefault()
})

function enumerate() {
  tbody
    .querySelectorAll('tr')
    .forEach(
      (row, idx) =>
        ((row as HTMLTableRowElement).querySelector<HTMLDivElement>(
          'td div',
        )!.innerText = `${idx}.`),
    )
}

function removeItem(el: HTMLElement) {
  el.closest('tr')!.remove()
}

function addItem() {
  const newTr = tbody
    .querySelector('.template')!
    .cloneNode(true) as HTMLTableRowElement

  newTr.classList.remove('template')

  tbody.insertAdjacentElement('beforeend', newTr)
}
