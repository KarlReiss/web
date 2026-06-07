<template>
  <div class="portfolio-search">
    <ElDialog
      v-model="showSearchDialog"
      width="500"
      :show-close="false"
      :lock-scroll="false"
      modal-class="portfolio-search-modal"
      @close="closeSearchDialog"
    >
      <ElInput
        v-model.trim="searchVal"
        :placeholder="$t('portfolio.search.placeholder')"
        @input="handleSearch"
        ref="searchInputRef"
        :prefix-icon="Search"
        class="search-input"
      >
        <template #suffix>
          <div class="shortcut-key">
            <ArtSvgIcon icon="ri:keyboard-line" />
            <span>ESC</span>
          </div>
        </template>
      </ElInput>

      <ElScrollbar class="search-results" max-height="320px" ref="scrollbarRef" always>
        <!-- 搜索结果 -->
        <div v-if="searchResults.length > 0">
          <div
            v-for="(item, index) in searchResults"
            :key="item.path"
            class="result-item"
            :class="{ 'is-active': activeIndex === index }"
            @click="goPage(item)"
            @mouseenter="activeIndex = index"
          >
            <div class="result-icon">{{ item.icon }}</div>
            <div class="result-content">
              <div class="result-title">{{ item.title }}</div>
              <div class="result-path">{{ item.path }}</div>
            </div>
            <ArtSvgIcon icon="ri:arrow-right-s-line" class="result-arrow" />
          </div>
        </div>

        <!-- 无搜索结果 -->
        <div v-else-if="searchVal && searchResults.length === 0" class="no-results">
          <ArtSvgIcon icon="ri:search-line" class="no-results-icon" />
          <p>{{ $t('portfolio.search.noResults') }}</p>
        </div>

        <!-- 默认状态：显示所有页面 -->
        <div v-else class="all-pages">
          <p class="section-title">{{ $t('portfolio.search.allPages') }}</p>
          <div
            v-for="(item, index) in allPages"
            :key="item.path"
            class="result-item"
            :class="{ 'is-active': activeIndex === index }"
            @click="goPage(item)"
            @mouseenter="activeIndex = index"
          >
            <div class="result-icon">{{ item.icon }}</div>
            <div class="result-content">
              <div class="result-title">{{ item.title }}</div>
              <div class="result-path">{{ item.path }}</div>
            </div>
            <ArtSvgIcon icon="ri:arrow-right-s-line" class="result-arrow" />
          </div>
        </div>
      </ElScrollbar>

      <template #footer>
        <div class="search-footer">
          <div class="footer-hint">
            <ArtSvgIcon icon="ri:arrow-up-line" />
            <ArtSvgIcon icon="ri:arrow-down-line" />
            <span>{{ $t('portfolio.search.switch') }}</span>
          </div>
          <div class="footer-hint">
            <ArtSvgIcon icon="ri:keyboard-line" />
            <span>{{ $t('portfolio.search.select') }}</span>
          </div>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { Search } from '@element-plus/icons-vue'
  import { mittBus } from '@/utils/sys'
  import ArtSvgIcon from '@/components/core/base/art-svg-icon/index.vue'
  import type { ScrollbarInstance } from 'element-plus'

  defineOptions({ name: 'PortfolioSearch' })

  const router = useRouter()
  const { t } = useI18n()

  const showSearchDialog = ref(false)
  const searchVal = ref('')
  const searchResults = ref<Array<{ icon: string; title: string; path: string }>>([])
  const activeIndex = ref(0)
  const searchInputRef = ref<HTMLInputElement | null>(null)
  const scrollbarRef = ref<ScrollbarInstance>()

  // Portfolio 所有页面
  const allPages = computed(() => [
    { icon: '🏠', title: t('portfolio.nav.home'), path: '/portfolio/home' },
    { icon: '🎨', title: t('portfolio.nav.frontend'), path: '/portfolio/about/frontend' },
    { icon: '⚙️', title: t('portfolio.nav.backend'), path: '/portfolio/about/backend' },
    { icon: '🤖', title: t('portfolio.nav.ai'), path: '/portfolio/about/ai' },
    { icon: '🔧', title: t('portfolio.nav.hardware'), path: '/portfolio/about/hardware' },
    { icon: '🖥️', title: t('portfolio.nav.server'), path: '/portfolio/about/server' },
    { icon: '💼', title: t('portfolio.nav.solutions'), path: '/portfolio/about/solutions' },
    { icon: '📁', title: t('portfolio.nav.projects'), path: '/portfolio/projects' },
    { icon: '📚', title: t('portfolio.nav.knowledge'), path: '/portfolio/knowledge' },
    { icon: '🛠️', title: t('portfolio.nav.tools'), path: '/portfolio/tools' }
  ])

  const handleSearch = (val: string) => {
    activeIndex.value = 0
    if (!val) {
      searchResults.value = []
      return
    }

    const lowerVal = val.toLowerCase()
    searchResults.value = allPages.value.filter(
      (page) =>
        page.title.toLowerCase().includes(lowerVal) || page.path.toLowerCase().includes(lowerVal)
    )
  }

  const goPage = (item: { icon: string; title: string; path: string }) => {
    showSearchDialog.value = false
    searchVal.value = ''
    searchResults.value = []
    router.push(item.path)
  }

  const openSearchDialog = () => {
    showSearchDialog.value = true
    activeIndex.value = 0
    setTimeout(() => {
      searchInputRef.value?.focus()
    }, 100)
  }

  const closeSearchDialog = () => {
    searchVal.value = ''
    searchResults.value = []
    activeIndex.value = 0
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (!showSearchDialog.value) return

    const list = searchVal.value ? searchResults.value : allPages.value

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % list.length
      scrollToActive()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      activeIndex.value = (activeIndex.value - 1 + list.length) % list.length
      scrollToActive()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (list.length > 0) {
        goPage(list[activeIndex.value])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      showSearchDialog.value = false
    }
  }

  const scrollToActive = () => {
    nextTick(() => {
      if (!scrollbarRef.value?.wrapRef) return
      const items = scrollbarRef.value.wrapRef.querySelectorAll('.result-item')
      if (!items[activeIndex.value]) return

      const item = items[activeIndex.value] as HTMLElement
      const container = scrollbarRef.value.wrapRef
      const itemTop = item.offsetTop
      const itemHeight = item.offsetHeight
      const containerHeight = container.clientHeight
      const currentScroll = container.scrollTop

      if (itemTop < currentScroll) {
        scrollbarRef.value.setScrollTop(itemTop)
      } else if (itemTop + itemHeight > currentScroll + containerHeight) {
        scrollbarRef.value.setScrollTop(itemTop + itemHeight - containerHeight)
      }
    })
  }

  onMounted(() => {
    mittBus.on('openPortfolioSearch', openSearchDialog)
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
</script>

<style scoped lang="scss">
  .portfolio-search {
    :deep(.portfolio-search-modal) {
      background-color: rgba(0, 0, 0, 0.2);
    }

    :deep(.el-dialog__body) {
      padding: 12px 0 0 !important;
    }

    :deep(.el-dialog__header) {
      padding: 0;
    }
  }

  .search-input {
    :deep(.el-input__wrapper) {
      background-color: var(--el-fill-color-light);
      border: 1px solid var(--el-border-color);
      border-radius: 12px;
      box-shadow: none;
      padding: 8px 12px;

      &:hover,
      &:focus {
        border-color: var(--el-color-primary);
      }
    }
  }

  .shortcut-key {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    background: var(--el-fill-color);
    border-radius: 4px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  .search-results {
    margin-top: 12px;
  }

  .result-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover,
    &.is-active {
      background-color: var(--el-fill-color-light);
    }

    &.is-active {
      .result-arrow {
        opacity: 1;
        color: var(--el-color-primary);
      }
    }
  }

  .result-icon {
    font-size: 20px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--el-fill-color);
    border-radius: 8px;
  }

  .result-content {
    flex: 1;
    min-width: 0;
  }

  .result-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .result-path {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .result-arrow {
    width: 16px;
    height: 16px;
    opacity: 0;
    color: var(--el-text-color-secondary);
    transition: opacity 0.2s;
  }

  .section-title {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin: 0 0 8px;
    padding: 0 12px;
  }

  .no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    color: var(--el-text-color-secondary);

    .no-results-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 12px;
      opacity: 0.5;
    }

    p {
      margin: 0;
      font-size: 14px;
    }
  }

  .search-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-top: 12px;
    border-top: 1px solid var(--el-border-color-light);
  }

  .footer-hint {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--el-text-color-secondary);

    .art-svg-icon {
      width: 14px;
      height: 14px;
    }
  }
</style>
