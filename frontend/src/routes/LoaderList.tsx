import React from "react";
import { FC, Suspense, lazy } from "react";
import SuspenseLoader from "../components/SuspenseLoader";
// import SuspenseLoader from "../components/SuspenseLoader";

const Loader =
  <P extends object>(Component: React.ComponentType<P>): FC<P> =>
  (props) =>
    (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
export const HomePage = Loader(lazy(() => import("../layouts/MainLayout")));
export const AlbumPage = Loader(lazy(() => import("../pages/AlbumPage/")));
