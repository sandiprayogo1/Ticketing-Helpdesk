import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Declare Pusher globally
window.Pusher = Pusher;

// Create a TypeScript-typed instance of Echo
const echo: Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

// Expose Echo globally for use in other components
export default echo;
