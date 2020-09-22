import { IMService } from "../Constants";
export declare enum HandleFormat {
    email = "email",
    businessID = "businessID",
    phoneNumber = "phoneNumber",
    unknown = "unknown"
}
export interface HandleRepresentation {
    id: string;
    format: HandleFormat;
}
export interface IDSStatus {
    service: IMService;
    available: boolean;
}
export interface IDSStatuses {
    handle: string;
    services: IDSStatus[];
}
//# sourceMappingURL=handle.d.ts.map