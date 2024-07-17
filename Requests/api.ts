// import { Request, Response, Router } from "express"
// import RequestService from "./service";

// export default class RequestApi {
//     public router: Router;

//     constructor(private service: RequestService){
//         this.router = Router();
//     }

//     public setRoutes(){
//         this.router.get("", (req: Request, res: Response) => {
//             res.send(this.service.GetAllRequests());
//         });

//         this.router.get("/help-requests", (req: Request, res: Response) => {
//             const filter = {
//                 location:req.query.location,
//                 priority:req.query.priority
//             }
//             res.send(this.service.GetUnAnsweredRequests(filter));
//         });

//         this.router.get("/:id", (req: Request, res: Response) => {
//             const requestId = parseInt(req.params.id);
//             res.send(this.service.GetVRequestsById(requestId));
//         });

//         this.router.post("/", (req: Request, res: Response) => {
//             this.service.add(req.body);
//         });

//         this.router.delete("/:id", (req: Request, res: Response) => {
//             const requestId = parseInt(req.params.id)
//             this.service.delete(requestId);
//         });

//         this.router.put('/', (req: Request, res: Response) => {
//             this.service.add(req.body);
//         })
//     }
// }

import { Request, Response, Router } from 'express';
import RequestService from './service';

export default class RequestApi {
  public router: Router;

  constructor(private service: RequestService) {
    this.router = Router();
    this.setRoutes();
  }

  public setRoutes() {
    this.router.get('', async (req: Request, res: Response) => {
      const requests = await this.service.GetAllRequests();
      res.send(requests);
    });

    this.router.get('/help-requests', async (req: Request, res: Response) => {
      const filter = {
        location: req.query.location,
        priority: req.query.priority
      };
      const requests = await this.service.GetUnAnsweredRequests(filter);
      res.send(requests);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      const requestId = parseInt(req.params.id);
      const request = await this.service.GetVRequestsById(requestId);
      res.send(request);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      await this.service.add(req.body);
      res.send({ message: 'Request added successfully' });
    });

    this.router.delete('/:id', async (req: Request, res: Response) => {
      const requestId = parseInt(req.params.id);
      await this.service.delete(requestId);
      res.send({ message: 'Request deleted successfully' });
    });

    this.router.put('/', async (req: Request, res: Response) => {
      const updatedRequest = await this.service.update(req.body);
      res.send(updatedRequest);
    });
  }
}
