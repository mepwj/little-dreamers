import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getStoreMenu, getStoreReviews } from "../services/dummyApi";
import ReviewModal from "../component/ReviewModal";
import LoadingSpinner from "../component/LoadingSpinner";

const Restaurant = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  const handleWriteReview = () => {
    setIsReviewModalOpen(true);
  };
  
  const fetchReviewsData = async () => {
    try {
      const result = await getStoreReviews(id);
      const reviewData = result.data;
      
      if (reviewData.reviews && reviewData.reviews.length > 0) {
        setReviews(reviewData);
      } else {
        setReviews({ reviews: [], statistics: {} });
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews({ reviews: [], statistics: {} });
    } finally {
      setReviewsLoaded(true);
    }
  };

  const handleReviewSubmitted = () => {
    fetchReviewsData();
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const result = await getStoreMenu(id);
        const fetchedData = result.data;

        if (!fetchedData) {
          console.error("가맹점 데이터를 찾을 수 없습니다.");
          return;
        }

        const formattedData = {
          id: fetchedData.store.id,
          store: {
            name: fetchedData.store.name,
            address: fetchedData.store.address,
            phone: fetchedData.store.phone,
            category: fetchedData.store.category,
          },
          menu:
            fetchedData.menus && fetchedData.menus.length > 0
              ? fetchedData.menus.map((item) => ({
                  name: item.name,
                  price: item.price,
                }))
              : null,
        };

        setRestaurantData(formattedData);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurantData();
    fetchReviewsData();
  }, [id]);

  if (!restaurantData) {
    return (
      <LoadingContainer>
        <LoadingSpinner message="가맹점 정보를 불러오는 중입니다..." />
      </LoadingContainer>
    );
  }

  const getCategoryEmoji = (category) => {
    const emojiMap = {
      '한식': '🍚',
      '중식': '🥟', 
      '양식': '🍝',
      '일식': '🍱',
      '분식': '🍜',
      '카페': '☕',
      '패스트푸드': '🍔',
      '치킨': '🍗',
      '피자': '🍕',
      '기타': '🍴'
    };
    return emojiMap[category] || '🍴';
  };

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={handleGoBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          뒤로가기
        </BackButton>
      </Header>
      
      <ContentWrapper>
        <MainCard>
          <CardHeader>
            <CategoryBadge>
              <span>{getCategoryEmoji(restaurantData.store.category)}</span>
              {restaurantData.store.category}
            </CategoryBadge>
            <StoreName>{restaurantData.store.name}</StoreName>
          </CardHeader>
          
          <InfoSection>
            <InfoItem>
              <InfoIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </InfoIcon>
              <InfoText>{restaurantData.store.address}</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </InfoIcon>
              <InfoText>{restaurantData.store.phone}</InfoText>
            </InfoItem>
          </InfoSection>
        </MainCard>
        
        <MenuCard>
          <SectionHeader>
            <SectionTitle>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              메뉴
            </SectionTitle>
          </SectionHeader>
          
          {restaurantData.menu ? (
            <MenuList>
              {restaurantData.menu.map((item, index) => (
                <MenuItem key={index}>
                  <MenuName>{item.name}</MenuName>
                  <MenuPrice>{item.price.toLocaleString()}원</MenuPrice>
                </MenuItem>
              ))}
            </MenuList>
          ) : (
            <EmptyState>
              <EmptyIcon>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 24C26.21 24 28 22.21 28 20C28 17.79 26.21 16 24 16C21.79 16 20 17.79 20 20C20 22.21 21.79 24 24 24Z" fill="currentColor"/>
                  <path d="M24 28C18.48 28 14 32.48 14 38V40H34V38C34 32.48 29.52 28 24 28Z" fill="currentColor"/>
                </svg>
              </EmptyIcon>
              <EmptyText>메뉴 정보가 없습니다.</EmptyText>
            </EmptyState>
          )}
        </MenuCard>
        
        <ReviewCard>
          <ReviewHeader>
            <SectionTitle>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              리뷰
            </SectionTitle>
            <WriteReviewButton onClick={handleWriteReview}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              리뷰 작성하기
            </WriteReviewButton>
          </ReviewHeader>
          
          <StatsGrid>
            <StatItem>
              <StatNumber>{reviews.reviews ? reviews.reviews.length : 0}</StatNumber>
              <StatLabel>총 리뷰</StatLabel>
            </StatItem>
            <StatItem $color="red">
              <StatNumber>{reviews.statistics ? reviews.statistics.delicious : 0}</StatNumber>
              <StatLabel>맛있어요</StatLabel>
            </StatItem>
            <StatItem $color="green">
              <StatNumber>{reviews.statistics ? reviews.statistics.kind : 0}</StatNumber>
              <StatLabel>친절해요</StatLabel>
            </StatItem>
            <StatItem $color="blue">
              <StatNumber>{reviews.statistics ? reviews.statistics.cardAccepted : 0}</StatNumber>
              <StatLabel>카드 받아요</StatLabel>
            </StatItem>
          </StatsGrid>
          
          <ReviewList>
            {reviewsLoaded && (!reviews.reviews || reviews.reviews.length === 0) ? (
              <EmptyState>
                <EmptyIcon>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </EmptyIcon>
                <EmptyText>아직 리뷰가 없습니다</EmptyText>
                <EmptySubtext>첫 번째 리뷰를 작성해보세요!</EmptySubtext>
              </EmptyState>
            ) : (
              reviews.reviews && reviews.reviews.map((review, index) => (
                <ReviewItem key={index}>
                  <ReviewAvatar>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </ReviewAvatar>
                  <ReviewContent>
                    <ReviewAuthor>익명의 누군가</ReviewAuthor>
                    <ReviewText>{review.content}</ReviewText>
                  </ReviewContent>
                </ReviewItem>
              ))
            )}
          </ReviewList>
        </ReviewCard>
      </ContentWrapper>
      
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        storeId={id}
        storeName={restaurantData.store.name}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </PageContainer>
  );
};

export default Restaurant;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.neutral[50]};
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  z-index: ${props => props.theme.zIndex[10]};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.neutral[600]};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.neutral[800]};
  }
`;

const ContentWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const MainCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.base};
`;

const CardHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  background: ${props => props.theme.colors.primary.soft};
  color: ${props => props.theme.colors.primary.main};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing[4]};
  
  span {
    font-size: 18px;
  }
`;

const StoreName = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.neutral[100]};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.neutral[600]};
`;

const InfoText = styled.span`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.neutral[700]};
`;

const MenuCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.base};
`;

const SectionHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
  
  svg {
    color: ${props => props.theme.colors.accent.amber};
  }
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[4]};
  background: ${props => props.theme.colors.neutral[50]};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.neutral[100]};
  }
`;

const MenuName = styled.span`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[900]};
`;

const MenuPrice = styled.span`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.accent.amber};
`;

const ReviewCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.base};
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[6]};
  
  ${SectionTitle} svg {
    color: ${props => props.theme.colors.accent.teal};
  }
`;

const WriteReviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  background: ${props => props.theme.colors.primary.gradient};
  color: white;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.purple};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[4]};
  background: ${props => {
    if (props.$color === 'red') return '#fef2f2';
    if (props.$color === 'green') return '#f0fdf4';
    if (props.$color === 'blue') return '#eff6ff';
    return props.theme.colors.neutral[50];
  }};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const ReviewItem = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.neutral[50]};
  }
`;

const ReviewAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.neutral[300]};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.neutral[600]};
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const ReviewAuthor = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const ReviewText = styled.div`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.neutral[700]};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[12]} ${props => props.theme.spacing[4]};
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${props => props.theme.spacing[4]};
  background: ${props => props.theme.colors.neutral[100]};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.neutral[400]};
`;

const EmptyText = styled.div`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const EmptySubtext = styled.div`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.neutral[500]};
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.neutral[50]};
`;