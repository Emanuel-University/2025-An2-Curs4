import { describe, it, expect, vi, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"
import TaskCheckbox from "./TaskCheckbox.vue"

vi.mock("@/main.js", () => ({
  ws: { send: vi.fn() }
}))

vi.mock("@/api", () => ({
  default: {
    put: vi.fn().mockResolvedValue({})
  }
}))

describe("TaskCheckbox component", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("renders a checkbox", () => {
    const wrapper = mount(TaskCheckbox, {
      props: { taskId: 1, isDone: false }
    })

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it("checkbox is checked when isDone is true", () => {
    const wrapper = mount(TaskCheckbox, {
      props: { taskId: 1, isDone: true }
    })

    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(true)
  })

  it("checkbox is unchecked when isDone is false", () => {
    const wrapper = mount(TaskCheckbox, {
      props: { taskId: 1, isDone: false }
    })

    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(false)
  })

  it("calls toggleDone with the correct taskId on change", async () => {
    const wrapper = mount(TaskCheckbox, {
      props: { taskId: 42, isDone: false }
    })

    const store = wrapper.vm.taskStore
    store.toggleDone = vi.fn()

    await wrapper.find('input[type="checkbox"]').trigger("change")

    expect(store.toggleDone).toHaveBeenCalledWith(42)
  })
})
