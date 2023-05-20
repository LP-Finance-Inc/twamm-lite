//@ts-nocheck
/**
 * Jupiter API
 * Jupiter quote and swap API
 *
 * OpenAPI spec version: 0.0.0
 *
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as api from "./api"
import { Configuration } from "./configuration"

const config: Configuration = {}

describe("DefaultApi", () => {
  let instance: api.DefaultApi
  beforeEach(function() {
    instance = new api.DefaultApi(config)
  });

  test("v4IndexedRouteMapGet", () => {
    const onlyDirectRoutes: boolean = true
    return expect(instance.v4IndexedRouteMapGet(onlyDirectRoutes, {})).resolves.toBe(null)
  })
  test("v4PriceGet", () => {
    const ids: string = "ids_example"
    const vsToken: string = "vsToken_example"
    const vsAmount: number = 1.2
    return expect(instance.v4PriceGet(ids, vsToken, vsAmount, {})).resolves.toBe(null)
  })
  test("v4QuoteGet", () => {
    const inputMint: string = "inputMint_example"
    const outputMint: string = "outputMint_example"
    const amount: string = "amount_example"
    const swapMode: string = "swapMode_example"
    const slippageBps: number = 56
    const feeBps: number = 56
    const onlyDirectRoutes: boolean = true
    const userPublicKey: string = "userPublicKey_example"
    const asLegacyTransaction: boolean = true
    return expect(instance.v4QuoteGet(inputMint, outputMint, amount, swapMode, slippageBps, feeBps, onlyDirectRoutes, userPublicKey, asLegacyTransaction, {})).resolves.toBe(null)
  })
  test("v4SwapPost", () => {
    const body: api.V4SwapBody = undefined
    return expect(instance.v4SwapPost(body, {})).resolves.toBe(null)
  })
})

