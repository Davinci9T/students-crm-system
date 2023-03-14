const students = [
  {
    surname: "Иванов",
    firstname: "Иван",
    patronymic: "Иванович",
    startStud: 2020,
    age: new Date(2000, 11, 2),
    department: "Археолгия",
  },
  {
    surname: "Никитин",
    firstname: "Никита",
    patronymic: "Никитич",
    startStud: 2019,
    age: new Date(1999, 4, 19),
    department: "Юридический",
  },
  {
    surname: "Кузнецова",
    firstname: "Ольга",
    patronymic: "Васильевна",
    startStud: 2003,
    age: new Date(1985, 7, 4),
    department: "Филология",
  },
  {
    surname: "Соколова",
    firstname: "Анна",
    patronymic: "Петровна",
    startStud: 2022,
    age: new Date(2002, 10, 10),
    department: "Мехмат",
  },
  {
    surname: "Михайлов",
    firstname: "Михаил",
    patronymic: "Михайлович",
    startStud: 2021,
    age: new Date(1998, 1, 25),
    department: "Медицинский",
  },
]

function studentBuild(arr) {
  arr.forEach((student, i) => {
    // Присваиваем id
    student.id = i + 1
    // Соединяем ФИО
    compareName(student)
    student.fio = `${student.surname} ${student.firstname} ${student.patronymic}`
    // Соединяем дату рождения
    calculateAge(arr)
    // Считаем сколько времени прошло с начала обучения
    student.course = timeOfLear(arr, i)

    return student
  })
}

// Выравниваем буквы 
function compareName(student) {
  const getCorrectName = (string) => {
    return string.substr(0, 1).toUpperCase() + string.slice(1).toLowerCase()
  };
  student.surname = getCorrectName(student.surname)
  student.firstname = getCorrectName(student.firstname)
  student.patronymic = getCorrectName(student.patronymic)
  student.department = getCorrectName(student.department)
}

// Соединяем дату рождения
function calculateAge(students) {
  students.forEach(student => {
    let birthdate = new Date(student.age);
    let today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    let m = today.getMonth() - birthdate.getMonth();
    let year = birthdate.getFullYear()
    let month = birthdate.getMonth() + 1
    let day = birthdate.getDate()

    if (month < 10) month = "0" + month
    if (day < 10) day = "0" + day
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    
    let birthdateString = `${day}.${month}.${year}`;
    student.studentAge = `${birthdateString} ${age} лет`;
  });
  return students;
}

// ВРЕМЯ ОБУЧЕНИЯ
function timeOfLear(arr, i) {
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
  const inputYear = arr[i].startStud
  // Округляем сколько месяцев поршло с начала обучения
  const months = Math.floor(monthsPassed(inputYear))
  // проверяем на каком курсе или закончил
  const course = (course) => {
    let today = new Date()
    if (months <= 12) {
      return (course = `${arr[i].startStud} - ${today.getFullYear()} (1 курс)`)
    } else if (months >= 12 && months <= 24) {
      return (course = `${arr[i].startStud} - ${today.getFullYear()} (2 курс)`)
    } else if (months >= 24 && months <= 36) {
      return (course = `${arr[i].startStud} - ${today.getFullYear()} (3 курс)`)
    } else if (months >= 36 && months <= 48) {
      return (course = `${arr[i].startStud} - ${today.getFullYear()} (4 курс)`)
    } else if (months >= 48) {
      return (course = `${arr[i].startStud} - ${arr[i].startStud + 4} закончил(а)`)
    }
  }

  return course(arr[i].startStud)
}

export { students, studentBuild, compareName, calculateAge, timeOfLear }
