import { describe, expect, it } from "vitest";
import { hello } from "./index";

describe("test index", ()=>{
  it("test hello", ()=>{
    expect(hello()).toEqual("Hello World!")
  })
})
