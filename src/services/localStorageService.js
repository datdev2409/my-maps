export function createStorage(key) {
  return {
    get() {
      const data = localStorage.getItem(key)

      return data ? JSON.parse(data) : null
    },

    set(data) {
      localStorage.setItem(key, JSON.stringify(data))
    },
  }
}

export const tokenStorage = createStorage("access_token")
