import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import WaterTheFlower from "./WaterTheFlower.vue"

describe("WaterTheFlower component", () => {
  it("renders a button", () => {
    const wrapper = mount(WaterTheFlower)

    expect(wrapper.find("button").exists()).toBe(true)
  })

  it("button has text 'Water'", () => {
    const wrapper = mount(WaterTheFlower)

    expect(wrapper.find("button").text()).toBe("Water")
  })

  it("emits 'water' event when clicked", async () => {
    const wrapper = mount(WaterTheFlower)

    await wrapper.find("button").trigger("click")

    expect(wrapper.emitted("water")).toHaveLength(1)
  })

  it("emits 'water' event on mouseover", async () => {
    const wrapper = mount(WaterTheFlower)

    await wrapper.find("button").trigger("mouseover")

    expect(wrapper.emitted("water")).toHaveLength(1)
  })
})
