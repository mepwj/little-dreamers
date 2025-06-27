import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";

export default function Map({ filteredData, onMarkerClick }) {
  const [position, setPosition] = useState({
    center: {
      lat: 33.487131, // Default latitude
      lng: 126.5316927, // Default longitude
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    // 데모 환경에서는 제주도 위치 사용
    const jejuLocation = {
      lat: 33.4890,
      lng: 126.5349
    };

    // 개발 환경에서는 항상 제주도 좌표 사용
    if (process.env.NODE_ENV === 'development') {
      console.log("데모 환경: 제주도 위치 사용");
      setPosition({
        center: jejuLocation,
        errMsg: null,
        isLoading: false,
      });
      return;
    }

    // 프로덕션에서만 실제 위치 사용
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({
            center: {
              lat: latitude,
              lng: longitude,
            },
            errMsg: null,
            isLoading: false,
          });
        },
        (err) => {
          console.log("위치 가져오기 실패, 제주도 기본 위치 사용");
          setPosition({
            center: jejuLocation,
            errMsg: null,
            isLoading: false,
          });
        }
      );
    } else {
      setPosition({
        center: jejuLocation,
        errMsg: null,
        isLoading: false,
      });
    }
  }, []);

  useEffect(() => {
    if (!position.isLoading) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6022b3ea363825dba0253bc58c3f328c&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(
              position.center.lat,
              position.center.lng
            ),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const markerPosition = new window.kakao.maps.LatLng(
            position.center.lat,
            position.center.lng
          );

          const icon = new window.kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            new window.kakao.maps.Size(30, 35),
            {
              offset: new window.kakao.maps.Point(16, 34),
              alt: "현재 위치 마커",
              shape: "poly",
              coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33",
            }
          );

          const myPositionMarker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: icon,
          });

          myPositionMarker.setMap(map);

          filteredData.forEach((item) => {
            const storeMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(
                item.latitude,
                item.longitude
              ),
            });
            storeMarker.setMap(map);

            window.kakao.maps.event.addListener(storeMarker, "click", () => {
              onMarkerClick(item);
            });
          });
        }
      };
    }
  }, [position, filteredData, onMarkerClick]);

  if (position.isLoading) {
    return <LoadingSpinner message="지도를 불러오는 중입니다..." />;
  }

  if (position.errMsg) {
    return <div>Error: {position.errMsg}</div>;
  }

  return <MapContainer id="map" />;
}

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  min-height: 500px;
  max-height: 700px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;
