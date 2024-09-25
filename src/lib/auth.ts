import axios from 'axios';
import cookie from 'cookie';
import type { User } from '../types';
import { BASE_URL_LOCAL, BASE_URL_LOCAL_AUTH } from './api';

const API_URL = 'http://148.113.143.59:8081/api'; // Remplacez par l'URL de votre API

/* export async function login(username: string, password: string): Promise<boolean> {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const { token } = response.data;

        // Stocker le token dans un cookie
        document.cookie = cookie.serialize('token', token, { path: '/' });
        return true;
    } catch (error) {
        console.error('Erreur lors de la connexion', error);
        return false;
    }
} */

export async function login(username: string, password: string) {
    try {
        /* document.cookie = cookie.serialize('auth', JSON.stringify({ id:1, role:'SECRETAIRE', token:"ok" }), {
            path: '/',
            httpOnly: false, // Permet de rendre le cookie accessible au client
            secure: false, // Utilisez `true` si votre site est en HTTPS
            maxAge: 60 * 60 * 24 // Durée de vie du cookie (1 jour ici)
        });
         */
        const response = await axios.post(`${BASE_URL_LOCAL_AUTH}/login_check`, { username, password });
        const { token, id, role } = response.data; // Assurez-vous que l'API renvoie l'ID et le rôle

        // Stocker l'objet utilisateur (id, role) dans un cookie
        document.cookie = cookie.serialize('auth', JSON.stringify({ id:1, role:'SECRETAIRE', token:token }), {
            path: '/',
            httpOnly: false, // Permet de rendre le cookie accessible au client
            secure: false, // Utilisez `true` si votre site est en HTTPS
            maxAge: 60 * 60 * 24 // Durée de vie du cookie (1 jour ici)
        });

        return true;
    } catch (error) {
        console.error('Erreur lors de la connexion', error);
        return false;
    }
}

export function logout() {
    // Supprimer le token d'authentification en vidant le cookie
    document.cookie = cookie.serialize('auth', '', {
        expires: new Date(0),
        path: '/'
    });
}


// Nouvelle fonction pour obtenir les cookies
export function getAuthCookie():User {
    // Parse les cookies du document
    const cookies = cookie.parse(document.cookie);

    // Récupère le cookie "auth"
 /*    if (cookies.auth) {  */
        const auth = JSON.parse(cookies.auth);
        const user = { id: auth.id, role: auth.role,token:auth.token };
        
        return user;
   /*  }  */

    
    // Si aucun cookie d'authentification n'est trouvé
    //return null;
}
