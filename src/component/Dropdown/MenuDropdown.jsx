import { useState, useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 40px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #2ecc71;
  }
  
  &::after {
    content: '▼';
    font-size: 10px;
    color: #666;
    transition: transform 0.2s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  flex: 1;
`;

const DropBox = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f0f9ff;
    color: #2ecc71;
    padding-left: 20px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  max-height: 240px;
  overflow-y: auto;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 45px;
  z-index: 100;
  animation: fadeIn 0.2s ease;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

const MenuDropdown = ({ onClick, selectedDropValue, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = useCallback(
    (event) => {
      onClick(event);
      setIsOpen(false); // 메뉴 아이템 클릭 시 드롭다운 닫기
    },
    [onClick]
  );

  return (
    <Container>
      <BoxContainer onClick={handleOpen} isOpen={isOpen}>
        <SelectBox>{selectedDropValue}</SelectBox>
      </BoxContainer>
      {isOpen && (
        <ListContainer>
          {categories.map((category, index) => (
            <DropBox key={index} onClick={handleItemClick}>
              {category}
            </DropBox>
          ))}
        </ListContainer>
      )}
    </Container>
  );
};

export default MenuDropdown;
