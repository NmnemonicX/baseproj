# express-app

файл для ДЗ «2.6 База данных и хранение данных»
Запросы для MongoDB :

1. запрос для вставки данных минимум о двух книгах в коллекцию books
```
db.books.insertMany([
{ title: "Linux", description: "основные команды", authors: "Торвальдс" },
{ title: "Windows", description: "Книга рецептов", authors: "Гейтс" },
{ title: "OS/2", description: "Техническое описание", authors: "IBM" },
])
```

2. запрос для поиска полей документов коллекции books по полю title
```
db.books.find(
{title: "Linux"}
)
```
3. запрос для редактирования полей: description и authors коллекции books по _id записи
```
db.books.updateMany(
{ id: { $in: [1, 2, 3] } },
{
$set: { description: "Описание ОС", authors: "МЫ" }
}
)
```
