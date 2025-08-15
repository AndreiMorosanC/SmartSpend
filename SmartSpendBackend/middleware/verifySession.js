import { admin } from "../lib/firebaseAdmin.js";

export async function verifySession(req,res,next) {
    const cookie = req.cookies.session || "";
    if (!cookie) return res.status(401).json({error : "no session"});

    try{
        const decoded = await admin.auth().verifySessionCookie(cookie, true);
        req.user = decoded;
        next()
    }catch{
        return res.status(401).json({error: "invalid session"});
    }
}