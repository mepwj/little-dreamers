import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StoreInfo = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <InfoContainer onClick={handleClick}>
      <InfoTitle>{restaurant.name}</InfoTitle>
      <DetailsContainer>
        <DetailDiv>
          <Element>주소 | </Element>
          <InfoDetail>{restaurant.address}</InfoDetail>
        </DetailDiv>

        <DetailDiv>
          <Element>전화번호 | </Element>
          <InfoDetail>
            {restaurant.phone || "등록된 번호가 없습니다"}
          </InfoDetail>
        </DetailDiv>

        <DetailDiv>
          <Element>분류 | </Element>
          <InfoDetail>{restaurant.category}</InfoDetail>
        </DetailDiv>
      </DetailsContainer>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: 360px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  &::after {
    content: '클릭하여 자세히 보기 →';
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-size: 12px;
    color: #2ecc71;
    font-weight: 600;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const DetailDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Element = styled.strong`
  font-size: 14px;
  color: #7f8c8d;
  min-width: 70px;
`;

const InfoTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  padding: 0;
  border-bottom: 2px solid #2ecc71;
  padding-bottom: 12px;
`;

const InfoDetail = styled.div`
  font-size: 16px;
  color: #2c3e50;
  line-height: 1.5;
`;

export default StoreInfo;
