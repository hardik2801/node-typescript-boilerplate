import {MessageManager} from "./MessageManager";

export class EmailManager extends MessageManager {

    constructor() {
        super('');
    }

    public sendMail(destinations: Array<string>, returnAddress: string, source: string, messageSubject: string, messageBody: string): void {
        const email = {
            Destination: {
                ToAddresses: destinations
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: messageBody
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: messageSubject
                }
            },
            ReturnPath: returnAddress,
            Source: source
        };

        this.publish(email).then(() => {
        }, ()=> {
        });
    }

    public async handleMessage(message) {

    }
}