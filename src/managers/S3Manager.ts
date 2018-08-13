import {MessageManager} from "./MessageManager";

export class S3Manager extends MessageManager {

    constructor() {
        super('');
    }

    public uploadImage(image, destination, fileName): void {

        const imageParams = {
            Key: destination + '/' +fileName,
            Body: image.buffer.toString('base64'),
            ACL: 'public-read'
        };

        this.publish(imageParams).then(() => {

        }, ()=> {

        });
    }

    public async handleMessage(message) {

        message.Body = new Buffer(message.Body, 'base64');
    }
}