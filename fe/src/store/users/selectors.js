import { createSelector } from '@reduxjs/toolkit'

const getRoot = (state) => state?.users

export const getUsers = createSelector(getRoot, (root) => root?.users || [])
export const getUserById = (id) =>
  createSelector(getUsers, (users) => users.find((user) => user.id === id))
