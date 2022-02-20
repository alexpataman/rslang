export const authorName = '';
export const authorLink = '';

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
    + при перезагрузке страницы открывается последняя открытая страница приложения  
`;

export const myScore = 90;
export const maxScore = 620;
export const resultScore = 0;
