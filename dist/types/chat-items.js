"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceMode = exports.AcknowledgmentType = exports.TextPartType = void 0;
var Constants_1 = require("../Constants");
var TextPartType;
(function (TextPartType) {
    TextPartType["link"] = "link";
    TextPartType["calendar"] = "calendar";
    TextPartType["text"] = "text";
})(TextPartType = exports.TextPartType || (exports.TextPartType = {}));
var AcknowledgmentType;
(function (AcknowledgmentType) {
    AcknowledgmentType[AcknowledgmentType["heart"] = 2000] = "heart";
    AcknowledgmentType[AcknowledgmentType["thumbsup"] = 2001] = "thumbsup";
    AcknowledgmentType[AcknowledgmentType["thumsdown"] = 2002] = "thumsdown";
    AcknowledgmentType[AcknowledgmentType["ha"] = 2003] = "ha";
    AcknowledgmentType[AcknowledgmentType["exclamation"] = 2004] = "exclamation";
    AcknowledgmentType[AcknowledgmentType["questionmark"] = 2005] = "questionmark";
    AcknowledgmentType[AcknowledgmentType["removeHeart"] = 3000] = "removeHeart";
    AcknowledgmentType[AcknowledgmentType["removeThumbsup"] = 3001] = "removeThumbsup";
    AcknowledgmentType[AcknowledgmentType["removeThumbsdown"] = 3002] = "removeThumbsdown";
    AcknowledgmentType[AcknowledgmentType["removeHa"] = 3003] = "removeHa";
    AcknowledgmentType[AcknowledgmentType["removeExclamation"] = 3004] = "removeExclamation";
    AcknowledgmentType[AcknowledgmentType["removeQuestionmark"] = 3005] = "removeQuestionmark";
})(AcknowledgmentType = exports.AcknowledgmentType || (exports.AcknowledgmentType = {}));
var ResourceMode;
(function (ResourceMode) {
    ResourceMode["SocialUI"] = "SocialUI";
    ResourceMode["ChatKit"] = "ChatKit";
    ResourceMode["Local"] = "Local";
})(ResourceMode = exports.ResourceMode || (exports.ResourceMode = {}));
//# sourceMappingURL=chat-items.js.map