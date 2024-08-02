import { shallowMount } from '@vue/test-utils';
import LoginPage from '../login.vue'; // Adjust the path if necessary

// Mock the $cookies dependency
const mockCookies = {
  removeAll: jest.fn(),
  set: jest.fn(),
};

describe('LoginPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoginPage, {
      mocks: {
        $cookies: mockCookies,
        $axios: {
          post: jest.fn(() => Promise.resolve({ data: 'token' })),
        },
        $router: {
          push: jest.fn(),
        },
      },
    });
  });

  it('matches the snapshot', () => {
    // Create a snapshot of the component
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('removes all cookies before mounting', () => {
    // Check that removeAll was called when the component is mounted
    expect(mockCookies.removeAll).toHaveBeenCalled();
  });

  it('logs in the user and sets a cookie', async () => {
    wrapper.setData({ email: 'test@example.com', password: 'password123' });

    await wrapper.vm.loginUser();

    // Check that the axios post method was called with correct parameters
    expect(wrapper.vm.$axios.post).toHaveBeenCalledWith('/user/auth', {
      email: 'test@example.com',
      password: 'password123',
    });

    // Check that the user is redirected to the home page
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/');
  });

  it('handles login failure', async () => {
    wrapper.vm.$axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    wrapper.setData({ email: 'test@example.com', password: 'wrongpassword' });

    await wrapper.vm.loginUser();

    // Check that no cookie is set on failure
    expect(mockCookies.set).not.toHaveBeenCalled();

    // Check that the user is not redirected
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
  });
});