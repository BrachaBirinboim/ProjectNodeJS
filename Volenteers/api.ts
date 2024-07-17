// import { Request, Response, Router } from "express"
// import VolenteerService from "./service";
// import mongoose from "mongoose";

// export default class VolenteerApi {
//     public router: Router;

//     constructor(private service: VolenteerService){
//         this.router = Router();
//     }

//     public setRoutes(){
//         this.router.get("/", (req: Request, res: Response) => {
//             res.send(this.service.GetAllVolenteers());
//         });

//         this.router.get("/:id", (req: Request, res: Response) => {
//             const volenteerId = parseInt(req.params.id);
//             res.send(this.service.GetVolenteerById(volenteerId));
//         });

//         this.router.post("/", (req: Request, res: Response) => {
//             this.service.add(req.body);
//         });
        
//         this.router.delete("/:id", (req: Request, res: Response) => {
//             const volenteerId = parseInt(req.params.id)
//             this.service.delete(volenteerId);
//         });

//         this.router.put('/', (req: Request, res: Response) => {
//             this.service.update(req.body);
//         });
        
//         this.router.put("/volunteer-for-request", (req: Request, res: Response) => {
//             const requestId: number = Number(req.query.requestId);
//             console.log(requestId);
//             const volunteerId: number = Number(req.query.volunteerId);
//             console.log(volunteerId);
//             // בצע את הפעולה של התנדבות לבקשה
//             res.send(this.service.volenteering(requestId, volunteerId));
//         });
//         this.router.put("/volunteer-finished", (req: Request, res: Response) => {
//             const requestId: number = Number(req.query.requestId);
           
//             // בצע את הפעולה של התנדבות לבקשה
//             res.send(this.service.finishedvolenteer(requestId));
//         });
//     }
// }



import { Request, Response, Router } from 'express';
import VolunteerService from './service';

export default class VolunteerApi {
  public router: Router;

  constructor(private service: VolunteerService) {
    this.router = Router();
    this.setRoutes();
  }

  public setRoutes() {
    this.router.get('/', async (req: Request, res: Response) => {
      const volunteers = await this.service.GetAllVolunteers();
      res.send(volunteers);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      const volunteerId = parseInt(req.params.id);
      const volunteer = await this.service.GetVolunteerById(volunteerId);
      res.send(volunteer);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      await this.service.add(req.body);
      res.send({ message: 'Volunteer added successfully' });
    });

    this.router.delete('/:id', async (req: Request, res: Response) => {
      const volunteerId = parseInt(req.params.id);
      await this.service.delete(volunteerId);
      res.send({ message: 'Volunteer deleted successfully' });
    });

    this.router.put('/', async (req: Request, res: Response) => {
      const updatedVolunteer = await this.service.update(req.body);
      res.send(updatedVolunteer);
    });

    this.router.put('/volunteerforrequest', async (req: Request, res: Response) => {
      const requestId: number = Number(req.query.requestId);
      const volunteerId: number = Number(req.query.volunteerId);
      const updatedRequest = await this.service.volunteering(requestId, volunteerId);
      res.send(updatedRequest);
    });

    this.router.put('/volunteer-finished', async (req: Request, res: Response) => {
      const requestId: number = Number(req.query.requestId);
      const updatedRequest = await this.service.finishedVolunteer(requestId);
      res.send(updatedRequest);
    });
  }
}
