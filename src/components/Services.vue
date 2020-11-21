<template>
  <div>
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <q-form ref="highlightsForm">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-6 col-xs-12">
          <q-item-label class="text-h4 q-ma-xs">Service & Details</q-item-label>
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="serviceInView.name"
            label="Service"
            placeholder="Service or Product name"
            :rules="[val => !!val || 'Please enter a name']"
          />
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs">
        <div class="col-md-6 col-xs-12">
          <q-input
            dark
            square
            outlined
            clearable
            color="brand-yellow"
            v-model="descriptionInView.text"
            label="Detail"
            placeholder="A detail about this service"
            ref="detailInput"
          />
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-6 col-xs-12">
          <q-list
            class="text-center text-subtitle1 text-weight-bold text-info shadow-14"
          >
            <div
              v-for="(detail, idx) in serviceInView.details"
              :key="idx"
            >
              <q-item
                clickable
                class="bg-brand-grey"
                @click="selectDetail(idx)"
              >
                <q-item-section side>
                  {{idx + 1}}
                </q-item-section>
                <q-item-section class="overflow">
                  {{ detail.text }}
                </q-item-section>
                <q-item-section side>
                  <div>
                    <q-btn color="brand-yellow" size="md" flat dense icon="delete" @click.stop="deleteDescription(idx)" />
                    <q-btn color="brand-teal" size="md" flat dense icon="add_box" @click.stop="addDescription(idx)" />
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </div>
      </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="q-pa-xs text-center">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <q-pagination
          color="brand-orange"
          text-color="grey-9"
          v-model="currentService"
          :max="services.length"
          @input="currentDetail = 0"
        />
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-6">
          <q-btn flat no-caps class="full-width bg-brand-yellow" label="Delete Service" @click="deleteService" />
        </div>
        <div class="col-md-2 col-xs-6">
          <q-btn flat no-caps class="full-width bg-brand-teal" label="Add Service" @click="addService" />
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-12">
          <q-btn flat no-caps class="full-width bg-brand-orange" label="Preview" @click="showServicesPreview" />
        </div>
      </div>
    </q-card-actions>
  </div>
</template>

<script>
const detail = {
  text: null
}
export default {
  name: 'Services',
  data () {
    return {
      currentService: 1,
      currentDetail: 0,
      services: [
        {
          name: null,
          details: [
            { ...detail },
            { ...detail },
            { ...detail }
          ]
        },
        {
          name: null,
          details: [
            { ...detail },
            { ...detail },
            { ...detail }
          ]
        },
        {
          name: null,
          details: [
            { ...detail },
            { ...detail },
            { ...detail }
          ]
        }
      ]
    }
  },
  computed: {
    serviceInView () {
      return this.services[this.currentService - 1]
    },
    descriptionInView () {
      return this.serviceInView.details[this.currentDetail]
    }
  },
  methods: {
    selectDetail (currentIndex) {
      this.currentDetail = currentIndex
      this.$refs.detailInput.focus()
    },
    deleteDescription (currentIndex) {
      if (this.services[this.currentService - 1].details.length > 3) {
        this.services[this.currentService - 1].details.splice(currentIndex, 1)
        this.currentDetail = currentIndex - 1
        this.$refs.detailInput.focus()
      } else {
        this.$q.notify({
          color: 'brand-yellow',
          textColor: 'grey-9',
          icon: 'error',
          message: 'A minimum of 3 details is required!'
        })
      }
    },
    addDescription (currentIndex) {
      var newIndex = currentIndex + 1
      this.services[this.currentService - 1].details.splice(newIndex, 0, { ...detail })
      this.currentDetail = newIndex
      this.$refs.detailInput.focus()
    },
    deleteService () {
      if (this.services.length > 3) {
        this.services.splice(this.currentService - 1, 1)
        this.currentService -= 1
      } else {
        this.$q.notify({
          color: 'brand-yellow',
          textColor: 'grey-9',
          icon: 'error',
          message: 'A minimum of 3 services is required!'
        })
      }
    },
    addService () {
      var service = {
        name: null,
        details: [
          { ...detail },
          { ...detail },
          { ...detail }
        ]
      }
      this.services.push(service)
      this.currentService = this.services.length
    },
    showServicesPreview () {
      console.log('do sum')
    }
  }
}
</script>
