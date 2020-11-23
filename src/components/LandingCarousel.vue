<template>
  <div>
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">

        <!-- Left Side - Slides -->
        <div class="col-md-6 col-xs-12">
          <q-form ref="slideForm">
          <!-- Title -->
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-item-label class="text-h4 q-ma-xs">Slide Content</q-item-label>
              <q-input
                dark
                square
                outlined
                color="brand-yellow"
                v-model="slideInView.title"
                label="Title"
                :rules="[val => !!val || 'Please enter a title']"
              />
            </div>
          </div>
          <!-- Subtitle 1 - Subtitle 2 -->
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <q-input
                dark
                square
                outlined
                color="brand-yellow"
                v-model="slideInView.subtitle_1"
                label="Subtitle - 1 (Optional)"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-input
                dark
                square
                outlined
                color="brand-yellow"
                v-model="slideInView.subtitle_2"
                label="Subtitle - 2 (Optional)"
              />
            </div>
          </div>
          <!-- Caption -->
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-input
                dark
                square
                outlined
                color="brand-yellow"
                v-model="slideInView.caption"
                label="Caption (Optional)"
              />
            </div>
          </div>
          <!-- Image -->
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12" v-if="!slideInView.image">
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
            <div class="col-md-12 col-xs-12" v-if="slideInView.image">
              <q-img
                :src="slideInView.image"
                :ratio="4/3"
              >
                <q-btn flat no-caps label="Re-Upload" class="shadow-14 bg-brand-yellow text-grey-9" style="top: 85%;" @click="resetImage"/>
              </q-img>
            </div>
          </div>
          </q-form>
        </div>

        <!-- Right Side Buttons -->
        <div class="col-md-6 col-xs-12">
          <q-form ref="buttonForm">
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-item-label class="text-h4 q-ma-xs">Slide Buttons</q-item-label>
              <q-input
                dark
                square
                outlined
                color="brand-yellow"
                v-model="buttonInView.label"
                :label="!currentButton ? 'Add Button': 'Label'"
                :rules="[val => !!val || 'Please enter a label']"
                lazy-rules
                :readonly="!currentButton ? true : false"
              />
            </div>
          </div>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-select
                dark
                square
                outlined
                color="brand-yellow"
                :popup-content-style="{ backgroundColor: '#1D1D1D' }"
                v-model="buttonInView.type"
                :options="options"
                :label="!currentButton ? 'Add Button': 'Type'"
                :rules="[val => !!val || 'Please select a type']"
                lazy-rules
                :readonly="!currentButton ? true : false"
              />
            </div>
          </div>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-12 col-xs-12">
              <q-input
                dark
                square
                outlined
                color="brand-yellow"
                v-model="buttonInView.link"
                :label="!currentButton ? 'Add Button': 'Link'"
                :readonly="!currentButton ? true : false"
              />
            </div>
          </div>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <q-pagination
              color="brand-orange"
              text-color="grey-9"
              v-model="currentButton"
              :max="slideInView.buttons.length"
            />
          </div>
          <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
            <div class="col-md-4 col-xs-6">
              <q-btn flat no-caps class="full-width text-grey-9 bg-brand-yellow" label="Delete Button" @click="deleteButton"/>
            </div>
            <div class="col-md-4 col-xs-6">
              <q-btn flat no-caps class="full-width text-grey-9 bg-brand-teal" label="Add Button" @click="addButton"/>
            </div>
          </div>
          </q-form>
        </div>
      </div>

    </q-card-section>

    <q-card-actions class="q-pa-xs text-center">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <q-pagination
          color="brand-orange"
          text-color="grey-9"
          v-model="currentSlide"
          :max="slidesData.length"
          @input="currentButton = slideInView.buttons.length ? 1 : 0"
        />
      </div>
    </q-card-actions>

    <q-card-actions class="q-pa-xs text-center">

      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-6">
          <q-btn flat no-caps class="full-width bg-brand-yellow" label="Delete Slide" @click="deleteSlide"/>
        </div>
        <div class="col-md-2 col-xs-6">
          <q-btn flat no-caps class="full-width bg-brand-teal" label="Add Slide" @click="addSlide"/>
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-12">
          <q-btn flat no-caps class="full-width bg-brand-orange" label="Preview" @click="showSlidePreview" />
        </div>
      </div>
    </q-card-actions>

  </div>
</template>

<script>
var slideTemplate = {
  id: null,
  title: null,
  subtitle_1: null,
  subtitle_2: null,
  caption: null,
  image: null,
  buttons: []
}
var buttonTemplate = {
  label: null,
  type: null,
  link: null
}
import { mapGetters, mapActions } from 'vuex'
import LandingCarouselPreview from 'components/LandingCarouselPreview'
export default {
  name: 'LandingCarousel',
  data () {
    return {
      url: null,
      options: ['URL', 'Download', 'PopUp'],
      currentSlide: 1,
      currentButton: 1,
      slidesData: [
        {
          id: 1,
          title: null,
          subtitle_1: null,
          subtitle_2: null,
          caption: null,
          image: null,
          buttons: [
            {
              id: 1,
              label: null,
              type: null,
              link: null
            }
          ]
        },
        {
          id: 2,
          title: null,
          subtitle_1: null,
          subtitle_2: null,
          caption: null,
          image: null,
          buttons: [
            {
              id: 1,
              label: null,
              type: null,
              link: null
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters('builder', ['business', 'template', 'slides']),
    slideInView () {
      return this.slidesData[this.currentSlide - 1]
    },
    buttonInView () {
      if (this.currentButton > 0) {
        return this.slideInView.buttons[this.currentButton - 1]
      }
      return {}
    }
  },
  methods: {
    ...mapActions('builder', ['updateSlides', 'generateUploadLink']),
    getUploadLink () {
      var body = {
        id: this.business.id,
        template: this.template,
        section: 'landing-carousel',
        fileName: `slide-${this.currentSlide}-image.png`
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
      this.slidesData[this.currentSlide - 1].image = `https://website-builder-webapp-data.s3.us-east-2.amazonaws.com/${this.template}/${this.business.id}/landing-carousel/slide-${this.currentSlide}-image.png`
    },
    resetImage () {
      this.slidesData[this.currentSlide - 1].image = null
    },
    addSlide () {
      this.$refs.slideForm.validate().then(success => {
        if (success) {
          var slide = { ...slideTemplate } // Shallow copy slideTemplate (only copies non-nested)
          slide.buttons = [{ ...buttonTemplate }] // Shallow copy buttonTemplate (buttons nested)
          var id = this.slidesData.length + 1
          slide.id = id
          this.slidesData.push({ ...slide })
          this.currentSlide += 1
        }
      })
    },
    deleteSlide () {
      if (this.slidesData.length > 2) {
        var idx = this.currentSlide - 1
        this.slidesData.splice(idx, 1)
        this.currentSlide = 1
        // Renumber slide id's after delete
        var slideId = 1
        this.slidesData.forEach(slide => {
          slide.id = slideId
          slideId += 1
          return slide
        })
      } else {
        this.$q.notify({
          color: 'brand-yellow',
          textColor: 'grey-9',
          icon: 'error',
          message: 'A minimum of 2 slidesData is required!'
        })
      }
    },
    addButton () {
      if (this.slideInView.buttons.length) {
        this.$refs.buttonForm.validate().then(success => {
          if (success) {
            this.slidesData[this.currentSlide - 1].buttons.push({ ...buttonTemplate })
            this.currentButton += 1
          }
        })
      } else {
        this.slidesData[this.currentSlide - 1].buttons.push({ ...buttonTemplate })
        this.currentButton += 1
      }
    },
    deleteButton () {
      var idx = this.currentButton - 1
      this.slidesData[this.currentSlide - 1].buttons.splice(idx, 1)
      this.currentButton = this.slideInView.buttons.length
      this.$refs.buttonForm.resetValidation()
    },
    showSlidePreview () {
      this.$q.dialog({
        component: LandingCarouselPreview,
        parent: this,
        slides: this.slidesData
      })
    },
    setSlidesData () {
      this.slidesData = this.$lodash.cloneDeep(this.slides)
    }
  },
  created () {
    this.setSlidesData()
  },
  beforeRouteLeave (to, from, next) {
    console.log('Save Changes?') // Ask user to save changes
    this.updateSlides(this.slidesData)
    next()
  }
}
</script>

<style>
.button {
  width: auto;
  height: auto;
  font-size: 1.2rem;
}

.header-1 {
  font-size: 5rem;
  font-weight: 600;
  line-height: 90%;
}

.header-2 {
  font-size: 4rem;
  font-weight: 400;
}

.header-3 {
  font-size: 2.5rem;
  font-weight: 300;
}

.background-block {
  background: rgba(0, 0, 0, .7);
  height: 40rem;
  width: 110rem;
}
</style>
