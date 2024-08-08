import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AdminUnitiesPage from '../index.vue' // Adjust the path accordingly
import classificationsList from '~/components/classifications/classifications-list.vue'
import classificationsAdd from '~/components/classifications/classifications-add.vue'

// Mock the layout
const MockLayout = {
  template: '<div><slot /></div>',
}

describe('AdminUnitiesPage.vue', () => {
  let localVue
  let vuetify

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    localVue.use(Vuetify)
  })

  it('renders the component and matches snapshot', () => {
    const wrapper = shallowMount(AdminUnitiesPage, {
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
    const wrapper = shallowMount(AdminUnitiesPage, {
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
      { text: 'Id', value: 'id' },
      { text: 'Nome', value: 'name' },
      { text: 'Cor', value: 'color' },
      { text: 'Tempo estimado (min)', value: 'estimated_time' },
      { text: 'Ações', value: 'actions', sortable: false },
    ]

    expect(wrapper.vm.headers).toEqual(expectedHeaders)
  })
})
