// 리뷰 더미 데이터

const storeReviews = {
  "1012257642": {
    reviews: [
      {
        id: "r001",
        content: "아이들이 정말 좋아해요! 치킨도 맛있고 사장님이 친절하세요.",
        grade: ["delicious", "kind"],
        createdAt: "2024-01-15T10:30:00Z",
        userId: "user001"
      },
      {
        id: "r002",
        content: "카드 결제 잘 되고 매장도 깔끔해요.",
        grade: ["cardAccepted", "clean"],
        createdAt: "2024-01-10T14:20:00Z",
        userId: "user002"
      },
      {
        id: "r003",
        content: "양이 많고 맛있어요. 재방문 의사 있습니다!",
        grade: ["delicious", "generous"],
        createdAt: "2024-01-05T18:45:00Z",
        userId: "user003"
      }
    ],
    statistics: {
      delicious: 12,
      kind: 8,
      cardAccepted: 15,
      clean: 6,
      generous: 4,
      total: 15
    }
  },
  "1039915955": {
    reviews: [
      {
        id: "r004",
        content: "가정식 같은 느낌이에요. 아이들 먹기에 좋아요.",
        grade: ["delicious", "kind"],
        createdAt: "2024-01-20T12:15:00Z",
        userId: "user004"
      },
      {
        id: "r005",
        content: "사장님이 아이들에게 정말 친절하세요!",
        grade: ["kind"],
        createdAt: "2024-01-18T13:30:00Z",
        userId: "user005"
      }
    ],
    statistics: {
      delicious: 8,
      kind: 12,
      cardAccepted: 10,
      clean: 7,
      generous: 5,
      total: 10
    }
  },
  "1078335964": {
    reviews: [
      {
        id: "r006",
        content: "편의점이지만 카드 결제 잘 되고 도시락도 맛있어요.",
        grade: ["cardAccepted"],
        createdAt: "2024-01-22T09:00:00Z",
        userId: "user006"
      },
      {
        id: "r007",
        content: "24시간 운영이라 좋아요. 간단하게 먹기 좋습니다.",
        grade: ["cardAccepted", "convenient"],
        createdAt: "2024-01-20T21:15:00Z",
        userId: "user007"
      }
    ],
    statistics: {
      delicious: 3,
      kind: 5,
      cardAccepted: 18,
      clean: 8,
      generous: 2,
      total: 18
    }
  },
  "1093107814": {
    reviews: [
      {
        id: "r008",
        content: "꽈배기가 정말 맛있어요! 아이들 간식으로 최고!",
        grade: ["delicious"],
        createdAt: "2024-01-25T15:45:00Z",
        userId: "user008"
      },
      {
        id: "r009",
        content: "따뜻하고 맛있어요. 가격도 착해요.",
        grade: ["delicious", "affordable"],
        createdAt: "2024-01-23T16:20:00Z",
        userId: "user009"
      }
    ],
    statistics: {
      delicious: 14,
      kind: 6,
      cardAccepted: 12,
      clean: 9,
      generous: 3,
      total: 12
    }
  },
  "1115319257": {
    reviews: [
      {
        id: "r010",
        content: "돈까스가 바삭하고 맛있어요. 아이들이 좋아해요.",
        grade: ["delicious"],
        createdAt: "2024-01-28T12:30:00Z",
        userId: "user010"
      },
      {
        id: "r011",
        content: "양이 많고 가격도 합리적이에요.",
        grade: ["generous", "affordable"],
        createdAt: "2024-01-26T13:15:00Z",
        userId: "user011"
      }
    ],
    statistics: {
      delicious: 9,
      kind: 7,
      cardAccepted: 11,
      clean: 8,
      generous: 8,
      total: 11
    }
  },
  "1118820365": {
    reviews: [
      {
        id: "r012",
        content: "일식 돈가스 맛집이에요! 사장님도 친절하세요.",
        grade: ["delicious", "kind"],
        createdAt: "2024-01-30T14:00:00Z",
        userId: "user012"
      }
    ],
    statistics: {
      delicious: 6,
      kind: 4,
      cardAccepted: 8,
      clean: 5,
      generous: 3,
      total: 8
    }
  },
  "1128177568": {
    reviews: [
      {
        id: "r013",
        content: "커피 맛도 좋고 아이들 간식도 있어요.",
        grade: ["delicious"],
        createdAt: "2024-02-01T10:45:00Z",
        userId: "user013"
      }
    ],
    statistics: {
      delicious: 7,
      kind: 5,
      cardAccepted: 13,
      clean: 10,
      generous: 2,
      total: 13
    }
  },
  "1130705156": {
    reviews: [
      {
        id: "r014",
        content: "고기 맛이 정말 좋아요! 가족 식사로 추천합니다.",
        grade: ["delicious", "kind"],
        createdAt: "2024-02-03T18:30:00Z",
        userId: "user014"
      }
    ],
    statistics: {
      delicious: 5,
      kind: 3,
      cardAccepted: 7,
      clean: 4,
      generous: 4,
      total: 7
    }
  },
  "1142296603": {
    reviews: [
      {
        id: "r015",
        content: "일식 전문점이라 그런지 정말 맛있어요.",
        grade: ["delicious", "clean"],
        createdAt: "2024-02-05T19:15:00Z",
        userId: "user015"
      }
    ],
    statistics: {
      delicious: 4,
      kind: 2,
      cardAccepted: 6,
      clean: 6,
      generous: 2,
      total: 6
    }
  }
};

// 리뷰 옵션 매핑
const reviewOptions = {
  delicious: { emoji: "🍴", text: "맛있어요", color: "#FF6B6B" },
  kind: { emoji: "😊", text: "친절해요", color: "#4ECDC4" },
  cardAccepted: { emoji: "💳", text: "카드결제 잘돼요", color: "#45B7D1" },
  clean: { emoji: "✨", text: "깨끗해요", color: "#96CEB4" },
  generous: { emoji: "🍽️", text: "양이 많아요", color: "#FFEAA7" },
  affordable: { emoji: "💰", text: "가격이 착해요", color: "#DDA0DD" },
  convenient: { emoji: "⏰", text: "편리해요", color: "#F39C12" }
};

export { storeReviews, reviewOptions };