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
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';

  export default {
    name: "MeanWorkloadByUser",
    components: {
      gContainer
    },
    data() {
      return {
        filter: {
          start: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) ,
          end: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        },
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
          const response = await this.$axios.get('/dashboard/listSchedulesMeanWorkload', {params});

          this.series = response.data.series
          this.chartOptions.xaxis.categories = response.data.xaxis;
          this.chart = true;
          const users_quantity = response.data.series.map(data=>data.users_quantity);
          this.usersCount = users_quantity.map(item=>item[0])
        } catch (error) {
          console.log(error);
        }
      },
    },
  }
</script>

<style>
</style>