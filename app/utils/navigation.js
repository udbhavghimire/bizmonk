"use client";

import NProgress from "nprogress";

export const startNavigationLoading = () => {
  NProgress.start();
  document.dispatchEvent(new Event("navigationStart"));
};

export const stopNavigationLoading = () => {
  NProgress.done();
  document.dispatchEvent(new Event("navigationEnd"));
};

export const withNavigationLoading = (callback) => {
  return (...args) => {
    startNavigationLoading();
    return callback(...args);
  };
};
