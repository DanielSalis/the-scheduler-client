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

    <v-card
      v-if="chart"
      class="px-2 py-2"
      style="height: 560px;"
    >
      <VueApexCharts
        ref="realtimeChart"
        type="bar"
        height="100%"
        :series="generalChart.series"
        :options="generalChart.chartOptions"
      />
    </v-card>

    <v-card
      class="mt-8 px-4"
      style="width: 100%;"
    >
      <v-row class="">
        <v-col>
          <v-text-field
            v-model="userFilter"
            label="Filtre usuários (por nome)"
            prepend-icon="mdi-magnify"
          />
        </v-col>
      </v-row>
    </v-card>

    <v-expansion-panels
      v-if="charts && charts.length > 0"
      v-model="panel"
      class="mb-8"
      multiple
    >
      <v-expansion-panel
        v-for="(item, index) in filteredGeneralChart"
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
            <div class="mr-4">
              <h6>
                {{ item.workload }} minutos
              </h6>
              <v-chip
                style="width: 100%; height: 5px;"
                :color="getColorByPercentage(item.workload)"
              />
            </div>
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

    <div class="my-4">
      <div style="display: flex; align-items: center;">
        <v-chip
          class="mr-2"
          style="width: 30px; height: 12px;"
          color="red"
        />
        <h4>
          Até 75% do valor mais alto
        </h4>
      </div>

      <div style="display: flex; align-items: center;">
        <v-chip
          class="mr-2"
          style="width: 30px; height: 12px;"
          color="yellow"
        />
        <h4>
          De 25% a 75% comparado com o valor mais alto
        </h4>
      </div>
      <div style="display: flex; align-items: center;">
        <v-chip
          class="mr-2"
          style="width: 30px; height: 12px;"
          color="green"
        />
        <h4>
          Menos que 25% do valor mais alto
        </h4>
      </div>
    </div>
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
        userFilter: '',
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
          theme: {
            mode: 'dark',
            palette: 'palette1',
            monochrome: {
              enabled: false,
              color: '#255aee',
              shadeTo: 'light',
              shadeIntensity: 0.65
            },
          }
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
    computed: {
      generalChartTitle(){
        if(this.filter.start && !this.filter.end){
          return `Funcionários no dia ${this.filter.start}`
        }
        else if(!this.filter.start && this.filter.end){
          return `Funcionários no dia ${this.filter.end}`
        }
        return `Funcionários no período ${this.filter.start} - ${this.filter.end}`
      },
      filteredGeneralChart(){
        return this.charts.filter(item=>item.title.toLowerCase().includes(this.userFilter.toLowerCase()))
      },
    },
    methods: {
      getColorByPercentage(value){
        const highestWorkload = this.charts[0].workload
        const percentage = value / highestWorkload;

        if(percentage > 0.75){
          return "red"
        }
        if(percentage < 0.75 && percentage > 0.25){
          return "yellow"
        }
        if (percentage < 0.25) {
          return "green"
        }
      },
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
                  show: true,
                  formatter: function (val) {
                    return val;
                  }
                }

              },
              title: {
                text: this.generalChartTitle,
                align: 'center',
              },
              theme: {
                mode: 'dark',
                palette: 'palette3',
                monochrome: {
                  enabled: false,
                  color: '#255aee',
                  shadeTo: 'light',
                  shadeIntensity: 0.75
                },
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
