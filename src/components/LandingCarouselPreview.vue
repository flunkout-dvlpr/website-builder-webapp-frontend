<template>
  <q-dialog ref="dialog" full-height full-width>
    <q-carousel
      v-model="slide"
      animated
      infinite
      swipeable
      navigation
      control-color="white"
      transition-prev="jump-right"
      transition-next="jump-left"
      style="height:50rem;"
      class="bg-secondary fit"
    >

      <!-- :img-src="slide.image" -->
      <q-carousel-slide
        v-for="slide in slides"
        :key="slide.id"
        :name="slide.id"
        class="column justify-center items-start content-center text-center full-height q-pt-md"
      >
        <div class="background-block">
          <div class="full-height full-width relative q-gutter-y-lg q-pt-xl">

            <div class="header-1 text-primary">
              {{ slide.title }}
            </div>
            <div class="header-1 text-grey-3">
              {{ slide.subtitle_1 }}
            </div>
            <div class="header-2 text-primary">
              {{ slide.subtitle_2 }}
            </div>
            <div class="header-3 text-grey-3">
              {{ slide.caption }}
            </div>
            <div
              v-for="button in slide.buttons"
              :key="button.id"
            >
              <q-btn
                no-caps
                v-if="button.link"
                :label="button.label"
                color="primary"
                text-color="info"
                size="md"
                class="q-col-6"
                type="a"
                :href="button.link"
              />
              <q-btn
                v-else
                no-caps
                :label="button.label"
                color="primary"
                text-color="info"
                class="q-col-6"
                size="md"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<script>
export default {
  name: 'SlidePreview',
  data () {
    return {
      slide: 1
    }
  },
  props: {
    slides: Array
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

<style>
//Slider
.button {
  width: auto;
  height: auto;
  font-size: 1.2rem;
}

.header-1 {
  font-size: 5rem;
  font-weight: 600;
  line-height: 90%;
}

.header-2 {
  font-size: 4rem;
  font-weight: 400;
}

.header-3 {
  font-size: 2.5rem;
  font-weight: 300;
}

.background-block {
  background: rgba(0, 0, 0, .7);
  max-height: 98%;
  max-width: 98%;
}
</style>
