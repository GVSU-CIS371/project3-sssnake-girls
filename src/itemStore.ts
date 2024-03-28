import { defineStore } from "pinia"

export type bev = {
    name: string
    temp: string
    creamer: string
    syrup: string
    beverage: string
};

export const useItemStore = defineStore("ItemStore", {
    state: () => ({
        count: 0,
        data: null as bev[] | null,
    }),
    actions: {
        increment(){
            this.count++
        },
        setData(value: bev){
            this.increment()
            this.data?.push(value)
        },
        async fetchData() {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const exampleData: bev[] = [];
            this.data = exampleData;
        },
    }
})