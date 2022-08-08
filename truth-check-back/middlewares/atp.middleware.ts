import { Context, State } from "../deps.ts";
import { } from '../deps.ts'

export const atp = async (
  { response }: Context<State, Record<string, unknown>>,
  next: () => Promise<unknown>
) => {
  await next()

  if (!response.body) return

  let itemsSent = 1
  let nextUrl
  if (Array.isArray(response.body)) {
    if (response.body.length == 0) return response.body = undefined
    itemsSent = response.body['length']
    const lastItemSent = response.body[itemsSent - 1]
    nextUrl = lastItemSent?.creationDate
  }
  // TODO continue, and decide how will it work
  /*
    creating the next link here doesnt make much sense
  */

  response.body = {
    meta: {
      cursor: nextUrl,
      items: itemsSent
    },
    body: response.body
  }
}

// TODO pagination
/*
  add # of sent items
  next = url+?lastDate=creation date of the last item sent
*/