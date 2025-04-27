export interface PostArray {
  posts: PostProps[];
}

interface PostInfo {
  type: string;
  payload?: PostArray;
  error?: string;
}

interface PostInitialState { 
  posts: PostArray | [],
  isLoading: boolean,
  error: string | null,
}