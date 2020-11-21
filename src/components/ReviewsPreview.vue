<template>
  <q-dialog ref="dialog" full-width>
    <div class="row justify-center q-col-gutter-md items-stretch">
      <div
        v-for="review in reviews"
        :key="review.author_name"
      >
        <q-card
          class="col-md-4 col-lg-4 col-xs-11 bg-secondary text-info shadow-14"
          style="height: 15rem;width: 25rem"
        >
          <q-card-section class="bg-primary">
            <div class="text-h6">
              <img align="right" :src='review.profile_photo_url' height=50rem width=50rem/>
              {{ review.author_name }}
            </div>
            <q-rating readonly v-model='review.rating' :max="5" size="medium"/>
            <div class="text-subtitle2">{{ review.relative_time_description }}</div>
          </q-card-section>
          <q-separator dark />
          <q-card-section>
            <q-scroll-area style="width: auto;height: 7rem">
              {{ review.text }}
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'PreviewReviews',
  props: {
    reviews: Array
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
