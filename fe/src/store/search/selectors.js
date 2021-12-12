import { createSelector } from '@reduxjs/toolkit';

export const getRoot = (state) => state?.search;

export const getSelected = (field) =>
  createSelector(getRoot, (search) => search[field]);

export const getSearchResults = createSelector(
  getRoot,
  (state) => state?.searchResult || [],
);

const getCount = (arr1, arr2) => {
  return arr1.reduce((res, el) => (arr2.includes(el) ? res + 1 : res), 0);
};
//replace clever search
export const getMatchesCount = (name) =>
  createSelector(getSearchResults, (results) => {
    const searchName = name.toLowerCase().split(' ');
    const counts = results.reduce((res, book) => {
      const bookName = book.name.toLowerCase().split(' ');
      console.log('searchName', JSON.stringify(searchName));
      console.log('bookName', JSON.stringify(bookName));
      const count = getCount(searchName, bookName);
      console.log('count', JSON.stringify(count));
      return {
        ...res,
        ...(count ? { [book.id]: count } : {}),
      };
    }, {});
    return counts || {};
  });

export const getMaxCount = (name) =>
  createSelector(getMatchesCount(name), (counts) => {
    console.log('counts', JSON.stringify(counts));
    return Object.keys(counts)?.reduce((a, b) =>
      counts[a] > counts[b] ? a : b,
    );
  });
