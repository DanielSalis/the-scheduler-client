<template>
  <GContainer class="schedule-page__container">
    <v-stepper
      v-model="currentStep"
    >
      <v-stepper-header>
        <Fragment
          v-for="step,index in stepps"
          :key="step.name"
        >
          <v-stepper-step
            :step="index+1"
            :complete="currentStep > index"
          >
            {{ step.name }}
          </v-stepper-step>

          <v-divider v-if="index < stepps.length - 1" />
        </Fragment>
      </v-stepper-header>

      <v-stepper-items>
        <component
          :is="step.component"
          v-for="(step, index) in stepps"
          :key="index"
          @change="changeStep($event)"
        />
      </v-stepper-items>
    </v-stepper>
  </GContainer>
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import GContainer from '~/components/g-container.vue';
  import UnityStep from '~/components/schedule/unity-step.vue';
  import DateStep from '~/components/schedule/date-step.vue';
  import BedStep from '~/components/schedule/bed-step.vue';
  import WorkersStep from '~/components/schedule/workers-step.vue';
  import SummaryStep from '~/components/schedule/summary-step.vue';

  export default {
    name: "SchedulePage",
    components: { Fragment, GContainer, UnityStep, DateStep, BedStep, WorkersStep, SummaryStep },
    data () {
      return {
        currentStep: 1,
        stepps: [
          {
            name: 'Unidade',
            component: UnityStep
          },
          {
            name: 'Data',
            component: DateStep
          },
          {
            name: 'Leito',
            component: BedStep
          },          {
            name: 'Funcionários',
            component: WorkersStep
          },
          {
            name: 'Resumo',
            component: SummaryStep
          }
        ]
      }
    },
    methods: {
      changeStep(event){
        switch (event) {
        case 'next':
          if(this.currentStep < this.stepps.length){
            this.currentStep ++
          }
          break;

        case 'prev':
          if(this.currentStep > 1){
            this.currentStep --
          }
          break;

        default:
          this.currentStep ++
          break;
        }
      },
    },
  }
</script>

<style lang="scss" ts>
.schedule-page__container{
  margin-top: 40px;
}
</style>