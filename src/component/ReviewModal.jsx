import React, { useState } from "react";
import styled from "styled-components";
import { uploadReview } from "../services/dummyApi";

const ReviewModal = ({ isOpen, onClose, storeId, storeName, onReviewSubmitted }) => {
  const [customReview, setCustomReview] = useState("");
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedReviews = [
    { id: 1, label: "음식이 맛있어요", polarOpposite: 2 },
    { id: 2, label: "음식이 맛없어요", polarOpposite: 1 },
    { id: 3, label: "친절해요", polarOpposite: 4 },
    { id: 4, label: "불친절해요", polarOpposite: 3 },
    { id: 5, label: "아동급식카드 받아요", polarOpposite: 6 },
    { id: 6, label: "아동급식카드 안받아요", polarOpposite: 5 },
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

    setIsSubmitting(true);
    
    try {
      const reviewRequest = {
        user_id: 1,
        store_id: storeId,
        content: finalReview,
        grade: selectedReviews
      };

      const result = await uploadReview(reviewRequest);

      if (result.success) {
        alert("리뷰가 제출되었습니다!");
        setCustomReview("");
        setSelectedReviews([]);
        onReviewSubmitted();
        onClose();
      } else {
        alert("리뷰 제출 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("리뷰 제출 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{storeName} 리뷰 작성</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <Section>
            <SectionTitle>어떤 점이 좋았나요?</SectionTitle>
            <ButtonGrid>
              {predefinedReviews.map((review) => (
                <ToggleButton
                  key={review.id}
                  selected={selectedReviews.includes(review.id)}
                  onClick={() => handleReviewToggle(review.id)}
                >
                  {review.label}
                </ToggleButton>
              ))}
            </ButtonGrid>
          </Section>

          <Section>
            <SectionTitle>자세한 리뷰를 남겨주세요 (선택사항)</SectionTitle>
            <TextArea
              value={customReview}
              onChange={handleCustomReviewChange}
              placeholder="맛있었어요! 다음에 또 올게요..."
              maxLength={100}
            />
            <CharCount>{customReview.length}/100</CharCount>
          </Section>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "제출 중..." : "리뷰 등록"}
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ReviewModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #666;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

const Section = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ToggleButton = styled.button`
  padding: 12px 16px;
  border: 2px solid ${props => props.selected ? '#2ecc71' : '#e0e0e0'};
  background: ${props => props.selected ? '#2ecc71' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #2ecc71;
    background: ${props => props.selected ? '#27ae60' : '#f5f5f5'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #2ecc71;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
`;

const ModalFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: #2ecc71;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #27ae60;
  }
  
  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;