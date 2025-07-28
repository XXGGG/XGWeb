<template>
  <nav w-100vw h-20 flex justify-between items-center position-fixed top px-6>
    <div>
      <RouterLink icon-btn to='/'>
        <div i-tabler-tools />
      </RouterLink>
    </div>
    <div class="Title" >XGWeb</div>
    <div flex justify-between items-center gap-10>
      <button icon-btn @click="toggleDark()">
        <div i-line-md-moon-filled-alt-to-sunny-filled-loop-transition dark:i-line-md-moon-filled-alt-loop />
      </button>
    </div>
  </nav>
  <main>
  <RouterView />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'XGWeb',
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#222222' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/XGWeb.svg',
    },
  ],
})
</script>

<style>
.Title {
  font-family: "Caveat";
  font-weight: 700;
  font-size: 24px;
  user-select: none;
}

</style>