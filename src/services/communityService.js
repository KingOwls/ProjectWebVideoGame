import seed from '../data/community.json'

const REVIEWS_KEY = 'gamehive.community.reviews'
const REPORTS_KEY = 'gamehive.community.reports'
const LIBRARY_KEY = 'gamehive.community.library'
const CRITIC_APPLICATIONS_KEY = 'gamehive.community.criticApplications'

function read(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : structuredClone(fallback)
  } catch {
    return structuredClone(fallback)
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export function getReviews() {
  return read(REVIEWS_KEY, seed.reviews)
}

export function saveReview(review) {
  const list = getReviews()
  const next = [{ ...review, id: `rev-${crypto.randomUUID()}`, date: new Date().toISOString().slice(0, 10), helpful: 0, status: 'published' }, ...list]
  write(REVIEWS_KEY, next)
  return next[0]
}

export function toggleHelpful(reviewId) {
  const list = getReviews().map((review) => review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)
  write(REVIEWS_KEY, list)
  return list
}

export function getReports() {
  return read(REPORTS_KEY, seed.reports)
}

export function saveReport(report) {
  const list = getReports()
  const next = [{ ...report, id: `rep-${crypto.randomUUID()}`, status: 'pending', date: new Date().toISOString().slice(0, 10) }, ...list]
  write(REPORTS_KEY, next)
  return next[0]
}

export function updateReport(id, status) {
  const list = getReports().map((report) => report.id === id ? { ...report, status } : report)
  write(REPORTS_KEY, list)
  return list
}

export function getLibrary(userId) {
  const all = read(LIBRARY_KEY, seed.library)
  return all[userId] || []
}

export function setLibraryEntry(userId, gameId, state = 'wishlist') {
  const all = read(LIBRARY_KEY, seed.library)
  const list = all[userId] || []
  const existing = list.find((entry) => entry.gameId === gameId)
  if (existing) {
    existing.state = state
    existing.favorite = state === 'favorite' ? true : existing.favorite
  } else {
    list.push({ gameId, state, favorite: state === 'favorite', progress: 0 })
  }
  all[userId] = list
  write(LIBRARY_KEY, all)
  return list
}

export function getCriticApplications() {
  return read(CRITIC_APPLICATIONS_KEY, seed.criticApplications || [])
}

export function getCriticApplicationByUser(userId) {
  return getCriticApplications().find((application) => application.userId === userId) || null
}

export function saveCriticApplication(application) {
  const list = getCriticApplications()
  const previous = list.find((entry) => entry.userId === application.userId)
  const record = {
    ...previous,
    ...application,
    id: previous?.id || `critic-app-${crypto.randomUUID()}`,
    status: 'pending',
    submittedAt: new Date().toISOString().slice(0, 10),
    reviewedAt: null,
  }
  const next = previous ? list.map((entry) => entry.userId === application.userId ? record : entry) : [record, ...list]
  write(CRITIC_APPLICATIONS_KEY, next)
  return record
}

export function updateCriticApplication(id, status) {
  const list = getCriticApplications().map((application) => application.id === id ? { ...application, status, reviewedAt: new Date().toISOString().slice(0, 10) } : application)
  write(CRITIC_APPLICATIONS_KEY, list)
  return list
}

export function resetCommunityDemo() {
  localStorage.removeItem(REVIEWS_KEY)
  localStorage.removeItem(REPORTS_KEY)
  localStorage.removeItem(LIBRARY_KEY)
  localStorage.removeItem(CRITIC_APPLICATIONS_KEY)
}

export const activitySeed = seed.activity
