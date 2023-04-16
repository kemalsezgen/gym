import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [], // Boş bir post dizisi
  isLoading: false, // Veriler yüklenirken 'true' olarak ayarlanır
  error: null, // Hata mesajları burada saklanır
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Yeni bir post eklemek için kullanılan reducer fonksiyonu
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    // Tüm postları yüklemek için kullanılan reducer fonksiyonu
    loadPosts: (state) => {
      state.isLoading = true;
    },
    // Tüm postların yüklenmesi tamamlandığında çağrılan reducer fonksiyonu
    loadPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    },
    // Postlar yüklenirken oluşabilecek hataları yakalamak için kullanılan reducer fonksiyonu
    loadPostsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Bir postun beğenilmesi için kullanılan reducer fonksiyonu
    likePost: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        // Eğer post bulunursa, kullanıcının beğenisini ekleyin
        post.likes.push(userId);
      }
    },
    // Bir postun beğenisinin kaldırılması için kullanılan reducer fonksiyonu
    unlikePost: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        // Eğer post bulunursa, kullanıcının beğenisini kaldırın
        post.likes = post.likes.filter((id) => id !== userId);
      }
    },
  },
});

export const {
  addPost,
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
  likePost,
  unlikePost,
} = postSlice.actions;

export default postSlice.reducer;
