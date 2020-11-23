<template>
  <div>
    <q-form ref="contactUsForm" @submit.prevent="onSubmit">
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-12 col-xs-12">
          <q-item-label class="text-h4 q-ma-xs">Contact Information</q-item-label>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="contactUsData.email"
            label="Email"
            type="text"
            :rules="[val => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(val) || 'E-mail must be valid']"
          />
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-6 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="contactUsData.phone"
            label="Phone"
            fill-mask
            unmasked-value
            mask="(###) - ### - ####"
            :rules="[val => !!val || 'Please enter a phone',
                     val => /^[0-9]*$/.test(val) || 'Please enter numbers only',
                     val => val.length === 10 || 'Please enter a valid number']"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="q-pa-xs text-center">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-12">
          <q-btn flat no-caps class="full-width bg-brand-teal" label="Submit" type="submit"/>
        </div>
      </div>
    </q-card-actions>
    </q-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ContactUs',
  data () {
    return {
      contactUsData: {
        phone: null,
        email: null
      }
    }
  },
  computed: {
    ...mapGetters('builder', ['business', 'template', 'contactUs'])
  },
  methods: {
    ...mapActions('builder', ['updateContactUs']),
    onSubmit () {
      console.log('handle data')
    },
    setContactUsData () {
      this.contactUsData = this.$lodash.cloneDeep(this.contactUs)
    }
  },
  created () {
    this.setContactUsData()
  },
  beforeRouteLeave (to, from, next) {
    console.log('Save Changes?') // Ask user to save changes
    this.updateContactUs(this.contactUsData)
    next()
  }
}
</script>
