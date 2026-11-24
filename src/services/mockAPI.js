export const MOCK_CONFIG = {
  minDelay: 500,
  maxDelay: 1000,
  errorRate: 0.1, 
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const randomDelay = () =>
  MOCK_CONFIG.minDelay + Math.random() * (MOCK_CONFIG.maxDelay - MOCK_CONFIG.minDelay);

export async function mockRequest(result, { canFail = false } = {}) {
  await wait(randomDelay());

  if (canFail && Math.random() < MOCK_CONFIG.errorRate) {
    throw new Error("Network error. Please try again.");
  }

  return result;
}

export const createId = (prefix) =>
  prefix + crypto.randomUUID().slice(0, 8).toUpperCase();   

export const today = () => new Date().toLocaleDateString("en-CA"); 