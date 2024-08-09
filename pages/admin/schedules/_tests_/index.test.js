import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AdminSchedulePage from '../index.vue'
import schedulesList from '~/components/schedule/schedule-list.vue'

// Mock the layout
const MockLayout = {
  template: '<div><slot /></div>',
}

describe('AdminSchedulePage.vue', () => {
  let localVue
  let vuetify

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    localVue.use(Vuetify)
  })

  it('renders the component and matches snapshot', () => {
    const wrapper = shallowMount(AdminSchedulePage, {
      localVue,
      vuetify,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({ data: [] })),
        },
      },
      stubs: {
        layout: MockLayout,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })


  it('computes headers correctly', () => {
    const wrapper = shallowMount(AdminSchedulePage, {
      localVue,
      vuetify,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({ data: [] })),
        },
      },
      stubs: {
        layout: MockLayout,
      },
    })

    const expectedHeaders = [
      { text: 'id', value: 'id' },
      { text: 'Dia de operação (ano-mes-dia)', value: 'operational_day' },
      { text: 'Carga de trabalho (min)', value: 'workload' },
      { text: 'Responsável', value: 'user.name' },
      { text: 'Unidade', value: 'unity.name' },
      { text: 'Turno', value: 'shift.name' },
      { text: 'Cancelado', value: 'cancelled' },
      { text: 'Ações', value: 'actions', sortable: false },
    ]

    expect(wrapper.vm.headers).toEqual(expectedHeaders)
  })
})
