const LAT = 36.0783841;
const LNG = 128.4000444;
const ADDRESS_ID = 26370978;
const container_map = document.querySelector('.map');
const container_map_rv = document.querySelector('.map-rv');
const btn_rv = document.querySelector('.btn-rv');
const btn_fr = document.querySelector('.btn-fr');
const options = {
    center: new kakao.maps.LatLng(LAT, LNG),
    level: 2
};

const map = new kakao.maps.Map(container_map, options);

const markerPosition = options.center;
const marker = new kakao.maps.Marker({
    position: markerPosition,
    clickable: true,
});

marker.setMap(map);

let isRoadView = false;
let isFirstRoadView = true;
function clickBtnRoadView(e) {
    if(isFirstRoadView){
        const roadView = new kakao.maps.Roadview(container_map_rv, {
            pan: 170,
        });
        const roadViewClient = new kakao.maps.RoadviewClient();

        const position = new kakao.maps.LatLng(36.07865, 128.4);

        roadViewClient.getNearestPanoId(position, 50, function(panoId) {
            roadView.setPanoId(panoId, position);
        });
        isFirstRoadView = false;
    }
    
    if(!isRoadView) {
        container_map.style.zIndex = '0';
        container_map_rv.style.zIndex = '10';
        btn_rv.textContent = '지도';
    } else {
        container_map.style.zIndex = '10';
        container_map_rv.style.zIndex = '0';
        btn_rv.textContent = '로드뷰';
    }
    isRoadView = !isRoadView;
}

let isOpenInfoWindow = false;
function openInfoWindow(e) {
    if(isOpenInfoWindow) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
    isOpenInfoWindow = !isOpenInfoWindow;
}

function closeInfoWindow(e) {
    infowindow.close();
    if(isOpenInfoWindow) {
        isOpenInfoWindow = !isOpenInfoWindow;
    }
}

const iwContent = '<div class="info-window">남구미자동차정비</br>(한국타이어 석적점)</br></br>경북 칠곡군 석적읍 석적로 1017-14</br>(우) 39842</br>(지번) 석적읍 중리 659-1</div>',
    iwRemoveable = true;

const infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
});

function moveLinkFindRoad(e) {
    location.href = `https://map.kakao.com/link/to/${ADDRESS_ID}`;
}

kakao.maps.event.addListener(marker, 'click', openInfoWindow);
kakao.maps.event.addListener(map, 'click', closeInfoWindow);
btn_rv.addEventListener('click', clickBtnRoadView);
btn_fr.addEventListener('click', moveLinkFindRoad);