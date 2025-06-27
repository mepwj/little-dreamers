import React, { useEffect, useState, useCallback } from "react";
import MenuDropdown from "../component/Dropdown/MenuDropdown";
import PriceDropdown from "../component/Dropdown/PriceDropdown";
import styled from "styled-components";
import Map from "../component/Map/Map";
import SelectBox from "../component/SelectBox";
import StoreInfo from "../component/StoreInfo";
import { searchStores } from "../services/dummyApi";

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    padding: 15px;
    gap: 10px;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  z-index: 4;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
  }
`;

const ResetBnt = styled.button`
  padding: 0 20px;
  height: 40px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background-color: #c0392b;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:before {
    content: '↻';
    font-size: 16px;
  }
`;

const MainPage = () => {
  const [selectedMenuValue, setSelectedMenuValue] =
    useState("메뉴를 선택해주세요");
  const [selectedPriceValue, setSelectedPriceValue] =
    useState("가격대를 골라주세요");
  const [selectedList, setSelectedList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleMenuSelected = useCallback((event) => {
    const selectedMenu = event.target.innerText;
    console.log(`Menu selected: ${selectedMenu}`);
    setSelectedMenuValue(selectedMenu);
    setSelectedList((prevList) =>
      prevList.includes(selectedMenu) ? prevList : [...prevList, selectedMenu]
    );
  }, []);

  const handlePriceSelected = useCallback((event) => {
    const selectedPrice = event.target.innerText;
    console.log(`Price selected: ${selectedPrice}`);
    setSelectedPriceValue(selectedPrice);
    setSelectedList((prevList) =>
      prevList.includes(selectedPrice) ? prevList : [...prevList, selectedPrice]
    );
  }, []);

  const handleClickKeyword = useCallback((event) => {
    const selectedKeyword = event.target.innerText;
    console.log(`Keyword clicked for removal: ${selectedKeyword}`);
    setSelectedList((prevList) =>
      prevList.filter((keyword) => keyword !== selectedKeyword)
    );
  }, []);

  // Reset logic enhancement
  const handleReset = useCallback(() => {
    console.log("Resetting filters");
    setSelectedList([]);
    setFilteredData(originalData);
    setSelectedMenuValue("메뉴를 선택해주세요");
    setSelectedPriceValue("가격대를 골라주세요");
  }, [originalData]);

  const fetchStoresData = useCallback(async (latitude, longitude) => {
    try {
      console.log(
        `Fetching stores data at location: ${latitude}, ${longitude}`
      );
      const result = await searchStores(latitude, longitude, 5);
      const data = result.data || [];
      setOriginalData(data);
      setFilteredData(data);

      const uniqueCategories = [
        ...new Set(data.map((store) => store.category)),
      ];
      console.log("Unique categories fetched:", uniqueCategories);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching stores data:", error);
    }
  }, []);

  useEffect(() => {
    // 개발 환경에서는 항상 제주도 좌표 사용
    const defaultLocation = { latitude: 33.4890, longitude: 126.5349 };
    
    const handleLocationError = (error) => {
      const errorMessages = {
        1: "User denied the request for Geolocation.",
        2: "Location information is unavailable.",
        3: "The request to get user location timed out.",
        0: "An unknown error occurred.",
      };
      console.error(errorMessages[error.code] || errorMessages[0]);
      fetchStoresData(defaultLocation.latitude, defaultLocation.longitude);
    };

    const handleLocationSuccess = ({ coords: { latitude, longitude } }) => {
      console.log("User location obtained:", { latitude, longitude });
      fetchStoresData(latitude, longitude);
    };

    if (navigator.geolocation && process.env.NODE_ENV === 'production') {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );
    } else {
      // 개발 환경이거나 위치 서비스가 없는 경우 제주도 기본 위치 사용
      console.log("개발 환경: 제주도 기본 위치 사용");
      fetchStoresData(defaultLocation.latitude, defaultLocation.longitude);
    }
  }, [fetchStoresData]);

  // Enhanced filtering logic using category instead of menu
  useEffect(() => {
    if (selectedList.length === 0) {
      console.log("No filters selected, displaying original data.");
      setFilteredData(originalData);
    } else {
      console.log("Filtering data based on selected list:", selectedList);
      const filtered = originalData.filter((store) => {
        const categoryMatch = selectedList.some(
          (selected) => store.category && store.category.includes(selected)
        );
        console.log(
          `Checking store "${store.name}" (Category: ${store.category})`
        );
        console.log(`Category match: ${categoryMatch}`);

        const categoryFilterActive = selectedList.some((keyword) =>
          categories.includes(keyword)
        );
        console.log(`Category filter active: ${categoryFilterActive}`);

        if (categoryFilterActive) {
          console.log(`Store "${store.name}" included: ${categoryMatch}`);
          return categoryMatch;
        } else {
          console.log(
            `Store "${store.name}" included: true (no active filters)`
          );
          return true;
        }
      });
      console.log("Filtered data:", filtered);
      setFilteredData(filtered);
    }
  }, [selectedList, originalData, categories]);

  const handleMarkerClick = useCallback((restaurant) => {
    console.log("Restaurant marker clicked:", restaurant.name);
    setSelectedRestaurant(restaurant);
  }, []);

  return (
    <PageContainer>
      <SelectContainer>
        <DropdownContainer>
          <MenuDropdown
            onClick={handleMenuSelected}
            selectedDropValue={selectedMenuValue}
            categories={categories}
          />
          <PriceDropdown
            onClick={handlePriceSelected}
            selectedDropValue={selectedPriceValue}
          />
        </DropdownContainer>
        <ResetBnt onClick={handleReset}>초기화</ResetBnt>
      </SelectContainer>
      <KeywordContainer>
        {selectedList.map((el) => (
          <SelectBox key={el} data={el} onClickKeyword={handleClickKeyword} />
        ))}
      </KeywordContainer>
      <Map filteredData={filteredData} onMarkerClick={handleMarkerClick} />
      {selectedRestaurant && <StoreInfo restaurant={selectedRestaurant} />}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 90px);
`;

const KeywordContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 35px;
`;

export default MainPage;
