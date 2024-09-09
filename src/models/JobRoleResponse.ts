import { Capability } from "../enums/Capability";
import { JobBand } from "../enums/JobBand";
import { Location } from "../enums/Location";

export interface JobRoleResponse {
    roleId: number;
    roleName: string;
    locations: Location;
    capability: Capability;
    band: JobBand;
    closingDate: Date;
    formattedLocations: string;
}