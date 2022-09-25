import { OAuth2Client, TokenPayload } from 'google-auth-library';

export class GoogleAuthService {

    async verifyToken(idToken: string): Promise<TokenPayload | null | undefined> {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });
    
            return ticket.getPayload();
        } catch(err) {
            return Promise.resolve(null);
        }
    }
}