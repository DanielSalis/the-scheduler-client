<template>
  <gContainer
    ref="page"
    class="mean-workload-by-user"
  >
    <v-row
      style="width: 100%"
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
        style="text-align: center"
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

    <!-- <v-card
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
    </v-card> -->
    <v-expansion-panels
      v-if="charts && charts.length > 0"
      v-model="panel"
      multiple
    >
      <v-expansion-panel
        v-for="(item, index) in charts"
        :key="index"
        flat
      >
        <v-expansion-panel-header
          class="text-h6 ml-3 mean-workload-by-user__user-title"
        >
          <v-row
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            <h6 style="width: 33%">
              {{ item.title }}
            </h6>
            <h6 style="width: 33%">
              {{ item.email }}
            </h6>
            <h6 class="mr-4">
              {{ item.workload }} minutos
            </h6>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <VueApexCharts
            ref="realtimeChart"
            type="line"
            height="550"
            :options="item.chartOptions"
            :series="item.series"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card v-if="chart">
      <VueApexCharts
        ref="realtimeChart"
        type="bar"
        height="550"
        :series="generalChart.series"
        :options="generalChart.chartOptions"
      />
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from "~/components/g-container.vue";
  import VueApexCharts from "vue-apexcharts";

  export default {
    name: "MeanWorkloadByUser",
    components: {
      gContainer,
      VueApexCharts,
    },
    data() {
      return {
        panel: [],
        charts: [],
        menuStart: false,
        menuEnd: false,
        chart: false,
        generalChart: null,
        series: null,
        chartOptions: {
          chart: {
            height: 350,
            type: "line",
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: true,
            },
          },
          colors: ["#77B6EA", "#545454"],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "smooth",
          },
          title: {},
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          markers: {
            size: 1,
          },
          xaxis: {},
          yaxis: {
            title: {
              text: "Quantidade de minutos",
            },
            labels: {
              show: true,
              formatter: function (val) {
                return val + " minutos";
              },
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
        },
        filter: {
          start: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
          end: null,
        },
      };
    },
    async fetch() {
      try {
        this.performFilter();
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      async performFilter() {
        this.chart = false;
        try {
          const params = {
            start_date: this.filter.start,
            end_date: this.filter.end,
          };
          const response = await this.$axios.get(
            "/dashboard/listMeanWorkloadByUsers",
            { params }
          );
          this.charts = response.data.map((item) => {
            const newChart = {
              title: item.user.name,
              email: item.user.email,
              workload: item.total_period_time,
              series: [
                {
                  name: "Quantidade de minutos",
                  data: item.user.dateWork.data,
                },
              ],
              chartOptions: {
              ...this.chartOptions,
              labels: item.user.dateWork.xAxis,
              xaxis: {
                categories: item.user.dateWork.xAxis,
                title: {
                  text: "Dias",
                },
              },
              title: {
                text:
                  "Quantidade de minutos trabalhados por dia - " +
                  item.user.name,
                align: "left",
              },
              },
            };
            return newChart;
          });

          this.generalChart = {
            series: [{
              name: 'Minutos trabalhados',
              data: response.data.map((item) => item.total_period_time)
            }],
            chartOptions: {
              chart: {
                height: 350,
                type: 'bar',
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  dataLabels: {
                    position: 'top', // top, center, bottom
                  },
                }
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val;
                },
                offsetY: -20,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"]
                }
              },

              xaxis: {
                categories: response.data.map((item) => item.user.name),
                position: 'bottom',
                axisBorder: {
                  show: true
                },
                axisTicks: {
                  show: false
                },
                crosshairs: {
                  fill: {
                    type: 'gradient',
                    gradient: {
                      colorFrom: '#D8E3F0',
                      colorTo: '#BED1E6',
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    }
                  }
                },
                tooltip: {
                  enabled: true,
                }
              },
              yaxis: {
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  formatter: function (val) {
                    return val;
                  }
                }

              },
              title: {
                text: 'Funcionários',
                align: 'center',
                style: {
                  color: '#444'
                }
              }
            },
          }
          this.chart = true;
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style>
.mean-workload-by-user__user-title {
  text-transform: uppercase;
}
</style>
