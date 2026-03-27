export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const ok = <T>(data: T, message = 'ok'): ApiResponse<T> => ({
  success: true,
  message,
  data,
});
