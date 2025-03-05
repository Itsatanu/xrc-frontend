import React, { Suspense } from 'react';
import PageLoading from '../asset/pageLoading/PageLoading';


function DynamicImport(importFunc, LoadingComponent) {
  const LazyLoadedComponent = React.lazy(importFunc);

  return function LazyComponentWrapper(props) {
    return (
      <Suspense fallback={LoadingComponent || <PageLoading/>}>
        <LazyLoadedComponent {...props} />
      </Suspense>
    );
  };
}

export default DynamicImport;
