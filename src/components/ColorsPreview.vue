<template>
  <q-dialog ref="dialog">
    <q-layout view="Lhh lpR fff" container class="bg-dark">
      <q-header class="bg-secondary">
        <q-toolbar>
          <q-toolbar-title class="text-info">Header - Accent Background 1 Color</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-footer class="bg-secondary">
        <q-toolbar inset>
          <q-toolbar-title class="text-info">Footer - Accent Background 1 Color</q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page padding>
          <div class="text-info text-h4 text-center">Main Background Color</div>
          <q-card class="bg-secondary">
            <q-card-section class="bg-primary">
              <div class="text-h4 text-center text-info">Theme Color</div>
            </q-card-section>
            <q-card-section>
              <p class="text-info text-center" v-for="n in contentSize" :key="n">
                {{ lorem }}
              </p>
              <div class="text-info text-h6 text-center">Accent Background 1 Color</div>
            </q-card-section>
            <q-card-actions class="q-pa-xs text-center bg-primary">
              <div class="row justify-center full-width q-col-gutter-xs">
                <div class="col-md-12 col-xs-12">
                  <q-btn no-caps text-color="info" color="accent" label="Accent Background 2 Color" />
                </div>
              </div>
            </q-card-actions>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
export default {
  name: 'ColorsPreview',
  data () {
    return {
      moreContent: true,
      lorem: 'Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color Text Color'
    }
  },
  computed: {
    contentSize () {
      return this.moreContent ? 5 : 5
    }
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
