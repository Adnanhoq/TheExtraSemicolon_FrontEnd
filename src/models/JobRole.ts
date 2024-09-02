import { Capability } from "../enums/Capability";
import { JobBand } from "../enums/JobBand";
import { Location } from "../enums/Location";

export type JobRole = {
    roleId: number,
    roleName: string,
    description: string,
    responsibilities: string,
    locations: Location,
    linkToJobSpec: string,
    capability: Capability,
    band: JobBand,
    closingDate: Date,
    status: boolean,
    positionsAvailable: number
}
