<template>
  <GContainer class="schedule-page__container">
    <v-stepper
      v-model="e1"
    >
      <v-stepper-header>
        <Fragment
          v-for="step,index in stepps"
          :key="step.name"
        >
          <v-stepper-step
            :step="index+1"
            :complete="e1 > index"
          >
            {{ step.name }}
          </v-stepper-step>

          <v-divider v-if="index < stepps.length - 1" />
        </Fragment>

        <!-- <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
          Name of step 1
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          Name of step 2
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          step="3"
          :complete="e1 > 3"
        >
          Name of step 3
        </v-stepper-step> -->
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
        e1: 1,
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
          this.e1 ++
          break;

        case 'prev':
          this.e1 --
          break;

        default:
          this.e1 ++
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