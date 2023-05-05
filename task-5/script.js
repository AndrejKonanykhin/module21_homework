// Задание 5

// получим поле ввода
const input = document.querySelector('#input');

// получим кнопку
const button = document.querySelector('#button');

// получим div для вывода ошибок ввода или запроса
const output = document.querySelector('#resultHTML');

// получим спиcок для вывода результата запроса
const list = document.querySelector('#taskList');

// проверка поля ввода на число, не допускаем ввода чего-то кроме числа
input.addEventListener('input', () => {
  if (isNaN(parseInt(input.value, 10))) {
    // если не число очищаем поле
    input.value = '';
  } else {
    // если число - оставлям как есть
    input.value = input.value;
  }
});

// функция создания элементов списка с задачами
const displayData = (arr) => {
  list.innerHTML = ''; //очищаем список от задач предыдущего запроса

  // обработаем каждый элемент входящего массива данных
  for (let i = 0; i < arr.length; i++) {
    let listLi = document.createElement("li");
    // обратимся к объекту с задачей по индексу
    let currentObject = arr.at(i);
    // получим тескст задачи
    let itemName = currentObject.title;
    // получим флаг выполнения
    let itemFlag = currentObject.completed;
    // сделаем вывод задачи
    if (itemFlag) {
      // вывод как есть, если задача актуальна
      listLi.innerHTML = `<span>${itemName}</span>`;
    } else {
      // вывод в зачеркнутом виде, если задача выполнена
      listLi.innerHTML = `<del>${itemName}</del>`;
    }
    // создадим элемент списка с текущей задачей
    list.appendChild(listLi);
  }
};

// повесим обработчик на кнопку
button.addEventListener("click", () => {
  // если введено число, отправляем запрос, подставив в него число из инпута
  if (input.value) {
    fetch(`https://jsonplaceholder.typicode.com/users/${input.value}/todos`)
      .then((response) => {
        // получаем результат запроса
        const result = response.json();
        return result;
      })
      // обрабатываем полученный объект, в данном случае массив задач
      .then((data) => {
        // если массив пуст, выводим сообщение об ошибке
        if (data.length === 0) {
          output.classList.add('visible');
          output.innerHTML = `
          <p class="warning">
          Пользователь с указанным ID не найден
          </p>
          `;
          list.innerHTML = '';
        } else {
          // если список задач получен, показываем div с заголовком
          output.classList.add('visible');
          output.innerHTML = `
          <h4>
          Для ID ${input.value} получен следующий список задач:
          </h4>
          `;
          // выводим список задач
          displayData(data);
        }
      })
      .catch(() => {
        // в случае ошибки запроса, выводим сообщение об ошибке
        output.classList.add('visible');
        output.innerHTML = `
          <p class="warning">
          Ошибка запроса
          </p>
          `;
        list.innerHTML = '';
      });
  } else {
    // если на кнопку нажали, но поле ввода пустое, покажем сообщение
    output.classList.add('visible');
    output.innerHTML = `
      <p class="warning">
      Нужно ввести число
      </p>
       `;
    list.innerHTML = '';
  }
});
