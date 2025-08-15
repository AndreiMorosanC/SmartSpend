import { Router } from 'express';
import { admin } from '../lib/firebaseAdmin.js';

const router = Router()

const SESSION_MS = 7 * 24 * 60 * 60 * 1000;
const isSecure = (process.env.SECURE || 'false').toLowerCase() === 'true';


router.post('/sessionLogin', async (req, res) => {
  const { idToken } = req.body || {};
  if (!idToken) return res.status(400).json({ error: 'idToken requerido' });

  try {
    // Verifica el ID token de Firebase recibido del cliente
    const decoded = await admin.auth().verifyIdToken(idToken, true);

    // Crea la cookie de sesión de Firebase
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn: SESSION_MS,
    });

    // Setea cookie httpOnly (no accesible por JS)
    res.cookie('session', sessionCookie, {
      httpOnly: true,
      secure: isSecure,     // en prod: true + HTTPS
      sameSite: 'lax',
      maxAge: SESSION_MS,
      path: '/',            // toda la app
    });

    // Puedes devolver datos básicos del usuario si quieres hidratar
    res.json({ ok: true, uid: decoded.uid, email: decoded.email || null });
  } catch (e) {
    return res.status(401).json({ error: 'ID token inválido' });
  }
});


router.get("/session", async(req , res)=>{
    const sessionCookie = req.cookies.session || "";
    if(!sessionCookie) return res.status(401).json({ error: "no session"})

    try{
        const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
        res.json({
            user:{
                uid: decoded.uid,
                email: decoded.email || null,

            },
        });
    }catch{
        return res.status(401).json({ error: 'Invalid session' });
    }
})

router.post('/logout', async (req, res) => {
  const sessionCookie = req.cookies.session || '';
  if (sessionCookie) {
    try {
      const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
     
      await admin.auth().revokeRefreshTokens(decoded.sub);
    } catch {
      
    }
  }
  res.clearCookie('session', { path: '/' });
  res.json({ ok: true });
});

export default router;