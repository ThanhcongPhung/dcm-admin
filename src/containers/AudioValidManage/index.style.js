import styled from 'styled-components';

const AudioValidManageStyled = styled.div`
  .container {
    min-height: 70vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    align-items: center;
    margin-bottom: 20px;
    .headTitle {
      text-transform: uppercase;
    }
    .headButtons {
      display: flex;
      justify-content: flex-end;
      justify-content: center;
    }
  }
  .group-button {
    margin-left: 10px;
  }
  .audio-list {
    flex: 1;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
`;

export { AudioValidManageStyled };
