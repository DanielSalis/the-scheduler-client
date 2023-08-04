<template>
  <gContainer class="mean-workload">
    <v-row
      align="center"
      justify="end"
      class="mt-2"
    >
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-select
          :items="['teste', 'teste2']"
          item-text="name"
          item-value="id"
          label="Unidade"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-select
          :items="['teste', 'teste2']"
          item-text="name"
          item-value="id"
          label="Turno"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-menu
          ref="menuStart"
          v-model="menuStart"
          :close-on-content-click="false"
          :return-value.sync="start"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="start"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="start"
            no-title
            scrollable
          >
            <v-spacer />
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuStart.save(start)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-menu
          ref="menuEnd"
          v-model="menuEnd"
          :close-on-content-click="false"
          :return-value.sync="end"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="end"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="end"
            no-title
            scrollable
          >
            <v-spacer />
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuEnd.save(end)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="1"
        style="text-align: center;"
      >
        <div>
          <v-btn
            center
            color="primary"
            dark
            large
            block
          >
            Buscar
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <div
      v-if="series && chartOptions"
      class="mt-5"
    >
      <VueApexCharts
        type="bar"
        height="550"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </gContainer>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts';
  import gContainer from '~/components/g-container.vue';
  export default {
    name: "MeanWorkload",
    components: {
      VueApexCharts,
      gContainer
    },
    data() {
      return {
        series: null,
        chartOptions: {
          chart: {
            type: 'bar',
            height: 550,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              dataLabels: {
                total: {
                  enabled: true,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              }
            },
          },
          xaxis: {
            type: 'datetime',
            categories: ['2023-08-03', '2023-08-04'],
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        },
        menuStart: null,
        menuEnd: null,
        start: null,
        end: null
      }
    },
    async fetch(){
      try {
        const params = {
          start_date: "2023-07-31",
          end_date: "2023-08-06",
        }
        const response = await this.$axios.get('/dashboard/listSchedulesMeanWorkload', {params});
        this.series = response.data.series
        this.chartOptions.xaxis.categories = response.data.xaxis;
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      async search(){
        try {
          const params = {
            start_date: "2023-07-31",
            end_date: "2023-08-06",
          }
          const response = await this.$axios.get('/dashboard/listSchedulesMeanWorkload', {params});
          this.series = response.data.series
          this.chartOptions.xaxis.categories = response.data.xaxis;
        } catch (error) {
          console.log(error);
        }
      }
    },
  }
</script>

<style lang="scss">
.mean-workload {
  display: flex;
  flex-direction: column;
}

.mean-workload__filter {
  display: flex;
  flex-direction: row;
}

.apexcharts-toolbar {
  z-index: 0;
}
</style>