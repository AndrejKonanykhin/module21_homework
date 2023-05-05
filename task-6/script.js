// Задание 6

// получим поле ввода страницы
const number = document.querySelector('#inputNumber');

// получим поле ввода лимита
const limit = document.querySelector('#inputLimit');

// получим поле кнопку
const button = document.querySelector('#button');

// получим div для вывода ошибок ввода или запроса
const output = document.querySelector('#resultHTML');

// получим спиcок для вывода результата запроса
const list = document.querySelector('#taskList');

// функция проверки поля ввода на число и диапазон от 1 до 10
function checkInput(input) {
  let flag;
  // если данные в поле ввода не являются числом и не попадают в диапазон
  // присваиваем флагу значение false, иначе true
  if (isNaN(parseInt(input.value, 10))) {
    flag = false;
  } else if (input.value < 1) {
    flag = false;
  } else if (input.value > 10) {
    flag = false;
  } else {
    flag = true;
  }
  return flag;
}

// функция, которая возвращаем fetch с подставленными в запрос числами из полей ввода
const useRequest = (num, lim) => {
  return (
    fetch(`https://picsum.photos/v2/list?page=${num}&limit=${lim}`)
      // получаем и обрабатываем json
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json;
      })
      .catch(() => {
        // в случае ошибки запроса, выводим сообщение об ошибке
        output.classList.add('visible');
        output.innerHTML = `
        <p class="warning">
        Ошибка запроса
        </p>
        `;
      })
  );
};

// функция отображения картинок из запроса
const displayData = (arr) => {
  // отображаем список
  list.classList.add('flex-visible');
  //очищаем список от изображений предыдущего запроса
  list.innerHTML = '';

  // обработаем каждый элемент входящего массива данных
  arr.forEach(item => {
    let listLi = document.createElement('li');
    listLi.innerHTML = `
        <img
          src="${item.download_url}"
        >
    `;
    list.appendChild(listLi);
  });

// также можно использовать цикл for из предыдущей задачи
//   for (let i = 0; i < arr.length; i++) {
//     let listLi = document.createElement('li');
//     // обратимся к объекту с изображением по индексу
//     let currentObject = arr.at(i);
//     // получим url изображения
//     let itemUrl = currentObject.url;
//     // сделаем вывод текущего изображения
//     listLi.innerHTML = `<img src="${itemUrl}">`;
//     // создадим элемент списка с изображением
//     list.appendChild(listLi);
//   }
};

// установим обработчик на кнопку запроса
button.addEventListener('click', async () => {
  // проверим на наличие ошибок в полях ввода с помощью checkInput
  // в случае ошибок выводим сообщение
  // ранее выведенные уведомления удаляем
  if (!checkInput(number)) {
    // проверка на число и диапазон для поля число
    output.classList.add('visible');
    output.innerHTML = '';
    output.innerHTML = `
          <p class="warning">
          Номер страницы вне диапазона от 1 до 10
          </p>
          `;
    list.innerHTML = '';
  }
  if (!checkInput(limit)) {
    // проверка на число и диапазон для поля лимит
    output.classList.add('visible');
    output.innerHTML = '';
    output.innerHTML = `
          <p class="warning">
          Лимит вне диапазона от 1 до 10
          </p>
          `;
    list.innerHTML = '';
  }
  if (!checkInput(number) && !checkInput(limit)) {
    // проверка на число и диапазон обоих полей
    output.classList.add('visible');
    output.innerHTML = '';
    output.innerHTML = `
          <p class="warning">
          Номер страницы и лимит вне диапазона от 1 до 10
          </p>
          `;
    list.innerHTML = '';
  }
  // если ошибок ввода нет, отправлям запрос с заданными параметрами, запуская функцию useRequest
  if (checkInput(number) && checkInput(limit)) {
    output.innerHTML = '';
    // используем await, чтобы дождаться результата запроса перед началом отрисовки карточек
    const requestResult = await useRequest(number.value, limit.value);
    // сохраним результат нового запроса в хранилище
    localStorage.setItem('images', JSON.stringify(requestResult));
    // отрисуем карточки
    displayData(requestResult);
  }
});

// вариант, когда пользователь ничего не ввел в инпуты, но при предыдущем посещении это проделывал
// при загрузке страницы проверим наличие ключа images в хранилище
document.addEventListener('DOMContentLoaded', () => {
    // проверим наличие ключа images
    const images = localStorage.getItem('images');
    // если ключ найден, то отрисуем изображения по url из хранилища
    if (images) {
        output.classList.add('visible');
          output.innerHTML = `
          <h4>
          С возвращением! В прошлый раз вы запрашивали:
          </h4>
          `;
        displayData(JSON.parse(images));
    }
});


// кнопка принудительной очистки хранилища
const cleanButton = document.querySelector('#cleaning');
cleanButton.addEventListener('click', () => localStorage.removeItem('images'));