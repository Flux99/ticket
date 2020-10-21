import Queue from "bull";
import {ExpirationCompletedPublisher} from "../events/publishers/expiration-complete-publisher";
import {natsWrapper} from "../nats-wrapper";
interface Payload{
    orderId: string;
}
const queueExpiration = new Queue<Payload>("dfgdg",{
    redis:{
        host:process.env.REDIS_HOST
    }
});

queueExpiration.process(async (job)=>{
    console.log("I want to ",job.data.orderId);
    new ExpirationCompletedPublisher(natsWrapper.client).publish({
        orderId: job.data.orderId,
    })
});
export{queueExpiration};