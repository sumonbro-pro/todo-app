const app = require('./app');
const {port} = require('./app/config/config');

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server running at http://localhost:${port}`);
    }
});