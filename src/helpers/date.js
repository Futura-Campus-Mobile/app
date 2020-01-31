const lastMonthDay = (month, year) => new Date(year, month+1, 0)
const firstMonthDay = (month, year) => new Date(year, month, 1)

export const range = (n, start=0) => [...Array(n).keys()].map(v => v+start)
export const byPeriod = (arr, n) => arr.filter((v, i) => i==0 || v%n==0)

const withZero = (n) => n < 10 ? '0'+n : n
export const toTimeString = date => `${withZero(date.getHours())}:${withZero(date.getMinutes())}`

function monthWeeks(year, month) {
    const firstDay = firstMonthDay(month, year)
    const lastDay = lastMonthDay(month, year)

    const used = firstDay.getDay() + lastDay.getDate()

    return Math.ceil(used / 7)
}

export const getMonthWeeks = () => {
    const today = new Date(), month = today.getMonth(), year = today.getFullYear()
    const numberOfWeeks = monthWeeks(year, month)

    const firstDay = firstMonthDay(month, year)
    const firstSunday = new Date(firstDay - firstDay.getDay()*24*3600*1000)

    const arr = range(numberOfWeeks).map(n =>
        new Date(firstSunday.getTime() + n*7*24*3600*1000).getDate())

    return arr
}

export const getWeekDays = n => 
    ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    .map(d => d.slice(0, n))