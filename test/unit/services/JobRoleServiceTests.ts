import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getJobRoles, JOBROLEURL } from '../../../src/services/JobRoleService';


const jobRoleResponse: JobRoleResponse = {
    roleId: 1,
    roleName: "Technical Architect",
    locations: "Birmingham",
    capability: "Engineering",
    band: "Manager",
    closingDate: new Date(1580782960)
}


const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getAllJobRoles', function () {
      it('should return all Job Roles from response', async () => {
        const data = [jobRoleResponse];

        mock.onGet(JOBROLEURL).reply(200, data);

        const results = await getJobRoles();

        results[0].closingDate = new Date(results[0].closingDate);

        expect(results[0]).to.deep.equal(jobRoleResponse);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(JOBROLEURL).reply(500);

        try {
          await getJobRoles();
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('Failed to get job roles');
          } else {
              // Handle unexpected error types
              console.error('Unexpected error', e);
          }
          return;
      }
      })
    })
});