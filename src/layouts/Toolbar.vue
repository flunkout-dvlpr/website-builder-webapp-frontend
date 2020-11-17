<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="shadow-10">
      <q-toolbar>
        <q-img
          src="https://s3.us-east-2.amazonaws.com/www.cleancode.llc/Web+Design%404x-8.png"
          align="center"
          width="3%"
        />
        <q-toolbar-title>
          Website Builder Tool
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Toolbar'
}
</script>
