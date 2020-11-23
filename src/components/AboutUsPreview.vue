<template>
  <q-dialog ref="dialog" full-width>
  <div class="bg-dark full-height">
    <q-parallax :height="400">
      <template v-slot:media>
        <img
          :src="aboutUs.image"
        >
      </template>
      <div align="left" class="text-h1 text-info text-weight-bold">{{ aboutUs.title }}</div>
    </q-parallax>

    <div class="q-ma-xl q-pa-md text-h4 text-center text-info bg-dark shadow-14" style="border-radius: 20px;">
      {{ aboutUs.description }}
    </div>

    <div class="row flex-center items-stretch q-gutter-md">
      <q-card
        v-for="coreValue in aboutUs.coreValues"
        :key="coreValue.id"
        class="col-xs-10 col-md-3 col-xl-3 text-center shadow-14 bg-dark"
        style="border-radius: 20px;"
      >
        <q-card-section class="bg-primary">
          <div class="text-info text-h6">{{ coreValue.name }}</div>
        </q-card-section>
        <q-card-section class="bg-dark">
          <div class="text-info">{{ coreValue.definition }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'AboutUsPreview',
  props: {
    aboutUs: Object
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onCancel () {
      this.hide()
    }
  }
}
</script>
