// import RequestService from "../Requests/service";
// import { HelpRequest, Volenteer } from "../types";



// export default class VolenteerService {
//     private volenteerList: Array<Volenteer>;

//     constructor(private requestList:RequestService){
//         this.volenteerList = [
//             { _id: 124, name: "Shani Margalit", city: 'Jerusalem', email: "s@gmail.com" , phone: "0528985658"},
//             {  _id: 111, name: "Gad Levi", city: 'Ashdod', email: "G47@gmail.com" , phone: "0545458547"}
//         ];
//     }

//     public GetAllVolenteers(): Array<Volenteer>{
//         return this.volenteerList;
//     }

//     public GetVolenteerById(id: number) {
//         return this.volenteerList.find(volenteer => volenteer._id === id);
//     }

//     public add(volenteer: Volenteer): void {
//         this.volenteerList.push(volenteer);
//     }

//     public delete(id: number): void {
//         this.volenteerList = this.volenteerList.filter(volenteer => volenteer._id!== id);
//     }

//     public update(volenteer: Volenteer) {
//         const index = this.volenteerList.findIndex(v => v._id === volenteer._id);
//         this.volenteerList[index] = volenteer;
//         return volenteer;
//     }

//     public volenteering(requestId: number, volenteerId: number) {
//         let req = this.requestList.GetVRequestsById(requestId);
//         console.log(req)
//         if (req) {
//             req.volunteerId = volenteerId;
//             req.status = "in progress";
//         }
//         console.log(req)
//         return req;
//     }
//     public finishedvolenteer(requestId: number) {
//         let req = this.requestList.GetVRequestsById(requestId);
        
//         if (req) {
          
//             req.status = "closed";
//         }
    
//         return req;
//     }
// }


import Volenteers, { IVolunteer } from '../Models/Volenteer';
import HelpRequest, { IHelpRequest } from '../Models/helpRequest';
     
export default class VolunteerService {
  public async GetAllVolunteers(): Promise<IVolunteer[]> {
    return await Volenteers.find();
  }

  public async GetVolunteerById(id: number): Promise<IVolunteer | null> {
    return await Volenteers.findById(id);
  }

  public async add(volunteer: IVolunteer): Promise<void> {
    const newVolunteer = new Volenteers(volunteer);
    await newVolunteer.save();
  }

  public async delete(id: number): Promise<void> {
    await Volenteers.findByIdAndDelete(id);
  }

  public async update(volunteer: IVolunteer): Promise<IVolunteer | null> {
    return await Volenteers.findByIdAndUpdate(volunteer._id, volunteer, { new: true });
  }

  public async volunteering(requestId: number, volunteerId: number): Promise<IHelpRequest | null> {
    const request = await HelpRequest.findOne({ "id": requestId });
    if (request) {
      request.volunteerId = volunteerId;
      request.status = 'in progress';
      await request.save();
    }
    return request;
  }

  public async finishedVolunteer(requestId: number): Promise<IHelpRequest | null> {
    const request = await HelpRequest.findOne({ "id": requestId });
    if (request) {
      request.status = 'closed';
      await request.save();
    }
    return request;
  }
}