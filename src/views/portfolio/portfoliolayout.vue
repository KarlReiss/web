<template>
  <div class="portfolio-layout" :style="{ fontSize: `${fontSizeScale}rem` }">
    <!-- 背景装饰 -->
    <div class="portfolio-background">
      <div class="bg-blob blob-1"></div>
      <div class="bg-blob blob-2"></div>
      <div class="bg-blob blob-3"></div>
    </div>

    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="portfolio-header">
        <div class="header-content">
          <!-- Logo -->
          <router-link to="/portfolio/home" class="logo">
            <span class="logo-icon">✨</span>
            <span class="logo-text">Vivian's Portfolio</span>
          </router-link>

          <!-- 桌面端导航菜单 -->
          <el-menu
            :default-active="activeMenu"
            mode="horizontal"
            :ellipsis="false"
            router
            class="nav-menu desktop-nav"
          >
            <el-menu-item index="/portfolio/home">
              <span class="menu-icon">🏠</span>
              <span class="menu-text">{{ $t('portfolio.nav.home') }}</span>
            </el-menu-item>
            <el-sub-menu index="about">
              <template #title>
                <span class="menu-icon">👤</span>
                <span class="menu-text">{{ $t('portfolio.nav.about') }}</span>
              </template>
              <el-menu-item index="/portfolio/about/frontend">{{
                $t('portfolio.nav.frontend')
              }}</el-menu-item>
              <el-menu-item index="/portfolio/about/backend">{{
                $t('portfolio.nav.backend')
              }}</el-menu-item>
              <el-menu-item index="/portfolio/about/ai">{{ $t('portfolio.nav.ai') }}</el-menu-item>
              <el-menu-item index="/portfolio/about/hardware">{{
                $t('portfolio.nav.hardware')
              }}</el-menu-item>
              <el-menu-item index="/portfolio/about/server">{{
                $t('portfolio.nav.server')
              }}</el-menu-item>
              <el-menu-item index="/portfolio/about/solutions">{{
                $t('portfolio.nav.solutions')
              }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/portfolio/projects">
              <span class="menu-icon">📁</span>
              <span class="menu-text">{{ $t('portfolio.nav.projects') }}</span>
            </el-menu-item>
            <el-menu-item index="/portfolio/knowledge">
              <span class="menu-icon">📚</span>
              <span class="menu-text">{{ $t('portfolio.nav.knowledge') }}</span>
            </el-menu-item>
            <el-menu-item index="/portfolio/tools">
              <span class="menu-icon">🛠️</span>
              <span class="menu-text">{{ $t('portfolio.nav.tools') }}</span>
            </el-menu-item>
          </el-menu>

          <!-- 右侧工具栏 -->
          <div class="header-right">
            <!-- 搜索 -->
            <ArtIconButton icon="ri:search-line" class="tool-btn" @click="openSearchDialog" />

            <!-- 中英文切换 -->
            <el-dropdown @command="changeLanguage" popper-class="lang-dropdown" trigger="click">
              <ArtIconButton icon="ri:translate-2" class="tool-btn" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="item in languageOptions"
                    :key="item.value"
                    :command="item.value"
                    :class="{ 'is-selected': locale === item.value }"
                  >
                    <span class="menu-txt">{{ item.label }}</span>
                    <ArtSvgIcon
                      v-if="locale === item.value"
                      icon="ri:check-fill"
                      class="check-icon"
                    />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <!-- 字体大小 -->
            <el-dropdown trigger="click" popper-class="font-dropdown">
              <ArtIconButton icon="ri:font-size-2" class="tool-btn" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="item in fontSizeOptions"
                    :key="item.value"
                    :class="{ 'is-selected': currentFontSize === item.value }"
                    @click="setFontSize(item.value)"
                  >
                    <span :style="{ fontSize: item.previewSize }">{{ item.label }}</span>
                    <ArtSvgIcon
                      v-if="currentFontSize === item.value"
                      icon="ri:check-fill"
                      class="check-icon"
                    />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <!-- 主题切换 -->
            <ArtIconButton
              @click="themeAnimation"
              :icon="settingStore.isDark ? 'ri:sun-fill' : 'ri:moon-line'"
              class="tool-btn theme-toggle"
            />

            <!-- 登录/用户菜单 -->
            <template v-if="userStore.isLogin">
              <ArtUserMenu />
            </template>
            <template v-else>
              <el-button type="primary" size="small" round class="login-btn" @click="goLogin">
                {{ $t('portfolio.nav.login') }}
              </el-button>
            </template>

            <!-- 移动端菜单按钮 -->
            <ArtIconButton
              icon="ri:menu-2-fill"
              class="tool-btn mobile-menu-btn"
              @click="showMobileMenu = true"
            />
          </div>
        </div>
      </el-header>

      <!-- 主内容区 -->
      <el-main class="portfolio-main">
        <router-view />
      </el-main>

      <!-- 页脚 -->
      <el-footer class="portfolio-footer">
        <div class="footer-content">
          <div class="footer-main">
            <!-- Logo 区域 -->
            <div class="footer-logo-section">
              <div class="footer-logo">
                <span class="logo-icon">✨</span>
                <span class="logo-text">Vivian's Portfolio</span>
              </div>
              <p class="footer-desc">
                {{ $t('portfolio.footer.desc') }}
              </p>
            </div>

            <!-- 快速链接 -->
            <div class="footer-links">
              <div class="footer-column">
                <h4 class="column-title">{{ $t('portfolio.footer.quickLinks') }}</h4>
                <ul class="link-list">
                  <li
                    ><router-link to="/portfolio/home">{{
                      $t('portfolio.nav.home')
                    }}</router-link></li
                  >
                  <li
                    ><router-link to="/portfolio/projects">{{
                      $t('portfolio.nav.projects')
                    }}</router-link></li
                  >
                  <li
                    ><router-link to="/portfolio/knowledge">{{
                      $t('portfolio.nav.knowledge')
                    }}</router-link></li
                  >
                  <li
                    ><router-link to="/portfolio/tools">{{
                      $t('portfolio.nav.tools')
                    }}</router-link></li
                  >
                </ul>
              </div>

              <div class="footer-column">
                <h4 class="column-title">{{ $t('portfolio.footer.resources') }}</h4>
                <ul class="link-list">
                  <li
                    ><router-link to="/portfolio/about/frontend">{{
                      $t('portfolio.nav.frontend')
                    }}</router-link></li
                  >
                  <li
                    ><router-link to="/portfolio/about/backend">{{
                      $t('portfolio.nav.backend')
                    }}</router-link></li
                  >
                  <li
                    ><router-link to="/portfolio/about/ai">{{
                      $t('portfolio.nav.ai')
                    }}</router-link></li
                  >
                  <li
                    ><router-link to="/portfolio/about/solutions">{{
                      $t('portfolio.nav.solutions')
                    }}</router-link></li
                  >
                </ul>
              </div>

              <div class="footer-column">
                <h4 class="column-title">{{ $t('portfolio.footer.contact') }}</h4>
                <ul class="link-list">
                  <li><a href="mailto:contact@example.com">contact@example.com</a></li>
                  <li><ExternalLink linkKey="github">GitHub</ExternalLink></li>
                  <li><ExternalLink linkKey="twitter">Twitter</ExternalLink></li>
                  <li><ExternalLink linkKey="linkedin">LinkedIn</ExternalLink></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="bottom-divider"></div>
            <p class="copyright">
              © {{ new Date().getFullYear() }} {{ $t('portfolio.footer.copyright') }}
            </p>
          </div>
        </div>
      </el-footer>
    </el-container>

    <!-- Portfolio 页面搜索 -->
    <PortfolioSearch />

    <!-- 移动端侧边导航 -->
    <el-drawer
      v-model="showMobileMenu"
      direction="ltr"
      size="80%"
      :with-header="false"
      class="mobile-drawer"
    >
      <div class="mobile-nav">
        <div class="mobile-nav-header">
          <span class="mobile-logo">
            <span class="logo-icon">✨</span>
            Vivian's Portfolio
          </span>
          <ArtIconButton icon="ri:close-line" @click="showMobileMenu = false" />
        </div>
        <el-menu
          :default-active="activeMenu"
          router
          class="mobile-menu"
          @select="showMobileMenu = false"
        >
          <el-menu-item index="/portfolio/home">{{ $t('portfolio.nav.home') }}</el-menu-item>
          <el-sub-menu index="about-mobile">
            <template #title>{{ $t('portfolio.nav.about') }}</template>
            <el-menu-item index="/portfolio/about/frontend">{{
              $t('portfolio.nav.frontend')
            }}</el-menu-item>
            <el-menu-item index="/portfolio/about/backend">{{
              $t('portfolio.nav.backend')
            }}</el-menu-item>
            <el-menu-item index="/portfolio/about/ai">{{ $t('portfolio.nav.ai') }}</el-menu-item>
            <el-menu-item index="/portfolio/about/hardware">{{
              $t('portfolio.nav.hardware')
            }}</el-menu-item>
            <el-menu-item index="/portfolio/about/server">{{
              $t('portfolio.nav.server')
            }}</el-menu-item>
            <el-menu-item index="/portfolio/about/solutions">{{
              $t('portfolio.nav.solutions')
            }}</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/portfolio/projects">{{
            $t('portfolio.nav.projects')
          }}</el-menu-item>
          <el-menu-item index="/portfolio/knowledge">{{
            $t('portfolio.nav.knowledge')
          }}</el-menu-item>
          <el-menu-item index="/portfolio/tools">{{ $t('portfolio.nav.tools') }}</el-menu-item>
        </el-menu>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import { LanguageEnum } from '@/enums/appEnum'
  import { languageOptions } from '@/locales'
  import { mittBus } from '@/utils/sys'
  import { themeAnimation } from '@/utils/ui/animation'
  import PortfolioSearch from '@/components/portfolio/PortfolioSearch.vue'
  import ArtUserMenu from '@/components/core/layouts/art-header-bar/widget/ArtUserMenu.vue'
  import ExternalLink from '@/components/portfolio/ExternalLink.vue'

  defineOptions({ name: 'PortfolioLayout' })

  const route = useRoute()
  const router = useRouter()
  const { locale, t } = useI18n()
  const settingStore = useSettingStore()
  const userStore = useUserStore()

  const activeMenu = computed(() => route.path)

  // 移动端菜单
  const showMobileMenu = ref(false)

  // 字体大小选项
  const FONT_SIZE_KEY = 'portfolio-font-size'
  const fontSizeOptions = computed(() => [
    { value: 'small', label: t('portfolio.fontSize.small'), previewSize: '0.875rem' },
    { value: 'medium', label: t('portfolio.fontSize.medium'), previewSize: '1rem' },
    { value: 'large', label: t('portfolio.fontSize.large'), previewSize: '1.125rem' }
  ])

  const currentFontSize = ref<string>(localStorage.getItem(FONT_SIZE_KEY) || 'medium')

  const fontSizeScaleMap: Record<string, number> = {
    small: 0.875,
    medium: 1,
    large: 1.125
  }

  const fontSizeScale = computed(() => fontSizeScaleMap[currentFontSize.value] || 1)

  const setFontSize = (size: string) => {
    currentFontSize.value = size
    localStorage.setItem(FONT_SIZE_KEY, size)
  }

  // 语言切换
  const changeLanguage = (lang: LanguageEnum) => {
    if (locale.value === lang) return
    locale.value = lang
    userStore.setLanguage(lang)
  }

  // 搜索
  const openSearchDialog = () => {
    mittBus.emit('openPortfolioSearch')
  }

  // 登录
  const goLogin = () => {
    router.push({ name: 'Login', query: { redirect: route.fullPath } })
  }
</script>

<style scoped lang="scss">
  .portfolio-layout {
    min-height: 100vh;
    background: var(--el-bg-color);
    transition: font-size 0.2s ease;
    position: relative;
    overflow-x: hidden;
  }

  // 背景装饰
  .portfolio-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;

    .bg-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.4;
      animation: float 20s ease-in-out infinite;

      &.blob-1 {
        width: 400px;
        height: 400px;
        background: linear-gradient(135deg, var(--el-color-primary), #a78bfa);
        top: -100px;
        left: -100px;
        animation-delay: 0s;
      }

      &.blob-2 {
        width: 300px;
        height: 300px;
        background: linear-gradient(135deg, #34d399, #60a5fa);
        top: 40%;
        right: -80px;
        animation-delay: -5s;
      }

      &.blob-3 {
        width: 350px;
        height: 350px;
        background: linear-gradient(135deg, #f472b6, #f59e0b);
        bottom: -100px;
        left: 30%;
        animation-delay: -10s;
      }
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.05);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.95);
    }
  }

  /* ========== 顶部导航 ========== */
  .portfolio-header {
    background: rgba(var(--el-bg-color-page-rgb), 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(var(--el-border-color-rgb), 0.5);
    padding: 0;
    height: 56px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .header-content {
    max-width: var(--portfolio-max-width, 1100px);
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    gap: 12px;
  }

  .logo {
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--el-color-primary);
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 10px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(var(--el-color-primary-rgb), 0.1);
      transform: translateY(-1px);
    }

    .logo-icon {
      font-size: 1rem;
      animation: spin 8s linear infinite;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .nav-menu {
    flex: 1;
    border-bottom: none !important;
    background: transparent;
    min-width: 0;

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      font-size: 0.875rem;
      height: 56px;
      line-height: 56px;
      padding: 0 14px !important;
      border-radius: 8px;
      margin: 0 2px;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    :deep(.el-menu-item) {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: var(--el-color-primary);
        transition: all 0.3s ease;
        transform: translateX(-50%);
      }

      &.is-active {
        color: var(--el-color-primary);
        background: rgba(var(--el-color-primary-rgb), 0.08);

        &::after {
          width: 24px;
        }
      }

      &:hover:not(.is-active) {
        background: var(--el-fill-color-light);
      }
    }

    .menu-icon {
      margin-right: 4px;
      font-size: 0.9375rem;
    }
  }

  /* ========== 右侧工具栏 ========== */
  .header-right {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }

  .tool-btn {
    font-size: 1.125rem;
    width: 36px !important;
    height: 36px !important;
    border-radius: 10px !important;
    transition: all 0.2s ease;

    &:hover {
      background: var(--el-fill-color-light);
      transform: translateY(-1px);
    }
  }

  .theme-toggle {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(circle, var(--el-color-primary) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: all 0.4s ease;
    }

    &:active::before {
      width: 60px;
      height: 60px;
      opacity: 0.3;
    }
  }

  .login-btn {
    margin-left: 6px;
    font-size: 0.8125rem;
    padding: 6px 16px;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(var(--el-color-primary-rgb), 0.3);
    }
  }

  .mobile-menu-btn {
    display: none !important;
  }

  /* ========== 主内容区域 ========== */
  .portfolio-main {
    max-width: var(--portfolio-max-width, 1100px);
    margin: 0 auto;
    padding: 20px 16px;
    position: relative;
    z-index: 1;
  }

  /* ========== 页脚 ========== */
  .portfolio-footer {
    border-top: none;
    padding: 0;
    background: transparent;
    position: relative;
    z-index: 1;
  }

  .footer-content {
    max-width: var(--portfolio-max-width, 1100px);
    margin: 0 auto;
    padding: 48px 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .footer-main {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    flex-wrap: wrap;
  }

  .footer-logo-section {
    flex: 0 0 auto;
    max-width: 280px;

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--el-color-primary);
      margin-bottom: 12px;

      .logo-icon {
        font-size: 1.25rem;
        animation: spin 8s linear infinite;
      }
    }

    .footer-desc {
      margin: 0;
      font-size: 0.875rem;
      color: var(--el-text-color-secondary);
      line-height: 1.7;
    }
  }

  .footer-links {
    display: flex;
    gap: 48px;
    flex-wrap: wrap;

    .footer-column {
      flex: 0 0 auto;
      min-width: 120px;
    }

    .column-title {
      margin: 0 0 16px;
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }

    .link-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;

      li {
        margin: 0;
      }

      a {
        color: var(--el-text-color-secondary);
        font-size: 0.875rem;
        text-decoration: none;
        transition: all 0.2s ease;
        display: inline-block;

        &:hover {
          color: var(--el-color-primary);
          transform: translateX(3px);
        }
      }
    }
  }

  .footer-bottom {
    .bottom-divider {
      width: 100%;
      height: 1px;
      background: var(--el-border-color-lighter);
      margin-bottom: 20px;
    }

    .copyright {
      margin: 0;
      text-align: center;
      font-size: 0.8125rem;
      color: var(--el-text-color-secondary);
    }
  }

  /* ========== 移动端侧边导航 ========== */
  .mobile-drawer {
    :deep(.el-drawer) {
      background: rgba(var(--el-bg-color-page-rgb), 0.95);
      backdrop-filter: blur(20px);
    }
  }

  .mobile-nav {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .mobile-nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px;
    border-bottom: 1px solid rgba(var(--el-border-color-rgb), 0.5);
  }

  .mobile-logo {
    font-size: 1rem;
    font-weight: 700;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .mobile-menu {
    border-right: none !important;
    flex: 1;
    padding-top: 8px;
  }

  /* ========== 下拉菜单选中状态 ========== */
  :deep(.lang-dropdown),
  :deep(.font-dropdown) {
    .is-selected {
      color: var(--el-color-primary);
      font-weight: 600;
    }

    .check-icon {
      margin-left: 8px;
    }
  }

  /* ========== 响应式布局 ========== */

  /* 中等屏幕 (768px - 1024px) */
  @media screen and (max-width: 1024px) {
    .desktop-nav {
      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        padding: 0 10px !important;
        font-size: 0.8125rem;
      }
    }

    .logo {
      font-size: 0.875rem;
    }

    .portfolio-main {
      padding: 16px 14px;
    }
  }

  /* 小屏幕 (≤ 768px) */
  @media screen and (max-width: 768px) {
    .desktop-nav {
      display: none !important;
    }

    .mobile-menu-btn {
      display: flex !important;
    }

    .tool-btn {
      font-size: 1rem;
      width: 32px !important;
      height: 32px !important;
    }

    .logo {
      font-size: 0.875rem;
      padding: 4px 8px;
    }

    .portfolio-main {
      padding: 14px 12px;
    }

    .login-btn {
      padding: 4px 12px;
      font-size: 0.75rem;
    }

    .portfolio-header {
      height: 52px;
    }

    .footer-content {
      padding: 32px 16px 20px;
    }

    .footer-main {
      flex-direction: column;
      gap: 32px;
    }

    .footer-links {
      gap: 24px;
    }
  }

  /* 超小屏幕 (≤ 480px) */
  @media screen and (max-width: 480px) {
    .header-content {
      padding: 0 10px;
    }

    .header-right {
      gap: 1px;
    }

    .tool-btn {
      width: 30px !important;
      height: 30px !important;
      font-size: 0.9375rem;
    }

    .portfolio-main {
      padding: 12px 10px;
    }
  }
</style>
