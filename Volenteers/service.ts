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