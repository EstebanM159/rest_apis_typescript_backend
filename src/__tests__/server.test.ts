import request from 'supertest'
import server from '../server'

describe('GET /api', () => {
  it('should be back a json response', async () => {
    const res = await request(server).get('/api')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/)
    console.log(res.body.msg)
  })
})
