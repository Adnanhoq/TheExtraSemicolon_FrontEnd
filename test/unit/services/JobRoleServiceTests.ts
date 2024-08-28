import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getJobRoles, URL } from '../../../src/services/JobRoleService';


const jobRoleRequest: JobRoleResponse = {
    roleId: 1,
    roleName: "Technical Architect",
    locations: "Birmingham",
    capability: "Engineering",
    band: "Manager",
    closingDate: new Date(1990, 4, 7).toISOString
}


const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getAllJobRoles', function () {
      it('should return all Job Roles from response', async () => {
        const data = [jobRoleRequest];

        mock.onGet(URL).reply(200, data);

        const results = await getJobRoles();

        expect(results[0]).to.deep.equal(jobRoleRequest);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL).reply(500);

        try {
          await getJobRoles();
        } catch (e) {
          expect(e.message).to.equal('Failed to get job roles');
          return;
        }
      })
    })
});