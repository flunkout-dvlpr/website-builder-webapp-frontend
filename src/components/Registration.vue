<template>
  <div>
    <q-form @submit.prevent="onSubmit">
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <div class="row justify-center full-width q-col-gutter-md q-mb-xs">
        <div class="col-8">
          <q-item-label class="text-h4 q-ma-xs">Register Business</q-item-label>
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="bussiness.name"
            label="Name"
            type="text"
            :rules="[val => !!val || 'Please enter business name']"
          />
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-md q-mb-xs">
        <div class="col-4">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="bussiness.email"
            label="Email"
            type="text"
            :rules="[val => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(val) || 'E-mail must be valid']"
          />
        </div>
        <div class="col-4">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="bussiness.phone"
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
      <div class="row justify-center full-width q-col-gutter-md q-mb-xs">
        <div class="col-5">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="bussiness.address"
            label="Address"
            type="text"
            :rules="[val => !!val || 'Please enter an address']"
          />
        </div>
        <div class="col-3">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="bussiness.zip_code"
            label="Zip Code"
            :rules="[val => !!val || 'Please enter a zip code']"
          />
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-md q-mb-xs">
        <div class="col-4">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="bussiness.city"
            label="City"
            :rules="[val => !!val || 'Please enter a city']"
          />
        </div>
        <div class="col-4">
          <q-select
            dark
            square
            outlined
            use-input
            clearable
            color="brand-yellow"
            v-model="bussiness.state"
            :options="filteredStates"
            @filter="filterStates"
            label="State"
            emit-value
            map-options
            :rules="[val => !!val || 'Please select a state']"
          />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pa-xs text-center text-grey-3">
      <div class="row justify-center full-width q-col-gutter-md q-mb-xs">
        <div class="col-8">
          <q-item-label class="text-h4 q-ma-xs">Select Template</q-item-label>
          <q-item-label class="text-caption q-ma-xs">(GitHub Repo)</q-item-label>
          <q-select
            dark
            square
            outlined
            color="brand-yellow"
            v-model="template"
            :options="templates"
            label="Template"
            :rules="[val => !!val || 'Please select a template']"
          />
        </div>
      </div>
    </q-card-section>

    <q-card-actions class="q-pa-xs text-center">
      <div class="row justify-center full-width q-col-gutter-md q-mb-xs">
        <div class="col-8">
          <q-btn
            flat
            no-caps
            class="bg-brand-yellow"
            label="Submit"
            type="submit"
            :loading="loading"
          />
        </div>
      </div>
    </q-card-actions>
    </q-form>
  </div>
</template>

<script>
const states = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AK' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' }
]
const templates = [
  { label: 'Auto Shop', value: 'https://github.com/clean-code-llc/TEMAPLATE-REPO.git' },
  { label: 'Restaurant', value: 'https://github.com/clean-code-llc/TEMAPLATE-REPO.git' },
  { label: 'Beauty Salon', value: 'https://github.com/clean-code-llc/TEMAPLATE-REPO.git' },
  { label: 'Barber Shop', value: 'https://github.com/clean-code-llc/TEMAPLATE-REPO.git' },
  { label: 'Realtor', value: 'https://github.com/clean-code-llc/TEMAPLATE-REPO.git' }
]
export default {
  name: 'Registration',
  data () {
    return {
      bussiness: {
        name: null,
        email: null,
        phone: null,
        address: null,
        zip_code: null,
        city: null,
        state: null
      },
      states,
      filteredStates: states,
      template: null,
      templates,
      loading: false
    }
  },
  methods: {
    onSubmit () {
      console.log('Call action to create record in db')
      console.log('Clone selected repo template')
      this.$router.push(({ name: 'LandingCarousel' }))
    },
    filterStates (searchText, update) {
      if (searchText === '') {
        update(() => {
          this.filteredStates = this.states
        })
        return
      }
      update(() => {
        const searchTextFormatted = searchText.toLowerCase()
        this.filteredStates = this.states.filter(state => state.label.toLowerCase().indexOf(searchTextFormatted) > -1)
      })
    }
  }
}
</script>
