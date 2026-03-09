export function getHistory(): string[] {
    const history = localStorage.getItem('history')
    return history ? JSON.parse(history) : []
}

export function addVinToHistory(vin: string) {
    const newHistory = [vin, ...getHistory().filter(v => v != vin)].slice(0, 3)
    localStorage.setItem('history', JSON.stringify(newHistory))
}

export function removeVinFromHistory(vin: string) {
    const newHistory = [...getHistory().filter(v => v != vin)].slice(0, 3)
    localStorage.setItem('history', JSON.stringify(newHistory))
}