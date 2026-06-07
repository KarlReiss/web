/**
 * 外部链接处理工具
 * 负责加载和处理 external-links.json 配置
 */

export interface ExternalLinkConfig {
  links: Record<string, string>
  description?: string
}

/**
 * 加载外部链接配置
 */
export async function loadExternalLinks(): Promise<ExternalLinkConfig> {
  try {
    const response = await fetch('/external-links.json')
    if (!response.ok) {
      throw new Error('Failed to load external links config')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading external links:', error)
    return { links: {} }
  }
}

/**
 * 判断是否为外部链接
 */
export function isExternalLink(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

/**
 * 获取链接并自动处理跳转方式
 */
export function getLinkHandler(router: any, url: string) {
  return (event?: Event) => {
    if (event) {
      event.preventDefault()
    }

    if (isExternalLink(url)) {
      // 外部链接 - 新标签页打开
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      // 内部链接 - 路由跳转
      router.push(url)
    }
  }
}

/**
 * 根据key获取链接配置
 */
export async function getLinkByKey(key: string): Promise<string | null> {
  const config = await loadExternalLinks()
  return config.links[key] || null
}

/**
 * 获取所有链接配置
 */
export async function getAllLinks(): Promise<Record<string, string>> {
  const config = await loadExternalLinks()
  return config.links
}
