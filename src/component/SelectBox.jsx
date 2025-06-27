import styled from "styled-components";

const BoxStyle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #2ecc71;
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #27ae60;
    transform: scale(1.05);
  }
  
  &:after {
    content: '×';
    font-size: 18px;
    font-weight: 300;
    margin-left: 4px;
  }
`;

const SelectBox = ({ data, onClickKeyword }) => {
  return <BoxStyle onClick={onClickKeyword}>{data}</BoxStyle>;
};

export default SelectBox;
