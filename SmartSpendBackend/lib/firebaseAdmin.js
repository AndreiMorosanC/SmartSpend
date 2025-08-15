import admin from 'firebase-admin';

const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
if (!b64) throw new Error('FIREBASE_SERVICE_ACCOUNT_B64 no está definido');

const serviceJson = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceJson),
  });
}

export { admin };
