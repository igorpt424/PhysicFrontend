import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css:['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  vite:{
    plugins:[
      tailwindcss()
    ]
  }
})
