import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // TODO: Make this typesafe
    const location = context.req.body;
    console.log("location pushed", location);

    // TODO: Post the location to signalR

    context.bindings.signalRMessages = [
        {
            "target": "newLocation",
            "arguments": [ location ]
        }
    ];

    // TODO: Post to storage
    
};

export default httpTrigger;
