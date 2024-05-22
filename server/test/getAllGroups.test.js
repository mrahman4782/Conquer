// getAllGroups.test.js
import { getFirestore } from "firebase-admin/firestore";
import { loginVerify } from '../functions/loginVerify';
import { getAllGroups } from '../functions/getAllGroups';

const session = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNjOTNjMWEyNGNhZjgyN2I4ZGRlOWY4MmQyMzE1MzY1MDg4YWU2MTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29ucXVlci1hcHAiLCJhdWQiOiJjb25xdWVyLWFwcCIsImF1dGhfdGltZSI6MTcxNjMzMTE0NSwidXNlcl9pZCI6IjR2Wm01TUVzOFBXYVlSVXRxMUpvQ21rSmdmODMiLCJzdWIiOiI0dlptNU1FczhQV2FZUlV0cTFKb0Nta0pnZjgzIiwiaWF0IjoxNzE2MzMxMTQ1LCJleHAiOjE3MTYzMzQ3NDUsImVtYWlsIjoiam9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqb2VAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.F_XRoCZdnrdUNjl1veCabULe41syZV6CjfpLgCKQMtpqjcsYx14c4J6FvKCE-edSQVCGDEw0C4zi3bQUqPe9YqEn6hIuaOQfQVH0UPsbWM_k4X-qsvhE2LFynTV9XIjuUbvLCtd5kQZaOrndFNrF7zm0yOMLbXBIMXS3SfhYhljt_sgMXzh1ltWS22TJ6_ua0I6gLfhb82L1APIVr0LU0eWqeobFecM5Qv1oBlUJNu15D46OoTUNrncPMgMZ0utgEvACYbZ_bvTsY25CP2zaBGXlilaqJgi42iDr1I7ump3sQlFYaCW-7mZI2xZo08X5fmpcUjm1N0dPWPUjKi-FIQ';
// Mock the Firestore and loginVerify dependencies
jest.mock("firebase-admin/firestore", () => {
  const mFirestore = {
    collection: jest.fn().mockReturnThis(),
    get: jest.fn(),
  };
  return { getFirestore: jest.fn(() => mFirestore) };
});

jest.mock('../functions/loginVerify.js', () => ({
  loginVerify: jest.fn(),
}));

describe('getAllGroups', () => {
  let db;

  beforeEach(() => {
    db = getFirestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return groups with length more than 1 when user is authorized', async () => {
    
    const mockDocs = [
      { id: '1', data: () => ({ name: 'Group 1' }) },
      { id: '2', data: () => ({ name: 'Group 2' }) },
    ];
    loginVerify.mockResolvedValue({ status: 200 });
    db.collection().get.mockResolvedValue({
      forEach: (callback) => mockDocs.forEach(doc => callback(doc)),
    });

    const result = await getAllGroups(session);

    expect(loginVerify).toHaveBeenCalledWith(session);
    expect(db.collection).toHaveBeenCalledWith('chats');
    expect(result.status).toBe(200);
    expect(result.data.length).toBeGreaterThan(1);
  });

  it('should return status 403 when user is not authorized', async () => {
    
    loginVerify.mockResolvedValue({ status: 403 });

    const result = await getAllGroups(session);

    expect(loginVerify).toHaveBeenCalledWith(session);
    expect(result.status).toBe(403);
    expect(result.data).toBe("Unable to authorize user");
  });

});
