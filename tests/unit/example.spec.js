import { shallowMount } from '@vue/test-utils'
import Servers from '@/views/Servers.vue'

describe('Servers.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Servers)
    expect(wrapper.text()).toMatch('')
  })
})
