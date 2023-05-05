// Задание 2
// запишем в константу заданную строку
const stringJson = '{"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}';

// преобразуем ее в объект
const objectFromJson = JSON.parse(stringJson);

// преобразуем полученный объект обратно в строку и выведем в консоль
const jsonFromObject = JSON.stringify(objectFromJson);
console.log('Полученная строка', jsonFromObject);

// сравним исходную и полученную из объекта строки
console.log('Сравнение исходной и полученной строк: ', stringJson === jsonFromObject); // true