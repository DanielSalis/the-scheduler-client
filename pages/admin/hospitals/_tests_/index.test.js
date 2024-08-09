import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AdminHospitalsPage from '../index.vue'
import hospitalsList from '~/components/hospitals/hospitals-list.vue'
import hospitalsAdd from '~/components/hospitals/hospitals-add.vue'

// Mock the layout
const MockLayout = {
  template: '<div><slot /></div>',
}

describe('AdminHospitalsPage.vue', () => {
  let localVue
  let vuetify

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    localVue.use(Vuetify)
  })

  it('renders the component and matches snapshot', () => {
    const wrapper = shallowMount(AdminHospitalsPage, {
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
    const wrapper = shallowMount(AdminHospitalsPage, {
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
      { text: 'Endereço', value: 'address' },
      { text: 'Rede hospitalar', value: 'company.name' },
      { text: 'ACTIONS', value: 'actions', sortable: false },
    ]

    expect(wrapper.vm.headers).toEqual(expectedHeaders)
  })
})
