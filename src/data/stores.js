// 가맹점 더미 데이터

const stores = [
  {
    id: "1012257642",
    name: "푸라닭 이도점",
    address: "제주특별자치도 제주시 이도이동 2039-2",
    phone: "0507-1345-9236",
    category: "음식점, 치킨,닭강정",
    latitude: 33.487164,
    longitude: 126.5329004,
    image: null
  },
  {
    id: "1039915955",
    name: "루스트플레이스 구남점",
    address: "제주특별자치도 제주시 아라일동 6035-3",
    phone: "064-758-9004",
    category: "음식점, 패밀리레스토랑",
    latitude: 33.485089,
    longitude: 126.535365,
    image: null
  },
  {
    id: "1078335964",
    name: "GS25 제주구남점",
    address: "제주특별자치도 제주시 아라일동 6033-10",
    phone: "064-721-2002",
    category: "생활,편의, 편의점",
    latitude: 33.485809,
    longitude: 126.535716,
    image: null
  },
  {
    id: "1093107814",
    name: "못난이꽈배기 제주이도점",
    address: "제주특별자치도 제주시 이도이동 1974-14 1층",
    phone: "064-752-9022",
    category: "카페,디저트, 베이커리",
    latitude: 33.4924397,
    longitude: 126.5401449,
    image: null
  },
  {
    id: "1115319257",
    name: "윤옥 본점",
    address: "제주특별자치도 제주시 이도이동 2003-3",
    phone: "0507-1318-4636",
    category: "일식, 일식당",
    latitude: 33.4891656,
    longitude: 126.5357483,
    image: null
  },
  {
    id: "1118820365",
    name: "카미나무",
    address: "제주특별자치도 제주시 이도이동 1979-19 지하1층",
    phone: "0507-1339-7172",
    category: "일식, 돈가스",
    latitude: 33.4898507,
    longitude: 126.5401198,
    image: null
  },
  {
    id: "1128177568",
    name: "빽다방 제주이도초교점",
    address: "제주특별자치도 제주시 이도이동 2036-1 1층",
    phone: "064-723-2279",
    category: "카페,디저트, 테이크아웃커피",
    latitude: 33.489045,
    longitude: 126.5340756,
    image: null
  },
  {
    id: "1130705156",
    name: "대패랑 도남점",
    address: "제주특별자치도 제주시 도남동 66-4",
    phone: "",
    category: "한식, 돼지고기구이",
    latitude: 33.4909377,
    longitude: 126.5285426,
    image: null
  },
  {
    id: "1142296603",
    name: "벵삭 제주점",
    address: "제주특별자치도 제주시 이도이동 1999-3 1층",
    phone: "0507-1458-1197",
    category: "일식, 일식당",
    latitude: 33.4900568,
    longitude: 126.5361985,
    image: null
  },
  {
    id: "1201234567",
    name: "제주돈까스 연동점",
    address: "제주특별자치도 제주시 연동 312-14",
    phone: "064-742-5678",
    category: "일식, 돈가스",
    latitude: 33.4890123,
    longitude: 126.4912345,
    image: null
  },
  {
    id: "1201234568",
    name: "맘스터치 제주신제주점",
    address: "제주특별자치도 제주시 이도이동 1455-3",
    phone: "064-757-8901",
    category: "음식점, 햄버거",
    latitude: 33.4923456,
    longitude: 126.5234567,
    image: null
  },
  {
    id: "1201234569",
    name: "파리바게뜨 제주중앙점",
    address: "제주특별자치도 제주시 일도이동 1436-7",
    phone: "064-758-1234",
    category: "카페,디저트, 베이커리",
    latitude: 33.5123456,
    longitude: 126.5345678,
    image: null
  },
  {
    id: "1201234570",
    name: "CU 제주대학교점",
    address: "제주특별자치도 제주시 아라일동 1번지",
    phone: "064-754-5678",
    category: "생활,편의, 편의점",
    latitude: 33.4567890,
    longitude: 126.5678901,
    image: null
  },
  {
    id: "1201234571",
    name: "제주순대국 본점",
    address: "제주특별자치도 제주시 건입동 1234-5",
    phone: "064-722-9876",
    category: "한식, 순대국",
    latitude: 33.4987654,
    longitude: 126.5432109,
    image: null
  },
  {
    id: "1201234572",
    name: "투썸플레이스 제주연동점",
    address: "제주특별자치도 제주시 연동 298-15",
    phone: "064-746-1357",
    category: "카페,디저트, 카페",
    latitude: 33.4765432,
    longitude: 126.4876543,
    image: null
  }
];

// 가맹점 메뉴 더미 데이터
const storeMenus = {
  "1012257642": {
    store: {
      id: "1012257642",
      name: "푸라닭 이도점",
      address: "제주특별자치도 제주시 이도이동 2039-2",
      phone: "0507-1345-9236",
      category: "음식점, 치킨,닭강정"
    },
    menus: [
      { name: "푸라닭 오리지널", price: "16,000" },
      { name: "푸라닭 양념", price: "17,000" },
      { name: "푸라닭 반반", price: "17,000" },
      { name: "닭강정", price: "15,000" },
      { name: "감자튀김", price: "3,000" }
    ]
  },
  "1039915955": {
    store: {
      id: "1039915955",
      name: "루스트플레이스 구남점",
      address: "제주특별자치도 제주시 아라일동 6035-3",
      phone: "064-758-9004",
      category: "음식점, 패밀리레스토랑"
    },
    menus: [
      { name: "불고기 정식", price: "12,000" },
      { name: "제육볶음 정식", price: "11,000" },
      { name: "생선구이 정식", price: "13,000" },
      { name: "김치찌개", price: "8,000" },
      { name: "된장찌개", price: "7,000" }
    ]
  },
  "1078335964": {
    store: {
      id: "1078335964",
      name: "GS25 제주구남점",
      address: "제주특별자치도 제주시 아라일동 6033-10",
      phone: "064-721-2002",
      category: "생활,편의, 편의점"
    },
    menus: [
      { name: "도시락", price: "4,500" },
      { name: "삼각김밥", price: "1,200" },
      { name: "컵라면", price: "1,800" },
      { name: "샌드위치", price: "3,500" },
      { name: "음료수", price: "1,500" }
    ]
  },
  "1093107814": {
    store: {
      id: "1093107814",
      name: "못난이꽈배기 제주이도점",
      address: "제주특별자치도 제주시 이도이동 1974-14 1층",
      phone: "064-752-9022",
      category: "카페,디저트, 베이커리"
    },
    menus: [
      { name: "못난이꽈배기", price: "1,500" },
      { name: "크림꽈배기", price: "2,000" },
      { name: "초코꽈배기", price: "2,000" },
      { name: "아메리카노", price: "3,000" },
      { name: "카페라떼", price: "4,000" }
    ]
  },
  "1115319257": {
    store: {
      id: "1115319257",
      name: "윤옥 본점",
      address: "제주특별자치도 제주시 이도이동 2003-3",
      phone: "0507-1318-4636",
      category: "일식, 일식당"
    },
    menus: [
      { name: "돈까스", price: "10,000" },
      { name: "치킨까스", price: "11,000" },
      { name: "생선까스", price: "12,000" },
      { name: "우동", price: "6,000" },
      { name: "라면", price: "5,000" }
    ]
  }
};

export { stores, storeMenus };