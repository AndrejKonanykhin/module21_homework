// Задание 4
// создадим функцию генерации случайного числа в диапазоне min - max
function getRandomNumber_1(min, max) {
  // сгенерируем случайное число
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  // создадим promise, где с задержкой в 3 секунды обработаем результат генерации
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomNumber % 2 === 0) {
        // если случайное число четное
        resolve(
          `Функция 1. Завершено успешно. Сгенерированное число — ${randomNumber}`
        );
      } else {
        // если случайное число нечетное
        reject(
          `Функция 1. Завершено с ошибкой. Сгенерированное число — ${randomNumber}`
        );
      }
    }, 3000);
  });

  myPromise
    // выведем результаты в консоль
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

// другой вариант решения, где случайное число генерируется с задержкой в 3 секунды,
// а результат обрабатывается сразу после генерации
function getRandomNumber_2(min, max) {
  // создадим promise
  const myPromise = new Promise((resolve, reject) => {
    // установим таймер
    setTimeout(() => {
      // сгенерируем случайное число
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      // проверим четное или нечетное число получили
      if (randomNumber % 2 === 0) {
        resolve(
          `Функция 2. Завершено успешно. Сгенерированное число — ${randomNumber}`
        );
      } else {
        reject(
          `Функция 2. Завершено с ошибкой. Сгенерированное число — ${randomNumber}`
        );
      }
    }, 3000);
  });

  myPromise
    // выведем результаты в консоль
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

// запуск функций
getRandomNumber_1(1, 100);
getRandomNumber_2(1, 100);

// в голову пришел третий вариант без функции, числа 1 и 100 вписаны в сам promise,
// так как в задании уже строго задан этот диапазон
const myPromise = new Promise((resolve, reject) => {
  // установим таймер
  setTimeout(() => {
    // сгенерируем случайное число
    let randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    // проверим четное или нечетное число получили
    if (randomNumber % 2 === 0) {
      resolve(`Завершено успешно. Сгенерированное число — ${randomNumber}`);
    } else {
      reject(`Завершено с ошибкой. Сгенерированное число — ${randomNumber}`);
    }
  }, 3000);
});

myPromise
  // выведем результаты в консоль
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// третий вариант решения больше подходит под условие задачи
