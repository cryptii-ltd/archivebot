import { fromFileUrl, dirname } from "@std/path"

export function getDirname() {
  return dirname(fromFileUrl(import.meta.url))
}
