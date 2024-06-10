import express from 'express';
import VolenteerService from './Volenteers/service';
import VolenteerApi from './Volenteers/api';
import RequestService from './Requests/service';
import RequestApi from './Requests/api';

const HOST = "localhost";

const PORT = 6000;

const app = express();

app.use(express.json());

const requestService = new RequestService();
const requestApi = new RequestApi(requestService);
requestApi.setRoutes();

const volenteerService = new VolenteerService(requestService);
const volenteerApi = new VolenteerApi(volenteerService);
volenteerApi.setRoutes();

app.use('/api/volenteers',volenteerApi.router)
app.use('/api/requests',requestApi.router)

app.listen(PORT, HOST, () => {

    console.log(`Running on http://${HOST}:${PORT}`);
})