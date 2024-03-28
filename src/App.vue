<template>
  <div>
    <Beverage :isIced="currentTemp === 'Cold'"
            :creamer="currentCreamer"
            :syrup="currentSyrup"
            :beverage="currentBeverage"
    />
    <ul>
      <li>
        <template v-for="temp in temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="creamer in creamers" :key="creamer">
          <label>
            <input
              type="radio"
              name="creamer"
              :id="`rc${creamer}`"
              :value="creamer"
              v-model="currentCreamer"
            />
            {{ creamer }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="syrup in syrups" :key="syrup">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="`rs${syrup}`"
              :value="syrup"
              v-model="currentSyrup"
            />
            {{ syrup }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="baseBeverage in baseBeverages" :key="baseBeverage">
          <label>
            <input
              type="radio"
              name="BaseBeverage"
              :id="`rb${baseBeverage}`"
              :value="baseBeverage"
              v-model="currentBeverage"
            />
            {{ baseBeverage }}
          </label>
        </template>
      </li>
      <li style="padding-top: 10px; padding-left: 40px;">
          <input
            type="text"
            v-model="textBoxValue">
          <button @click="makeBeverage">Make Beverage</button>
      </li>
      <h2 style="padding-left:20px;">Saved Recipes:</h2>
      <li v-for="item in items" :key="item.name" style="padding:4px">
        <button @click="() => showBeverage(item)">Show Recipe</button>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import Beverage from "./components/Beverage.vue";
import { useItemStore, bev  } from './itemStore';

const myStore = useItemStore();
const items = ref<bev[]>([]);
const temps = ref(["Hot", "Cold"]);
const currentTemp = ref("Hot");
const creamers = ref(["None","Milk","Cream","Half & Half"]);
const currentCreamer = ref("None");
const syrups = ref(["None","Vanilla","Caramel","Hazelnut"]);
const currentSyrup = ref("None");
const baseBeverages = ref(["Coffee","Green Tea","Black Tea"]);
const currentBeverage = ref("Coffee");
const textBoxValue = ref("");

function makeBeverage(){
    const newBev: bev = {
      name:textBoxValue.value,
      temp:currentTemp.value,
      creamer:currentCreamer.value,
      syrup:currentSyrup.value,
      beverage:currentBeverage.value
    };
    myStore.$patch((state) => {
      state.data?.push(newBev);
    });
}

function showBeverage(item: bev){
    currentTemp.value = item.temp;
    currentCreamer.value = item.creamer;
    currentSyrup.value = item.syrup;
    currentBeverage.value = item.beverage;
}

onBeforeMount(async () => {
    await myStore.$reset();
    await myStore.fetchData();
    items.value = myStore.data || [];
});
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
</style>
