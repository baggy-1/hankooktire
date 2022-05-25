import { MAP_API_KEY } from './api.js';

const script = document.createElement('script');
script.type = `text/javascript`;
script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${MAP_API_KEY}`;
script.addEventListener('load', postLoadFunction);
document.body.appendChild(script);

function postLoadFunction() {
    kakao.maps.load(function() {
        const LAT = 36.0783841;
        const LNG = 128.4000444;
        const container_map = document.querySelector('#map');
        const options = {
            center: new kakao.maps.LatLng(LAT, LNG),
            level: 2
        };
        const map = new kakao.maps.Map(container_map, options);

        const markerPosition = options.center;
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        marker.setMap(map);
     });
}