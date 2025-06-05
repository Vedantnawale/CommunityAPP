import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance";


const initialState = {
    postData: []
};


export const createNewPost = createAsyncThunk("/post/create", async (data) => {
    try {
        const response = axiosInstance.post("/post", data);
        toast.promise(response, {
            loading: "Creating new post",
            success: (data) => data?.data?.message,
            error: "Failed to create post"
        });
        const res = await response;
        return { post: res.data.post }; // assuming the API returns { post: {...} }
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});



export const getAllPosts = createAsyncThunk("/post/posts", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get("/post/posts");
        toast.success(response.data.message);
        return response.data.posts;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch posts");
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});



// Like or Unlike Post
export const toggleLike = createAsyncThunk(
    "posts/toggleLike",
    async (postId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(`/post/like/${postId}`);
            return { postId };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Add Comment
export const addComment = createAsyncThunk(
    "posts/addComment",
    async ({ postId, text }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(`/post/comment/${postId}`, { text });
            return { postId, comment: res.data.comment };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "posts/deleteComment",
    async ({ postId, commentId }, { dispatch }) => {
        await axiosInstance.delete(`/post/comment/${postId}/${commentId}`);
        return { postId, commentId };
    }
);





const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.fulfilled, (state, action) => {
                if (action.payload) {
                    state.postData = action.payload;
                }
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                if (action.payload?.post) {
                    state.postData.unshift(action.payload.post);
                }
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                const { postId } = action.payload;
                const userId = JSON.parse(localStorage.getItem("data"))._id;

                const post = state.postData.find((p) => p._id === postId);
                if (post) {
                    const index = post.likes.indexOf(userId);
                    if (index === -1) {
                        post.likes.push(userId);
                    } else {
                        post.likes.splice(index, 1);
                    }
                }
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { postId, comment } = action.payload;
                const post = state.postData.find((p) => p._id === postId);
                if (post) {
                    post.comments.push(comment);
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const { postId, commentId } = action.payload;
                const post = state.postData.find(p => p._id === postId);
                if (post) {
                    post.comments = post.comments.filter(c => c._id !== commentId);
                }
            })
    }
});

export default postSlice.reducer;