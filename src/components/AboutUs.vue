<template>
  <div>
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">

        <!-- Left Side - Banner -->
        <div class="col-md-6 col-xs-12">
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-item-label class="text-h4 q-ma-xs">Banner Content</q-item-label>
              <q-input
                dark
                square
                outlined
                color="brand-yellow"
                v-model="aboutUs.title"
                label="Title"
                placeholder="Suggestion: Business Name/Slogan/Established"
                :rules="[val => !!val || 'Please enter a title']"
              />
            </div>
          </div>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-input
                dark
                filled
                clearable
                v-model="aboutUs.description"
                type="textarea"
                style="max-height: 6rem;"
                label="Business Description"
                placeholder="Describe your business to potential customers, what makes it unique?, how can it help them?"
                :rules="[val => !!val || 'Please describe your business']"
              />
            </div>
          </div>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-uploader
                flat
                square
                text-color="grey-3"
                color="brand-orange"
                class="text-left bg-brand-grey"
                url="http://localhost:8082/upload"
                label="Background Image"
                style="width: auto;"
              />
            </div>
          </div>
        </div>

        <!-- Right Side Core Values -->
        <div class="col-md-6 col-xs-12">
          <q-form ref="coreValuesForm">
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-item-label class="text-h4 q-ma-xs">Core Values</q-item-label>
              <q-input
                dark
                square
                outlined
                color="brand-yellow"
                v-model="valueInView.name"
                label="Name"
                placeholder="Word or phrase that represents your business"
                :rules="[val => !!val || 'Please enter a core value']"
              />
            </div>
          </div>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-input
                dark
                filled
                clearable
                v-model="valueInView.definition"
                type="textarea"
                style="max-height: 6rem;"
                label="Definition"
                placeholder="How is this word or phrase defined within the context of your business"
                :rules="[val => !!val || 'Please define the core value']"
              />
            </div>
          </div>
          </q-form>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <q-pagination
              color="brand-orange"
              text-color="grey-9"
              v-model="currentValue"
              :max="aboutUs.coreValues.length"
            />
          </div>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-4 col-xs-6">
              <q-btn flat no-caps class="full-width text-grey-9 bg-brand-yellow" label="Delete Value" @click="deleteValue"/>
            </div>
            <div class="col-md-4 col-xs-6">
              <q-btn flat no-caps class="full-width text-grey-9 bg-brand-teal" label="Add Value" @click="addValue"/>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="q-pa-xs text-center">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-12">
          <q-btn flat no-caps class="full-width bg-brand-orange" label="Preview" @click="showAboutUsPreview"/>
        </div>
      </div>
    </q-card-actions>
  </div>
</template>

<script>
const coreValue = {
  name: null,
  definition: null
}
import AboutUsPreview from 'components/AboutUsPreview'
export default {
  name: 'AboutUs',
  data () {
    return {
      aboutUs: {
        title: null,
        description: null,
        image: null,
        coreValues: [
          { ...coreValue },
          { ...coreValue },
          { ...coreValue }
        ]
      },
      currentValue: 1
    }
  },
  computed: {
    valueInView () {
      return this.aboutUs.coreValues[this.currentValue - 1]
    }
  },
  methods: {
    addValue () {
      this.$refs.coreValuesForm.validate().then(success => {
        if (success) {
          this.aboutUs.coreValues.push({ ...coreValue })
          this.currentValue += 1
        }
      })
    },
    deleteValue () {
      if (this.aboutUs.coreValues.length > 3) {
        var idx = this.currentValue - 1
        this.aboutUs.coreValues.splice(idx, 1)
        this.currentValue = 1
      } else {
        this.$q.notify({
          color: 'brand-yellow',
          textColor: 'grey-9',
          icon: 'error',
          message: 'A minimum of 3 values is required!'
        })
      }
    },
    showAboutUsPreview () {
      this.$q.dialog({
        component: AboutUsPreview,
        parent: this,
        aboutUs: this.aboutUs
      })
    }
  }
}
</script>
