"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkSearchContacts = exports.bulkSearchMessages = exports.bulkSearchAttachments = exports.bulkSearchChats = exports.searchContacts = exports.searchMessages = exports.searchAttachments = exports.searchChats = exports.contactPhoto = exports.contact = exports.contacts = exports.handleBlock = exports.handleBlocks = exports.handles = exports.bulkChatPluginMessage = exports.bulkChatMessage = exports.chatPluginMessage = exports.chatMessages = exports.chatParticipants = exports.chatName = exports.chatProperties = exports.chatJoin = exports.chatRead = exports.chatTyping = exports.chat = exports.chats = exports.message = exports.associatedMessages = exports.messages = exports.attachment = exports.attachments = exports.resource = void 0;
exports.resource = function (identifier) { return "/resources/" + identifier; };
/** Attachments */
exports.attachments = "/attachments";
/** Specific Attachment */
exports.attachment = function (attachmentID) { return exports.attachments + "/" + attachmentID; };
/** Messages */
exports.messages = "/messages";
/** Tapback */
exports.associatedMessages = exports.messages + "/associated";
/** Specific Message */
exports.message = function (messageID) { return exports.messages + "/" + messageID; };
/** Chats */
exports.chats = "/chats";
exports.chat = function (chatID) { return exports.chats + "/" + chatID; };
/** Specific Chat */
exports.chatTyping = function (chatID) { return exports.chat(chatID) + "/typing"; };
exports.chatRead = function (chatID) { return exports.chat(chatID) + "/read"; };
exports.chatJoin = function (chatID) { return exports.chat(chatID) + "/join"; };
exports.chatProperties = function (chatID) { return exports.chat(chatID) + "/properties"; };
exports.chatName = function (chatID) { return exports.chat(chatID) + "/name"; };
exports.chatParticipants = function (chatID) { return exports.chat(chatID) + "/participants"; };
/** Chat Messages */
exports.chatMessages = function (chatID) { return exports.chat(chatID) + "/messages"; };
exports.chatPluginMessage = function (chatID) { return exports.chatMessages(chatID) + "/plugin"; };
/** Chat Bulk Messages */
exports.bulkChatMessage = exports.chats + "/bulk/message";
exports.bulkChatPluginMessage = exports.chats + "/bulk/plugin";
/** Handles */
exports.handles = "/handles";
exports.handleBlocks = exports.handles + "/blocked";
exports.handleBlock = function (handleID) { return exports.handleBlocks + "/" + handleID; };
/** Contacts */
exports.contacts = "/contacts";
exports.contact = function (contactID) { return exports.contacts + "/" + contactID; };
exports.contactPhoto = function (contactID) { return exports.contact(contactID) + "/photo"; };
/** Search */
exports.searchChats = exports.chats + "/search";
exports.searchAttachments = exports.attachments + "/search";
exports.searchMessages = exports.messages + "/search";
exports.searchContacts = exports.contacts + "/search";
/** Bulk Search */
exports.bulkSearchChats = exports.searchChats + "/bulk";
exports.bulkSearchAttachments = exports.searchAttachments + "/bulk";
exports.bulkSearchMessages = exports.searchMessages + "/bulk";
exports.bulkSearchContacts = exports.searchContacts + "/bulk";
//# sourceMappingURL=endpoints.js.map