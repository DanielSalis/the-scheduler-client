import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import MeanWorkload from '../mean-workload.vue'
import VueApexCharts from 'vue-apexcharts'
import gContainer from '~/components/g-container.vue'
import html2pdf from 'html2pdf.js'

// Mock the layout
const MockLayout = {
  template: '<div><slot /></div>',
}

// Mock VueApexCharts
const MockVueApexCharts = {
  template: '<div></div>',
}

describe('MeanWorkload.vue', () => {
  let localVue
  let vuetify

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    localVue.use(Vuetify)
    localVue.component('vue-apexcharts', MockVueApexCharts)
  })

  const wrapper = shallowMount(MeanWorkload, {
    components: {
      gContainer,
      VueApexCharts
    },
    localVue,
    vuetify,
    data() {
      return {
        availableShifts: [{ "id": "fc46994a-b539-49db-aa02-46fa5765156f", "name": "Manhã" }, { "id": "b7f8b552-962e-4988-98a4-a69c1befc3de", "name": "Tarde" }, { "id": "37baf20f-01ae-4894-b094-eb97d2c4976a", "name": "Noite" }],
        availableUnities: [{ "id": "0899aa1c-846d-4e11-9a7f-ba5d2b88dffa", "name": "Unidade 1", "location": "andar 1", "hospital": { "id": "81df29ed-e824-498a-ae70-894bf07e4a66", "name": "hospital 1", "address": "endereço 1", "company_id": "807aed66-029b-43f8-9f98-b8582da311c2" } }, { "id": "d324efa6-7f5e-4944-9755-019d16c12a4c", "name": "Unidade numero 2", "location": "andar 2", "hospital": { "id": "81df29ed-e824-498a-ae70-894bf07e4a66", "name": "hospital 1", "address": "endereço 1", "company_id": "807aed66-029b-43f8-9f98-b8582da311c2" } }],
        chart: true,
        chartOptions: { "dataLabels": { "enabled": true, "offsetX": 5, "textAnchor": "middle", "style": { "fontSize": "12px" } }, "chart": { "type": "bar", "height": 600, "stacked": false, "toolbar": { "show": true }, "zoom": { "enabled": true } }, "responsive": [{ "breakpoint": 480, "options": { "legend": { "position": "bottom", "offsetX": 10, "offsetY": 0 } } }], "plotOptions": { "bar": { "horizontal": false, "borderRadius": 10, "columnWidth": "55%", "dataLabels": { "total": { "enabled": true, "style": { "fontSize": "13px", "fontWeight": 900 } } } } }, "xaxis": { "type": "datetime", "categories": ["2024-08-08"], "convertedCatToNumeric": false }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": true, "formatter": { "_custom": { "type": "function", "display": "<span style=\"opacity:.5;\">function</span> formatter(val)", "tooltip": "<pre>function formatter(val) {\n              return val + \" minutos\";\n            }</pre>", "_reviveId": 0 } } }, "title": { "text": "Média de minutos por funcionário" } }, "legend": { "position": "bottom", "itemMargin": { "horizontal": 5, "vertical": 10 } }, "fill": { "opacity": 1 }, "title": { "text": "Média de minutos por usuário", "floating": 0, "offsetY": 0, "align": "center", "style": { "color": "#444" } }, "theme": { "mode": "dark", "palette": "palette1", "monochrome": { "enabled": false, "color": "#255aee", "shadeTo": "light", "shadeIntensity": 0.65 } } },
        filter: { "start": "2024-08-08", "end": "", "unity": [], "shift": ["fc46994a-b539-49db-aa02-46fa5765156f"] },
        menuEnd: false,
        menuStart: false,
        series: [{ "name": "Unidade 1", "data": ["140.00"], "users_quantity": [2] }],
        usersCount: [2],
      }
    },
    mocks: {
      $axios: {
        get: jest.fn(() => Promise.resolve({ data: [] })),
      },
      $refs: {
        page: { $el: document.createElement('div') },
      },
      HTMLCanvasElement: {
        prototype: {
          getContext: jest.fn()
        }
      },
      html2pdf
    },
    stubs: {
      gContainer: MockLayout,
    },
  })

  it('renders the component and matches snapshot', () => {

    expect(wrapper.html()).toMatchSnapshot()
  })

})
