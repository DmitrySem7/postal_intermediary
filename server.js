let express = require('express');
let app = express();
// Установка механизма представления handlebars
const hbs = require('hbs');
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
hbs.registerHelper('json', function(context) {
    return new hbs.SafeString(JSON.stringify(context));
});
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'))
// пользовательская страница 404
app.get('/', function(req, res) {
    res.render('home');
});
app.get('/about', function(req, res){
    var randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});
// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// Обработчик ошибки 500 (промежуточное ПО)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

var fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
]


app.listen(3000, () => {
    console.log('Server started on port 3000');
});