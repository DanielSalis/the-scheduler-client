<template>
  <gContainer
    ref="page"
    class="mean-workload"
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
        md="5"
      >
        <v-select
          v-model="filter.unity"
          multiple
          :items="availableUnities"
          item-text="name"
          item-value="id"
          label="Unidade"
          hint="Escolha unidades"
          :clearable="true"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-select
          v-model="filter.shift"
          multiple
          :items="availableShifts"
          item-text="name"
          item-value="id"
          label="Turno"
          hint="Escolha os turnos"
          :clearable="true"
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
      <!-- <span>{{ usersCount }}</span> -->
      <VueApexCharts
        v-if="chart"
        ref="realtimeChart"
        type="bar"
        height="550"
        :options="chartOptions"
        :series="series"
      />
    </v-card>

    <v-btn
      id="export-button"
      color="primary"
      @click="exportToPdf()"
    >
      Exportar
    </v-btn>
  </gContainer>
</template>

<script>
  import { mapGetters } from 'vuex';
  import html2pdf from 'html2pdf.js';
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
        chart:true,
        series: null,
        usersCount: 0,
        chartOptions: {
          dataLabels: {
            enabled: true,
            offsetX: 5,
            textAnchor: 'middle',
            style: {
              fontSize: "12px",
            }
          },
          chart: {
            type: 'bar',
            height: 600,
            stacked: false,
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
                offsetX: 10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              columnWidth: '55%',
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
            // categories: ['2023-08-03', '2023-08-04'],
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
                return val + " minutos";
              }
            },
            title: {
              text: 'Média de minutos por funcionário'
            }

          },
          legend: {
            position: 'bottom',
            itemMargin: {
              horizontal: 5,
              vertical: 10
            },
          },
          fill: {
            opacity: 1
          },
          title: {
            text: "Média de minutos por usuário",
            floating: 0,
            offsetY: 0,
            align: "center",
            style: {
              color: "#444"
            }
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
        menuStart: false,
        menuEnd: false,
        filter: {
          start: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) ,
          end: '',
          unity: [],
          shift: [],
        },
        availableUnities: null,
        availableShifts: null,
      }
    },
    async fetch(){
      try {
        const {name} = this.getAuthData().user_role

        if(name === 'Admin') {
          await this.$axios.get(`/unity/getAll`).then((response)=>{
            this.availableUnities = response.data
          }).catch(err=>{
            console.log(err);
          })
        }

        else {
          const {unityId} = this.getAuthData()
          await this.$axios.get(`/unity/getAllUnitiesBySibling/${unityId}`).then((response)=>{
            this.availableUnities = response.data.Unity
          }).catch(err=>{
            console.log(err);
          })
        }

        await this.$axios.get(`/shift/getAll`).then((response)=>{
          this.availableShifts = response.data
        }).catch(err=>{
          console.log(err);
        })

        const params = {
          start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        }

        const response = await this.$axios.get('/dashboard/listSchedulesMeanWorkload', {params});
        this.series = response.data.series
        this.chartOptions.xaxis.categories = response.data.xaxis;
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      ...mapGetters("auth", ['getAuthData']),

      async performFilter(){
        this.chart=false
        try {
          const params = {
            unity_id: this.filter.unity,
            shift_id: this.filter.shift,
            start_date: this.filter.start,
            end_date: this.filter.end,
          }
          const response = await this.$axios.get('/dashboard/listSchedulesMeanWorkload', {params});

          this.series = response.data.series
          this.chartOptions.xaxis.categories = response.data.xaxis;
          // this.filter = {
          //   unit: null,
          //   shift: null,
          //   start: '',
          //   end: '',
          // }
          this.chart = true;
          const users_quantity = response.data.series.map(data=>data.users_quantity);
          this.usersCount = users_quantity.map(item=>item[0])
        } catch (error) {
          console.log(error);
        }
      },

      async exportToPdf(){
        const html = this.$refs["page"].$el
        const element = html;
        const opt = {
          margin:       0.5,
          filename:     'mediaTrabalho.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 1 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        html2pdf().from(element).set(opt).save();
      },
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