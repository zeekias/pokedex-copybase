
<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style lang="scss" >
*,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  ::-webkit-scrollbar-track{
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #d1d1d1;
}

::-webkit-scrollbar
{
	width: 2px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
  border-radius: 8px;
	background-color: #000000;
}
}
</style>

