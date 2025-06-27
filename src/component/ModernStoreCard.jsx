import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModernStoreCard = ({ store, onClose }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/restaurant/${store.id}`);
  };

  const handleReviewClick = () => {
    navigate(`/restaurant/${store.id}/review`);
  };

  // 카테고리별 이모지 매핑
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
    <CardContainer>
      <CloseButton onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </CloseButton>

      <CardHeader>
        <CategoryBadge>
          <span>{getCategoryEmoji(store.category)}</span>
          {store.category}
        </CategoryBadge>
        
        <StoreName>{store.name}</StoreName>
        <StoreAddress>{store.address}</StoreAddress>
      </CardHeader>

      <CardContent>
        <InfoSection>
          <InfoItem>
            <InfoIcon>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V8L11 11M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </InfoIcon>
            <InfoText>{store.phone || '전화번호 없음'}</InfoText>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 14C11 14 14 11 14 8C14 5 11 2 8 2C5 2 2 5 2 8C2 11 5 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </InfoIcon>
            <InfoText>{store.distance ? `${(store.distance / 1000).toFixed(1)}km` : '거리 정보 없음'}</InfoText>
          </InfoItem>
        </InfoSection>

        <MenuSection>
          <MenuTitle>대표 메뉴</MenuTitle>
          <MenuList>
            {store.menu && store.menu.slice(0, 3).map((item, index) => (
              <MenuItem key={index}>
                <MenuName>{item.name}</MenuName>
                <MenuPrice>{item.price.toLocaleString()}원</MenuPrice>
              </MenuItem>
            ))}
          </MenuList>
        </MenuSection>
      </CardContent>

      <CardActions>
        <ActionButton onClick={handleDetailClick} primary>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V10M10 10V16M10 10H16M10 10H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          상세정보
        </ActionButton>
        <ActionButton onClick={handleReviewClick}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5.5C3 4.67157 3.67157 4 4.5 4H15.5C16.3284 4 17 4.67157 17 5.5V13.5C17 14.3284 16.3284 15 15.5 15H7L3 18V5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          리뷰 쓰기
        </ActionButton>
      </CardActions>
    </CardContainer>
  );
};

export default ModernStoreCard;

// Styled Components
const CardContainer = styled.div`
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: slideUp 0.3s ease;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.neutral[100]};
  border-radius: 8px;
  color: ${props => props.theme.colors.neutral[600]};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.neutral[200]};
    transform: rotate(90deg);
  }
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${props => props.theme.colors.primary.soft};
  color: ${props => props.theme.colors.primary.main};
  border-radius: 20px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: 12px;
  
  span {
    font-size: 16px;
  }
`;

const StoreName = styled.h3`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: 8px;
`;

const StoreAddress = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[500]};
  line-height: 1.5;
`;

const CardContent = styled.div`
  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.neutral[100]};
  border-radius: 8px;
  color: ${props => props.theme.colors.neutral[600]};
`;

const InfoText = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[700]};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const MenuSection = styled.div`
  background: ${props => props.theme.colors.neutral[50]};
  border-radius: 16px;
  padding: 16px;
`;

const MenuTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.neutral[700]};
  margin-bottom: 12px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuName = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
`;

const MenuPrice = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.primary.main};
`;

const CardActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  background: ${props => props.primary ? props.theme.colors.primary.gradient : 'white'};
  color: ${props => props.primary ? 'white' : props.theme.colors.neutral[700]};
  border: ${props => props.primary ? 'none' : `1px solid ${props.theme.colors.neutral[200]}`};
  border-radius: 12px;
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary 
      ? '0 8px 20px rgba(102, 126, 234, 0.3)' 
      : '0 4px 12px rgba(0, 0, 0, 0.08)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;