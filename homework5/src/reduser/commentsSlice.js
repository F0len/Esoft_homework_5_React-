import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comments: [],
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComments(state, action) {
            const comments = action.payload;
            state.comments.push(comments);
        },

    },
});

export const { addComments, removeComments } = commentsSlice.actions;
export default commentsSlice.reducer;