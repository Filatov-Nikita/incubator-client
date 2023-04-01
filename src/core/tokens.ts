export function get() {
  return localStorage.getItem('token');
}

export function set({ token }: { token: string }) {
  localStorage.setItem('token', token);
}

export function clean() {
  localStorage.removeItem('token');
}
