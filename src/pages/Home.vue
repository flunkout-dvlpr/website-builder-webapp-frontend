<template>
 <q-page class="row flex-center">
    <q-card class="q-ma-xl col-md-8 col-xs-11 bg-brand-grey-1 shadow-14">
      <q-card-section align="center" class="bg-brand-grey shadow-14">
        <q-img
          src="https://s3.us-east-2.amazonaws.com/www.cleancode.llc/logo-desktop.png"
          align="center"
          width="30%"
        />
      </q-card-section>
      <q-tabs
        switch-indicator
        class="bg-brand-orange text-grey-3 shadow-14 text-h6"
        active-color="brand-orange"
        active-bg-color="brand-grey"
        align="justify"
        no-caps
      >
        <q-route-tab label="Registration"  :to="{ name: 'Registration' }" />
        <q-route-tab label="Landing Carousel" :to="{ name: 'LandingCarousel' }" />
        <q-route-tab label="About Us" :to="{ name: 'AboutUs' }" />
        <q-route-tab label="Highlights" :to="{ name: 'Highlights' }" />
        <q-route-tab label="Team" :to="{ name: 'Team' }" />
        <q-route-tab label="Services" :to="{ name: 'Services' }" />
        <q-route-tab label="Reviews" :to="{ name: 'Reviews' }" />
        <q-route-tab label="Contact Us" :to="{ name: 'ContactUs' }" />
      </q-tabs>
      <q-card-section>
        <router-view/>
      </q-card-section>
      <footer class="q-ma-md  text-center text-grey-9">
        <div class="row justify-center full-width">
          <div class="col-md-2 col-xs-4">
            <q-btn icon="west" class="full-width bg-brand-orange" @click="selectTab('previous')"/>
          </div>
          <div class="col-md-8 col-xs-4">
            <a class="text-grey-3 text-caption" target="_blank" href="https://www.cleancode.llc">
              Clean Code LLC<br>
              ©All Rights Reserved 2020
            </a>
          </div>
          <div class="col-md-2 col-xs-4">
            <q-btn icon="east" class="full-width bg-brand-orange" @click="selectTab('next')"/>
          </div>
      </div>
      </footer>
    </q-card>
 </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapGetters('builder', ['business'])
  },
  methods: {
    selectTab (event) {
      var currentRoute = this.$route.name
      switch (currentRoute) {
        case 'Registration':
          if (event === 'next') {
            this.$router.push({ name: 'LandingCarousel' })
          } else if (event === 'previous') {
            this.$router.push({ name: 'ContactUs' })
          }
          break
        case 'LandingCarousel':
          if (event === 'next') {
            this.$router.push({ name: 'AboutUs' })
          } else if (event === 'previous') {
            this.$router.push({ name: 'Registration' })
          }
          break
        case 'AboutUs':
          if (event === 'next') {
            this.$router.push({ name: 'Highlights' })
          } else if (event === 'previous') {
            this.$router.push({ name: 'LandingCarousel' })
          }
          break
        case 'Highlights':
          if (event === 'next') {
            this.$router.push({ name: 'Team' })
          } else if (event === 'previous') {
            this.$router.push({ name: 'AboutUs' })
          }
          break
        case 'Team':
          if (event === 'next') {
            this.$router.push({ name: 'Services' })
          } else if (event === 'previous') {
            this.$router.push({ name: 'Highlights' })
          }
          break
        case 'Services':
          if (event === 'next') {
            this.$router.push({ name: 'Reviews' })
          } else if (event === 'previous') {
            this.$router.push({ name: 'Team' })
          }
          break
        case 'Reviews':
          if (event === 'next') {
            this.$router.push({ name: 'ContactUs' })
          } else if (event === 'previous') {
            this.$router.push({ name: 'Services' })
          }
          break
        case 'ContactUs':
          if (event === 'next') {
            this.$router.push({ name: 'Registration' })
          } else if (event === 'previous') {
            this.$router.push({ name: 'Reviews' })
          }
          break
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    var currentRoute = from.name
    if (currentRoute === 'Registration' && !this.business.id) {
      this.$q.notify({
        color: 'brand-yellow',
        textColor: 'grey-9',
        icon: 'error',
        message: 'Please complete registration!'
      })
    } else {
      next()
    }
  }
}
</script>
