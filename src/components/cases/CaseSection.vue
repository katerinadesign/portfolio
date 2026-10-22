<script setup lang="ts">
/** Белая карточка-раздел кейса: номер, подпись-рубрика и заголовок */
defineProps<{ id: string; num: string; kicker: string; title: string }>()
</script>

<template>
  <section
    :id="id"
    class="mx-auto flex w-full max-w-[1040px] flex-col gap-6 rounded-[32px] bg-white p-5 text-ink sm:gap-7 sm:p-6"
  >
    <header class="flex items-start gap-4">
      <span class="shrink-0 rounded-[10px] bg-accent px-2.5 py-1.5 text-[15px] leading-none font-bold">
        {{ num }}
      </span>
      <div class="flex flex-col gap-1.5">
        <span class="text-[11px] font-semibold tracking-[0.07em] text-ink/50 uppercase">{{ kicker }}</span>
        <h2 class="text-2xl leading-tight font-semibold tracking-[-0.02em] sm:text-[32px]">{{ title }}</h2>
      </div>
    </header>
    <slot />
  </section>
</template>
