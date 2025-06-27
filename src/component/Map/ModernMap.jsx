import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ModernMap = ({ stores, userLocation, onStoreSelect, selectedStore }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // SVG 마커 생성 함수
  const createSVGMarker = (color = '#667eea', isSelected = false) => {
    const size = isSelected ? 48 : 40;
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#shadow)">
          <path d="M20 4C14.48 4 10 8.48 10 14C10 21.5 20 32 20 32C20 32 30 21.5 30 14C30 8.48 25.52 4 20 4Z" 
                fill="${color}" 
                stroke="white" 
                stroke-width="2"/>
          <circle cx="20" cy="14" r="4" fill="white"/>
        </g>
      </svg>
    `;
    
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  // 사용자 위치 마커 SVG
  const createUserMarker = () => {
    const svg = `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="#3b82f6"/>
        <circle cx="12" cy="12" r="12" fill="none" stroke="#3b82f6" stroke-width="2" stroke-opacity="0.3">
          <animate attributeName="r" from="12" to="20" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="stroke-opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
    
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  // 카카오맵 초기화
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY || '6022b3ea363825dba0253bc58c3f328c'}&autoload=false`;
      script.async = true;
      
      script.onload = () => {
        window.kakao.maps.load(() => {
          setMapLoaded(true);
        });
      };
      
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  // 지도 생성
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !userLocation) return;

    const { kakao } = window;
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
      level: 4,
    };

    const map = new kakao.maps.Map(container, options);
    mapInstanceRef.current = map;

    // 지도 컨트롤 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHTBOTTOM);

    // 사용자 위치 마커 추가
    if (userLocation) {
      const userPosition = new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude);
      const userMarkerImage = new kakao.maps.MarkerImage(
        createUserMarker(),
        new kakao.maps.Size(24, 24),
        { offset: new kakao.maps.Point(12, 12) }
      );

      const userMarker = new kakao.maps.Marker({
        position: userPosition,
        map: map,
        image: userMarkerImage,
        zIndex: 1
      });

      userMarkerRef.current = userMarker;
    }
  }, [mapLoaded, userLocation]);

  // 가맹점 마커 업데이트
  useEffect(() => {
    if (!mapInstanceRef.current || !stores) return;

    const { kakao } = window;
    const map = mapInstanceRef.current;

    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 생성
    const bounds = new kakao.maps.LatLngBounds();

    stores.forEach((store) => {
      const position = new kakao.maps.LatLng(store.latitude, store.longitude);
      const isSelected = selectedStore && selectedStore.id === store.id;
      
      const markerImage = new kakao.maps.MarkerImage(
        createSVGMarker('#667eea', isSelected),
        new kakao.maps.Size(isSelected ? 48 : 40, isSelected ? 48 : 40),
        { offset: new kakao.maps.Point(isSelected ? 24 : 20, isSelected ? 48 : 40) }
      );

      const marker = new kakao.maps.Marker({
        position: position,
        map: map,
        image: markerImage,
        zIndex: isSelected ? 100 : 10,
        clickable: true
      });

      // 마커 클릭 이벤트
      kakao.maps.event.addListener(marker, 'click', () => {
        onStoreSelect(store);
      });

      // 마커 호버 효과
      kakao.maps.event.addListener(marker, 'mouseover', () => {
        if (!isSelected) {
          marker.setImage(new kakao.maps.MarkerImage(
            createSVGMarker('#764ba2', false),
            new kakao.maps.Size(44, 44),
            { offset: new kakao.maps.Point(22, 44) }
          ));
        }
      });

      kakao.maps.event.addListener(marker, 'mouseout', () => {
        if (!isSelected) {
          marker.setImage(markerImage);
        }
      });

      markersRef.current.push(marker);
      bounds.extend(position);
    });

    // 사용자 위치도 bounds에 포함
    if (userLocation) {
      bounds.extend(new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude));
    }

    // 모든 마커가 보이도록 지도 범위 조정
    if (stores.length > 0) {
      map.setBounds(bounds);
    }
  }, [stores, selectedStore, onStoreSelect, userLocation]);

  // 선택된 가맹점으로 지도 이동
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedStore) return;

    const { kakao } = window;
    const position = new kakao.maps.LatLng(selectedStore.latitude, selectedStore.longitude);
    
    mapInstanceRef.current.panTo(position);
  }, [selectedStore]);

  return (
    <MapContainer>
      <MapElement ref={mapRef} />
      
      <MapControls>
        <LocationButton onClick={() => {
          alert("데모입니다. 제주도 지역 가맹점을 보여드립니다.");
          if (mapInstanceRef.current) {
            const { kakao } = window;
            // 제주도 중심 좌표로 이동
            const jejuPosition = new kakao.maps.LatLng(33.4890, 126.5349);
            mapInstanceRef.current.panTo(jejuPosition);
            mapInstanceRef.current.setLevel(3); // 확대 레벨 조정
          }
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C7.58 2 4 5.58 4 10C4 15.5 12 22 12 22C12 22 20 15.5 20 10C20 5.58 16.42 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="10" r="3" fill="currentColor"/>
          </svg>
        </LocationButton>
      </MapControls>

      <MapOverlay>
        <InfoText>
          지도를 클릭하여 가맹점 정보를 확인하세요
        </InfoText>
      </MapOverlay>
    </MapContainer>
  );
};

export default ModernMap;

// Styled Components
const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const MapElement = styled.div`
  width: 100%;
  height: 100%;
`;

const MapControls = styled.div`
  position: absolute;
  bottom: 120px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 5;
`;

const LocationButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.colors.neutral[700]};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    color: ${props => props.theme.colors.primary.main};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
`;

const InfoText = styled.div`
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.5s ease;
`;