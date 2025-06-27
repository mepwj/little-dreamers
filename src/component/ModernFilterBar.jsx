import React, { useState } from 'react';
import styled from 'styled-components';

const ModernFilterBar = ({ categories, selectedFilters, onFilterChange, totalCount }) => {
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = [
    "5,000원 이하",
    "5,000원 ~ 10,000원", 
    "10,000원 이상"
  ];

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterInfo>
          <FilterTitle>
            꼬망이들을 위한 가맹점
            <CountBadge>{totalCount}개</CountBadge>
          </FilterTitle>
          <FilterSubtitle>지도를 움직여 더 많은 가맹점을 찾아보세요</FilterSubtitle>
        </FilterInfo>
        
        <FilterToggle onClick={() => setShowFilters(!showFilters)} $active={showFilters}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 7H17M7 12H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="5" cy="7" r="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="15" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
          </svg>
          필터
        </FilterToggle>
      </FilterHeader>

      {showFilters && (
        <FilterContent>
          <FilterSection>
            <FilterLabel>카테고리</FilterLabel>
            <FilterChips>
              {categories.map(category => (
                <FilterChip
                  key={category}
                  $active={selectedFilters.category === category}
                  onClick={() => onFilterChange('category', category)}
                >
                  {category}
                </FilterChip>
              ))}
            </FilterChips>
          </FilterSection>

          <FilterSection>
            <FilterLabel>가격대</FilterLabel>
            <FilterChips>
              {priceRanges.map(range => (
                <FilterChip
                  key={range}
                  $active={selectedFilters.priceRange === range}
                  onClick={() => onFilterChange('priceRange', range)}
                >
                  {range}
                </FilterChip>
              ))}
            </FilterChips>
          </FilterSection>

          {(selectedFilters.category || selectedFilters.priceRange) && (
            <ClearButton onClick={() => {
              onFilterChange('category', null);
              onFilterChange('priceRange', null);
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              필터 초기화
            </ClearButton>
          )}
        </FilterContent>
      )}
    </FilterContainer>
  );
};

export default ModernFilterBar;

// Styled Components
const FilterContainer = styled.div`
  background: white;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.theme.colors.neutral[100]};
  transition: all 0.3s ease;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CountBadge = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.primary.main};
  background: ${props => props.theme.colors.primary.soft};
  padding: 4px 8px;
  border-radius: 6px;
`;

const FilterSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[500]};
`;

const FilterToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: ${props => props.$active ? props.theme.colors.primary.main : 'white'};
  color: ${props => props.$active ? 'white' : props.theme.colors.neutral[700]};
  border: 1px solid ${props => props.$active ? props.theme.colors.primary.main : props.theme.colors.neutral[200]};
  border-radius: 12px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const FilterContent = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.colors.neutral[100]};
  animation: slideDown 0.3s ease;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FilterSection = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.neutral[700]};
  margin-bottom: 10px;
`;

const FilterChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterChip = styled.button`
  padding: 8px 16px;
  background: ${props => props.$active ? props.theme.colors.primary.gradient : 'white'};
  color: ${props => props.$active ? 'white' : props.theme.colors.neutral[600]};
  border: 1px solid ${props => props.$active ? 'transparent' : props.theme.colors.neutral[200]};
  border-radius: 20px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px ${props => props.$active ? 'rgba(102, 126, 234, 0.3)' : 'rgba(0, 0, 0, 0.08)'};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  color: ${props => props.theme.colors.semantic.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-top: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.8;
    transform: translateX(2px);
  }
`;