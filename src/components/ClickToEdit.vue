<template>
  <div class="field-to-edit">
    <span class="field-value" v-show="!showField('value')" @click="focusField('value')">{{ value }}</span>
    <textarea v-model="value" v-show="showField('value')" type="text" class="field-value form-control" @focus="focusField('value')" @blur="blurField"></textarea>
  </div>
</template>

<script>
  import { store } from '../store.js'
  export default {
    name: "ClickToEdit",
    props: ['value'],
    data () {
    return {
        sharedState: store.state.json.campaign,
        campaign : {
          riskStatus: '',
          targetAudience: '',
          partnerGoals: '',
          roiExpected: '',
          roiObtained: '',
          value: ''
        },
        editField : ''
      }
    },
    methods : {
      focusField: function (dataToClickEdit) {
        this.editField = dataToClickEdit;
      },

      blurField: function (){
        this.editField = '';
      },

      showField: function (dataToClickEdit) {
        return (this.campaign[dataToClickEdit] == '' || this.editField == dataToClickEdit)
      }
    }
}
</script>
<style >

.partner-goals-target .field-value.form-control {
  height: 18vh !important;
  padding: 0;
  resize: none;
}

.impacts .field-value.form-control {
  height: 8vh !important;
  padding: 0;
  resize: none;
}

</style>
