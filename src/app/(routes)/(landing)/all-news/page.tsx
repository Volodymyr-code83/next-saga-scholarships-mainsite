// all-news/page.tsx

import { Suspense } from 'react';
import AllNewsContent from './AllNewsContent';

const AllNews = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllNewsContent />
    </Suspense>
  );
};

export default AllNews;
