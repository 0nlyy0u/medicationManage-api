import { env } from '*/config/environtment'

export const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    EXPIRED: 410 // gone : Biến mất
}

export const WHITELIST_DOMAINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://web.dangkha.net'
]

export const DEFAULT_ITEMS_PER_PAGE = 12
export const DEFAULT_CURRENT_PAGE = 1

//Default la moi truong dev
let websiteDomain = 'http://localhost:3000'
if (env.BUILD_MODE === 'production') {
    websiteDomain = 'http://api.dangkha.net'
}
export const WebsiteDomain = websiteDomain