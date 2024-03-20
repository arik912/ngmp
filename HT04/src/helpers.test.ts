import { validateInput, shortenPublicHoliday } from './helpers';

describe('Helper Functions', () => {
  describe('validateInput', () => {
    it('should throw error for unsupported country', () => {
      expect(() => validateInput({ country: 'IT' })).toThrowError();
    });

    it('should throw error for non-current year', () => {
      expect(() => validateInput({ year: 2023 })).toThrowError();
    });

    it('should not throw error for valid input', () => {
      expect(() => validateInput({ country: 'GB', year: 2024 })).not.toThrowError();
    });
  });

  describe('shortenPublicHoliday', () => {
    it('should return shortened holiday object', () => {
      const holiday = {
        name: 'New Year',
        localName: 'New Year',
        date: '2024-01-01',
      };
      const shortenedHoliday = shortenPublicHoliday(holiday);
      expect(shortenedHoliday).toEqual({
        name: 'New Year',
        localName: 'New Year',
        date: '2024-01-01',
      });
    });
  });
});
