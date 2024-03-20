import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service';

const mock = new MockAdapter(axios);

describe('Public Holidays Service', () => {
  describe('getListOfPublicHolidays', () => {
    it('should return list of public holidays', async () => {
      const year = 2024;
      const country = 'GB';
      const data = [{ name: 'New Year', localName: 'New Year', date: '2024-01-01' }];
      mock.onGet(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`).reply(200, data);
      const holidays = await getListOfPublicHolidays(year, country);
      expect(holidays).toEqual([{ name: 'New Year', localName: 'New Year', date: '2024-01-01' }]);
    });

    it('should return empty array if error occurs', async () => {
      const year = 2024;
      const country = 'GB';
      mock.onGet(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`).reply(404);
      const holidays = await getListOfPublicHolidays(year, country);
      expect(holidays).toEqual([]);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    it('should return true if today is public holiday', async () => {
      const country = 'GB';
      mock.onGet(`https://date.nager.at/api/v3/IsTodayPublicHoliday/${country}`).reply(200);
      const isHoliday = await checkIfTodayIsPublicHoliday(country);
      expect(isHoliday).toBe(true);
    });

    it('should return false if today is not public holiday', async () => {
      const country = 'GB';
      mock.onGet(`https://date.nager.at/api/v3/IsTodayPublicHoliday/${country}`).reply(404);
      const isHoliday = await checkIfTodayIsPublicHoliday(country);
      expect(isHoliday).toBe(false);
    });
  });

  describe('getNextPublicHolidays', () => {
    it('should return next public holidays', async () => {
      const country = 'GB';
      const data = [{ name: 'New Year', localName: 'New Year', date: '2025-01-01' }];
      mock.onGet(`https://date.nager.at/api/v3/NextPublicHolidays/${country}`).reply(200, data);
      const holidays = await getNextPublicHolidays(country);
      expect(holidays).toEqual([{ name: 'New Year', localName: 'New Year', date: '2025-01-01' }]);
    });

    it('should return empty array if error occurs', async () => {
      const country = 'GB';
      mock.onGet(`https://date.nager.at/api/v3/NextPublicHolidays/${country}`).reply(404);
      const holidays = await getNextPublicHolidays(country);
      expect(holidays).toEqual([]);
    });
  });
});
