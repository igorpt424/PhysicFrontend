<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <img 
      src="~/assets/images/background.avif" 
      alt="Background" 
      class="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
    <div class="relative z-10 w-full h-full">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>