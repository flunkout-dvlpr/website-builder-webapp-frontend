<template>
  <div>
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <q-form ref="highlightsForm">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-6 col-xs-12">
          <q-item-label class="text-h4 q-ma-xs">Highlights</q-item-label>
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="highlightInView.name"
            label="Name"
            placeholder="Something about your business to highlight"
            :rules="[val => !!val || 'Please enter a highlight']"
          />
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-3 col-xs-12">
          <q-select
            dark
            square
            outlined
            color="brand-yellow"
            v-model="iconCategory"
            :options="iconCategories"
            @input="highlightInView.icon = null"
            label="Icon Category"
            map-options
            emit-value
          />
        </div>
        <div class="col-md-3 col-xs-12">
          <q-select
            dark
            square
            outlined
            use-input
            hide-selected
            fill-input
            color="brand-yellow"
            v-model="highlightInView.icon"
            :options="filteredIcons"
            @filter="filterIcons"
            label="Icon"
            :rules="[val => !!val || 'Please select an icon']"
            emit-value
            map-options
          >
            <template v-slot:append>
              <q-icon :name="highlightInView.icon" size="xl" />
            </template>
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section avatar>
                  <q-icon :name="scope.opt.value" size="md" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="q-pa-xs text-center">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <q-pagination
          color="brand-orange"
          text-color="grey-9"
          v-model="currentHighlight"
          :max="highlights.length"
        />
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-6">
          <q-btn flat no-caps class="full-width bg-brand-yellow" label="Delete Highlight" @click="deleteHighlight" />
        </div>
        <div class="col-md-2 col-xs-6">
          <q-btn flat no-caps class="full-width bg-brand-teal" label="Add Highlight" @click="addHighlight" />
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-12">
          <q-btn flat no-caps class="full-width bg-brand-orange" label="Preview" @click="showHighlightsPreview" />
        </div>
      </div>
    </q-card-actions>
  </div>
</template>

<script>
const highlight = {
  name: null,
  icon: null
}
import materialDesign from 'src/assets/material-design.json'
import HighlightsPreview from 'components/HighlightsPreview'
export default {
  name: 'Highlights',
  data () {
    return {
      iconCategory: null,
      iconCategories: [
        { label: 'All', value: null },
        { label: 'Action', value: 'action' },
        { label: 'Alert', value: 'alert' },
        { label: 'Av', value: 'av' },
        { label: 'Communication', value: 'communication' },
        { label: 'Content', value: 'content' },
        { label: 'Device', value: 'device' },
        { label: 'Editor', value: 'editor' },
        { label: 'File', value: 'file' },
        { label: 'Hardware', value: 'hardware' },
        { label: 'Home', value: 'home' },
        { label: 'Image', value: 'image' },
        { label: 'Maps', value: 'maps' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Notification', value: 'notification' },
        { label: 'Places', value: 'places' },
        { label: 'Social', value: 'social' },
        { label: 'Toggle', value: 'toggle' }
      ],
      filteredIcons: this.icons,
      highlights: [
        { ...highlight },
        { ...highlight },
        { ...highlight }
      ],
      currentHighlight: 1
    }
  },
  computed: {
    icons () {
      if (this.iconCategory) {
        return materialDesign.icons.filter(icon => icon.categories.includes(this.iconCategory)).map(function (icon) {
          return { label: icon.name.replace(/_/gi, ' '), value: icon.name, tags: icon.tags, categories: icon.categories }
        })
      }
      return materialDesign.icons.map(function (icon) {
        return { label: icon.name.replace(/_/gi, ' '), value: icon.name, tags: icon.tags, categories: icon.categories }
      })
    },
    highlightInView () {
      return this.highlights[this.currentHighlight - 1]
    }
  },
  methods: {
    filterIcons (searchText, update) {
      if (searchText === '') {
        update(() => {
          this.filteredIcons = this.icons
        })
        return
      }
      update(() => {
        const searchTextFormatted = searchText.toLowerCase()
        this.filteredIcons = this.icons.filter(icon => icon.label.toLowerCase().indexOf(searchTextFormatted) > -1)
      })
    },
    addHighlight () {
      this.$refs.highlightsForm.validate().then(success => {
        if (success) {
          this.highlights.push({ ...highlight })
          this.currentHighlight += 1
        }
      })
    },
    deleteHighlight () {
      if (this.highlights.length > 3) {
        var idx = this.currentHighlight - 1
        this.highlights.splice(idx, 1)
        this.currentHighlight = 1
      } else {
        this.$q.notify({
          color: 'brand-yellow',
          textColor: 'grey-9',
          icon: 'error',
          message: 'A minimum of 3 highlights is required!'
        })
      }
    },
    showHighlightsPreview () {
      this.$q.dialog({
        component: HighlightsPreview,
        parent: this,
        highlights: this.highlights
      })
    }
  }
}
</script>
