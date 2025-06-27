import styled from "styled-components";

const HeaderStyle = styled.header`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: white;
  margin: 0;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'Noto Sans KR', sans-serif;
  
  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-left: 10px;
  letter-spacing: 0.5px;
  
  @media (max-width: 600px) {
    display: none;
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <Title>
        꼬망이들
        <Subtitle>아동급식카드 가맹점 찾기</Subtitle>
      </Title>
    </HeaderStyle>
  );
};

export default Header;
