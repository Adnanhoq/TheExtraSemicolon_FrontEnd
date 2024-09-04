import config from "../../../src/config";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getJobRoles } from '../../../src/services/JobRoleService';
import { Location } from "../../../src/enums/Location";
import { Capability } from "../../../src/enums/Capability";
import { JobBand } from "../../../src/enums/JobBand";


const jobRoleResponse: JobRoleResponse = {
    roleId: 1,
    roleName: "Technical Architect",
    locations: Location.Birmingham,
    capability: Capability.Engineering,
    band: JobBand.Manager,
    closingDate: new Date(1580782960),
    formattedLocations: "Birmingham"
}


let mock: MockAdapter;

describe('JobRoleService', function () {
    this.beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    describe('getAllJobRoles', function () {
      it('should return all Job Roles from response', async () => {
        const data = [jobRoleResponse];

        mock.onGet(`${config.API_URL}job-roles?page=1&limit=10`).reply(200, data);

        const results = await getJobRoles(1,10);

        results[0].jobRoles = new Date(results[0].closingDate);

        expect(results[0]).to.deep.equal(jobRoleResponse);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles`).reply(500);

        try {
          await getJobRoles(1,10);
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('Server Error');
          } else {
              console.error('Unexpected error', e);
          }
          return;
      }
      })
      it('should throw exception when 404 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles`).reply(404);

        try {
          await getJobRoles(1,10);
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('No job roles open');
          } else {
              console.error('Unexpected error', e);
          }
          return;
      }
      })
    })
});