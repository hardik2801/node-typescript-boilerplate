"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create Server
 */
const server_1 = require("./server");
server_1.Server.initializeApp().then(() => {
    console.log(("  App is running at http://localhost:%d in %s mode"), server_1.Server.app.get("port"), server_1.Server.app.get("env"));
}).catch((err) => {
    console.error(err);
});
//# sourceMappingURL=app.js.map