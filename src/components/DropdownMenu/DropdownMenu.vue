<script lang="ts" setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/solid'
import { Btn } from '@/components'
import { Size, Variant, VueClassAttr } from '@@/types'

withDefaults(
  defineProps<{
    menuClass?: VueClassAttr
    buttonClass?: VueClassAttr
    buttonVariant?: Variant
    buttonSize?: Size
    buttonOutline?: boolean
    buttonBorderless?: boolean
    iconClass?: VueClassAttr
  }>(),
  {
    menuClass: '',
    buttonClass: '!p-1',
    buttonVariant: 'primary',
    buttonSize: 'md',
    buttonBorderless: true,
    iconClass: '',
  }
)
</script>

<template>
  <Menu v-slot="slotProps" as="div" class="relative">
    <MenuButton as="div">
      <slot name="button" v-bind="slotProps">
        <Btn
          type="button"
          :variant="buttonVariant"
          :size="buttonSize"
          :outline="buttonOutline"
          :borderless="buttonBorderless"
          :class="buttonClass"
        >
        <template #icon>
          <slot name="icon" v-bind="slotProps">
            <EllipsisVerticalIcon class="h-6 w-6" :class="iconClass" />
          </slot>
        </template>  
        </Btn>
      </slot>
    </MenuButton>

    <MenuItems class="group absolute z-10 pb-5" :class="menuClass">
      <div
        class="flex max-h-64 min-w-[200px] flex-col overflow-hidden overflow-y-auto rounded border bg-white shadow-lg ring-primary-500/50 ring-offset-2 group-focus:outline-none group-focus:ring-4"
      >
        <slot v-bind="slotProps" />
      </div>
    </MenuItems>
  </Menu>
</template>
