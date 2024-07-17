// import { HelpRequest } from "../types";


// export default class RequestService{
//     private requestList: Array<HelpRequest>;

//     constructor(){
//         this.requestList = [
//             { _id: 1, title: 'Request 1', description: 'cleaning', location: 'jerusalem', status: 'open', priority: 'high', volunteerId: 0 },
//             { _id: 2, title: 'Request 2', description: 'laundry', location: 'Bnei Brak', status: 'closed', priority: 'low', volunteerId: 124 },
//             { _id: 3, title: 'Request 3', description: 'shopping', location: 'Ashdod', status: 'open', priority: 'medium', volunteerId: 0 }
//         ];
//     }

//     public GetAllRequests(): Array<HelpRequest>{
//         return this.requestList;
//     }
//     public GetUnAnsweredRequests(filters: any): Array<HelpRequest> {
//         // סנן את כל הבקשות שטרם קיבלו תגובה על ידי מתנדב
//         let arr: Array<HelpRequest> = this.requestList.filter(req => req.status === "open");
    
//         // אם יש פילטר לפי מיקום, סנן את המערך לפי המיקום
//         if (filters.location) {
//             arr = arr.filter(req => req.location === filters.location);
//         }
    
//         // אם יש פילטר לפי עדיפות, סנן את המערך לפי העדיפות
//         if (filters.priority) {
//             arr = arr.filter(req => req.priority === filters.priority);
//         }
    
//         return arr;
//     }

    
    
//     public GetVRequestsById(id: number) {
//         return this.requestList.find(request => request._id === id);
//     }

//     public add(request: HelpRequest): void {
     
//         request.status = "open";
//         request.volunteerId = 0;
//         this.requestList.push(request);
//     }

//     public delete(id: number): void {
//         this.requestList = this.requestList.filter(request => request._id!== id);
//     }

//     public update(request: HelpRequest) {
//         const index = this.requestList.findIndex(r => r._id === request._id);
//         this.requestList[index] = request;
//         return request;
//     }
// }

import HelpRequestModel, { IHelpRequest } from '../Models/helpRequest';

export default class RequestService {
  public async GetAllRequests(): Promise<IHelpRequest[]> {
    return await HelpRequestModel.find();
  }

  public async GetUnAnsweredRequests(filters: any): Promise<IHelpRequest[]> {
    const query: any = { status: 'open' };
    if (filters.location) query.location = filters.location;
    if (filters.priority) query.priority = filters.priority;
    return await HelpRequestModel.find(query);
  }

  public async GetVRequestsById(id: number): Promise<IHelpRequest | null> {
    return await HelpRequestModel.findById(id);
  }

  public async add(request: IHelpRequest): Promise<void> {
    const newRequest = new HelpRequestModel(request);
    await newRequest.save();
  }

  public async delete(id: number): Promise<void> {
    await HelpRequestModel.findByIdAndDelete(id);
  }

  public async update(request: IHelpRequest): Promise<IHelpRequest | null> {
    return await HelpRequestModel.findByIdAndUpdate(request._id, request, { new: true });
  }
}