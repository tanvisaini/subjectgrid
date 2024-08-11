import { createMocks } from 'node-mocks-http';
import handler from '../api/subjects';
import { NextApiRequest, NextApiResponse } from 'next';
import { Subject } from '../../types/types';

describe('GET /api/subjects API Endpoint', () => {
    it('should return OK status and json data', async () => {
      const { req, res } : {req: NextApiRequest; res: NextApiResponse} = createMocks({
        method: 'GET',
        query: {
          gender: 'Male',
          status: 'Screening',
          sortBy: 'Name',
          searchTerm: 'John',
        },
      });
      
  
      await handler(req, res);
  
      expect(res.statusCode).toBe(200);
    });

    it('should throw errors if sending invalid filter', async () => {
        const { req, res } : {req: NextApiRequest; res: NextApiResponse} = createMocks({
            method: 'POST',
            query: {
              name: 'John',
            }, 
        });

        await handler(req, res);

        expect(res.statusCode).toBe(405);
    });

});