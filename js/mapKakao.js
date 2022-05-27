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
    position: markerPosition,
    clickable: true,
});

marker.setMap(map);

function clickBtnRoadView(e) {
    const btnClose = document.createElement('button');
    const btnCloseText = document.createTextNode('X');
    btnClose.appendChild(btnCloseText);
    container_map.appendChild(btnClose);

    const roadView = new kakao.maps.Roadview(container_map, {
        pan: 170,
    });
    const roadViewClient = new kakao.maps.RoadviewClient();

    const position = new kakao.maps.LatLng(36.07865, 128.4);

    roadViewClient.getNearestPanoId(position, 50, function(panoId) {
        roadView.setPanoId(panoId, position);
    });
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

const iwContent = '<div class="test">남구미자동차정비</br>(한국타이어 석적점)<button onclick="clickBtnRoadView();">로드뷰</button></div>',
    iwRemoveable = true;

const infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
});

kakao.maps.event.addListener(marker, 'click', openInfoWindow);
kakao.maps.event.addListener(map, 'click', closeInfoWindow);
