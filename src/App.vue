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
      <li>
        <input
          type="text"
          v-model="textBoxValue">
        <button @click="handleButtonClick">Save</button>
      </li>
      <li v-for="item in items" :key="item.name">
        {{ item.name }} - {{ item.temp }} - {{ item.creamer }} - {{ item.syrup }} - {{ item.beverage }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
//import { storeToRefs } from "pinia";
import Beverage from "./components/Beverage.vue";
import { useItemStore, bev  } from './itemStore';

const myStore = useItemStore();
//const { myStore } = storeToRefs(useItemStore());

// Define reactive data
const temps = ref(["Hot", "Cold"]);
const currentTemp = ref("Hot");
const creamers = ref(["None","Milk","Cream","Half & Half"]);
const currentCreamer = ref("None");
const syrups = ref(["None","Vanilla","Caramel","Hazelnut"]);
const currentSyrup = ref("None");
const baseBeverages = ref(["Coffee","Green Tea","Black Tea"]);
const currentBeverage = ref("Coffee");

const textBoxValue = ref("");


//const items = myStore.data ? [myStore.data] : [];

const items = computed(() => {
    // If the store's data is null, return an empty array
    if (!myStore.data) return [];
    // Otherwise, return an array containing the store's data
    return [myStore.data];
});

function handleButtonClick(){
    const newBev: bev = {
      name:textBoxValue.value,
      temp:currentTemp.value,
      creamer:currentCreamer.value,
      syrup:currentSyrup.value,
      beverage:currentBeverage.value
    };
    //const myStore = useItemStore();
    myStore.setData(newBev);
    //storeData(newBev);
    //alert('Pinia state: ' + myStore.data.name);
    //console.log(myStore.data.length)
    console.log(items.value.length)
    for (let i = 0; i < items.value.length; i++) {
      const item = items.value[i];
      console.log(item.name, item.temp, item.creamer, item.syrup, item.beverage);
    }
}
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
