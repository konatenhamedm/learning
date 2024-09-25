import { dev } from '$app/environment';

import type { Appartement } from '../../../types';
export async function load() {
    const res = await fetch('http://lebedoo.youskil.com/api/appartement/');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();

  

    return {
        main_data: data.data as Appartement[]
    };
}

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;


// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
