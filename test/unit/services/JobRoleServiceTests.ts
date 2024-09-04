import config from "../../../src/config";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getJobRoleById, getJobRoles } from '../../../src/services/JobRoleService';
import { JobRole } from "../../../src/models/JobRole";
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

const getJobRoleByIdResponse: JobRole = {
  roleId: 5,
  roleName: "Technical Architect",
  description: "Test description for the role",
  linkToJobSpec: "examplelink.co.uk",
  responsibilities: "One, two, three, ninety-nine",
  locations: Location.Birmingham,
  capability: Capability.Engineering,
  band: JobBand.Manager,
  closingDate: new Date(),
  status: true,
  positionsAvailable: 1
}

let mock: MockAdapter;

describe('JobRoleService', function () {
    this.beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    describe('getAllJobRoles', function () {
      it('should return all Job Roles from response', async () => {
        const data = [jobRoleResponse];
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles`).reply(200, data);
        const results = await getJobRoles(token);


        results[0].closingDate = new Date(results[0].closingDate);
        expect(results[0]).to.deep.equal(jobRoleResponse);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles`).reply(500);

        try {
          await getJobRoles(token);
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
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles`).reply(404);

        try {
          await getJobRoles(token);
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

    describe('getJobRoleById', function () {
      it('should return a job role with all fields given an id', async () => {
        const data = getJobRoleByIdResponse;
        
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles/` + '5').reply(200, data);

        const results = await getJobRoleById('5', token);
        

        results.closingDate = new Date(results.closingDate);
      
        expect(results).to.deep.equal(getJobRoleByIdResponse);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles/` + '5').reply(500);

        try {
          await getJobRoleById('5', token);
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Role');
          return;
        }
      })

      it('should throw exception when 404 error returned from axios', async () => {
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles/` + '5').reply(404);

        try {
          await getJobRoleById('555555', token);
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Role');
          return;
        }
      })

    })

});