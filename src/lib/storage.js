// Products
export const getProducts = () => {
  try {
    const stored = localStorage.getItem('loua_products')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export const saveProducts = (products) => {
  localStorage.setItem('loua_products', JSON.stringify(products))
}

// Gallery
export const getGallery = () => {
  try {
    const stored = localStorage.getItem('loua_gallery')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export const saveGallery = (items) => {
  localStorage.setItem('loua_gallery', JSON.stringify(items))
}

// Admin auth
export const getAdminPassword = () => {
  return localStorage.getItem('loua_admin_pwd') || 'loua2024'
}

export const setAdminPassword = (pwd) => {
  localStorage.setItem('loua_admin_pwd', pwd)
}

export const getAdminSession = () => {
  return localStorage.getItem('loua_admin_session') === 'true'
}

export const setAdminSession = (val) => {
  localStorage.setItem('loua_admin_session', val ? 'true' : 'false')
}
