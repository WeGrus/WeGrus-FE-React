import styled from "styled-components";

const SFormBox = styled.div`
  width: 292px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
`;

function FormBox({ children }) {
  return <SFormBox>{children}</SFormBox>;
}

export default FormBox;
