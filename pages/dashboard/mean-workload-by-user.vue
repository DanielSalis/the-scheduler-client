<template>
  <gContainer
    ref="page"
    class="mean-workload-by-user"
  >
    <v-row
      style="width: 100%;"
      align="center"
      justify="end"
      class="mt-2"
    >
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-menu
          ref="menuStart"
          v-model="menuStart"
          :close-on-content-click="false"
          :return-value.sync="filter.start"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="filter.start"
              label="Início"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              :clearable="true"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.start"
            no-title
            scrollable
          >
            <v-spacer />
            <v-btn
              text
              color="primary"
              @click="menuStart = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuStart.save(filter.start)"
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
          :return-value.sync="filter.end"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="filter.end"
              label="Fim"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              :clearable="true"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.end"
            no-title
            scrollable
          >
            <v-spacer />
            <v-btn
              text
              color="primary"
              @click="menuEnd = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuEnd.save(filter.end)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        sm="12"
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
            @click="performFilter()"
          >
            Buscar
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-card
      v-if="series && chartOptions"
      flat
      class="mt-5 px-4 py-4"
    >
      <VueApexCharts
        v-if="chart"
        ref="realtimeChart"
        type="line"
        height="550"
        :options="chartOptions"
        :series="series"
      />
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  import VueApexCharts from 'vue-apexcharts';


  export default {
    name: "MeanWorkloadByUser",
    components: {
      gContainer,
      VueApexCharts
    },
    data() {
      return {
        menuStart: false,
        menuEnd: false,
        chart: false,
        series: null,
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {},
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 2
          },
          xaxis: {
          },
          yaxis: {
            title: {
              text: 'Quantidade de minutos'
            },
            labels: {
              show: true,
              formatter: function (val) {
                return val + " minutos";
              }
            },
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        },
        filter: {
          start: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) ,
          end: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        },
      }
    },
    async fetch(){
      try {
        const params = {
          start_date: this.start,
          end_date: this.end,
        }
        const response = await this.$axios.get('/dashboard/listMeanWorkloadByUsers', {params});
        this.series = [
          {
            name: "Quantidade de minutos",
            data: response.data[0].user.dateWork.data
          }
        ]
        this.chartOptions.labels = response.data[0].user.dateWork.xAxis
        this.chartOptions.xaxis = {
          categories: response.data[0].user.dateWork.xAxis,
          title: {
            text: "Dias"
          }
        }
        this.chartOptions.title = {
          text: 'Quantidade de minutos trabalhados por dia - ' + response.data[0].user.name,
          align: 'left'
        }
        this.chart = true;
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      async performFilter(){
        this.chart=false
        try {
          const params = {
            start_date: this.filter.start,
            end_date: this.filter.end,
          }
          const response = await this.$axios.get('/dashboard/listMeanWorkloadByUsers', {params});

          this.series = response[0].data.dateWork
          this.chart = true;
        } catch (error) {
          console.log(error);
        }
      },
    },
  }
</script>

<style>
</style>