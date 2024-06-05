import express from 'express';
import VolenteerService from './Volenteers/service';
import VolenteerApi from './Volenteers/api';

const HOST = "localhost";

const PORT = 6060;

const app = express();

app.use(express.json());

const volenteerService = new VolenteerService();
const volenteerApi = new VolenteerApi(volenteerService);
volenteerApi.setRoutes();

const requestService = new VolenteerService();
const requestApi = new VolenteerApi(requestService);
requestApi.setRoutes();

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
})