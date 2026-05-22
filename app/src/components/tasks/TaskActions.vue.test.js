import { describe, it, expect, vi, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"
import TaskActions from "./TaskActions.vue"

vi.mock("@/main.js", () => ({
  ws: { send: vi.fn() }
}))

vi.mock("@/api", () => ({
  default: {
    delete: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({})
  }
}))

describe("TaskActions component", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("renders two buttons", () => {
    const wrapper = mount(TaskActions, {
      props: { taskId: 1, isFavorite: false }
    })

    expect(wrapper.findAll("button")).toHaveLength(2)
  })

  it("renders unfilled star icon when isFavorite is false", () => {
    const wrapper = mount(TaskActions, {
      props: { taskId: 1, isFavorite: false }
    })

    const starIcon = wrapper.find("button:first-child i")
    expect(starIcon.classes()).toContain("bi-star")
    expect(starIcon.classes()).not.toContain("bi-star-fill")
  })

  it("renders filled yellow star icon when isFavorite is true", () => {
    const wrapper = mount(TaskActions, {
      props: { taskId: 1, isFavorite: true }
    })

    const starIcon = wrapper.find("button:first-child i")
    expect(starIcon.classes()).toContain("bi-star-fill")
    expect(starIcon.classes()).toContain("text-yellow-500")
  })

  it("renders trash icon", () => {
    const wrapper = mount(TaskActions, {
      props: { taskId: 1, isFavorite: false }
    })

    const trashIcon = wrapper.find("button:last-child i")
    expect(trashIcon.classes()).toContain("bi-trash")
  })

  it("calls toggleFavorite with the correct taskId when favorite button is clicked", async () => {
    const wrapper = mount(TaskActions, {
      props: { taskId: 7, isFavorite: false }
    })

    const store = wrapper.vm.taskStore
    store.toggleFavorite = vi.fn()

    await wrapper.find("button:first-child").trigger("click")

    expect(store.toggleFavorite).toHaveBeenCalledWith(7)
  })

  it("calls removeTask with the correct taskId when delete button is clicked", async () => {
    const wrapper = mount(TaskActions, {
      props: { taskId: 42, isFavorite: false }
    })

    const store = wrapper.vm.taskStore
    store.removeTask = vi.fn()

    await wrapper.find("button:last-child").trigger("click")

    expect(store.removeTask).toHaveBeenCalledWith(42)
  })
})
