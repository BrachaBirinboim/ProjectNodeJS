import { HelpRequest } from "../types";


export default class RequestService{
    private requestList: Array<HelpRequest>;

    constructor(){
        this.requestList = new Array<HelpRequest>();
    }

    public GetAllRequests(): Array<HelpRequest>{
        return this.requestList;
    }

    public GetVRequestsById(id: number) {
        return this.requestList.find(request => request._id === id);
    }

    public add(request: HelpRequest): void {
        this.requestList.push(request);
    }

    public delete(id: number): void {
        this.requestList = this.requestList.filter(request => request._id!== id);
    }

    public update(request: HelpRequest) {
        const index = this.requestList.findIndex(r => r._id === request._id);
        this.requestList[index] = request;
        return request;
    }
}