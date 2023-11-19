export const localStorageUtil = {
    setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem(key: string) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
};
