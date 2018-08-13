"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageError_1 = require("../errors/MessageError");
class MessageManager {
    constructor(queue) {
        this.queue = queue;
        this.subscribe().then(() => {
        }, () => {
        });
    }
    publish(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield MessageManager.connection.createChannel();
                channel.assertQueue(this.queue, {
                    // Ensure that the queue is not deleted when server restarts
                    durable: true
                }).then(() => {
                    channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(content)), {
                        // Store queued elements on disk
                        persistent: true,
                        contentType: 'application/json'
                    });
                    return true;
                }, (error) => {
                    throw error;
                });
            }
            catch (error) {
                throw new MessageError_1.MessageError(error.message);
            }
        });
    }
    subscribe() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield MessageManager.connection.createChannel();
                channel.assertQueue(this.queue, {
                    // Ensure that the queue is not deleted when server restarts
                    durable: true
                }).then(() => {
                    // Only request 1 unacked message from queue
                    // This value indicates how many messages we want to process in parallel
                    channel.prefetch(1);
                    channel.consume(this.queue, messageData => {
                        if (messageData === null) {
                            return;
                        }
                        // Decode message contents
                        const message = JSON.parse(messageData.content.toString());
                        this.handleMessage(message).then(() => {
                            return channel.ack(messageData);
                        }, () => {
                            return channel.nack(messageData);
                        });
                    });
                }, (error) => {
                    throw error;
                });
            }
            catch (error) {
                throw new MessageError_1.MessageError(error.message);
            }
        });
    }
}
exports.MessageManager = MessageManager;
//# sourceMappingURL=MessageManager.js.map