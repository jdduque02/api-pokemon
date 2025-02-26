const app = require('./app');

const { PORT, VERSION } = process.env;
// on listen in port server
app.listen(PORT, () => {
    console.log(`\nServer running in http://localhost:${PORT}/api/v${VERSION}/ \n`);
})