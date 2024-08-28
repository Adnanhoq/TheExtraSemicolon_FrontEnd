import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getJobRoles, URL } from '../../../src/services/JobRoleService';
import { JobRole } from "../../../src/models/JobRole";


const jobRoleResponse: JobRoleResponse = {
  roleId: 1,
  roleName: "Technical Architect",
  locations: "Birmingham",
  capability: "Engineering",
  band: "Manager",
  closingDate: new Date()
}

const getJobRoleByIdResponse: JobRole = {
  roleId: 1,
  roleName: "Technical Architect",
  description: "Test description for the role",
  linkToJobSpec: "examplelink.co.uk",
  responsibilities: "One, two, three, ninety-nine",
  locations: "Birmingham",
  capability: "Engineering",
  band: "Manager",
  closingDate: new Date() 
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
        } catch (e) {
          expect(e.message).to.equal('Failed to get job roles');
          return;
        }
      })
    })

    describe('getJobRoleById', function () {
      it('should return a job role with all fields given an id', async () => {
        const data = [jobRoleResponse];

        mock.onGet(URL).reply(200, data);

        const results = await getJobRoles();

        results[0].closingDate = new Date(results[0].closingDate);
      
        expect(results[0]).to.deep.equal(jobRoleResponse);
      })
    })

});