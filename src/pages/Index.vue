<template>
 <q-page class="row flex-center">
    <q-card class="col-8 bg-brand-grey-1 shadow-14">
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
      <footer class="text-center text-white">
        <div class="col">
          <q-icon name="copyright" />
          <a class="text-white text-caption" target="_blank" href="https://www.cleancode.llc"> All Rights Reserved 2020</a>
        </div>
      </footer>
    </q-card>
 </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
