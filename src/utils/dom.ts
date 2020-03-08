export function getValueByName(name: string, parent = document.body): number {
  const input = parent.querySelector<HTMLInputElement>(`[name=${name}]`)

  return input ? parseFloat(input.value || '0') : 0
}
