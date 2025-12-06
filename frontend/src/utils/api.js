import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function saveWebsite(id, data) {
  try {
    if (id) {
      const response = await api.put(`/websites/${id}`, { data })
      return response.data.data
    } else {
      const response = await api.post('/websites', { data })
      return response.data.data
    }
  } catch (error) {
    console.error('Save error:', error)
    throw error
  }
}

export async function loadWebsite(id) {
  try {
    const response = await api.get(`/websites/${id}?populate=*`)
    return response.data.data
  } catch (error) {
    console.error('Load error:', error)
    throw error
  }
}

export async function publishWebsite(id, data) {
  try {
    const publishData = {
      ...data,
      published: true,
      publishedAt: new Date().toISOString()
    }
    
    if (id) {
      const response = await api.put(`/websites/${id}`, { data: publishData })
      const website = response.data.data
      
      // In a real implementation, this would trigger deployment
      // For now, we'll simulate domain assignment
      const domain = website.domain || `site-${website.id}.example.com`
      
      return {
        ...website,
        domain
      }
    } else {
      const response = await api.post('/websites', { data: publishData })
      const website = response.data.data
      const domain = `site-${website.id}.example.com`
      
      return {
        ...website,
        domain
      }
    }
  } catch (error) {
    console.error('Publish error:', error)
    throw error
  }
}

