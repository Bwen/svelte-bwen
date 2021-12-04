import { browser } from '$app/env';
const SMALL_QUERY = '(max-width: 640px)';
const MEDIUM_QUERY = '(min-width: 641px) and (max-width: 1024px)';
const LARGE_QUERY = '(min-width: 1025px) and (max-width: 1440px)';
const XLARGE_QUERY = '(min-width: 1441px)';

function handleScreenMediaChange(event) {
    if (event.matches) {
        switch (event.media) {
            case SMALL_QUERY:
                document.documentElement.setAttribute('media', 'small');
                break;
            case MEDIUM_QUERY:
                document.documentElement.setAttribute('media', 'medium');
                break;
            case LARGE_QUERY:
                document.documentElement.setAttribute('media', 'large');
                break;
            case XLARGE_QUERY:
                document.documentElement.setAttribute('media', 'xlarge');
                break;
        }
    }
}

if (browser) {
    const smallQuery = window.matchMedia(SMALL_QUERY);
    smallQuery.addEventListener('change', handleScreenMediaChange);

    const mediumQuery = window.matchMedia(MEDIUM_QUERY);
    mediumQuery.addEventListener('change', handleScreenMediaChange);

    const largeQuery = window.matchMedia(LARGE_QUERY);
    largeQuery.addEventListener('change', handleScreenMediaChange);

    const xlargeQuery = window.matchMedia(XLARGE_QUERY);
    xlargeQuery.addEventListener('change', handleScreenMediaChange);

    handleScreenMediaChange(smallQuery);
    handleScreenMediaChange(mediumQuery);
    handleScreenMediaChange(largeQuery);
    handleScreenMediaChange(xlargeQuery);

    if ('theme' in localStorage) {
        document.documentElement.setAttribute('theme', localStorage.getItem('theme'));
    } else {
        if ((!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.setAttribute('theme', 'default-dark');
        } else {
            document.documentElement.setAttribute('theme', 'default');
        }
    }
}
