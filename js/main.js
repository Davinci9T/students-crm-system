import {
  students,
  studentBuild,
  compareName,
  calculateAge,
  timeOfLear,
} from "./components.js"

let arrStudents = localStorage.getItem("arrStudents")
  ? JSON.parse(localStorage.getItem("arrStudents"))
  : [...students]

// перебераем существующий список
studentBuild(arrStudents)

//РЕНДЕР
const renderStudents = (searchTerm = "") => {
  const studentList = document.getElementById("student-list")
  studentList.innerHTML = ""

  // Фильтрация сотрудников на основе поискового запроса
  let filteredStudents = arrStudents
  if (searchTerm) {
    filteredStudents = arrStudents.filter((student) => {
      return (
        student.fio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentAge.toString().includes(searchTerm) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }

  // Непосредственно отображаем
  filteredStudents.forEach((student) => {
    const row = document.createElement("ul")
    row.classList.add(
      "slot",
      "w-full",
      "h-20",
      "text-lg",
      "bg-gray-800",
      "gap-x-3",
      "text-center",
      "grid-cols-12",
      "grid",
      "justify-center",
      "items-center",
      "px-10",
      "py-2",
      "rounded-xl"
    )
    row.innerHTML = `
          <li class="name text-gray-400 font-semibold col-start-1 col-span-3">${student.fio}</li>
          <li class="fac text-gray-400 font-semibold col-start-5 col-span-2">${student.department}</li>
          <li class="age text-gray-400 font-semibold col-span-3">${student.studentAge}</li>
          <li class="course text-gray-400 font-semibold col-start-10 col-span-3">${student.course}</li>
          <button class="remove-student-btn bg-red-500 rounded-xl px-2 font-semibold text-gray-100" data-id=${student.id}>Удалить</button>`
    studentList.appendChild(row)
  })
}

// РАБОТА С ФОРМОЙ
// огрнчиваем календарь до текущей даты
const currentDay = document.getElementById("age")
currentDay.setAttribute("max", new Date().toISOString().slice(0, 10))
// ==================================================================
// добовляем нового студента
const addStudentForm = document.getElementById("add-student-form")
addStudentForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const surname = document.getElementById("surname").value
  const firstname = document.getElementById("firstname").value
  const patronymic = document.getElementById("patronymic").value
  const age = new Date(document.getElementById("age").value)
  const startStud = Number(document.getElementById("startStud").value)
  const department = document.getElementById("department").value
  const student = { surname, firstname, patronymic, age, startStud, department }

  arrStudents.push(student)
  arrStudents.forEach((student, i) => {
    student.id = i + 1
    compareName(student)
    student.fio = `${student.surname} ${student.firstname} ${student.patronymic}`
    calculateAge(arrStudents)
    student.course = timeOfLear(arrStudents, i)
    return student
  })
  localStorage.setItem("arrStudents", JSON.stringify(arrStudents))
  searchStudents()
  addStudentForm.reset()
  document.body.classList.remove("lock")
  backlock.classList.remove("active")
  addStudentForm.classList.remove("active")
})

document
  .getElementById("student-list")
  .addEventListener("click", async (event) => {
    if (event.target.classList.contains("remove-student-btn")) {
      const id = event.target.getAttribute("data-id")
      const index = arrStudents.findIndex((student) => student.id == id)
      arrStudents.splice(index, 1)
      renderStudents()
      localStorage.setItem("arrStudents", JSON.stringify(arrStudents))
    }
  })

const searchStudents = () => {
  const searchTerm = document.getElementById("search-input").value
  renderStudents(searchTerm)
}

renderStudents()

const studentSearchForm = document.getElementById("search-form")
studentSearchForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const searchTerm = document.getElementById("search-input").value
  renderStudents(searchTerm)
})

// СОРТИРОВКА ПО ПАРАМЕТРАМ + СОЗДАЁМ КНОКПИ СОРТИРОВКИ
const sortStudents = (param) => {
  arrStudents.sort((a, b) => {
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
  arrStudents.sort((a, b) => {
    const dateA = new Date(a.age)
    const dateB = new Date(b.age)
    return dateA - dateB
  })
  searchStudents()
}
// ==================================================================
const sortTypes = ["fio", "department", "course"]
const buttonsContainer = document.getElementById("buttonsContainer")

sortTypes.forEach((sortType, i) => {
  const sortTypesTitle = ["ФИО", "Факультет", "Годы обучения"]
  const button = document.createElement("button")

  button.classList.add(
    "sortStudents",
    "text-lg",
    "font-semibold",
    "text-gray-200",
    "gap-x-3",
    "text-center",
    "justify-center",
    "items-center",
    "px-10",
    "py-2",
    "rounded-xl"
  )
  button.textContent = sortTypesTitle[i]
  button.addEventListener("click", () => sortStudents(sortType))
  buttonsContainer.appendChild(button)
})

const sortStudentsOfBirthdayBtn = document.createElement("button")
sortStudentsOfBirthdayBtn.classList.add(
  "sortStudents",
  "text-lg",
  "font-semibold",
  "text-gray-200",
  "gap-x-3",
  "text-center",
  "justify-center",
  "items-center",
  "px-10",
  "py-2",
  "rounded-xl"
)
sortStudentsOfBirthdayBtn.textContent = "Возраст"
buttonsContainer.appendChild(sortStudentsOfBirthdayBtn)
sortStudentsOfBirthdayBtn.addEventListener("click", sortStudentsOfBirthday)

// КНОПКИ +/x
const openForm = document.getElementById("openForm")
const closeForm = document.getElementById("close")
const backlock = document.getElementById("backlock")

// открываем форму
openForm.addEventListener("click", () => {
  document.body.classList.add("lock")
  backlock.classList.add("active")
  addStudentForm.classList.add("active")
})

// закрываем форму
closeForm.addEventListener("click", () => {
  document.body.classList.remove("lock")
  backlock.classList.remove("active")
  addStudentForm.classList.remove("active")
})
