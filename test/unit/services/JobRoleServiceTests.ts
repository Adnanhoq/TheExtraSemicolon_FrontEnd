import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getJobRoleById, getJobRoles, URL } from '../../../src/services/JobRoleService';
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
              expect(e.message).to.equal('No job roles are open');
          } else {
              // Handle unexpected error types
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
              expect(e.message).to.equal('No job roles are open');
          } else {
              // Handle unexpected error types
              console.error('Unexpected error', e);
          }
          return;
      }
      })
    })

    describe('getJobRoleById', function () {
      it('should return a job role with all fields given an id', async () => {
        const data = getJobRoleByIdResponse;
        

        mock.onGet(URL + '5').reply(200, data);

        const results = await getJobRoleById('5');
        

        results.closingDate = new Date(results.closingDate);
      
        expect(results).to.deep.equal(getJobRoleByIdResponse);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL + '5').reply(500);

        try {
          await getJobRoleById('5');
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Role');
          return;
        }
      })

      it('should throw exception when 404 error returned from axios', async () => {
        mock.onGet(URL + '555555').reply(404);

        try {
          await getJobRoleById('555555');
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Role');
          return;
        }
      })

    })

});