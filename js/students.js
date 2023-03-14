const students = [
  {
    surname: "Иванов",
    firstname: "Иван",
    patronymic: "Иванович",
    startStud: 2020,
    age: new Date(2000, 11, 2),
    departamet: "Археолгия",
  },
  {
    surname: "Никитин",
    firstname: "Никита",
    patronymic: "Никитич",
    startStud: 2019,
    age: new Date(1999, 4, 19),
    departamet: "Юридический",
  },
  {
    surname: "Кузнецова",
    firstname: "Ольга",
    patronymic: "Васильевна",
    startStud: 2003,
    age: new Date(1985, 7, 4),
    departamet: "Филология",
  },
  {
    surname: "Соколова",
    firstname: "Анна",
    patronymic: "Петровна",
    startStud: 2022,
    age: new Date(2002, 10, 10),
    departamet: "Мехмат",
  },
  {
    surname: "Михайлов",
    firstname: "Михаил",
    patronymic: "Михайлович",
    startStud: 2021,
    age: new Date(1998, 1, 25),
    departamet: "Медицинский",
  },
]

const obj = students.map((student, i) => {
  // Присваиваем id
  student.id = i + 1
  // Соединяем ФИО
  student.fio = `${student.surname} ${student.firstname} ${student.patronymic}`
  // Соединяем дату рождения
  student.studentAge = birthdayFn(i)
  // Считаем сколько времени прошло с начала обучения
  student.course = timeOfLear(i)
  return student
})

// Соединяем дату рождения
function birthdayFn(i) {
  let year = students[i].age.getFullYear()
  let month = students[i].age.getMonth() + 1
  let day = students[i].age.getDate()

  let today = new Date()
  let currentAge = today.getFullYear() - year
  let m = today.getMonth() - month
  if (month < 10) month = "0" + month
  if (day < 10) day = "0" + day
  const birthday = `${day}.${month}.${year}`

  // выводим количество лет
  if (m < 0 || today.getDate() < students[i].age.getDate) currentAge--
  return `${birthday} ${currentAge} лет`
}

// ВРЕМЯ ОБУЧЕНИЯ
function timeOfLear(i) {
  function monthsPassed(inputYear) {
    // текущая дата
    const now = new Date()
    // Создаём 1 сентебря с годом из параметра
    const september = new Date(inputYear, 8, 1)
    // Находим разницу между датами в миллисекундах
    const inMs = now - september
    // Превращаем миллисекунды в месяцы
    const inMonths = inMs / (1000 * 60 * 60 * 24 * 30)
    // Возвращаем месяц
    return inMonths
  }

  // Вводим год начала обучения
  const inputYear = students[i].startStud
  // Округляем сколько месяцев поршло с начала обучения
  const months = Math.floor(monthsPassed(inputYear))
  // проверяем на каком курсе или закончил
  const course = (course) => {
    let today = new Date()
    if (months <= 12) {
      return (course = `${
        students[i].startStud
      } - ${today.getFullYear()} (1 курс)`)
    } else if (months >= 12 && months <= 24) {
      return (course = `${
        students[i].startStud
      } - ${today.getFullYear()} (2 курс)`)
    } else if (months >= 24 && months <= 36) {
      return (course = `${
        students[i].startStud
      } - ${today.getFullYear()} (3 курс)`)
    } else if (months >= 36 && months <= 48) {
      return (course = `${
        students[i].startStud
      } - ${today.getFullYear()} (4 курс)`)
    } else if (months >= 48) {
      return (course = `${
        students[i].startStud
      } - ${today.getFullYear()} закончил(а)`)
    }
  }

  return course(students[i].startStud)
}

// Сортируем по параметрам
const sortStudents = (param) => {
  students.sort((a, b) => {
    if (a[param] < b[param]) {
      return -1
    }
    if (a[param] > b[param]) {
      return 1
    }
    return 0
  })
  searchStudents()
}

const sortStudentsOfBirthday = () => {
  students.sort((a, b) => {
    const dateA = new Date(a.age)
    const dateB = new Date(b.age)
    return dateA - dateB
  })
  searchStudents()
}

export {
  students,
  obj,
  birthdayFn,
  timeOfLear,
  sortStudentsOfBirthday,
  sortStudents,
}
