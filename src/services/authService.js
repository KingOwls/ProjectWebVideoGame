import usersData from '../data/users.json'
import { sha256 } from '../utils/hash'

const SESSION_KEY = 'gamehive.session'
const REGISTRY_KEY = 'gamehive.demo.accounts'
const ROLE_OVERRIDES_KEY = 'gamehive.demo.roleOverrides'

const publicUser = ({ passwordHash, salt, ...user }) => user

function getRoleOverrides() {
  try {
    return JSON.parse(localStorage.getItem(ROLE_OVERRIDES_KEY) || '{}')
  } catch {
    return {}
  }
}

function applyRoleOverride(user) {
  const override = getRoleOverrides()[user.id]
  return override ? { ...user, ...override } : user
}

function getRegisteredAccounts() {
  try {
    return JSON.parse(sessionStorage.getItem(REGISTRY_KEY) || '[]')
  } catch {
    return []
  }
}

export async function login(email, password) {
  const allUsers = [...usersData.users, ...getRegisteredAccounts()]
  const normalized = email.trim().toLowerCase()
  const found = allUsers.find((user) => user.email.toLowerCase() === normalized)
  if (!found) throw new Error('No encontramos una cuenta con ese correo.')
  if (found.status !== 'active') throw new Error('Esta cuenta no está activa.')
  const hash = await sha256(`${found.salt}${password}`)
  if (hash !== found.passwordHash) throw new Error('La contraseña no coincide.')
  const session = publicUser(applyRoleOverride(found))
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export async function register({ username, email, password }) {
  const normalized = email.trim().toLowerCase()
  const allUsers = [...usersData.users, ...getRegisteredAccounts()]
  if (allUsers.some((user) => user.email.toLowerCase() === normalized)) {
    throw new Error('Ese correo ya está registrado en la demo.')
  }
  const salt = `gamehive-session-${crypto.randomUUID()}-`
  const account = {
    id: `usr-${crypto.randomUUID()}`,
    username: username.trim(),
    email: normalized,
    salt,
    passwordHash: await sha256(`${salt}${password}`),
    role: 'user',
    status: 'active',
    reputation: 10,
    verifiedCritic: false,
    joined: new Date().toISOString().slice(0, 10),
    bio: 'Cuenta creada durante esta sesión de demostración.'
  }
  const registered = getRegisteredAccounts()
  registered.push(account)
  sessionStorage.setItem(REGISTRY_KEY, JSON.stringify(registered))
  const session = publicUser(account)
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export function getDemoAccountOverrides() {
  return getRoleOverrides()
}

export function setDemoAccountRole(userId, role, verifiedCritic = false) {
  const overrides = getRoleOverrides()
  overrides[userId] = { role, verifiedCritic }
  localStorage.setItem(ROLE_OVERRIDES_KEY, JSON.stringify(overrides))
  return overrides[userId]
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY)
}

export const demoAccounts = [
  { role: 'Usuario', email: 'user@gamehive.local', password: 'UserDemo123!' },
  { role: 'Crítico', email: 'critic@gamehive.local', password: 'CriticDemo123!' },
  { role: 'Administrador', email: 'admin@gamehive.local', password: 'AdminDemo123!' },
]
