<template>
  <div class="page">
    <div class="page-header">
      <span class="page-tag">{{ $t('portfolio.tools.sectionTag') }}</span>
      <h2 class="page-title">{{ $t('portfolio.tools.title') }}</h2>
    </div>
    <el-row :gutter="16">
      <el-col
        v-for="(item, index) in tools"
        :key="item.title"
        :xs="24"
        :sm="12"
        :md="8"
        class="tool-col"
      >
        <div class="tool-card" :style="{ '--delay': `${index * 0.1}s` }">
          <div class="tool-icon-wrapper">
            <span class="tool-icon">{{ item.icon }}</span>
          </div>
          <h3 class="tool-title">{{ item.title }}</h3>
          <p class="tool-desc">{{ item.desc }}</p>
          <div class="tool-footer">
            <el-tag :type="item.type" size="small" effect="plain" class="status-tag">{{
              item.status
            }}</el-tag>
            <el-button type="primary" link size="small" class="learn-btn">
              <span class="btn-text">{{ $t('portfolio.tools.learnMore') }}</span>
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ArrowRight } from '@element-plus/icons-vue'

  defineOptions({ name: 'PortfolioTools' })

  const { t } = useI18n()

  const tools = computed(() => [
    {
      icon: '💬',
      title: t('portfolio.tools.items[0].title'),
      desc: t('portfolio.tools.items[0].desc'),
      status: t('portfolio.tools.status.frequent'),
      type: 'success'
    },
    {
      icon: '🤖',
      title: t('portfolio.tools.items[1].title'),
      desc: t('portfolio.tools.items[1].desc'),
      status: t('portfolio.tools.status.frequent'),
      type: 'success'
    },
    {
      icon: '🎨',
      title: t('portfolio.tools.items[2].title'),
      desc: t('portfolio.tools.items[2].desc'),
      status: t('portfolio.tools.status.occasional'),
      type: 'warning'
    },
    {
      icon: '📝',
      title: t('portfolio.tools.items[3].title'),
      desc: t('portfolio.tools.items[3].desc'),
      status: t('portfolio.tools.status.frequent'),
      type: 'success'
    },
    {
      icon: '🔍',
      title: t('portfolio.tools.items[4].title'),
      desc: t('portfolio.tools.items[4].desc'),
      status: t('portfolio.tools.status.occasional'),
      type: 'warning'
    },
    {
      icon: '🎵',
      title: t('portfolio.tools.items[5].title'),
      desc: t('portfolio.tools.items[5].desc'),
      status: t('portfolio.tools.status.occasional'),
      type: 'info'
    }
  ])
</script>

<style scoped lang="scss">
  .page {
    padding: 20px 0;
    animation: fadeInUp 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .page-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .page-tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    font-size: 0.75rem;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color);
    border-radius: 100px;
    margin-bottom: 10px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .page-title {
    margin: 0;
    font-size: 1.75rem;
    color: var(--el-text-color-primary);
    font-weight: 700;
  }

  .tool-col {
    margin-bottom: 16px;
  }

  .tool-card {
    position: relative;
    text-align: center;
    height: 100%;
    padding: 24px 20px;
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
    overflow: hidden;
    cursor: pointer;
    animation: cardIn 0.6s ease-out var(--delay, 0s) both;

    @keyframes cardIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(var(--el-color-primary-rgb), 0.04), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-6px);
      border-color: rgba(var(--el-color-primary-rgb), 0.2);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);

      &::before {
        opacity: 1;
      }

      .learn-btn {
        .el-icon {
          transform: translateX(3px);
        }
      }
    }
  }

  .tool-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    background: linear-gradient(
      135deg,
      rgba(var(--el-color-primary-rgb), 0.1),
      rgba(var(--el-color-primary-rgb), 0.05)
    );
    border-radius: 20px;
    margin-bottom: 14px;
    transition: transform 0.3s ease;
  }

  .tool-icon {
    font-size: 2.25rem;
  }

  .tool-title {
    margin: 0 0 8px;
    font-size: 1rem;
    color: var(--el-text-color-primary);
    font-weight: 600;
  }

  .tool-desc {
    color: var(--el-text-color-secondary);
    font-size: 0.8125rem;
    margin: 0 0 18px;
    flex: 1;
    line-height: 1.6;
  }

  .tool-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--el-border-color-lighter);
  }

  .status-tag {
    font-weight: 500;
  }

  .learn-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    font-weight: 500;

    .el-icon {
      transition: transform 0.2s ease;
    }
  }

  /* ========== 响应式 ========== */
  @media screen and (max-width: 768px) {
    .page {
      padding: 12px 0;
    }

    .page-title {
      font-size: 1.375rem;
    }

    .tool-card {
      padding: 20px 16px;
    }

    .tool-icon-wrapper {
      width: 64px;
      height: 64px;
      border-radius: 16px;
    }

    .tool-icon {
      font-size: 2rem;
    }
  }

  @media screen and (max-width: 480px) {
    .page-title {
      font-size: 1.25rem;
    }

    .tool-card {
      padding: 18px 14px;
    }
  }
</style>
