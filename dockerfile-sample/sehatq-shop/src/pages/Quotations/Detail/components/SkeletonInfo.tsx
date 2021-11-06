import styled from '@emotion/styled';
import React, { FC, memo } from 'react';
import ContentLoader from 'react-content-loader';

const Grid = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  margin-bottom: 16px;
`;

const Box: FC<{ count: number, column?: number }> = memo(({ count, column = 2 }) => {
  const min = column === 2 ? 100 : 200;
  const max = column === 2 ? 150 : 450;
  const width = () => Math.floor(Math.random() * (max - min)) + min;

  return (
    <div className="border-n-20 rounded overflow-hidden">
      <div className="p-3 border-bottom-n-20">
        <ContentLoader
          width="100%"
          height={20}
          speed={2.5}
          backgroundColor="var(--n-20)"
          foregroundColor="var(--n-10)"
        >
          <rect x="0" y="0" rx="2" ry="2" width="130" height="20" />
        </ContentLoader>
      </div>
      <div className="p-3">
        {Array.from(Array(count).keys()).map(i => (
          <div className="row mb-2" key={i}>
            <div className={`col-${12 / column}`}>
              <ContentLoader
                width="100%"
                height={24}
                speed={2.5}
                backgroundColor="var(--n-20)"
                foregroundColor="var(--n-10)"
              >
                <rect x="0" y="0" rx="2" ry="2" width={width()} height="16" />
              </ContentLoader>
            </div>
            <div className={`col-${12 / column}`}>
              <ContentLoader
                width="100%"
                height={24}
                speed={2.5}
                backgroundColor="var(--n-20)"
                foregroundColor="var(--n-10)"
              >
                <rect x="0" y="0" rx="2" ry="2" width={width()} height="16" />
              </ContentLoader>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const SkeletonInfo: FC = () => (
  <div className="mt-2">
    <ContentLoader
      width="100%"
      height={66}
      speed={2.5}
      backgroundColor="var(--n-20)"
      foregroundColor="var(--n-10)"
    >
      <rect x="0" y="0" rx="2" ry="2" width="270" height="22" />
      <rect x="0" y="38" rx="2" ry="2" width="115" height="16" />
      <rect x="123" y="34" rx="12" ry="12" width="40" height="24" />
    </ContentLoader>
    <Grid>
      <Box count={7} />
      <Box count={10} />
      <Box count={4} />
    </Grid>
    <Box count={1} column={1} />
  </div>
);

export default memo(SkeletonInfo);
