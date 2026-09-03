import { promises as fs } from 'fs';
import path from 'path';
import { PaymentAttempt } from '../../types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'payment_attempts.json');

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    /* directory may already exist */
  }
}

export async function loadLocalPaymentAttempts(): Promise<PaymentAttempt[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data) as PaymentAttempt[];
  } catch {
    return [];
  }
}

export async function saveLocalPaymentAttempt(attempt: PaymentAttempt): Promise<void> {
  await ensureDir();
  try {
    const attempts = await loadLocalPaymentAttempts();
    attempts.push(attempt);
    await fs.writeFile(DATA_FILE, JSON.stringify(attempts, null, 2), 'utf-8');
  } catch (error) {
    console.error('[LocalStore] Failed to persist payment attempt:', error);
  }
}

export async function listLocalPaymentAttempts(): Promise<PaymentAttempt[]> {
  return loadLocalPaymentAttempts();
}
