import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { uploadReview } from "../services/dummyApi";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantName } = location.state || {};
  const [customReview, setCustomReview] = useState("");
  const [selectedReviews, setSelectedReviews] = useState([]);

  const predefinedReviews = [
    { id: 1, label: "음식이 맛있어요", polarOpposite: 2, icon: "😋", color: "red" },
    { id: 2, label: "음식이 맛없어요", polarOpposite: 1, icon: "😞", color: "gray" },
    { id: 3, label: "친절해요", polarOpposite: 4, icon: "😊", color: "green" },
    { id: 4, label: "불친절해요", polarOpposite: 3, icon: "😠", color: "gray" },
    { id: 5, label: "아동급식카드 받아요", polarOpposite: 6, icon: "💳", color: "blue" },
    { id: 6, label: "아동급식카드 안받아요", polarOpposite: 5, icon: "❌", color: "gray" },
  ];

  const handleCustomReviewChange = (e) => {
    setCustomReview(e.target.value);
  };

  const handleReviewToggle = (id) => {
    const selectedReview = predefinedReviews.find((review) => review.id === id);
    const polarOppositeReviewId = selectedReview.polarOpposite;

    if (selectedReviews.includes(id)) {
      setSelectedReviews(selectedReviews.filter((reviewId) => reviewId !== id));
    } else {
      setSelectedReviews([
        ...selectedReviews.filter(
          (reviewId) => reviewId !== polarOppositeReviewId
        ),
        id,
      ]);
    }
  };

  const handleSubmit = async () => {
    const finalReview =
      customReview ||
      selectedReviews
        .map((id) => predefinedReviews.find((review) => review.id === id).label)
        .join(", ");
    if (!finalReview) {
      alert("리뷰를 작성하거나 선택해주세요.");
      return;
    }

    const restaurantId = location.pathname.split("/")[2];

    try {
      const reviewRequest = {
        user_id: 1,
        store_id: restaurantId,
        content: finalReview,
        grade: selectedReviews
      };

      const result = await uploadReview(reviewRequest);

      if (result.success) {
        alert("리뷰가 제출되었습니다!");
        navigate(`/restaurant/${restaurantId}`);
      } else {
        console.error("Error submitting review:", result.message);
        alert("리뷰 제출 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("리뷰 제출 중 오류가 발생했습니다.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
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
        <ReviewCard>
          <CardHeader>
            <PageTitle>
              {restaurantName ? `${restaurantName}` : "리뷰 작성"}
            </PageTitle>
            <PrivacyNotice>
              <PrivacyIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </PrivacyIcon>
              리뷰는 익명으로 작성됩니다
            </PrivacyNotice>
          </CardHeader>

          <ReviewForm>
            <FormSection>
              <FormLabel>자유롭게 리뷰를 작성해주세요</FormLabel>
              <TextArea
                placeholder="이곳에서의 경험을 자세히 알려주세요..."
                value={customReview}
                onChange={handleCustomReviewChange}
                rows={4}
              />
            </FormSection>
            
            <FormSection>
              <FormLabel>또는 아래 항목을 선택해주세요</FormLabel>
              <ReviewOptionsGrid>
                {predefinedReviews.map((review, index) => {
                  if (index % 2 === 0) {
                    const oppositeReview = predefinedReviews.find(
                      (r) => r.id === review.polarOpposite
                    );
                    return (
                      <OptionRow key={review.id}>
                        <ReviewOption
                          onClick={() => handleReviewToggle(review.id)}
                          $color={review.color}
                          $isSelected={selectedReviews.includes(review.id)}
                        >
                          <OptionEmoji>{review.icon}</OptionEmoji>
                          <OptionText>{review.label}</OptionText>
                        </ReviewOption>
                        <ReviewOption
                          onClick={() => handleReviewToggle(oppositeReview.id)}
                          $color={oppositeReview.color}
                          $isSelected={selectedReviews.includes(oppositeReview.id)}
                        >
                          <OptionEmoji>{oppositeReview.icon}</OptionEmoji>
                          <OptionText>{oppositeReview.label}</OptionText>
                        </ReviewOption>
                      </OptionRow>
                    );
                  }
                  return null;
                })}
              </ReviewOptionsGrid>
            </FormSection>

            <SubmitSection>
              <SubmitButton onClick={handleSubmit}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                리뷰 작성하기
              </SubmitButton>
            </SubmitSection>
          </ReviewForm>
        </ReviewCard>

        <GuideCard>
          <GuideHeader>
            <GuideIcon>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </GuideIcon>
            <GuideTitle>리뷰 작성 안내</GuideTitle>
          </GuideHeader>
          <GuideList>
            <GuideItem>• 직접 경험한 내용을 솔직하게 작성해주세요</GuideItem>
            <GuideItem>• 다른 이용자에게 도움이 되는 정보를 포함해주세요</GuideItem>
            <GuideItem>• 개인정보나 부적절한 내용은 포함하지 말아주세요</GuideItem>
          </GuideList>
        </GuideCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Review;

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
  max-width: 768px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const ReviewCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.base};
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const PrivacyNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
`;

const PrivacyIcon = styled.div`
  color: ${props => props.theme.colors.neutral[500]};
`;

const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[8]};
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const FormLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[900]};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing[4]};
  border: 2px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-family: inherit;
  resize: none;
  transition: ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.soft};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.neutral[400]};
  }
`;

const ReviewOptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const OptionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[3]};
`;

const ReviewOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[4]};
  border: 2px solid;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.fast};
  
  ${props => {
    const isSelected = props.$isSelected;
    const color = props.$color;
    
    if (isSelected) {
      if (color === 'red') return `
        background: #ef4444;
        border-color: #ef4444;
        color: white;
      `;
      if (color === 'green') return `
        background: #10b981;
        border-color: #10b981;
        color: white;
      `;
      if (color === 'blue') return `
        background: #3b82f6;
        border-color: #3b82f6;
        color: white;
      `;
      return `
        background: ${props.theme.colors.neutral[500]};
        border-color: ${props.theme.colors.neutral[500]};
        color: white;
      `;
    } else {
      if (color === 'red') return `
        background: #fef2f2;
        border-color: #fecaca;
        color: #dc2626;
        &:hover {
          background: #fee2e2;
        }
      `;
      if (color === 'green') return `
        background: #f0fdf4;
        border-color: #bbf7d0;
        color: #059669;
        &:hover {
          background: #dcfce7;
        }
      `;
      if (color === 'blue') return `
        background: #eff6ff;
        border-color: #bfdbfe;
        color: #2563eb;
        &:hover {
          background: #dbeafe;
        }
      `;
      return `
        background: ${props.theme.colors.neutral[50]};
        border-color: ${props.theme.colors.neutral[200]};
        color: ${props.theme.colors.neutral[700]};
        &:hover {
          background: ${props.theme.colors.neutral[100]};
        }
      `;
    }
  }}
`;

const OptionEmoji = styled.span`
  font-size: 20px;
`;

const OptionText = styled.span``;

const SubmitSection = styled.div`
  padding-top: ${props => props.theme.spacing[4]};
  border-top: 1px solid ${props => props.theme.colors.neutral[200]};
`;

const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  background: ${props => props.theme.colors.primary.gradient};
  color: white;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.purple};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const GuideCard = styled.div`
  background: ${props => props.theme.colors.accent.teal}15;
  border: 1px solid ${props => props.theme.colors.accent.teal}30;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing[6]};
`;

const GuideHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const GuideIcon = styled.div`
  color: ${props => props.theme.colors.accent.teal};
`;

const GuideTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.neutral[800]};
`;

const GuideList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
`;

const GuideItem = styled.li`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[700]};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;