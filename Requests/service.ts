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