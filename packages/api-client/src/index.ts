export interface ApiResponse<T> { success: boolean; message?: string; data: T }

export async function getJson<T>(url: string, token?: string): Promise<ApiResponse<T>> {
  const res = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  return res.json();
}
