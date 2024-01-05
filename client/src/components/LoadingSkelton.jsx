import React from "react";
import ContentLoader from "react-content-loader";

const FeeLoadingSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={800}
      height={200}
      viewBox="0 0 800 200"
      backgroundColor="#f3f3f8"
      foregroundColor="#ecebfb"
    >
      {/* Row 1 */}
      <rect x="0" y="10" rx="3" ry="3" width="150" height="15" />
      <rect x="170" y="10" rx="3" ry="3" width="150" height="15" />
      <rect x="340" y="10" rx="3" ry="3" width="150" height="15" />
      <rect x="510" y="10" rx="3" ry="3" width="150" height="15" />

      {/* Row 2 */}
      <rect x="0" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="170" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="340" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="510" y="40" rx="3" ry="3" width="150" height="15" />
      {/* Row 3 */}
      <rect x="0" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="170" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="340" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="510" y="40" rx="3" ry="3" width="150" height="15" />
      {/* Row 4 */}
      <rect x="0" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="170" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="340" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="510" y="40" rx="3" ry="3" width="150" height="15" />
      {/* Row 5 */}
      <rect x="0" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="170" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="340" y="40" rx="3" ry="3" width="150" height="15" />
      <rect x="510" y="40" rx="3" ry="3" width="150" height="15" />
    </ContentLoader>
  );
};

export default FeeLoadingSkeleton;
