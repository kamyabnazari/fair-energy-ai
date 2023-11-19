import { goto } from "$app/navigation";

export const localStorageUtil = {
    setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem(key: string) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    removeItem(key: string) {
        localStorage.removeItem(key);
    }
};

export function clearCaseStudyData() {
    localStorageUtil.removeItem('name');
    localStorageUtil.removeItem('age');
    localStorageUtil.removeItem('location');
    localStorageUtil.removeItem('energyConsumed');
    localStorageUtil.removeItem('energyConsumedGoal');
    goto('/');
}