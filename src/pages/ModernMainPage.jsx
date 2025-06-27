import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { searchStores } from "../services/dummyApi";
import ModernMap from "../component/Map/ModernMap";
import ModernStoreCard from "../component/ModernStoreCard";
import ModernFilterBar from "../component/ModernFilterBar";

const ModernMainPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    priceRange: null
  });
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  // 가맹점 데이터 불러오기
  const fetchStoresData = useCallback(async (latitude, longitude) => {
    try {
      setIsLoading(true);
      const result = await searchStores(latitude, longitude, 5);
      const data = result.data || [];
      
      setStores(data);
      setFilteredStores(data);
      
      // 카테고리 추출
      const uniqueCategories = [...new Set(data.map(store => store.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("가맹점 데이터 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 사용자 위치 가져오기
  useEffect(() => {
    // 개발 환경에서는 항상 제주도 좌표 사용
    const defaultLocation = { latitude: 33.4890, longitude: 126.5349 };
    
    if (navigator.geolocation && process.env.NODE_ENV === 'production') {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setUserLocation({ latitude, longitude });
          fetchStoresData(latitude, longitude);
        },
        (error) => {
          console.error("위치 정보 가져오기 실패:", error);
          setUserLocation(defaultLocation);
          fetchStoresData(defaultLocation.latitude, defaultLocation.longitude);
        }
      );
    } else {
      // 개발 환경이거나 위치 서비스가 없는 경우 제주도 기본 위치 사용
      console.log("개발 환경: 제주도 기본 위치 사용");
      setUserLocation(defaultLocation);
      fetchStoresData(defaultLocation.latitude, defaultLocation.longitude);
    }
  }, [fetchStoresData]);

  // 필터링 로직
  useEffect(() => {
    let filtered = [...stores];

    if (selectedFilters.category) {
      filtered = filtered.filter(store => 
        store.category === selectedFilters.category
      );
    }

    if (selectedFilters.priceRange) {
      // 가격대 필터링 로직 (예시)
      const priceRanges = {
        "5,000원 이하": [0, 5000],
        "5,000원 ~ 10,000원": [5000, 10000],
        "10,000원 이상": [10000, Infinity]
      };
      
      const [min, max] = priceRanges[selectedFilters.priceRange] || [0, Infinity];
      // 실제 가격 필드가 있다면 필터링 적용
    }

    setFilteredStores(filtered);
  }, [selectedFilters, stores]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value === prev[filterType] ? null : value
    }));
  };

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
  };

  const handleCloseStoreInfo = () => {
    setSelectedStore(null);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner>
          <SpinnerRing />
          <LoadingText>가맹점 정보를 불러오는 중...</LoadingText>
        </LoadingSpinner>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <MapSection>
          <ModernFilterBar
            categories={categories}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            totalCount={filteredStores.length}
          />
          
          <MapContainer>
            <ModernMap
              stores={filteredStores}
              userLocation={userLocation}
              onStoreSelect={handleStoreSelect}
              selectedStore={selectedStore}
            />
            
            {selectedStore && (
              <StoreInfoOverlay>
                <ModernStoreCard
                  store={selectedStore}
                  onClose={handleCloseStoreInfo}
                />
              </StoreInfoOverlay>
            )}
          </MapContainer>
        </MapSection>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ModernMainPage;

// Styled Components
const PageContainer = styled.div`
  min-height: calc(100vh - 72px);
  background: ${props => props.theme.colors.neutral[50]};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: ${props => props.theme.colors.primary.gradient};
    opacity: 0.03;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 72px);
`;

const MapSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MapContainer = styled.div`
  flex: 1;
  position: relative;
  background: white;
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
`;

const StoreInfoOverlay = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);
  max-width: 420px;
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    bottom: 16px;
    width: calc(100% - 32px);
  }
`;

// Loading States
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 72px);
  background: ${props => props.theme.colors.neutral[50]};
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const SpinnerRing = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${props => props.theme.colors.neutral[200]};
  border-top-color: ${props => props.theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.neutral[600]};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;