import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    // TODO: Make this typesafe
    const location = context.req.body;

    context.log(location.lat);
    context.log(location.lng);

    // TODO: Post the location to signalR


    
};

export default httpTrigger;
