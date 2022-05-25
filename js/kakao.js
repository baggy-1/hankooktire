import { MAP_API_KEY } from './api.js';

const script = document.createElement('script');
const head = document.querySelector('head');
script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${MAP_API_KEY}`;
head.appendChild(script);