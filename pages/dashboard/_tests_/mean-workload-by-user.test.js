import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import MeanWorkloadByUser from '../mean-workload-by-user.vue'
import VueApexCharts from 'vue-apexcharts'

// Mock the layout
const MockLayout = {
  template: '<div><slot /></div>',
}

// Mock VueApexCharts
const MockVueApexCharts = {
  template: '<div></div>',
}

describe('MeanWorkloadByUser.vue', () => {
  let localVue
  let vuetify

  const wrapper = shallowMount(MeanWorkloadByUser, {
    localVue,
    vuetify,
    data() {
      return {
        chart: true,
        chartOptions: { "chart": { "height": 350, "type": "line", "dropShadow": { "enabled": true, "color": "#000", "top": 18, "left": 7, "blur": 10, "opacity": 0.2 }, "toolbar": { "show": true } }, "colors": ["#77B6EA", "#545454"], "dataLabels": { "enabled": true }, "stroke": { "curve": "smooth" }, "title": {}, "markers": { "size": 1 }, "xaxis": {}, "yaxis": { "title": { "text": "Quantidade de minutos" }, "labels": { "show": true, "formatter": { "_custom": { "type": "function", "display": "<span style=\"opacity:.5;\">function</span> formatter(val)", "tooltip": "<pre>function formatter(val) {\n              return val + \" minutos\";\n            }</pre>", "_reviveId": 11 } } } }, "legend": { "position": "top", "horizontalAlign": "right", "floating": true, "offsetY": -25, "offsetX": -5 }, "theme": { "mode": "dark", "palette": "palette1", "monochrome": { "enabled": false, "color": "#255aee", "shadeTo": "light", "shadeIntensity": 0.65 } } },
        charts: [{ "title": "Milena Matos", "email": "milena@email.com", "workload": 165, "series": [{ "name": "Quantidade de minutos", "data": [165] }], "chartOptions": { "chart": { "height": 350, "type": "line", "dropShadow": { "enabled": true, "color": "#000", "top": 18, "left": 7, "blur": 10, "opacity": 0.2 }, "toolbar": { "show": true } }, "colors": ["#77B6EA", "#545454"], "dataLabels": { "enabled": true }, "stroke": { "curve": "smooth" }, "title": { "text": "Quantidade de minutos trabalhados por dia - Milena Matos", "align": "left" }, "markers": { "size": 1 }, "xaxis": { "categories": ["2024-08-08"], "title": { "text": "Dias" } }, "yaxis": { "title": { "text": "Quantidade de minutos" }, "labels": { "show": true, "formatter": { "_custom": { "type": "function", "display": "<span style=\"opacity:.5;\">function</span> formatter(val)", "tooltip": "<pre>function formatter(val) {\n              return val + \" minutos\";\n            }</pre>", "_reviveId": 7 } } } }, "legend": { "position": "top", "horizontalAlign": "right", "floating": true, "offsetY": -25, "offsetX": -5 }, "theme": { "mode": "dark", "palette": "palette1", "monochrome": { "enabled": false, "color": "#255aee", "shadeTo": "light", "shadeIntensity": 0.65 } }, "labels": ["2024-08-08"] } }, { "title": "daniel", "email": "daniel@mail.com", "workload": 115, "series": [{ "name": "Quantidade de minutos", "data": [115] }], "chartOptions": { "chart": { "height": 350, "type": "line", "dropShadow": { "enabled": true, "color": "#000", "top": 18, "left": 7, "blur": 10, "opacity": 0.2 }, "toolbar": { "show": true } }, "colors": ["#77B6EA", "#545454"], "dataLabels": { "enabled": true }, "stroke": { "curve": "smooth" }, "title": { "text": "Quantidade de minutos trabalhados por dia - daniel", "align": "left" }, "markers": { "size": 1 }, "xaxis": { "categories": ["2024-08-08"], "title": { "text": "Dias" } }, "yaxis": { "title": { "text": "Quantidade de minutos" }, "labels": { "show": true, "formatter": { "_custom": { "type": "function", "display": "<span style=\"opacity:.5;\">function</span> formatter(val)", "tooltip": "<pre>function formatter(val) {\n              return val + \" minutos\";\n            }</pre>", "_reviveId": 8 } } } }, "legend": { "position": "top", "horizontalAlign": "right", "floating": true, "offsetY": -25, "offsetX": -5 }, "theme": { "mode": "dark", "palette": "palette1", "monochrome": { "enabled": false, "color": "#255aee", "shadeTo": "light", "shadeIntensity": 0.65 } }, "labels": ["2024-08-08"] } }],
        filter: { "start": "2024-08-08", "end": null },
        generalChart: { "series": [{ "name": "Minutos trabalhados", "data": [165, 115] }], "chartOptions": { "chart": { "height": 350, "type": "bar" }, "plotOptions": { "bar": { "borderRadius": 10, "dataLabels": { "position": "top" } } }, "dataLabels": { "enabled": true, "formatter": { "_custom": { "type": "function", "display": "<span style=\"opacity:.5;\">function</span> formatter(val)", "tooltip": "<pre>function formatter(val) {\n                        return val;\n                      }</pre>", "_reviveId": 9 } }, "offsetY": -20, "style": { "fontSize": "12px" } }, "xaxis": { "categories": ["Milena Matos", "daniel"], "position": "bottom", "axisBorder": { "show": true }, "axisTicks": { "show": false }, "crosshairs": { "fill": { "type": "gradient", "gradient": { "colorFrom": "#D8E3F0", "colorTo": "#BED1E6", "stops": [0, 100], "opacityFrom": 0.4, "opacityTo": 0.5 } } }, "tooltip": { "enabled": true }, "convertedCatToNumeric": false }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": true, "formatter": { "_custom": { "type": "function", "display": "<span style=\"opacity:.5;\">function</span> formatter(val)", "tooltip": "<pre>function formatter(val) {\n                          return val;\n                        }</pre>", "_reviveId": 10 } } } }, "title": { "text": "Funcionários no dia 2024-08-08", "align": "center" }, "theme": { "mode": "dark", "palette": "palette3", "monochrome": { "enabled": false, "color": "#255aee", "shadeTo": "light", "shadeIntensity": 0.75 } } } },
        menuEnd: false,
        menuStart: false,
        panel: [],
        series: null,
        userFilter: "",
      }
    },
    mocks: {
      $axios: {
        get: jest.fn(() => Promise.resolve({ data: [] })),
      },
    },
    stubs: {
      layout: MockLayout,
      VueApexCharts: MockVueApexCharts,
    },
  })

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    localVue.use(Vuetify)
  })

  it('renders the component and matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders v-components', () => {
    expect(wrapper.findAllComponents({ name: 'v-date-picker' }).length).toBe(2)
    expect(wrapper.findAllComponents({ name: 'v-expansion-panel' }).length).toBe(2)
  })

  it('computes headers correctly', () => {
    // Trigger computed property
    wrapper.setData({ filter: { start: '2024-01-01', end: '2024-01-31' } })

    const expectedTitle = 'Funcionários no período 2024-01-01 - 2024-01-31'
    expect(wrapper.vm.generalChartTitle).toBe(expectedTitle)
  })

  it('gets color by percentage correctly', () => {
    wrapper.setData({
      charts: [{ workload: 100 }]
    })

    expect(wrapper.vm.getColorByPercentage(80)).toBe('red')
    expect(wrapper.vm.getColorByPercentage(50)).toBe('yellow')
    expect(wrapper.vm.getColorByPercentage(20)).toBe('green')
  })
})