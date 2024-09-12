import sinon from 'sinon';
import { expect } from 'chai';
import * as JobRoleService from "../../../src/services/JobRoleService";
import * as JobRoleController from "../../../src/controllers/JobRoleController";
import { JobRole } from '../../../src/models/JobRole';
import { Location } from '../../../src/enums/Location';
import { Capability } from '../../../src/enums/Capability';
import { JobBand } from '../../../src/enums/JobBand';

declare module "express-session" {
    interface SessionData {
        token: string;
    }
}

describe('JobRoleController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getAllJobRoles', function () {
        it('should show Job Roles', async () => {
            const req = { 
                session: { token: 'test' },
                query: { page: '1', limit: '10' }
            };
            const res = { render: sinon.spy(), locals: { role: 0 } };
            const pagination = {
                total: 100,
                limit: 10,
                page: 1,
                pages: 10
            };

            sinon.stub(JobRoleService, 'getJobRoles').resolves({ jobRoles: [], pagination });

            await JobRoleController.getAllJobRoles(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('jobRoles.njk')).to.be.true;
        });
    });

    describe('getSingleJobRole', function () {
        it('should show single Job Role Description', async () => {
            const req = { 
                params: { id: '1' },
                session: { token: 'test' }
            };
            const res = { render: sinon.spy(), locals: { role: 0 } };
            const jobRole: JobRole = {
                roleId: 1,
                roleName: 'Software Engineer',
                description: 'Responsible for developing software solutions.',
                responsibilities: 'Develop, test, and maintain software applications.',
                locations: Location.London,
                linkToJobSpec: 'http://example.com/job-spec',
                capability: Capability.Engineering,
                band: JobBand.Apprentice,
                closingDate: new Date(),
                status: true,
                positionsAvailable: 5
            };
    
            sinon.stub(JobRoleService, 'getJobRoleById').resolves(jobRole);
    
            await JobRoleController.getSingleJobRole(req as any, res as any);
    
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('jobRoleDetail.njk')).to.be.true;
        });
    });
    

    describe('downloadJobRolesReport', function () {
        it('should download Job Role Report', async () => {
            const req = { 
                session: { token: 'test' }
            };
            const res = { 
                setHeader: sinon.spy(),
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            sinon.stub(JobRoleService, 'getReportOfJobRoles').resolves(Buffer.from('csv,data'));

            await JobRoleController.downloadJobRolesReport(req as any, res as any);

            expect(res.setHeader.calledTwice).to.be.true;
            expect(res.send.calledOnce).to.be.true;
        });
    });
});
