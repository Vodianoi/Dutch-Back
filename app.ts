import express from 'express';
const app = express();
import router from './routes/gameRoutes';
app.use('/api',router);
app.get('/', (_req, res) => {
    res.status(200).send('Hello World!');
});

function start() {
    app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });
}

export {app, start};


