import { Volenteer } from "../types";


export default class VolenteerService {
    private volenteerList: Array<Volenteer>;

    constructor(){
        this.volenteerList = new Array<Volenteer>();
    }

    public GetAllVolenteers(): Array<Volenteer>{
        return this.volenteerList;
    }

    public GetVolenteerById(id: number) {
        return this.volenteerList.find(volenteer => volenteer._id === id);
    }

    public add(volenteer: Volenteer): void {
        this.volenteerList.push(volenteer);
    }

    public delete(id: number): void {
        this.volenteerList = this.volenteerList.filter(volenteer => volenteer._id!== id);
    }

    public update(volenteer: Volenteer) {
        const index = this.volenteerList.findIndex(v => v._id === volenteer._id);
        this.volenteerList[index] = volenteer;
        return volenteer;
    }
}