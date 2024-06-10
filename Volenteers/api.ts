import { Request, Response, Router } from "express"
import VolenteerService from "./service";

export default class VolenteerApi {
    public router: Router;

    constructor(private service: VolenteerService){
        this.router = Router();
    }

    public setRoutes(){
        this.router.get("/", (req: Request, res: Response) => {
            res.send(this.service.GetAllVolenteers());
        });

        this.router.get("/:id", (req: Request, res: Response) => {
            const volenteerId = parseInt(req.params.id);
            res.send(this.service.GetVolenteerById(volenteerId));
        });

        this.router.post("/", (req: Request, res: Response) => {
            this.service.add(req.body);
        });
        
        this.router.delete("/:id", (req: Request, res: Response) => {
            const volenteerId = parseInt(req.params.id)
            this.service.delete(volenteerId);
        });

        this.router.put('/', (req: Request, res: Response) => {
            this.service.update(req.body);
        });
        
        this.router.put("/volunteer-for-request", (req: Request, res: Response) => {
            const requestId: number = Number(req.query.requestId);
            console.log(requestId);
            const volunteerId: number = Number(req.query.volunteerId);
            console.log(volunteerId);
            // בצע את הפעולה של התנדבות לבקשה
            res.send(this.service.volenteering(requestId, volunteerId));
        });
        this.router.put("/volunteer-finished", (req: Request, res: Response) => {
            const requestId: number = Number(req.query.requestId);
           
            // בצע את הפעולה של התנדבות לבקשה
            res.send(this.service.finishedvolenteer(requestId));
        });
    }
}