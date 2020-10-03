import { mount } from '@vue/test-utils'
import GameBoard from '@/components/GameBoard.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.vm).toBeTruthy()
  })
})
