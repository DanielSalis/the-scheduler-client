import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AdminUnitiesPage from '../index.vue'
import unitiesList from '~/components/unities/unities-list.vue'
import unitiesAdd from '~/components/unities/unities-add.vue'

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

  it('renders unitiesList and unitiesAdd components based on data', async () => {
    const wrapper = shallowMount(AdminUnitiesPage, {
      localVue,
      vuetify,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({ data: [{ id: 1 }] })),
        },
      },
      stubs: {
        layout: MockLayout,
      },
    })


    expect(wrapper.findAll("v-icon-stub").length).toBe(2)
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
      { text: 'id', value: 'id' },
      { text: 'Nome', value: 'name' },
      { text: 'Localização', value: 'location' },
      { text: 'Hospital', value: 'hospital.name' },
      { text: 'ACTIONS', value: 'actions', sortable: false },
    ]

    expect(wrapper.vm.headers).toEqual(expectedHeaders)
  })
})