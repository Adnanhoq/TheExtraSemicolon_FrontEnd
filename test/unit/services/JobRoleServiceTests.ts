import config from "../../../src/config";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRoleResponseWrapper } from "../../../src/models/JobRoleResponseWrapper";
import { getJobRoles } from '../../../src/services/JobRoleService';
import { Location } from "../../../src/enums/Location";
import { Capability } from "../../../src/enums/Capability";
import { JobBand } from "../../../src/enums/JobBand";


const jobRoleResponseWrapper: JobRoleResponseWrapper = {
    jobRoles: [
      {
        roleId: 1,
        roleName: 'Technical Architect',
        locations: Location.Birmingham,
        capability: Capability.Engineering,
        band: JobBand.Apprentice,
        closingDate: new Date('1970-01-19T07:06:22.960Z'),
        formattedLocations: 'Birmingham'
      }
    ],
    pagination: {
        total: 10,
        limit: 10,
        page: 1,
        pages: 2
    }
  };


let mock: MockAdapter;

describe('JobRoleService', function () {
    this.beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    describe('getAllJobRoles', function () {
      it('should return all Job Roles from response', async () => {
        const data = jobRoleResponseWrapper;

        mock.onGet(`${config.API_URL}job-roles?page=1&limit=10`).reply(200, data);

        const results = await getJobRoles(1,10);
        const { jobRoles, pagination } = results;

        jobRoles[0].closingDate = new Date(jobRoles[0].closingDate);
        console.log("here");
        console.log(results);

        expect(results).to.deep.equal(jobRoleResponseWrapper);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=10`).reply(500);

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
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=10`).reply(404);

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