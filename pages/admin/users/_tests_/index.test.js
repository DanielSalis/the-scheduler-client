import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AdminUserPage from '../index.vue'
import UsersList from '~/components/users/users-list.vue'
import UsersAdd from '~/components/users/users-add.vue'

// Mock the layout
const MockLayout = {
  template: '<div><slot /></div>',
}

describe('AdminUserPage.vue', () => {
  let localVue
  let vuetify

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    localVue.use(Vuetify)
  })

  it('renders the component and matches snapshot', () => {
    const wrapper = shallowMount(AdminUserPage, {
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

  it('renders UsersList and UsersAdd components based on data', async () => {
    const wrapper = shallowMount(AdminUserPage, {
      localVue,
      vuetify,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: [
              { id: 1, name: 'John Doe' },
              { id: 2, name: 'Jane Smith' }
            ]
          })),
        },
      },
      stubs: {
        layout: MockLayout,
      },
    })

  })

  it('computes headers correctly', async () => {
    const wrapper = shallowMount(AdminUserPage, {
      localVue,
      vuetify,
      data() {
        return {
          usersData: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' }
          ]
        }
      },
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: [
              { id: 1, name: 'John Doe' },
              { id: 2, name: 'Jane Smith' }
            ]
          })),
        },
      },
      stubs: {
        layout: MockLayout,
      },
    })

    const expectedHeaders = [
      { text: 'ID', value: 'id' },
      { text: 'NAME', value: 'name' },
      { text: 'ACTIONS', value: 'actions', sortable: false },
    ]

    expect(wrapper.vm.headers).toEqual(expectedHeaders)
  })
})
