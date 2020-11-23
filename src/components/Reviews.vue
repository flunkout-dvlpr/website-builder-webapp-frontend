<template>
  <div>
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <q-form ref="reviewsForm">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-6 col-xs-12">
          <q-item-label class="text-h4 q-ma-xs">Google Place ID</q-item-label>
          <q-select
            dark
            square
            outlined
            color="brand-yellow"
            use-input
            hide-selected
            fill-input
            v-model="place"
            :options="results"
            @filter="searchGooglePlaces"
            @input="setPlaceId"
            :loading="loadingResults"
            label="Search for your business"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-6 col-xs-12">
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="googlePlaceData.id"
            label="ID"
            :rules="[val => !!val || 'Please enter Google Place ID or enter 0']"
          />
        </div>
      </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="q-pa-xs text-center">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-6">
          <q-btn flat no-caps class="full-width bg-brand-orange" :label="!googlePlaceData.id ? 'Search' : 'Preview'" @click="showReviewsPreview" />
        </div>
      </div>
    </q-card-actions>
    <q-card-section>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
      </div>>
    </q-card-section>
    <div id="map"></div>
  </div>
</template>

<script>
const google = window.google
import { mapGetters, mapActions } from 'vuex'
import ReviewsPreview from 'components/ReviewsPreview'
export default {
  name: 'Reviews',
  data () {
    return {
      place: null,
      results: null,
      loadingResults: false,
      googlePlaceData: {
        id: null
      }
    }
  },
  computed: {
    ...mapGetters('builder', ['business', 'template', 'googlePlace'])
  },
  methods: {
    ...mapActions('builder', ['updateGooglePlace']),
    setPlaceId (result) {
      this.googlePlaceData.id = result.value
      // Initialize PlacesService and call getDetails
      var map = new google.maps.Map(document.getElementById('map'))
      var service = new google.maps.places.PlacesService(map)
      service.getDetails({ placeId: result.value }, this.getGooglePlaceData)
    },
    getGooglePlaceData (details, status) {
      this.googlePlaceData.name = details.name
      this.googlePlaceData.phone = details.formatted_phone_number
      this.googlePlaceData.rating = details.rating
      this.googlePlaceData.reviews = details.reviews
      this.googlePlaceData.website = details.website
      this.googlePlaceData.hours = {
        formatted: details.opening_hours.weekday_text,
        periods: details.opening_hours.periods
      }
      // Parse address
      details.address_components.forEach(component => {
        if (!this.googlePlaceData.address) {
          this.googlePlaceData.address = {}
        }
        var name = component.types[0]
        var value = component.long_name
        switch (name) {
          case 'administrative_area_level_1':
            this.googlePlaceData.address.state = value
            break
          case 'country':
            this.googlePlaceData.address[name] = value
            break
          case 'locality':
            this.googlePlaceData.address.city = value
            break
          case 'postal_code':
            this.googlePlaceData.address.zip_code = value
            break
          case 'route':
            this.googlePlaceData.address.street_name = value
            break
          case 'street_number':
            this.googlePlaceData.address[name] = value
            break
        }
      })
      this.googlePlaceData.address.street = `${this.googlePlaceData.address.street_number} ${this.googlePlaceData.address.street_name}`
      // Get photo urls
      this.googlePlaceData.photos = details.photos.map(function (photo) {
        return photo.getUrl()
      })
      console.log(this.googlePlaceData)
    },
    getGooglePlacesResults (predictions, status) {
      var formattedResults = predictions.map(function (prediction) {
        return { label: prediction.description, value: prediction.place_id }
      })
      this.loadingResults = false
      this.results = formattedResults
    },
    searchGooglePlaces (searchText, update) {
      if (searchText === '') {
        update(() => {
          return this.results
        })
        return
      }
      update(() => {
        this.loadingResults = true
        const searchTextFormatted = searchText.toLowerCase()
        // Initialize AutocompleteService and call getPlacePredictions
        var service = new google.maps.places.AutocompleteService()
        service.getPlacePredictions({ input: searchTextFormatted }, this.getGooglePlacesResults)
      })
    },
    showReviewsPreview () {
      this.$refs.reviewsForm.validate().then(success => {
        if (success) {
          this.$q.dialog({
            component: ReviewsPreview,
            parent: this,
            reviews: this.googlePlaceData.reviews
          })
        } else {
          this.$q.notify({
            color: 'brand-yellow',
            textColor: 'grey-9',
            icon: 'error',
            message: 'Please search for you business first'
          })
        }
      })
    },
    setGooglePlaceData () {
      this.googlePlaceData = this.$lodash.cloneDeep(this.googlePlace)
    }
  },
  created () {
    this.setGooglePlaceData()
  },
  beforeRouteLeave (to, from, next) {
    console.log('Save Changes?') // Ask user to save changes
    this.updateGooglePlace(this.googlePlaceData)
    next()
  }
}
</script>
