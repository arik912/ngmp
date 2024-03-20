import request from 'supertest';

describe('End-to-End Tests', () => {
  it('should return list of public holidays for a specific country and year', async () => {
    const year = 2024;
    const country = 'GB';
    const response = await request('https://date.nager.at')
      .get(`/PublicHolidays/${year}/${country}`)
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should check if today is public holiday in a specific country', async () => {
    const country = 'GB';
    const response = await request('https://date.nager.at')
      .get(`/IsTodayPublicHoliday/${country}`)
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('isPublicHoliday');
  });

  it('should return next public holidays for a specific country', async () => {
    const country = 'GB';
    const response = await request('https://date.nager.at')
      .get(`/NextPublicHolidays/${country}`)
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
