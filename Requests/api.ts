import { Request, Response, Router } from "express"
import RequestService from "./service";

export default class RequestApi {
    public router: Router;

    constructor(private service: RequestService){
        this.router = Router();
    }

    public setRoutes(){
        this.router.get("", (req: Request, res: Response) => {
            res.send(this.service.GetAllRequests());
        });

        this.router.get("/help-requests", (req: Request, res: Response) => {
            const filter = {
                location:req.query.location,
                priority:req.query.priority
            }
            res.send(this.service.GetUnAnsweredRequests(filter));
        });

        this.router.get("/:id", (req: Request, res: Response) => {
            const requestId = parseInt(req.params.id);
            res.send(this.service.GetVRequestsById(requestId));
        });

        this.router.post("/", (req: Request, res: Response) => {
            this.service.add(req.body);
        });

        this.router.delete("/:id", (req: Request, res: Response) => {
            const requestId = parseInt(req.params.id)
            this.service.delete(requestId);
        });

        this.router.put('/', (req: Request, res: Response) => {
            this.service.add(req.body);
        })
    }
}