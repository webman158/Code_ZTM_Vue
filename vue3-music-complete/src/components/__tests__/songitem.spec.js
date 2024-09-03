import { shallowMount } from '@vue/test-utils'
import SongItemVue from '../SongItem.vue'

describe('SongItem.vue', () => {
  test('SongItem.Display_name', () => {
    const song = {
      display_name: 'hello'
    }

    const wrapper = shallowMount(SongItemVue, {
      props: {
        song
      }
    })
    expect(wrapper.text()).toContain(song.display_name)
  })
})
