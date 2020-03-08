import { getValueByName } from './utils/dom'

document
  .querySelectorAll('[name=net], [name=quantity], [name=vat]')
  .forEach(input => {
    input.addEventListener('input', event => {
      const trEl = (event.target as HTMLInputElement).closest('tr')!

      const gross = ['net', 'vat', 'quantity']
        .map(name => getValueByName(name, trEl))
        .reduce((acc, val) => acc * val, 1)

      trEl.querySelector<HTMLInputElement>(
        '[name=gross]',
      )!.value = gross.toFixed(2)
    })
  })
