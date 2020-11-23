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
                v-model="aboutUsData.title"
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
                v-model="aboutUsData.description"
                type="textarea"
                style="max-height: 6rem;"
                label="Business Description"
                placeholder="Describe your business to potential customers, what makes it unique?, how can it help them?"
                :rules="[val => !!val || 'Please describe your business']"
              />
            </div>
          </div>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12" v-if="!aboutUsData.image">
              <q-uploader
                flat
                square
                hide-upload-btn
                style="width: auto"
                color="brand-orange"
                label="Background Image"
                class="text-left bg-brand-grey"
                :url="url"
                ref="fileUploader"
                @added="getUploadLink"
                @uploaded="onUploadComplete"
                @rejected="onUploadFail"
                :headers="[{'Content-Type': '*'}]"
                :send-raw="true"
                max-files="1"
                max-file-size="10000000"
                method="PUT"
              />
            </div>
            <div class="col-md-12 col-xs-12" v-if="aboutUsData.image">
              <q-img
                :src="aboutUsData.image"
                :ratio="4/3"
              >
                <q-btn flat no-caps label="Re-Upload" class="shadow-14 bg-brand-yellow text-grey-9" style="top: 85%;" @click="resetImage"/>
              </q-img>
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
              :max="aboutUsData.coreValues.length"
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
import { mapGetters, mapActions } from 'vuex'
import AboutUsPreview from 'components/AboutUsPreview'
export default {
  name: 'AboutUs',
  data () {
    return {
      url: null,
      aboutUsData: {
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
    ...mapGetters('builder', ['business', 'template', 'aboutUs']),
    valueInView () {
      return this.aboutUsData.coreValues[this.currentValue - 1]
    }
  },
  methods: {
    ...mapActions('builder', ['updateAboutUs', 'generateUploadLink']),
    getUploadLink () {
      var body = {
        id: this.business.id,
        template: this.template,
        section: 'about-us',
        fileName: 'aboutUs-image.png'
      }
      this.generateUploadLink(body).then((response) => {
        this.url = response
      }).then(() => {
        this.$refs.fileUploader.upload()
      })
    },
    onUploadFail () {
      this.$q.notify({
        color: 'warning',
        textColor: 'grey-2',
        icon: 'warning',
        message: 'File extension not supported or File size is too large'
      })
    },
    onUploadComplete () {
      this.$q.notify({
        color: 'positive',
        textColor: 'grey-9',
        icon: 'send',
        message: 'File uploaded successfully'
      })
      this.aboutUsData.image = `https://website-builder-webapp-data.s3.us-east-2.amazonaws.com/${this.template}/${this.business.id}/about-us/aboutUs-image.png`
    },
    resetImage () {
      this.aboutUsData.image = null
    },
    addValue () {
      this.$refs.coreValuesForm.validate().then(success => {
        if (success) {
          this.aboutUsData.coreValues.push({ ...coreValue })
          this.currentValue += 1
        }
      })
    },
    deleteValue () {
      if (this.aboutUsData.coreValues.length > 3) {
        var idx = this.currentValue - 1
        this.aboutUsData.coreValues.splice(idx, 1)
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
        aboutUs: this.aboutUsData
      })
    },
    setAboutUsData () {
      this.aboutUsData = this.$lodash.cloneDeep(this.aboutUs)
    }
  },
  created () {
    this.setAboutUsData()
  },
  beforeRouteLeave (to, from, next) {
    console.log('Save Changes?') // Ask user to save changes
    this.updateAboutUs(this.aboutUsData)
    next()
  }
}
</script>
