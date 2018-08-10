"use strict";
exports.__esModule = true;
/**
 * Create Server
 */
var server_1 = require("./server");
server_1.Server.initializeApp().then(function () {
    console.log(("  App is running at http://localhost:%d in %s mode"), server_1.Server.app.get("port"), server_1.Server.app.get("env"));
})["catch"](function (err) {
    console.error(err);
});
