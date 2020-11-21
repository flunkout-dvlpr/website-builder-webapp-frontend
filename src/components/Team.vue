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
        <div class="col-md-6 col-xs-12">
          <q-uploader
            flat
            square
            text-color="grey-3"
            color="brand-orange"
            class="text-left bg-brand-grey"
            url="http://localhost:8082/upload"
            label="Profile Image"
            style="width: auto;"
          />
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
          :max="teamMembers.length"
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
  image: 'https://lh3.googleusercontent.com/proxy/oVLBKoTjgDC1NiFpUmU424L8idZ7kCG5gXA241AO6rHHByYWZMx0L_a6F-4IYIfTymkaLbrwIoOsdYtZNlVCdG8ryvPi6BsW_atBGN3zYLxh1sKNsA806eAG6e9a6eYCHtMNVO_3Ag'
}
import TeamPreview from 'components/TeamPreview'
export default {
  name: 'Team',
  data () {
    return {
      teamMembers: [
        { ...teamMember }
      ],
      currentTeamMember: 1
    }
  },
  computed: {
    teamMemberInView () {
      return this.teamMembers[this.currentTeamMember - 1]
    }
  },
  methods: {
    addMember () {
      this.$refs.teamForm.validate().then(success => {
        if (success) {
          this.teamMembers.push({ ...teamMember })
          this.currentTeamMember += 1
        }
      })
    },
    deleteMember () {
      if (this.teamMembers.length > 1) {
        var idx = this.currentTeamMember - 1
        this.teamMembers.splice(idx, 1)
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
      this.teamMembers.forEach(teamMember => {
        teamMember.id = teamMemberId
        teamMemberId += 1
        return teamMember
      })
      this.$q.dialog({
        component: TeamPreview,
        parent: this,
        teamMembers: this.teamMembers
      })
    }
  }
}
</script>
