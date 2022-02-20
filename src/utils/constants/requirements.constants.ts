export const authorName = 'Команда разработки:';
export const authorLink = '@alexpataman, @kxzws, @shpakitze';

export const taskTitle = 'RSLang';
export const taskLink =
  'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-2/rs-lang/rslang.md';

export const content = `
[+40] Главная страница приложения
  ✔️ вёрстка, дизайн, UI главной страницы приложения
  ✔️ главная страница приложения содержит:
    + меню с навигацией по учебнику, ссылками на мини-игры и статистику. Меню или иконка меню отображается на всех страницах приложения
    + описание возможностей и преимуществ приложения
    + раздел "О команде" с фото или аватарками и ссылками на гитхабы всех участников команды, описанием вклада в разработку приложения каждого из них. При желании данный раздел можно вынести в отдельную страницу
    + footer со ссылками на гитхабы авторов приложения, год создания приложения, логотип курса со ссылкой на курс. footer отображается на всех страницах приложения за исключением мини-игр

[+50] Авторизация
  ✔️ реализована авторизация и регистрация пользователя
  ✔️ при перезагрузке приложения данные о пользователе и полученный при авторизации токен сохраняются в localStorage
  ✔️ электронный учебник (без раздела "Сложные слова", без отображения прогресса изучения слов и изученных слов) и мини-игры доступны без авторизации
  ✔️ у авторизованных пользователей отображается раздел "Сложные слова", прогресс изучения слов, изученные слова и статистика
  ✔️ при логауте данные пользователя и токен удаляются из localStorage, а пользователь становится анонимным    

[+80] Электронный учебник
  ✔️ вёрстка, дизайн, UI страниц электронного учебника
  ✔️ электронный учебник генерируется на основе коллекции исходных данных и состоит из шести разделов, в каждом разделе 30 страниц, на каждой странице 20 слов для изучения
  ✔️ седьмой раздел учебника - "Сложные слова" изначально пустой. Этот раздел состоит из слов, которые пользователь отметил как сложные. Все слова в этом разделе размещаются на одной странице. На усмотрение разработчиков, слова в данный раздел добавляются либо в том порядке, в котором пользователь отмечал их как сложные, либо в порядке, в котором они находились в учебнике.
  ✔️ на каждой странице учебника отображается:
    + меню или иконка меню
    + список из 20 слов (в разделе "Сложные слова" слов может быть больше)
    + ссылки на мини-игры "Аудиовызов" и "Спринт"
    + навигация по страницам учебника
    + также необходимо реализовать навигацию по семи разделам учебника и предусмотреть небольшие различия в оформлении каждого раздела
      ==> в качестве "небольшого различия в оформлении каждого раздела" добавлены соответствующие иконки у заголовков.
    + при перезагрузке страницы открывается последняя открытая страница приложения  


[+80] Список слов
  ✔️ вёрстка, дизайн, UI списка слов
  ✔️ для каждого слова отображается:
    + само слово, транскрипция, перевод
    + предложение с объяснением значения слова, перевод предложения
    + предложение с примером использования изучаемого слова, перевод предложения
      ==> разворачивается по клику на иконку "спойлера"
    + картинка-ассоциация к изучаемому слову
    + иконка аудио, при клике по которой последовательно звучит произношение изучаемого слова, произношение предложения с объяснением его значения, произношение предложения с примером его использования
  ✔️ только у авторизированных пользователей отображаются:
    + кнопка, при клике по которой слово можно отметить как сложное (в разделе "Сложные слова" на её месте отображается кнопка, снимающая отметку что это сложное слово и удаляющая его из данного раздела)
    + кнопка, при клике по которой слово можно отметить как изученное
    + если слово отмечено как сложное, оно остаётся на странице учебника и выделяется стилем, указывающим, что данное слово относится к сложным словам. Также данное слово добавляется в раздел "Сложные слова"
    + если слово отмечено как изученное, оно остаётся на странице учебника и выделяется стилем, указывающим, что данное слово относится к изученным словам
      ==> изученные и сложные слова помечаются соответствующей цветной иконкой. Слова без этих статусов - с бесцветной иконкой
    + если все слова на странице относятся к изученным словам или к изученным и сложным словам, такая страница считается полностью изученной и выделяется стилем. Также стилем выделяется соответствующая ей кнопка навигации по страницам учебника. Ссылки на мини-игры на этой странице становятся неактивными.    
      ==> изученная страница помечается галочкой, также в пагинации подсвечивается другим цветом.

[+50] Прогресс изучения
  ✔️ новые слова - это слова, которые впервые использовались в мини-играх вне зависимости от того, открывались мини-игры на странице учебника или по ссылке в меню
  ✔️ возле каждого слова, которое использовалось в мини-играх, на странице учебника указывается прогресс его изучения за весь период: было ли слово правильно угадано в мини-играх, или пользователь ошибался      

[+60] Изученные слова
  ✔️ изученные слова, это слова, которые пользователь отметил как изученные на странице учебника
  ✔️ также слова считаются изученными по результатам их угадывания в мини-играх. Например, три правильные ответа подряд для обычных слов и пять правильных ответов подряд для сложных слов, либо другая логика на усмотрение разработчиков
  ✔️ если сложное слово стало изученным, оно перестаёт быть сложными и удаляется из раздела "Сложные слова"
  ? изученные слова не задействуются в мини-играх, которые запускаются на страницах учебника, но задействуются в мини-играх, которые открываются по ссылке в меню
  ✔️ если при угадывании изученного слова в мини-игре пользователь ошибся, слово удаляется из категории изученных  

[+60] Страница статистики
  ✔️ на странице статистики отображается краткосрочная статистика по мини-играм и по словам за каждый день изучения
  ✔️ в краткосрочной статистике по мини-играм указываются результаты по каждой мини-игре отдельно
    + количество новых слов за день
    + процент правильных ответов
    + самая длинная серия правильных ответов
  ✔️ в краткосрочной статистике по словам указываются
    + количество новых слов за день
    + количество изученных слов за день
    + процент правильных ответов за день  

[+67] Дополнительный функционал
  ✔️ долгосрочная статистика за весь период изучения в которой представлены два графика [+40]
    + график, отображающий количество новых слов за каждый день изучения
    + график, отображающий увеличение общего количества изученных слов за весь период обучения по дням
  ✔️ другой доп функционал [+27]:
    + графики в долгосрочной статистике по минииграм [+5]
    + расширенная информация по слову в игре "Аудиовызов" [+2]
    + валидация форм логина\регистрации пользователя [+10]
    + адаптивный дизайн всего предложения (корректное отображение как на мобильных так и десктоп разрешениях) [+10]

[?/100] Мини-игра "Аудиовызов"
  ? функционал полностью повторяет функционал одноимённых мини-игр приложения Lingualeo
  ? по окончанию каждой игры выводятся результаты мини-игры
  ? управлять игрой можно как мышкой, так и клавишами на клавиатуре, как это реализовано в оригинальных играх
  ? если мини-игра запускается из меню, в ней можно выбрать один из шести уровней сложности, которые отличаются тем, слова какого из шести раздлов коллекции исходных данных в ней задействованы
  ? если мини-игра запускается со страницы учебника, в ней используются слова из той страницы учебника, на которой размещена ссылка на игру. Если размещённых на странице слов для игры недостаточно, задействуются слова с предыдущих страниц. Если предыдущих страниц нет или недостаточно, игра завершается досрочно, когда закончатся все доступные слова

[?/100] Мини-игра "Спринт"
  ? функционал полностью повторяет функционал одноимённых мини-игр приложения Lingualeo
  ? по окончанию каждой игры выводятся результаты мини-игры
  ? управлять игрой можно как мышкой, так и клавишами на клавиатуре, как это реализовано в оригинальных играх
  ? если мини-игра запускается из меню, в ней можно выбрать один из шести уровней сложности, которые отличаются тем, слова какого из шести раздлов коллекции исходных данных в ней задействованы
  ? если мини-игра запускается со страницы учебника, в ней используются слова из той страницы учебника, на которой размещена ссылка на игру. Если размещённых на странице слов для игры недостаточно, задействуются слова с предыдущих страниц. Если предыдущих страниц нет или недостаточно, игра завершается досрочно, когда закончатся все доступные слова    

`;

export const myScore = 487;
export const maxScore = 620;
export const resultScore = myScore > maxScore ? maxScore : myScore;
