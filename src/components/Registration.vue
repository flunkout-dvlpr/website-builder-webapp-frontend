<template>
  <div>
    <!-- Business Registration -->
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <q-form @submit.prevent="onSubmit">
      <!-- Name -->
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-8 col-xs-12">
          <q-item-label class="text-h4 q-ma-xs">Register Business</q-item-label>
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="businessData.name"
            label="Name"
            type="text"
            :rules="[val => !!val || 'Please enter businessData name']"
          />
        </div>
      </div>
      <!-- Email - Phone -->
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-4 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="businessData.email"
            label="Email"
            type="text"
            :rules="[val => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(val) || 'E-mail must be valid']"
          />
        </div>
        <div class="col-md-4 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="businessData.phone"
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
      <!-- Address 1 - Address 2 -->
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-4 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="businessData.address_1"
            label="Address 1"
            type="text"
            :rules="[val => !!val || 'Please enter an address']"
          />
        </div>
        <div class="col-md-4 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="businessData.address_2"
            label="Address 2"
            type="text"
          />
        </div>
      </div>
      <!-- City - State -->
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="businessData.zip_code"
            label="Zip Code"
            :rules="[val => !!val || 'Please enter a zip code']"
          />
        </div>
        <div class="col-md-3 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="businessData.city"
            label="City"
            :rules="[val => !!val || 'Please enter a city']"
          />
        </div>
        <div class="col-md-3 col-xs-12">
          <q-select
            dark
            square
            outlined
            use-input
            clearable
            color="brand-yellow"
            :popup-content-style="{ backgroundColor: '#1D1D1D' }"
            v-model="businessData.state"
            :options="filteredStates"
            @filter="filterStates"
            label="State"
            emit-value
            map-options
            :rules="[val => !!val || 'Please select a state']"
          />
        </div>
      </div>
      <!-- Template Selection -->
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-8 col-xs-12">
          <q-item-label class="text-h4 q-ma-xs">Template</q-item-label>
          <q-item-label class="text-caption q-ma-xs">(GitHub Repo)</q-item-label>
          <q-select
            dark
            square
            outlined
            color="brand-yellow"
            :popup-content-style="{ backgroundColor: '#1D1D1D' }"
            v-model="businessData.db_name"
            :options="templates"
            label="Template"
            :rules="[val => !!val || 'Please select a template']"
            emit-value
            map-options
          />
        </div>
      </div>
      <!-- Submission (Create db record, set colors, clone repo) -->
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-12">
          <q-btn
            flat
            no-caps
            class="text-grey-9 full-width bg-brand-teal"
            :label="!business.id ? 'Register' : 'Save'"
            type="submit"
            :loading="loading"
          />
        </div>
      </div>
      </q-form>
    </q-card-section>
    <!-- Brand Colors Selection -->
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-8 col-xs-12">
          <q-item-label class="text-h4 q-ma-xs">Brand Colors</q-item-label>
        </div>
      </div>
      <!-- Theme Color - Main Background Color -->
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-4 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="themeColor"
            label="Theme"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color default-view="palette" format-model="hex" dark v-model="themeColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-md-4 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="backgroundColor"
            label="Main Background"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color default-view="palette" format-model="hex" dark v-model="backgroundColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <!-- Accent Background Color 1 - Accent Background Color 2 -->
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-4 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="accentBackground1Color"
            label="Accent Background 1"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color default-view="palette" format-model="hex" dark v-model="accentBackground1Color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-md-4 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="accentBackground2Color"
            label="Accent Background 2"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color default-view="palette" format-model="hex" dark v-model="accentBackground2Color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <!-- Text Color -->
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-4 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="textColor"
            label="Text"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color default-view="palette" format-model="hex" dark v-model="textColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-12">
          <q-btn flat no-caps class="full-width text-grey-9 bg-brand-orange" label="Preview" @click="showColorsPreview" />
        </div>
      </div>
    </q-card-section>
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
  { label: 'Auto Shop', value: 'auto_shop_crm' },
  { label: 'Restaurant', value: 'restaurant' },
  { label: 'Beauty Salon', value: 'beauty_salon' },
  { label: 'Barber Shop', value: 'barber_shop' },
  { label: 'Realtor', value: 'realtor' }
]
import { mapActions, mapGetters } from 'vuex'
import { colors } from 'quasar'
import ColorsPreview from 'components/ColorsPreview'
export default {
  name: 'Registration',
  data () {
    return {
      loading: false,
      businessData: {
        name: null,
        email: null,
        phone: null,
        address_1: null,
        address_2: null,
        zip_code: null,
        city: null,
        state: null,
        db_name: null
      },
      states,
      filteredStates: states,
      templates,
      themeColor: colors.getBrand('primary'),
      backgroundColor: colors.getBrand('dark'),
      accentBackground1Color: colors.getBrand('secondary'),
      accentBackground2Color: colors.getBrand('accent'),
      textColor: colors.getBrand('info')
    }
  },
  computed: {
    ...mapGetters('builder', ['business', 'template'])
  },
  methods: {
    ...mapActions('builder', ['register', 'updateRegistration']),
    onSubmit () {
      if (!this.business.id) {
        this.register(this.businessData).then((response) => {
          this.setBusinessData()
        })
      } else {
        this.updateRegistration(this.businessData).then((response) => {
          this.setBusinessData()
        })
      }
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
    },
    showColorsPreview () {
      colors.setBrand('primary', this.themeColor)
      colors.setBrand('dark', this.backgroundColor)
      colors.setBrand('secondary', this.accentBackground1Color)
      colors.setBrand('accent', this.accentBackground2Color)
      colors.setBrand('info', this.textColor)
      this.$q.dialog({
        component: ColorsPreview,
        parent: this
      })
    },
    setBusinessData () {
      this.businessData = this.$lodash.cloneDeep(this.business)
      this.businessData.db_name = this.$lodash.cloneDeep(this.template)
    }
  },
  created () {
    this.setBusinessData()
  }
}
</script>
