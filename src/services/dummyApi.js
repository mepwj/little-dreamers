// 더미 API 서비스 - Express 서버 대신 사용

import { stores, storeMenus } from '../data/stores';
import { storeReviews } from '../data/reviews';

// 데이터 로드 확인
console.log('데이터 로드 확인:', {
  stores: stores?.length || 0,
  storeMenus: Object.keys(storeMenus || {}).length,
  storeReviews: Object.keys(storeReviews || {}).length
});

// 거리 계산 함수 (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구의 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
}

// 비동기 응답을 시뮬레이션하는 delay 함수
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 가맹점 검색 API (GET /api/stores/search)
export const searchStores = async (latitude, longitude, range = 5) => {
  await delay(300); // 네트워크 지연 시뮬레이션
  
  try {
    console.log('더미 API 호출됨:', { latitude, longitude, range });
    console.log('가맹점 데이터:', stores.length, '개');
    
    // 사용자 위치 기준으로 범위 내 가맹점 필터링
    const nearbyStores = stores.filter(store => {
      const distance = calculateDistance(
        latitude, 
        longitude, 
        store.latitude, 
        store.longitude
      );
      return distance <= range;
    });

    // 거리순으로 정렬
    const sortedStores = nearbyStores.sort((a, b) => {
      const distanceA = calculateDistance(latitude, longitude, a.latitude, a.longitude);
      const distanceB = calculateDistance(latitude, longitude, b.latitude, b.longitude);
      return distanceA - distanceB;
    });

    return {
      success: true,
      data: sortedStores,
      message: `${sortedStores.length}개의 가맹점을 찾았습니다.`
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: '가맹점 검색 중 오류가 발생했습니다.'
    };
  }
};

// 가맹점 메뉴 정보 API (GET /api/stores/menu)
export const getStoreMenu = async (storeId) => {
  await delay(200);
  
  try {
    const menuData = storeMenus[storeId];
    
    if (!menuData) {
      return {
        success: false,
        data: null,
        message: '해당 가맹점의 메뉴 정보를 찾을 수 없습니다.'
      };
    }

    return {
      success: true,
      data: menuData,
      message: '메뉴 정보를 성공적으로 불러왔습니다.'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '메뉴 정보를 불러오는 중 오류가 발생했습니다.'
    };
  }
};

// 가맹점 리뷰 조회 API (GET /api/stores/review)
export const getStoreReviews = async (storeId) => {
  await delay(250);
  
  try {
    const reviewData = storeReviews[storeId];
    
    if (!reviewData) {
      return {
        success: true,
        data: {
          reviews: [],
          statistics: {
            delicious: 0,
            kind: 0,
            cardAccepted: 0,
            clean: 0,
            generous: 0,
            total: 0
          }
        },
        message: '아직 리뷰가 없습니다.'
      };
    }

    return {
      success: true,
      data: reviewData,
      message: '리뷰를 성공적으로 불러왔습니다.'
    };
  } catch (error) {
    return {
      success: false,
      data: {
        reviews: [],
        statistics: {
          delicious: 0,
          kind: 0,
          cardAccepted: 0,
          clean: 0,
          generous: 0,
          total: 0
        }
      },
      message: '리뷰를 불러오는 중 오류가 발생했습니다.'
    };
  }
};

// 리뷰 작성 API (POST /api/review/upload)
export const uploadReview = async (reviewData) => {
  await delay(500);
  
  try {
    // 실제로는 데이터베이스에 저장하지 않고 성공 응답만 반환
    console.log('리뷰 작성 시뮬레이션:', reviewData);
    
    return {
      success: true,
      message: '리뷰가 성공적으로 등록되었습니다!'
    };
  } catch (error) {
    return {
      success: false,
      message: '리뷰 등록 중 오류가 발생했습니다.'
    };
  }
};

// 가맹점 상세 정보 조회 (단일 가맹점)
export const getStoreById = async (storeId) => {
  await delay(150);
  
  try {
    const store = stores.find(s => s.id === storeId);
    
    if (!store) {
      return {
        success: false,
        data: null,
        message: '해당 가맹점을 찾을 수 없습니다.'
      };
    }

    return {
      success: true,
      data: store,
      message: '가맹점 정보를 성공적으로 불러왔습니다.'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '가맹점 정보를 불러오는 중 오류가 발생했습니다.'
    };
  }
};

// 전체 가맹점 목록 조회 (지도용)
export const getAllStores = async () => {
  await delay(100);
  
  try {
    return {
      success: true,
      data: stores,
      message: `총 ${stores.length}개의 가맹점 정보를 불러왔습니다.`
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: '가맹점 정보를 불러오는 중 오류가 발생했습니다.'
    };
  }
};