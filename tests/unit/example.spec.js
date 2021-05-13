import { shallowMount } from '@vue/test-utils'
import Servers from '@/views/Servers.vue'

describe('Servers.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Servers, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
