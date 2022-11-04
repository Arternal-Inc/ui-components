<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const unseenChanges = ref(false)

</script>

<template>
  <div class="max-w-20 bg-zinc-800 relative p-2">
    <div class="text-center">
      <RouterLink :to="{name:'Dashboard'}" class="mt-1 mb-5 block">
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="46" height="46" rx="5" fill="#E6FC6F" />
          <path
            d="M16.1208 37H10L19.3263 9H26.6869L36 37H29.8793L23.1122 15.3984H22.9011L16.1208 37ZM15.7382 25.9941H30.1958V30.6153H15.7382V25.9941Z"
            fill="#1E293B"
          />
        </svg>
      </RouterLink>

      <nav class="text-center">
        <RouterLink :to="{ name: 'Dashboard' }">
          <img :src="require(`@/assets/images/icons/Dashboard.svg`)" draggable="false" />
          <span>Dashboard</span>
        </RouterLink>

        <RouterLink :to="{ name: 'Offers' }">
          <img :src="require(`@/assets/images/icons/Mail.svg`)" draggable="false" />
          <span>SmartMail</span>
        </RouterLink>

        <RouterLink :to="{ name: 'Contacts' }">
          <img :src="require(`@/assets/images/icons/Mail.svg`)" draggable="false" />
          <span>Contacts</span>
        </RouterLink>

        <RouterLink :to="{ name: 'Inventory' }">
          <img :src="require(`@/assets/images/icons/Mail.svg`)" draggable="false" />
          <span>Inventory</span>
        </RouterLink>

        <RouterLink :to="{ name: 'Transaction' }">
          <img :src="require(`@/assets/images/icons/Mail.svg`)" draggable="false" />
          <span>Transactions</span>
        </RouterLink>

        <RouterLink to="/invoices">
          <img :src="require(`@/assets/images/icons/Mail.svg`)" draggable="false" />
          <span>Invoices</span>
        </RouterLink>

        <RouterLink :to="{ name: 'Payments' }">
          <img :src="require(`@/assets/images/icons/Mail.svg`)" draggable="false" />
          <span>Payments</span>
        </RouterLink>

        <RouterLink :to="{ name: 'Reporting' }">
          <img :src="require(`@/assets/images/icons/Mail.svg`)" draggable="false" />
          <span>Reports</span>
        </RouterLink>
      </nav>

      <div class="absolute bottom-0">
        <div class="mx-auto w-[40px]">
         
          <span v-if="unseenChanges" class="unseenBadge"></span>
        </div>
      </div>
    </div>
  </div>
</template>