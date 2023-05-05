// Задание 3
// запросим данные из localStorage
const welcomeKey = localStorage.getItem('welcomeKey');

// напишем функцию получения и форматирования текущей даты
let visitDate = () => {
  // получим дату первого посещения в виде строки, время отрежем
  let date = new Date().toLocaleString().split(',')[0];

  // получим время первого посещения в виде строки, дату и секунды отрежем
  let time = new Date().toLocaleString().split(',')[1].slice(0, -3);

  // вернем время в формате дд.мм.гггг в чч:мм
  return date + ' в' + time;
};
if (!welcomeKey) {
  // если в localStorage запрошенный ключ отсутствует, создадим его
  // сначала запросим имя посетителя
  let userName = prompt(
    'Добро пожаловать! Назовите, пожалуйста, ваше имя',
    'Иван'
  );

  // запишем имя посетителя и время захода на сайт в объект
  let user = {
    name: userName,
    time: visitDate(),
  };

  // преобразуем объект в строку JSON
  let userJson = JSON.stringify(user);

  // и запишем в localStorage
  localStorage.setItem('welcomeKey', userJson);
} else {
  // если ключ посетителя найден в хранилище, преобразуем строку из хранилища в объект
  user = JSON.parse(welcomeKey);

  // выведем приветствие
  alert(
    `Добрый день, ${user['name']}! Давно не виделись. В последний раз вы были у нас ${user['time']}`
  );

  // перезапишем дату посещения
  user["time"] = visitDate();

  // преобразуем объект обратно в строку JSON
  userJson = JSON.stringify(user);

  // перезапишем данные для ключа welcomeKey, предварительно удалив старые
  localStorage.setItem('welcomeKey', userJson);
}

// кнопка принудительной очистки хранилища
const cleanButton = document.querySelector('#cleaning');
cleanButton.addEventListener('click', () => localStorage.removeItem('welcomeKey'));
