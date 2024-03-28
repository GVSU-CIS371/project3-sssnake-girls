import { defineStore } from "pinia";

export type bev = {
    name: string;
    temp: string;
    creamer: string;
    syrup: string;
    beverage: string;
};

export const useItemStore = defineStore("ItemStore", {
    state: () => ({
        data: null as bev[] | null,
    }),
    actions: {
        setData(value: bev){
            this.data?.push(value);
        },
    }
});