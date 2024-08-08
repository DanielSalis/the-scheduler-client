import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AdminCompaniesPage from '../index.vue' // Adjust the path accordingly
import companiesList from '~/components/companies/companies-list.vue'
import companiesAdd from '~/components/companies/companies-add.vue'

// Mock the layout
const MockLayout = {
  template: '<div><slot /></div>',
}

describe('AdminCompaniesPage.vue', () => {
  let localVue
  let vuetify

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    localVue.use(Vuetify)
  })

  it('renders the component and matches snapshot', () => {
    const wrapper = shallowMount(AdminCompaniesPage, {
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
    const wrapper = shallowMount(AdminCompaniesPage, {
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
      { text: 'Endereço', value: 'address' },
      { text: 'ACTIONS', value: 'actions', sortable: false },
    ]

    expect(wrapper.vm.headers).toEqual(expectedHeaders)
  })
})
