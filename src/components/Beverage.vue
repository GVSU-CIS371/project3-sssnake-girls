<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />
    <Contents>
      <template v-slot:top>
        <Creamer v-if="syrup !== 'None'":name="creamer"/>
      </template>
      <template v-slot:mid>
        <Syrup v-if="syrup !== 'None'"/>
          <Creamer v-else :name="creamer"/>
      
      </template>
      <template v-slot:bottom>
        <Base :name="base" />
      </template>
    </Contents>
  </Mug>
</template>
<script setup lang="ts">
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";

type Props = {
  isIced: boolean;
  creamer?: string;
  syrup?: string;
  base?: string;
};
defineProps<Props>();
</script>
