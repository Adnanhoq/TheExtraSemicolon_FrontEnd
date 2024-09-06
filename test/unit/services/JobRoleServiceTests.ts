import config from "../../../src/config";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRoleResponseWrapper } from "../../../src/models/JobRoleResponseWrapper";
import { getJobRoleById, getJobRoles } from '../../../src/services/JobRoleService';
import { JobRole } from "../../../src/models/JobRole";
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
        const data = jobRoleResponseWrapper;
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=10`).reply(200, data);

        const results = await getJobRoles(1,10, token);
        const { jobRoles, pagination } = results;


        jobRoles[0].closingDate = new Date(jobRoles[0].closingDate);

        expect(results).to.deep.equal(jobRoleResponseWrapper);
      })
      it('should return all Job Roles from response', async () => {
        const data = jobRoleResponseWrapper;
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=25`).reply(200, data);

        const results = await getJobRoles(1,25, token);
        const { jobRoles, pagination } = results;

        jobRoles[0].closingDate = new Date(jobRoles[0].closingDate);

        expect(results).to.deep.equal(jobRoleResponseWrapper);
      })
      it('should return all Job Roles from response', async () => {
        const data = jobRoleResponseWrapper;
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=50`).reply(200, data);

        const results = await getJobRoles(1,50, token);
        const { jobRoles, pagination } = results;

        jobRoles[0].closingDate = new Date(jobRoles[0].closingDate);

        expect(results).to.deep.equal(jobRoleResponseWrapper);
      })
      it('should return all Job Roles from response', async () => {
        const data = jobRoleResponseWrapper;
        const token: string = 'token';
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=100`).reply(200, data);

        const results = await getJobRoles(1,100, token);
        const { jobRoles, pagination } = results;

        jobRoles[0].closingDate = new Date(jobRoles[0].closingDate);

        expect(results).to.deep.equal(jobRoleResponseWrapper);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=10`).reply(500);
        const token: string = 'token';

        try {
          await getJobRoles(1,10, token);
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('Server Error');
          } else {
              console.error('Unexpected error', e);
          }
          return;
      }
      })
      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=25`).reply(500);
        const token: string = 'token';
        try {
          await getJobRoles(1,25, token);
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('Server Error');
          } else {
              console.error('Unexpected error', e);
          }
          return;
      }
      })
      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=50`).reply(500);
        const token: string = 'token';
        try {
          await getJobRoles(1,50, token);
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('Server Error');
          } else {
              console.error('Unexpected error', e);
          }
          return;
      }
      })
      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=100`).reply(500);
        const token: string = 'token';
        try {
          await getJobRoles(1,100, token );
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
        const token: string = 'token';
        try {
          await getJobRoles(1,10, token);
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('No job roles open');
          } else {
              console.error('Unexpected error', e);
          }
          return;
      }
      })
      it('should throw exception when 404 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=25`).reply(404);
        const token: string = 'token';
        try {
          await getJobRoles(1,25, token);
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('No job roles open');
          } else {
              console.error('Unexpected error', e);
          }
          return;
      }
      })
      it('should throw exception when 404 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=50`).reply(404);
        const token: string = 'token';
        try {
          await getJobRoles(1,50, token);
      } catch (e: unknown) {
          if (e instanceof Error) {
              expect(e.message).to.equal('No job roles open');
          } else {
              console.error('Unexpected error', e);
          }
          return;
      }
      })
      it('should throw exception when 404 error returned from axios', async () => {
        mock.onGet(`${config.API_URL}job-roles?page=1&limit=100`).reply(404);
        const token: string = 'token';
        try {
          await getJobRoles(1,100, token);
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