<template>
  <q-dialog ref="dialog" full-width>
    <div class="bg-dark q-py-xl">
      <div class="q-my-xs text-h2 text-info text-center text-weight-bold">
        Our Team
      </div>
      <div class="q-pa-md row flex-center desktop-only">
        <div
          v-for="teamMember in teamMembers"
          :key="teamMember.id"
          :name="teamMember.id"
          class="col-xs-10 col-md-4 col-xl-4"
        >
          <div align="center" class="col-xs-10 col-md-3 col-xl-3 q-my-xs">
            <img
              :src="teamMember.image"
              style="border-radius: 50%;"
              height="400px"
              width="400px"
              class="shadow-14"
            >
          </div>
          <q-card align="center" class="shadow-14 q-mx-xl bg-primary" style="border-radius: 20px;">
            <q-card-section class="text-info text-h6 bg-secondary">
              {{ teamMember.position }}
            </q-card-section>

            <q-card-section dense class="text-info text-h4 bg-primary">
              {{ teamMember.name }}
            </q-card-section>
          </q-card >
        </div>
      </div>

      <q-carousel
        v-model="teamMember"
        swipeable
        animated
        autoplay
        navigation
        infinite
        control-color="info"
        class="mobile-only bg-dark"
        style="height:600px;"
      >
        <q-carousel-slide
          v-for="teamMember in teamMembers"
          :key="teamMember.id"
          :name="teamMember.id"
          class="column flex-center"
        >
          <img
            :src="teamMember.image"
            class="q-pa-md team-img"
          >
          <q-card align="center" class="shadow-14 bg-primary" style="border-radius: 20px; width: 15rem">
            <q-card-section class="text-info text-h6 bg-secondary">
              {{ teamMember.position }}
            </q-card-section>

            <q-card-section dense class="text-info text-h6 bg-primary">
              {{ teamMember.name }}
            </q-card-section>
          </q-card >
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'TeamPreview',
  data () {
    return {
      teamMember: 1
    }
  },
  props: {
    teamMembers: Array
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
