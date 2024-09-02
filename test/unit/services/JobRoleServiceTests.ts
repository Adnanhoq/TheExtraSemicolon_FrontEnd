import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getJobRoles, URL } from '../../../src/services/JobRoleService';
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


const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getAllJobRoles', function () {
      it('should return all Job Roles from response', async () => {
        const data = [jobRoleResponse];

        mock.onGet(URL).reply(200, data);

        const results = await getJobRoles();

        results[0].closingDate = new Date(results[0].closingDate);

        expect(results[0]).to.deep.equal(jobRoleResponse);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL).reply(500);

        try {
          await getJobRoles();
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('Cannot find Server');
          } else {
              console.error('Unexpected error', e);
          }
          return;
      }
      })
      it('should throw exception when 404 error returned from axios', async () => {
        mock.onGet(URL).reply(404);

        try {
          await getJobRoles();
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