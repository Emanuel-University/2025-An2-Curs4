import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import GreenFlower from "./GreenFlower.vue"

describe("GreenFlower component", () => {
  it("renders a div with the flower class", () => {
    const wrapper = mount(GreenFlower, {
      props: { height: 100, winner: false }
    })

    expect(wrapper.find("div.flower").exists()).toBe(true)
  })

  it("applies the correct height style", () => {
    const wrapper = mount(GreenFlower, {
      props: { height: 150, winner: false }
    })

    expect(wrapper.find("div").attributes("style")).toContain("height: 150px")
  })

  it("applies 50px width style", () => {
    const wrapper = mount(GreenFlower, {
      props: { height: 100, winner: false }
    })

    expect(wrapper.find("div").attributes("style")).toContain("width: 50px")
  })

  it("adds winner class when winner prop is true", () => {
    const wrapper = mount(GreenFlower, {
      props: { height: 100, winner: true }
    })

    expect(wrapper.find("div").classes()).toContain("winner")
  })

  it("does not add winner class when winner prop is false", () => {
    const wrapper = mount(GreenFlower, {
      props: { height: 100, winner: false }
    })

    expect(wrapper.find("div").classes()).not.toContain("winner")
  })
})
