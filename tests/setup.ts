import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Mock IndexedDB for jsdom environment
const mockIndexedDB = {
  open: vi.fn().mockReturnThis(),
  transaction: vi.fn().mockReturnThis(),
  objectStore: vi.fn().mockReturnThis(),
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  createIndex: vi.fn(),
  onupgradeneeded: null,
  onsuccess: null,
  onerror: null,
};

global.indexedDB = mockIndexedDB as any;

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
