// Задание 1
// запишем в константу данный XML
const xmlString = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`;

// Создание экземпляра класса DOMParser, чтобы парсить XML
const parser = new DOMParser();

// парсим XML
const xmlDOM = parser.parseFromString(xmlString, 'text/xml');

// производим поиск узлов с нужной информацией в полученном документе
const studentName = xmlDOM.querySelectorAll('name');
const studentFirstName = xmlDOM.querySelectorAll('first');
const studentSecondName = xmlDOM.querySelectorAll('second');
const studentAge = xmlDOM.querySelectorAll('age');
const studentProf = xmlDOM.querySelectorAll('prof');
const langAttrEn = studentName[0].getAttribute('lang');
const langAttrRu = studentName[1].getAttribute('lang');

// записываем данные в объект и выводим в консоль
const result = {
  list: [
    {
      name: studentFirstName[0].textContent + ' ' + studentSecondName[0].textContent,
      age: Number(studentAge[0].textContent),
      prof: studentProf[0].textContent,
      lang: langAttrEn,
    },
    {
      name: studentFirstName[1].textContent + ' ' + studentSecondName[1].textContent,
      age: Number(studentAge[1].textContent),
      prof: studentProf[1].textContent,
      lang: langAttrRu,
    },
  ],
};

console.log('Полученный объект:\n', result);