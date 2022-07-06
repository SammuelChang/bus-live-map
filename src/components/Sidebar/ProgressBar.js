import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro';

const ProgressContainer = styled.div`
  height: 20px;
  width: 100%;
  z-index: 100;
  margin: auto 0;
`;

const Progress = styled.div`
  background: rgba(0, 0, 0, 0.1);
  justify-content: flex-start;
  border-radius: 100px;
  align-items: center;
  position: relative;
  display: flex;
  height: 5px;
  position: relative;

  ${(props) => props.loading
    && css`
      background: #e63946;
      animation: shine 0.5s linear forwards infinite;
      @keyframes shine {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `}
`;

const ProgressValue = styled.div`
  animation: ${(props) => (props.run ? 'load' : '')} 10s linear forwards;
  box-shadow: 0 10px 40px -10px ${({ theme }) => theme.color};
  border-radius: 100px;
  background: ${({ theme }) => theme.color};
  height: 4px;
  width: 0;

  @keyframes load {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
`;

export default function ProgressBar({ loading, data }) {
  return (
    <ProgressContainer>
      <Progress loading={loading ? true : undefined}>
        <ProgressValue run={!loading && data.length !== 0} />
      </Progress>
    </ProgressContainer>
  );
}

ProgressBar.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
