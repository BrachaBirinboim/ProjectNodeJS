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
            this.service.add(req.body);
        })
    }
}