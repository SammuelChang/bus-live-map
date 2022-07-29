import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  height: calc(100vh - 120px);
  background: ${({ theme }) => theme.background};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 0.5px solid gray;
  position: relative;

  & > * {
    color: ${({ theme }) => theme.color};
  }
`;
export default function Sidebar({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Sidebar.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.oneOfType([PropTypes.object]),
};
