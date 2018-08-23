import fetch from "isomorphic-fetch";


export function fetchTags(params) {
  return fetch('http://localhost:1337/tags').then(res => res.json())
}