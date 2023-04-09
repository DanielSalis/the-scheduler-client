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
        <Step01 @change="changeStep($event)" />

        <Step02 @change="changeStep($event)" />

        <Step03 @change="changeStep($event)" />
      </v-stepper-items>
    </v-stepper>
  </GContainer>
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import GContainer from '~/components/g-container.vue';
  import Step01 from './step01.vue';
  import Step02 from './step02.vue';
  import Step03 from './step03.vue';

  export default {
    name: "SchedulePage",
    components: { Fragment, GContainer, Step01, Step02, Step03 },
    data () {
      return {
        currentStep: 1,
        stepps: [
          {
            name: 'Unidade',
          },
          {
            name: 'Data',
          },
          {
            name: 'Leito',
          }
        ]
      }
    },
    methods: {
      changeStep(event){
        switch (event) {
        case 'next':
          this.currentStep ++
          break;

        case 'prev':
          this.currentStep --
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