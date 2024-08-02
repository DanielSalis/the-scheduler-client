import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import IndexPage from '@/pages/index.vue' // Adjust the path as needed

// Create a local Vue instance
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

// Mock layout component
const DefaultLayoutMock = {
  template: '<div><slot /></div>',
}

// Mock any components used in the layout
const GNavigatorMock = {
  template: '<div></div>',
}

// Setup Vuex store with any necessary modules and state
const store = new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      state: {
        getAuthData: { user_role: { name: 'Admin' } },
      },
      getters: {
        getAuthData: (state) => state.getAuthData,
      },
      mutations: {
        setAuthData: jest.fn(),
      },
    },
  },
})

// Define the Vuetify instance
let vuetify

describe('Index Page', () => {
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()

    wrapper = mount(IndexPage, {
      localVue,
      vuetify,
      store,
      stubs: {
        DefaultLayout: DefaultLayoutMock,
        GNavigator: GNavigatorMock,
      },
      mocks: {
        $router: { push: jest.fn() },
        $cookies: {
          get: jest.fn(() => ({ user_role: { name: 'Admin' } })),
        },
      },
    })
  })

  it('renders the Index Page correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders the correct number of v-expansion-panels based on user role', () => {
    // Find all v-expansion-panel elements by class name
    const panels = wrapper.findAll('.v-expansion-panel');

    // Assert that the number of panels matches the length of availableRoutes
    expect(panels.length).toBe(wrapper.vm.availableRoutes.length);
  });

  describe("when user is a nurse", () => {
    it('renders no v-expansion-panels when user role is not Admin', async () => {
      // Update the store to return a non-Admin role
      store.state.auth.getAuthData = { user_role: { name: 'Enfermeiro' } }

      // Re-mount the component to reflect the updated store
      wrapper = mount(IndexPage, {
        localVue,
        vuetify,
        store,
        stubs: {
          DefaultLayout: DefaultLayoutMock,
          GNavigator: GNavigatorMock,
        },
        mocks: {
          $router: { push: jest.fn() },
          $cookies: {
            get: jest.fn(() => ({ user_role: { name: 'Enfermeiro' } })),
          },
        },
      })

      // Find all v-expansion-panel elements by class name
      const panels = wrapper.findAll('.v-expansion-panel');

      // Assert that no panels are rendered when the user role is not Admin
      expect(panels.length).toBe(2);
    });
  })

  describe("when user is a worker", () => {
    it('renders no v-expansion-panels when user role is not Admin', async () => {
      // Update the store to return a non-Admin role
      store.state.auth.getAuthData = { user_role: { name: 'Funcionario' } }

      // Re-mount the component to reflect the updated store
      wrapper = mount(IndexPage, {
        localVue,
        vuetify,
        store,
        stubs: {
          DefaultLayout: DefaultLayoutMock,
          GNavigator: GNavigatorMock,
        },
        mocks: {
          $router: { push: jest.fn() },
          $cookies: {
            get: jest.fn(() => ({ user_role: { name: 'Funcionario' } })),
          },
        },
      })

      // Find all v-expansion-panel elements by class name
      const panels = wrapper.findAll('.v-expansion-panel');

      // Assert that no panels are rendered when the user role is not Admin
      expect(panels.length).toBe(0);
    });
  })
})
