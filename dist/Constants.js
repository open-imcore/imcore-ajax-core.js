"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatItemType = exports.IMService = void 0;
var IMService;
(function (IMService) {
    IMService["iMessage"] = "iMessage";
    IMService["iMessageBiz"] = "iMessageBiz";
    IMService["SMS"] = "SMS";
    IMService["FaceTime"] = "FaceTime";
    IMService["Phone"] = "Phone";
})(IMService = exports.IMService || (exports.IMService = {}));
var ChatItemType;
(function (ChatItemType) {
    ChatItemType["date"] = "date";
    ChatItemType["sender"] = "sender";
    ChatItemType["participantChange"] = "participantChange";
    ChatItemType["attachment"] = "attachment";
    ChatItemType["status"] = "status";
    ChatItemType["groupAction"] = "groupAction";
    ChatItemType["plugin"] = "plugin";
    ChatItemType["text"] = "text";
    ChatItemType["acknowledgment"] = "acknowledgment";
    ChatItemType["associated"] = "associated";
    ChatItemType["message"] = "message";
    ChatItemType["phantom"] = "phantom";
    ChatItemType["groupTitle"] = "groupTitle";
    ChatItemType["typing"] = "typing";
    ChatItemType["sticker"] = "sticker";
})(ChatItemType = exports.ChatItemType || (exports.ChatItemType = {}));
//# sourceMappingURL=Constants.js.map