<template>
  <div id="app">
    <div class="container">
      <h4>Avancement</h4>
      <div class="main-info-campaign">
        <div>
          <h6><b>Niveau de risque</b></h6>
          <select class="form-control" v-model="sharedState.risk_status" v-bind:class= "dropdownOptionsClasses" v-show="showField('riskStatus')" @click="focusField('riskStatus'); !showField('riskStatus')">
            <option value="low_risk">Risque faible</option>
            <option value="to_monitor">⚠️ À surveiller</option>
            <option value="high_risk">Risque élevé</option>
          </select>

        </div>
        <div class="campaign-progress-months">
          <div><b>{{ dateRange(Date.now(), sharedState.starts_at) }} mois écoulés</b></div>
          <div><b><el-progress :text-inside="false" :stroke-width="14" :percentage="progressPercentage((dateRange(Date.now(), sharedState.starts_at)), (dateRange(sharedState.ends_at, sharedState.starts_at)))"></el-progress></b></div>
          <div>sur {{ dateRange(sharedState.ends_at, sharedState.starts_at) }} au total</div>
        </div>
        <div class="campaign-progress-operations">
          <div><b>{{ pastOperations }} opés réalisées</b></div>
          <div><b><el-progress :text-inside="false" :stroke-width="14" :percentage="33"></el-progress></b></div>
          <div>sur {{ sharedState.operations_count }} au total</div>
        </div>
      </div>

      <div class="operations-chart">
        <div><b>Opérations</b></div>
        <div class="chart"><ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram></div>
      </div>

      <div class="campaign-progress">
        <div class="campaign-impressions">
          <div class="img-campaign-info-type">
            <img src="../public/images/img1.png" alt="">
            <div>
              <div><b>{{ sharedState.total_impressions.toLocaleString() }}</b></div>
              <div>Impressions</div>
            </div>
          </div>
          <div class="impressions-progress"><b><el-progress :text-inside="false" :stroke-width="14" :percentage="progressPercentage(sharedState.total_impressions, sharedState.kpi_reads)"></el-progress></b></div>
          <div>Objectif : <b>{{ sharedState.kpi_reads.toLocaleString() }}</b></div>
        </div>
        <div class="users-reached">
          <div class="img-campaign-info-type">
            <img src="../public/images/img2.png" alt="">
            <div>
              <div><b>{{ sharedState.unique_impressions.toLocaleString() }}</b></div>
              <div>Utilisatrices touchées</div>
            </div>
          </div>
          <div class="impressions-progress"><b><el-progress :text-inside="false" :stroke-width="14" :percentage="17" v-if="sharedState.kpi_reach !== null"></el-progress></b></div>
          <div v-if="sharedState.kpi_reach !== null">Objectif : <b>{{ sharedState.kpi_reach.toLocaleString() }}</b></div>
        </div>
        <div class="interactions">
          <div class="img-campaign-info-type">
            <img src="../public/images/img3.png" alt="">
            <div>
              <div><b>{{ sharedState.interactions.toLocaleString() }}</b></div>
              <div>Interactions</div>
            </div>
          </div>
        </div>
        <div class="redirections">
          <div class="img-campaign-info-type">
            <img src="../public/images/img4.png" alt="">
            <div>
              <div><b>{{ sharedState.redirections.toLocaleString() }}</b></div>
              <div>Redirections</div>
            </div>
          </div>
        </div>
      </div>

      <div class="goals">
        <div class="goals-title">Objectifs</div>
        <div class="partner-goals-target">
          <div class="partner-goals">
            <div class="partner-goals-title"><b>Objectifs du partenaire</b></div>
            <div class="partner-goals-content">
              <ClickToEdit v-model="sharedState.partner_goals"/>
            </div>
          </div>
          <div class="target-audience">
            <div class="target-audience-title"><b>Cœur de cible</b></div>
            <ClickToEdit v-model="sharedState.target_audience"/>
          </div>
        </div>
        <div class="impacts">
          <div class="roi-expected">
            <div><b>Impacts recherchés</b></div>
            <ClickToEdit v-model="sharedState.roi_expected"/>
          </div>
          <div class="roi-obtained">
            <div><b>Impacts obtenus</b></div>
            <ClickToEdit v-model="sharedState.roi_obtained"/>
          </div>
        </div>

      </div>
      <UrlList />
      <UrlForm />
      <br>

    </div>

  </div>
</template>

<script>
import { store } from './store.js'
import UrlList from './components/UrlList.vue';
import UrlForm from './components/UrlForm.vue';
import ClickToEdit from './components/ClickToEdit.vue';
export default {
  name: 'App',
  components: {
    UrlList,
    UrlForm,
    ClickToEdit
  },
  data() {
    this.chartSettings = {
      metrics: ['Prêtes', 'À intégrer', 'À valider'],
      stack: { 'campaigns': ['Prêtes', 'À intégrer', 'À valider'] }
    }
    return {
      sharedState: store.state.json.campaign,
      chartData: {
        columns: ['date', 'Prêtes', 'À intégrer', 'À valider'],
        rows: []
      },

      campaign : {
        riskStatus: '',
        targetAudience: '',
        partnerGoals: '',
        roiExpected: '',
        roiObtained: ''
      },
      editField : ''
    }
  },

  created: function () {
    this.arrayRows();
  },


  computed: {
    pastOperations () {
      return this.sharedState.operations.filter(operation => operation.ends_at < Date.now()).length;
    },

    dropdownOptions () {
      if (this.sharedState.risk_status === "low_risk") {
        return "Risque faible"
      }

      else if (this.sharedState.risk_status === "to_monitor") {
        return "⚠️ À surveiller"
      }

      else if (this.sharedState.risk_status === "high_risk") {
        return "Risque élevé"
      }

      else {
        return ""
      }
    },

    dropdownOptionsClasses () {
      if (this.sharedState.risk_status === "low_risk") {
        return "low-risk"
      }

      else if (this.sharedState.risk_status === "to_monitor") {
        return "to-monitor"
      }

      else if (this.sharedState.risk_status === "high_risk") {
        return "high-risk"
      }

      else {
        return ""
      }
    }
  },

  methods: {
    dateRange: function (dateEnd, dateBeginning) {
      return Math.floor((dateEnd - dateBeginning) / 86400000 / 30)
    },

    progressPercentage: function (currentValue, goalValue) {
      return Math.floor(currentValue * 100 / goalValue)
    },

    arrayRows: function () {

      let arrayMonths = []

      // we retrieve the first month of the campaign
      const firstMonthForChart = new Date(parseInt(this.sharedState.operations.map(operation => operation.ends_at).sort()[0]))
       // we retrieve the last day of the month before the beginning of the campaign
      const lastDayOfFirstMonth = new Date(firstMonthForChart.getFullYear(), firstMonthForChart.getMonth(), 0);

      // we retrieve the first month of the campaign
      const lastMonthForChart = new Date(parseInt(this.sharedState.operations.map(operation => operation.ends_at).sort().reverse()[0]))

      // we retrieve the last day of the last month of the campaign
      const lastDayOfLastMonth = new Date(lastMonthForChart.getFullYear(), lastMonthForChart.getMonth() + 1, 0);

      // we build the array of month objects where the first object corresponds to the first month of the campaign and the last to the last month of the campaign
      arrayMonths.push(lastDayOfFirstMonth)
      let i = 2
      while (arrayMonths[arrayMonths.length - 1] < lastDayOfLastMonth) {
        arrayMonths.push(new Date(lastDayOfFirstMonth.getFullYear(), lastDayOfFirstMonth.getMonth() + i, 0))
        i = i + 1
      }

      // we build the array of objects where each object corresponds to a column of the chart
      const dataRows = []
      arrayMonths.forEach((month, index) => {
        const monthObject = {date: month.toString().slice(4,7), 'Prêtes': 0, 'À intégrer': 0, 'À valider': 0}
        this.sharedState.operations.forEach((operation) => {
          if (operation.starts_at > arrayMonths[index -1] && operation.ends_at <= month) {
            if (operation.format.validation_status === "valid") {
              monthObject['Prêtes'] += 1
            }
            else if (operation.format.validation_status === "to_integrate") {
              monthObject['À intégrer'] += 1
            }
            else if (operation.format.validation_status === "to_validate") {
              monthObject["À valider"] += 1
            }
          } else if (operation.starts_at < month && operation.ends_at >= month) {
            if (operation.format.validation_status === "valid") {
              monthObject['Prêtes'] += 1
            }
            else if (operation.format.validation_status === "to_integrate") {
              monthObject['À intégrer'] += 1
            }
            else if (operation.format.validation_status === "to_validate") {
              monthObject["À valider"] += 1
            }
          }
        })

      dataRows.push(monthObject)
      })

      // we return the array of objects
      return this.chartData.rows = dataRows
    },

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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 30px;
}

img {
  padding-right: 6%;
}

.el-progress__text {
  color: black;
}

.main-info-campaign {
  display: flex;
  justify-content: space-between;
  width: 70%;
}

.campaign-progress {
  margin-top: 2%;
  display: flex;
  justify-content: space-between;
}

.partner-goals-target, .impacts {
  display: flex;
  justify-content: space-between;
}

.goals, .operations-chart, .impacts, .partner-goals-messages, .impact-follow-up {
  margin-top: 2%;
}

.goals-title {
  font-size: 20px;
  font-weight: bold;
}

.partner-goals-title, .form-new-link {
  margin-top: 1%;
}

.roi-expected, .roi-obtained, .target-audience, .partner-goals {
  width: 48%;
}

.img-campaign-info-type {
  display: flex;
}

.users-reached, .campaign-impressions {
  width: 22%;
}

#btn-add-link {
  background-color: #90be6d;
  border: solid 1px #74A94C;
  border-radius: 2px;
  color: white;
  padding: 2px 16px;
}

#url-list, #url-form {
  margin: 2% 0 2% 0;
}

.form-control {
  border: none;
}

.low-risk {
  background: #1AE9BF;
}

.to-monitor {
  background-color: #e09f3e;
  border-radius: 4px;
  color: white;
  margin-top: 6%;
}

.high-risk {
  background: #FF7993;
}

select {
  appearance: none;
  text-align-last: center;
}

</style>
