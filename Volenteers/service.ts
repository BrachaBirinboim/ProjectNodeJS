import RequestService from "../Requests/service";
import { HelpRequest, Volenteer } from "../types";



export default class VolenteerService {
    private volenteerList: Array<Volenteer>;

    constructor(private requestList:RequestService){
        this.volenteerList = [
            { _id: 124, name: "Shani Margalit", city: 'Jerusalem', email: "s@gmail.com" , phone: "0528985658"},
            {  _id: 111, name: "Gad Levi", city: 'Ashdod', email: "G47@gmail.com" , phone: "0545458547"}
        ];
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

    public volenteering(requestId: number, volenteerId: number) {
        let req = this.requestList.GetVRequestsById(requestId);
        console.log(req)
        if (req) {
            req.volunteerId = volenteerId;
            req.status = "in progress";
        }
        console.log(req)
        return req;
    }
    public finishedvolenteer(requestId: number) {
        let req = this.requestList.GetVRequestsById(requestId);
        
        if (req) {
          
            req.status = "closed";
        }
    
        return req;
    }
}