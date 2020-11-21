<template>
  <q-dialog ref="dialog" full-width>
    <div class="row justify-center q-gutter-md q-py-xl bg-dark">
        <q-card
          clickable
          v-for="highlight in highlights"
          :key="highlight.id"
          class="col-xs-5 col-md-2 col-xl-2 shadow-14 bg-secondary"
          style="border-radius: 20px;"
        >
          <q-card-section align="center" class="bg-primary shadow-14">
            <q-icon
              size="xl"
              :name= "highlight.icon"
              color="accent"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-info text-center text-weight-bold">{{ highlight.name }}</div>
          </q-card-section>
        </q-card>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'HighlightsPreview',
  props: {
    highlights: Array
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
