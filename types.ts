export type Volenteer = {
    _id:number;
    name: string;
    city: string;
    email: string;
    phone: string;
}

export type HelpRequest = {
    _id: number;
    title: string;
    description: string;
    location: string;
    status: string;
    priority: string;
    volunteerId: number;
}


