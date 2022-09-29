import request from '@/utils/request'

function test () {
  return request({
    url: '/test'
  })
}
const api = { test }
export default  api
