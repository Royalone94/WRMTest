import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from '../ErrorBoundary';

const StyledLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.palette.background.nearBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PrimaryRoutes = ({routes}) => {
  return (
    <StyledLayout>
      <StyledContent>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Routes>
              {routes.map(({path, component: Component}) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </StyledContent>
    </StyledLayout>
  );
};
