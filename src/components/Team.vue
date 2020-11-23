<template>
  <div>
    <q-card-section class="q-pa-xs text-center text-grey-3">
      <q-form ref="teamForm">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-6 col-xs-12">
          <q-item-label class="text-h4 q-ma-xs">Team Members</q-item-label>
          <q-input
            dark
            square
            outlined
            color="brand-yellow"
            v-model="teamMemberInView.name"
            label="First Last Name"
            :rules="[val => !!val || 'Please enter First Last name']"
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
            v-model="teamMemberInView.position"
            label="Position"
            :rules="[val => !!val || 'Please enter a position']"
          />
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-6 col-xs-12" v-if="!teamMemberInView.image">
          <q-uploader
            flat
            square
            hide-upload-btn
            style="width: auto"
            color="brand-orange"
            label="Profile Image"
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
        <div class="col-md-6 col-xs-12" v-if="teamMemberInView.image">
          <q-img
            :src="teamMemberInView.image"
            :ratio="4/3"
          >
            <q-btn flat no-caps label="Re-Upload" class="shadow-14 bg-brand-yellow text-grey-9" style="top: 85%;" @click="resetImage"/>
          </q-img>
        </div>
      </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="q-pa-xs text-center">
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <q-pagination
          color="brand-orange"
          text-color="grey-9"
          v-model="currentTeamMember"
          :max="teamMembersData.length"
        />
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-6">
          <q-btn flat no-caps class="full-width bg-brand-yellow" label="Delete Member" @click="deleteMember"/>
        </div>
        <div class="col-md-2 col-xs-6">
          <q-btn flat no-caps class="full-width bg-brand-teal" label="Add Member" @click="addMember"/>
        </div>
      </div>
      <div class="row justify-center full-width q-col-gutter-xs q-mb-xs">
        <div class="col-md-2 col-xs-12">
          <q-btn flat no-caps class="full-width bg-brand-orange" label="Preview" @click="showTeamPreview"/>
        </div>
      </div>
    </q-card-actions>
  </div>
</template>

<script>
const teamMember = {
  id: null,
  name: null,
  image: null
}
import { mapGetters, mapActions } from 'vuex'
import TeamPreview from 'components/TeamPreview'
export default {
  name: 'Team',
  data () {
    return {
      url: null,
      teamMembersData: [
        { ...teamMember }
      ],
      currentTeamMember: 1
    }
  },
  computed: {
    ...mapGetters('builder', ['business', 'template', 'teamMembers']),
    teamMemberInView () {
      return this.teamMembersData[this.currentTeamMember - 1]
    }
  },
  methods: {
    ...mapActions('builder', ['updateTeamMembers', 'generateUploadLink']),
    getUploadLink () {
      var body = {
        id: this.business.id,
        template: this.template,
        section: 'team-members',
        fileName: `team-member-${this.currentTeamMember}-image.png`
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
      this.teamMembersData[this.currentTeamMember - 1].image = `https://website-builder-webapp-data.s3.us-east-2.amazonaws.com/${this.template}/${this.business.id}/team-members/team-member-${this.currentTeamMember}-image.png`
    },
    resetImage () {
      this.teamMembersData[this.currentTeamMember - 1].image = null
    },

    addMember () {
      this.$refs.teamForm.validate().then(success => {
        if (success) {
          this.teamMembersData.push({ ...teamMember })
          this.currentTeamMember += 1
        }
      })
    },
    deleteMember () {
      if (this.teamMembersData.length > 1) {
        var idx = this.currentTeamMember - 1
        this.teamMembersData.splice(idx, 1)
        this.currentTeamMember = 1
      } else {
        this.$q.notify({
          color: 'brand-yellow',
          textColor: 'grey-9',
          icon: 'error',
          message: 'A minimum of 1 team member is required!'
        })
      }
    },
    showTeamPreview () {
      var teamMemberId = 1
      this.teamMembersData.forEach(teamMember => {
        teamMember.id = teamMemberId
        teamMemberId += 1
        return teamMember
      })
      this.$q.dialog({
        component: TeamPreview,
        parent: this,
        teamMembers: this.teamMembersData
      })
    },
    setTeamMembersData () {
      this.teamMembersData = this.$lodash.cloneDeep(this.teamMembers)
    }
  },
  created () {
    this.setTeamMembersData()
  },
  beforeRouteLeave (to, from, next) {
    console.log('Save Changes?') // Ask user to save changes
    this.updateTeamMembers(this.teamMembersData)
    next()
  }
}
</script>
