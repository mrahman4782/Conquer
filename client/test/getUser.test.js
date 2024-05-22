import axios from 'axios';
import getUser from '../src/functions/getUser';

// Mock axios
jest.mock('axios');

describe('getUser', () => {
  const mockToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNjOTNjMWEyNGNhZjgyN2I4ZGRlOWY4MmQyMzE1MzY1MDg4YWU2MTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29ucXVlci1hcHAiLCJhdWQiOiJjb25xdWVyLWFwcCIsImF1dGhfdGltZSI6MTcxNjMzNDczNiwidXNlcl9pZCI6IjR2Wm01TUVzOFBXYVlSVXRxMUpvQ21rSmdmODMiLCJzdWIiOiI0dlptNU1FczhQV2FZUlV0cTFKb0Nta0pnZjgzIiwiaWF0IjoxNzE2MzM0NzM2LCJleHAiOjE3MTYzMzgzMzYsImVtYWlsIjoiam9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqb2VAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.WqAEiCerfB1x7RMVI9YudMm07TfAp356DArJV_EZNgZA-ojfGkBUKDl4d_ArmyVDx7x-pyDhyRRXsFwgmhJh7P4t0PJF37Tb1BI0pQJGoDrsjaBZp16dNORPNC4-0xUkUbm6Gu5kNbAkO6sZnit2WxKUnY4j_QH4xViofFmGi5GxT2W_3VMDCkRweydQN-6bHNfnKDdg5yvRTIQL4Bdx-hFtzLCsH1pafGAACUSSwty3PHutnSQLhlQibPdV1IOF8mX7QX_F_IcNOuz0wb3soSURXa_LA3440_3znI5c2M-bY_nMM6Ee5wi3MFShUeI5AksJqGvpYqDDfPMG8fcVjQ';
  const mockResponse = {
    data: 'mockUserData',
  };

  beforeEach(() => {
    axios.post.mockClear();
  });

  it('should make a POST request to the backend and return the response', async () => {
    axios.post.mockResolvedValue(mockResponse);

    const response = await getUser(mockToken);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/getUser', { token: mockToken });
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Request failed');
    axios.post.mockRejectedValue(mockError);

    await expect(getUser(mockToken)).rejects.toThrow('Request failed');
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/getUser', { token: mockToken });
  });
});
