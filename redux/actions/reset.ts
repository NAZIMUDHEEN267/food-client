import { createAction } from "@reduxjs/toolkit";

export const resetState = createAction<undefined>('auth/reset')