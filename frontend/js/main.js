// Сервер
const SERVER_URL = "http://localhost:3000";
// Настоящее время
let currentTime = new Date();

// Функции работы с сервером
async function serverAddClient(obj) {
  let response = await fetch(SERVER_URL + "/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  let data = await response.json();

  return data;
}

async function serverGetClients() {
  let response = await fetch(SERVER_URL + "/api/clients", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let data = await response.json();

  return data;
}

async function serverSearchClient (searchText) {
  let response = await fetch (SERVER_URL + "/api/clients/"+`?search=${searchText}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  let data = await response.json()

  return data
}

async function serverDeleteClient(id) {
  let response = await fetch(SERVER_URL + "/api/clients/" + id, {
    method: "DELETE",
  });

  let data = await response.json();

  return data;
}

async function serverPatchClient(id, obj) {
  let response = await fetch(SERVER_URL + "/api/clients/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  let data = await response.json();

  return data;
}


// Массив клиентов
let clientsList = [];
let serverData = await serverGetClients();
if (serverData) {
  clientsList = serverData;
}
// console.log(clientsList);

// let testClient = {
//     name: 'Василий',
//     surname: 'Пупкин',
//     lastName: 'Васильевич',
//     contacts: [
//         {
//           type: 'Телефон',
//           value: '+71234567890'
//         },
//         {
//           type: 'Email',
//           value: 'abc@xyz.com'
//         },
//         {
//           type: 'Facebook',
//           value: 'https://facebook.com/vasiliy-pupkin-the-best'
//         }
//     ]
// }
// let testServerObj = await serverAddClient(testClient)
// clientsList.push(testServerObj)
// let testPatchClient = {
//     name: 'AnotherTest'
// }
// let editClient = await serverPatchClient(1699358505540, testPatchClient)
// console.log(editClient);

let raz = 0; //Для себя
// Нахождение и присваивание различных дом элементов
let tbody = document.getElementById("tbody");
let surnameAddInp = document.getElementById("input-surname"); //Фамилия
let nameAddInp = document.getElementById("input-name"); //Имя
let lastNameAddInp = document.getElementById("input-lastName"); //Имя

// Тексты ошибок валидации 
let fioError = document.getElementById('fio-error')
let contactError = document.getElementById('contact-error')
let fullError = document.getElementById('full-error')

// Открытие модального окна добавления нового клиента
let addClientBtn = document.getElementById("main-button");
let modalBack = document.getElementById("modal-back");
let modalCloseBtn = document.getElementById("modal-box__close-btn");
let modalCrestBtn = document.getElementById("modal-box__crest-btn");
addClientBtn.addEventListener("click", function () {
  modalBack.classList.add("modal-back--active");
  modalBack.style.width = '100%'

  modalCloseBtn.addEventListener("click", function () {
    // Возвращение некоторых свойств валидации при закрытии модального окна
    fioError.style.opacity = '0'
    contactError.style.opacity = '0'
    fullError.style.opacity = '0'
    surnameAddInp.style.borderBottomColor = '#C8C5D1'
    nameAddInp.style.borderBottomColor = '#C8C5D1'
    lastNameAddInp.style.borderBottomColor = '#C8C5D1'

    // Очищение инпутов
    surnameAddInp.value = ''
    nameAddInp.value = ''
    lastNameAddInp.value = ''

    for (let i = 0; i < contactIndex; i++) {
      let contactBox = document.getElementById(`contact-box${i}`);
      if (!contactBox) continue;
      contactBox.remove();
    }
    // Скидываю счётчик
    contactIndex = 0;

    modalBack.classList.remove("modal-back--active");
    setTimeout(() => {
      modalBack.style.width = "0";
    }, 600);
  });

  modalCrestBtn.addEventListener("click", function () {
    // Возвращение некоторых свойств валидации при закрытии модального окна
    fioError.style.opacity = '0'
    contactError.style.opacity = '0'
    fullError.style.opacity = '0'
    surnameAddInp.style.borderBottomColor = '#C8C5D1'
    nameAddInp.style.borderBottomColor = '#C8C5D1'
    lastNameAddInp.style.borderBottomColor = '#C8C5D1'

    // Очищение инпутов
    surnameAddInp.value = ''
    nameAddInp.value = ''
    lastNameAddInp.value = ''

    for (let i = 0; i < contactIndex; i++) {
      let contactBox = document.getElementById(`contact-box${i}`);
      if (!contactBox) continue;
      contactBox.remove();
    }
    // Скидываю счётчик
    contactIndex = 0;

    modalBack.classList.remove("modal-back--active");
    setTimeout(() => {
      modalBack.style.width = "0";
    }, 600);
  });
});

// Добавление контактов клиента
let contactBox = document.getElementById("add-contact-box");
let addContactBtn = document.getElementById("modal-box__add-btn");
addContactBtn.addEventListener("click", function () {
  contactBox.prepend(createContactForm());
  // console.log(contactIndex);
});

// Функция создания добавления нового контакта для клиента
let contactIndex = 0;
//При любом закрытие модальных окон нужно скидывать этот счётчик на 0

function createContactForm() {
  let box = document.createElement("div");
  box.id = `contact-box${contactIndex}`;
  box.classList.add("contact-box");
  let select = document.createElement("select");
  select.id = `contact-select${contactIndex}`;
  select.classList.add("contact-select");
  let optionTel = document.createElement("option");
  optionTel.value = "Телефон";
  optionTel.textContent = "Телефон";
  let optionExtraTel = document.createElement("option");
  optionExtraTel.classList.add("extraTel-option");
  optionExtraTel.value = "Доп.телефон";
  optionExtraTel.textContent = "Доп.телефон";
  let optionEmail = document.createElement("option");
  optionEmail.value = "Email";
  optionEmail.textContent = "Email";
  let optionVk = document.createElement("option");
  optionVk.value = "Vk";
  optionVk.textContent = "Vk";
  let optionFacebook = document.createElement("option");
  optionFacebook.value = "Facebook";
  optionFacebook.textContent = "Facebook";
  select.append(
    optionTel,
    optionExtraTel,
    optionEmail,
    optionVk,
    optionFacebook
  );

  let input = document.createElement("input");
  input.id = `contact-input${contactIndex}`;
  input.classList.add("contact-input");

  let btnRemove = document.createElement("btn");
  btnRemove.classList.add("contact-remove-btn");
  btnRemove.addEventListener("click", function () {
    box.remove();
    console.log(contactIndex);
  });

  contactIndex++;

  box.append(select, input, btnRemove);
  return box;
}

// Сохранение нового клиента
let saveClientBtn = document.getElementById("modal-box__save-btn");
saveClientBtn.addEventListener("click", async function () {
  // Метка для валидации
  let fioMark = true
  let contactMark = true

  // Валидация ФИО
  if (surnameAddInp.value.trim() == '' || nameAddInp.value.trim() == '' || lastNameAddInp.value.trim() == '') {
    fioMark = false

    // fioError.style.opacity = '1'
  }
  if (surnameAddInp.value.trim() == '') {
    surnameAddInp.style.borderBottomColor = 'red'
  }
  if (nameAddInp.value.trim() == '') {
    nameAddInp.style.borderBottomColor = 'red'
  }
  if (lastNameAddInp.value.trim() == '') {
    lastNameAddInp.style.borderBottomColor = 'red'
  }

  let newClient = {
    surname: surnameAddInp.value.trim(),
    name: nameAddInp.value.trim(),
    lastName: lastNameAddInp.value.trim(),
    contacts: [],
  };

  for (let i = 0; i < contactIndex; i++) {
    let contactSelect = document.getElementById(`contact-select${i}`);
    // Проверка есть ли вообще селект
    if (contactSelect == null) {
      continue;
    }
    let contactInput = document.getElementById(`contact-input${i}`);

    // Добавление типа number инпута для телефона и доп телефона
    if (contactSelect.value.trim() == 'Телефон' || contactSelect.value.trim() == 'Доп.телефон') {
      contactInput.setAttribute('type', 'number')
    }

    // Проверка не пустые ли инпуты
    if (contactInput.value.trim() == '') {
      contactMark = false
    } 

    // При удовлетверении всех условий создаются контакты клиента
    if (contactMark == true) {
      newClient.contacts.push({
        type: contactSelect.value,
        value: contactInput.value,
      });
    }
  }

  // Делаем видимым нужную подсказку
  // Подсказка об ошибке в ФИО
  if (fioMark == false) {
    fioError.style.opacity = '1'
    contactError.style.opacity = '0'
    fullError.style.opacity = '0'
  }
  // Подсказка об ошибке в контактах
  if (contactMark == false) {
    contactError.style.opacity = '1'
    fioError.style.opacity = '0'
    fullError.style.opacity = '0'
  }
  // Подсказка об ошибке и там и там
  if (fioMark == false && contactMark == false) {
    fioError.style.opacity = '0'
    contactError.style.opacity = '0'
    fullError.style.opacity = '1'
  }

  if (fioMark == true && contactMark == true) {
    // Возвращение некоторых свойств если валидация успешна
    fioError.style.opacity = '0'
    contactError.style.opacity = '0'
    fullError.style.opacity = '0'
    surnameAddInp.style.borderBottomColor = '#C8C5D1'
    nameAddInp.style.borderBottomColor = '#C8C5D1'
    lastNameAddInp.style.borderBottomColor = '#C8C5D1'

    let serverNewObj = await serverAddClient(newClient);
    clientsList.push(serverNewObj);
  
    modalBack.classList.remove("modal-back--active");
    render(clientsList);
  
    surnameAddInp.value = "";
    nameAddInp.value = "";
    lastNameAddInp.value = "";
  
    for (let i = 0; i < contactIndex; i++) {
      let contactBox = document.getElementById(`contact-box${i}`);
      if (contactBox == null) {
        continue;
      }
      contactBox.remove();
    }
  
    contactIndex = 0;
  } else {

  }

});

// Функция получения красивого отображения даты
function getDate(date) {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }

  return dd + "." + mm + "." + yyyy;
}

// Функция получения красивого отображения времени
function getTime(date) {
  let hours = date.getHours();
  let minute = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  return hours + ":" + minute;
}

// Функция создания span
function createSpan(title, className = "") {
  let newSpan = document.createElement("span");
  newSpan.textContent = title;
  newSpan.classList.add(className);

  return newSpan;
}

// Функция создания дополнительного свойска myID для последующего удаления любого элемента с помощью этого свойства
let index = 0;
function createMyID(element) {
  element.myID = index;
  index++;
  return element.myID;
}

// Создание строки для таблицы
function createTableTr(element) {
  // Создаем элементы строки
  let newTr = document.createElement("tr");
  let idTd = document.createElement("td");
  idTd.classList.add("id-td");
  let fioTd = document.createElement("td");
  fioTd.classList.add("fio-td");
  let createDateAndTimeTd = document.createElement("td");
  createDateAndTimeTd.classList.add("create-date-td");
  let updateTd = document.createElement("td");
  updateTd.classList.add("update-td");
  let contactsTd = document.createElement("td");
  contactsTd.classList.add("contact-td");
  let controlTd = document.createElement("td");
  controlTd.classList.add("control-td");

  // Присваивание классов
  idTd.classList.add("td-id");

  // Наполняем каждую ячейку
  idTd.textContent = element.id;
  fioTd.textContent = element.fio;

  // Получение отображения даты и времени создания и последнего обновления
  let startDateAndTime = new Date(element.createdAt);
  let update = new Date(element.updatedAt);

  let createTime = createSpan(getTime(startDateAndTime), "span-time");
  createDateAndTimeTd.textContent = `${getDate(startDateAndTime)}  `;
  createDateAndTimeTd.append(createTime);

  let updateTime = createSpan(getTime(update), "span-time");
  updateTd.textContent = `${getDate(update)}  `;
  updateTd.append(updateTime);

  // Ячейка контактов
  let contactDiv = document.createElement("div");
  contactDiv.classList.add("contact-div", "contact-icon-box");
  if (element.contacts.length == 0) {
    let span = document.createElement("span");
    span.textContent = "Нет контактов";
    contactDiv.append(span);
  } else {
    for (const contact of element.contacts) {
      let div = document.createElement("div");
      div.classList.add("tippy");
      div.setAttribute("id", contact.value);
      div.setAttribute(
        "data-tippy-content",
        `${contact.type}: ${contact.value}`
      );
      if (contact.type === "Телефон") {
        div.classList.add("contact-tel", "contact-icon");
      }
      if (contact.type === "Доп.телефон") {
        div.classList.add("contact-extraTel", "contact-icon");
      }
      if (contact.type === "Email") {
        div.classList.add("contact-email", "contact-icon");
      }
      if (contact.type === "Facebook") {
        div.classList.add("contact-fb", "contact-icon");
      }
      if (contact.type === "Vk") {
        div.classList.add("contact-vk", "contact-icon");
      }
      contactDiv.append(div);
    }
  }
  contactsTd.append(contactDiv);

  // Наполнение ячейки с кнопками
  let editBtn = document.createElement("button");
  editBtn.classList.add("td-btn", "td-btn-edit");
  editBtn.textContent = "Изменить";

  let removeBtn = document.createElement("button");
  removeBtn.classList.add("td-btn", "td-btn-remove");
  removeBtn.textContent = "Удалить";

  editBtn.addEventListener("click", function () {
    console.log(element.contacts);

    // При нажатии на кнопку изменить создаётся новоё модальное окно
    // Занавеска модального окна
    let modalBackground = document.createElement("div");
    modalBackground.classList.add("modal-back-edit");

    // Само окно
    let modalBoxEdit = document.createElement("div");
    modalBoxEdit.classList.add("modal-box-edit");

    // Функция для изменения некоторых свойств для красивого плавного поялвния
    // и вызов её с небольшой задержкой
    function changeProp() {
      modalBackground.style.opacity = "1";
      modalBoxEdit.style.transform = "scale(1)";
    }

    setTimeout(changeProp, 10);

    // Элементы модального окна
    // Шапка мадального окна
    let modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-box__header");
    let modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-box__title");
    let elId = createSpan(`ID: ${element.id}`, "id-span");
    modalTitle.textContent = `Изменить данные  `;
    modalTitle.append(elId);
    let modalEditCrestBtn = document.createElement("button");
    modalEditCrestBtn.classList.add("modal-box__crest-btn");
    modalEditCrestBtn.addEventListener("click", function () {
      modalBackground.style.opacity = "0";
      modalBoxEdit.style.transform = "scale(0)";

      function removeEditModal() {
        modalBackground.remove();
      }

      setTimeout(removeEditModal, 500);

      // Скидываю счетчик
      contactIndex = 0;
    });
    modalHeader.append(modalTitle, modalEditCrestBtn);

    // Создание области с инпутами ввода данных ФИО
    let inputBox = document.createElement("div");
    inputBox.classList.add("input-box");

    function createINput(className, labelText, atr) {
      let inputDiv = document.createElement("div");
      inputDiv.classList.add("form-floating");
      let input = document.createElement("input");
      input.type = "text";
      input.classList.add(`edit-input-${className}`, "form-control");
      input.id = `edit-input-${className}`;
      input.value = atr;
      let label = document.createElement("label");
      label.for = `edit-input-${className}`;
      inputDiv.append(input, label);
      label.textContent = labelText;
      return inputDiv;
    }

    // Блок контактов
    // Переменная для подсчета котактов
    let editIndex = 0;
    let contactDiv = document.createElement("div");
    contactDiv.classList.add("add-contact-box");
    // Отображение уже сохраненных контактов
    for (let i = 0; i < element.contacts.length; i++) {
      let box = document.createElement("div");
      box.id = `edit-contact-box${i}`;
      box.classList.add("contact-box");
      let select = document.createElement("select");
      select.id = `edit-contact-select${i}`;
      select.classList.add("contact-select");
      let optionTel = document.createElement("option");
      optionTel.value = "Телефон";
      optionTel.textContent = "Телефон";
      let optionExtraTel = document.createElement("option");
      optionExtraTel.value = "Доп.телефон";
      optionExtraTel.textContent = "Доп.телефон";
      let optionEmail = document.createElement("option");
      optionEmail.value = "Email";
      optionEmail.textContent = "Email";
      let optionVk = document.createElement("option");
      optionVk.value = "Vk";
      optionVk.textContent = "Vk";
      let optionFacebook = document.createElement("option");
      optionFacebook.value = "Facebook";
      optionFacebook.textContent = "Facebook";
      select.append(
        optionTel,
        optionExtraTel,
        optionEmail,
        optionVk,
        optionFacebook
      );
      select.value = element.contacts[i].type;
      let input = document.createElement("input");
      input.id = `edit-contact-input${i}`;
      input.classList.add("contact-input");
      input.value = element.contacts[i].value;

      let btnRemove = document.createElement("btn");
      btnRemove.classList.add("contact-remove-btn");
      btnRemove.addEventListener("click", function () {
        box.remove();
      });
      contactDiv.prepend(box);
      box.append(select, input, btnRemove);
    }

    let editAddContactBtn = document.createElement("button");
    editAddContactBtn.classList.add("modal-box__add-btn");
    editAddContactBtn.textContent = "Добавить контакт";
    editAddContactBtn.addEventListener("click", function () {
      contactDiv.prepend(createContactForm());
      console.log(contactIndex);
    });

    contactDiv.append(editAddContactBtn);

    // Создание блока с кнопка
    let boxDiv = document.createElement("div");
    boxDiv.classList.add("btn-box");
    let editSaveBtn = document.createElement("button");
    editSaveBtn.classList.add("modal-box__save-btn");
    editSaveBtn.textContent = "Сохранить";
    editSaveBtn.addEventListener("click", async function () {
      let editSurnameInp = document.getElementById(`edit-input-surname`);
      let editNameINp = document.getElementById("edit-input-name");
      let editLastnameInp = document.getElementById("edit-input-lastName");
      let editClient = {
        surname: editSurnameInp.value,
        name: editNameINp.value,
        lastName: editLastnameInp.value,
        contacts: [],
      };
      // Цикл для переноса контактов что и были
      // или их же, но с изменениями
      for (let i = 0; i < element.contacts.length; i++) {
        let select = document.getElementById(`edit-contact-select${i}`);
        if (select == null) {
          continue;
        }
        let input = document.getElementById(`edit-contact-input${i}`);

        editClient.contacts.push({
          type: select.value,
          value: input.value,
        });
      }
      // Цикл добавления новых контактов
      for (let i = 0; i < contactIndex; i++) {
        let select = document.getElementById(`contact-select${i}`);
        if (select == null) {
          continue;
        }
        let input = document.getElementById(`contact-input${i}`);

        editClient.contacts.push({
          type: select.value,
          value: input.value,
        });
      }
      console.log(editClient);

      // Отправление данных измененных на сервер
      let editServerCLient = await serverPatchClient(element.id, editClient);
      clientsList[element.myID] = editServerCLient;
      // console.log(editServerCLient);
      render(clientsList);

      // Закрытие модального окна
      modalBackground.style.opacity = "0";
      modalBoxEdit.style.transform = "scale(0)";

      function removeEditModal() {
        modalBackground.remove();
      }
      setTimeout(removeEditModal, 500);

      // Скидываю счетчик
      contactIndex = 0;
    });
    let editDeleteClientBtn = document.createElement("button");
    editDeleteClientBtn.classList.add("modal-box__close-btn");
    editDeleteClientBtn.textContent = "Удалить клиента";
    editDeleteClientBtn.addEventListener("click", async function () {
      await serverDeleteClient(element.id);
      clientsList.splice(element.myID, 1);
      newTr.remove();
      render(clientsList);

      modalBackground.style.opacity = "0";
      modalBoxEdit.style.transform = "scale(0)";

      function removeEditModal() {
        modalBackground.remove();
      }
      setTimeout(removeEditModal, 500);

      // Скидываю счетчик
      contactIndex = 0;
    });

    boxDiv.append(editSaveBtn, editDeleteClientBtn);

    modalBoxEdit.append(
      // Шапка
      modalHeader,
      // Блок с инпутами
      inputBox,
      createINput("surname", "Фамилия*", element.surname),
      createINput("name", "Имя*", element.name),
      createINput("lastName", "Отчество*", element.lastName),
      // Блок контактов
      contactDiv,
      // Блок с кнопками
      boxDiv
    );
    modalBackground.append(modalBoxEdit);
    document.body.append(modalBackground);
  });

  // removeBtn.addEventListener("click", async function () {
  //   await serverDeleteClient(element.id);
  //   clientsList.splice(element.myID, 1);
  //   newTr.remove();
  //   render(clientsList);
  // });

  // Удаление клиента через появляющееся окошка с удалением
  removeBtn.onclick = function () {
    // При нажатии на кнопку изменить создаётся новоё модальное окно
    // Занавеска модального окна
    let removeModalBackground = document.createElement("div");
    removeModalBackground.classList.add("modal-back-edit");

    // Само окно
    let removeModalBoxEdit = document.createElement("div");
    removeModalBoxEdit.classList.add("remove-modal-box-edit", "modal-box-edit");

    // Функция для изменения некоторых свойств для красивого плавного поялвния
    // и вызов её с небольшой задержкой
    function changeProp() {
      removeModalBackground.style.opacity = "1";
      removeModalBoxEdit.style.transform = "scale(1)";
    }

    setTimeout(changeProp, 10);

    // Наполнение окошка удаления
    let removeCrestBtn = document.createElement("button");
    removeCrestBtn.classList.add("remove-crest__btn");

    removeCrestBtn.onclick = function () {
      removeModalBackground.style.opacity = "0";
      removeModalBoxEdit.style.transform = "scale(0)";

      function removeEditModal() {
        removeModalBackground.remove();
      }

      setTimeout(removeEditModal, 500);
    };

    let removeTitle = document.createElement("h2");
    removeTitle.classList.add("remove-box__title");
    removeTitle.textContent = "Удалить клиента";

    let removeDescr = document.createElement("p");
    removeDescr.classList.add("remove-box__descr");
    removeDescr.textContent = `Вы действительно хотите удалить данного клиента`;

    let removeBtnBox = document.createElement("div");
    removeBtnBox.classList.add("remove-btn__box");

    let fullRemoveBtn = document.createElement("button");
    fullRemoveBtn.classList.add("remove-btn");
    fullRemoveBtn.textContent = "Удалить";

    fullRemoveBtn.onclick = async function () {
      await serverDeleteClient(element.id);
      clientsList.splice(element.myID, 1);
      newTr.remove();
      render(clientsList);

      removeModalBackground.style.opacity = "0";
      removeModalBoxEdit.style.transform = "scale(0)";

      function removeEditModal() {
        removeModalBackground.remove();
      }

      setTimeout(removeEditModal, 500);
    };

    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.textContent = "Отмена";

    cancelBtn.onclick = function () {
      removeModalBackground.style.opacity = "0";
      removeModalBoxEdit.style.transform = "scale(0)";

      function removeEditModal() {
        removeModalBackground.remove();
      }

      setTimeout(removeEditModal, 500);
    };

    removeBtnBox.append(fullRemoveBtn, cancelBtn);

    removeModalBoxEdit.append(
      removeCrestBtn,
      removeTitle,
      removeDescr,
      removeBtnBox
    );

    removeModalBackground.append(removeModalBoxEdit);
    document.body.append(removeModalBackground);
  };

  controlTd.append(editBtn, removeBtn);

  // Добавление всех ячеек в строку
  newTr.append(
    idTd,
    fioTd,
    createDateAndTimeTd,
    updateTd,
    contactsTd,
    controlTd
  );

  // Возвращаем готовую строку
  return newTr;
}

// Для сортировки
// Нахлжджение нужных элементов
let thID = document.getElementById("th-id");
let thIdImg = document.getElementById("th-img-id");
let thFIO = document.getElementById("th-fio");
let thFioImg = document.getElementById("th-img-fio");
let thCreate = document.getElementById("th-create");
let thCreateImg = document.getElementById("th-img-create");
let thChange = document.getElementById("th-change");
let thChangeImg = document.getElementById("th-img-change");

// Добавление доп переменных для сортировки
let sortColumnFlag = "id";
let sortDirFlag = true;

// Добавление событий
thID.addEventListener("click", function () {
  // sortDirFlag = true ID будут по возрастанию
  sortColumnFlag = "id";
  sortDirFlag = !sortDirFlag;
  console.log(sortDirFlag);

  // Манипуляции с основной стрелкой
  if (sortDirFlag === true && thIdImg.classList.contains("th-img--turn")) {
    thIdImg.classList.remove("th-img--turn");
  } else if (
    sortDirFlag === false &&
    !thIdImg.classList.contains("th-img--turn")
  ) {
    thIdImg.classList.add("th-img--turn");
  }

  // Возврат остальных стрелок в положение вниз
  thFioImg.classList.remove("th-img--turn");
  thCreateImg.classList.remove("th-img--turn");
  thChangeImg.classList.remove("th-img--turn");

  // Добавление цвета текста графе в фокусе и удаление цвета у других
  thID.classList.add("main-table__th-id--active");
  thCreate.classList.remove("main-table__th-id--active");
  thChange.classList.remove("main-table__th-id--active");
  thFIO.classList.remove("main-table__th-fio--active");

  render(clientsList);
});

thFIO.addEventListener("click", function () {
  // sortDirFlag = true от А к Я
  sortColumnFlag = "fio";
  sortDirFlag = !sortDirFlag;
  console.log(sortDirFlag);

  // Манипуляции с основной стрелкой стрелкой
  if (sortDirFlag === true && thFioImg.classList.contains("th-img--turn")) {
    thFioImg.classList.remove("th-img--turn");
  } else if (
    sortDirFlag === false &&
    !thFioImg.classList.contains("th-img--turn")
  ) {
    thFioImg.classList.add("th-img--turn");
  }

  // Возврат остальных стрелок в положение вниз
  thIdImg.classList.add("th-img--turn");
  thCreateImg.classList.remove("th-img--turn");
  thChangeImg.classList.remove("th-img--turn");

  // Добавление цвета текста графе в фокусе и удаление цвета у других
  thFIO.classList.add("main-table__th-fio--active");
  thID.classList.remove("main-table__th-id--active");
  thCreate.classList.remove("main-table__th-id--active");
  thChange.classList.remove("main-table__th-id--active");

  render(clientsList);
});

thCreate.addEventListener("click", function () {
  // sortDirFlag = true от ранних к поздним
  sortColumnFlag = "startLife";
  sortDirFlag = !sortDirFlag;
  console.log(sortDirFlag);

  // Манипуляции с основной стрелкой стрелкой
  if (sortDirFlag === true && thCreateImg.classList.contains("th-img--turn")) {
    thCreateImg.classList.remove("th-img--turn");
  } else if (
    sortDirFlag === false &&
    !thCreateImg.classList.contains("th-img--turn")
  ) {
    thCreateImg.classList.add("th-img--turn");
  }

  // Возврат остальных стрелок в положение вниз
  thIdImg.classList.add("th-img--turn");
  thFioImg.classList.remove("th-img--turn");
  thChangeImg.classList.remove("th-img--turn");

  // Добавление цвета текста графе в фокусе и удаление цвета у других
  thCreate.classList.add("main-table__th-id--active");
  thID.classList.remove("main-table__th-id--active");
  thChange.classList.remove("main-table__th-id--active");
  thFIO.classList.remove("main-table__th-fio--active");

  render(clientsList);
});

thChange.addEventListener("click", function () {
  // sortDirFlag = true от ранних к поздним
  sortColumnFlag = "updateLife";
  sortDirFlag = !sortDirFlag;

  console.log(sortDirFlag);

  // Манипуляции с основной стрелкой стрелкой
  if (sortDirFlag === true && thChangeImg.classList.contains("th-img--turn")) {
    thChangeImg.classList.remove("th-img--turn");
  } else if (
    sortDirFlag === false &&
    !thChangeImg.classList.contains("th-img--turn")
  ) {
    thChangeImg.classList.add("th-img--turn");
  }

  // Возврат остальных стрелок в положение вниз
  thIdImg.classList.add("th-img--turn");
  thFioImg.classList.remove("th-img--turn");
  thCreateImg.classList.remove("th-img--turn");

  // Добавление цвета текста графе в фокусе и удаление цвета у других
  thChange.classList.add("main-table__th-id--active");
  thID.classList.remove("main-table__th-id--active");
  thCreate.classList.remove("main-table__th-id--active");
  thFIO.classList.remove("main-table__th-fio--active");

  render(clientsList);
});

// Запрос из шапки
// Вывод полученного ответа от сервера
let headerInput = document.getElementById("header-input");
let time;
async function searchRequest() {
  if (headerInput.value == "") {
    render(clientsList);
  } else {
    clearTimeout(time);
    time = setTimeout(async () => {
      console.log(headerInput.value);
      // console.log(await serverSearchClient(headerInput.value));
      let serverAnswer = await serverSearchClient(headerInput.value)
      console.log('Ответ сервера');
      console.log(serverAnswer);
      if (serverAnswer) {
        render(serverAnswer)
      }

    }, 500);
  }
}

headerInput.addEventListener("input", searchRequest);

async function render(array) {
  console.log("start render");
  // Получение данных если были изменения где-либо
  // let serverData = await serverGetClients()
  // if (serverData) {
  //     clientsList = serverData
  // }

  index = 0;
  // Очистка тела таблицы перед каждой отрисовкой
  tbody.innerHTML = "";
  // Копирование основного массива
  let copyListArr = [...array];

  // Добавление нужных доп свойств в объект
  for (const element of copyListArr) {
    element.fio = `${element.surname} ${element.name} ${element.lastName}`;
    element.myID = createMyID(element);
    element.startLife = new Date(element.createdAt).getTime();
    element.updateLife = new Date(element.updatedAt).getTime();
  }

  // Сортировка
  copyListArr = copyListArr.sort(function (a, b) {
    let sort = a[sortColumnFlag] < b[sortColumnFlag];

    if (sortDirFlag == false) {
      sort = a[sortColumnFlag] > b[sortColumnFlag];
    }

    if (sort == true) {
      return -1;
    }
  });

  // Отрисовка
  for (const element of copyListArr) {
    let newTr = createTableTr(element);

    tbody.append(newTr);
  }

  tippy(".tippy", {
    arrow: true,
    allowHTML: true,
    interactive: true,
  });

  console.log(copyListArr);
  console.log("end render");
}

render(clientsList);
