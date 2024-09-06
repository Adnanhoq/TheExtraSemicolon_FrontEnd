import { JobRoleResponse } from "./JobRoleResponse";
import { Pagination } from "./Pagination";

export interface JobRoleResponseWrapper {
    jobRoles: JobRoleResponse[];
    pagination: Pagination;
}