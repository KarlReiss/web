<template>
  <div class="page">
    <div class="page-header">
      <span class="page-tag">{{ $t('portfolio.sectionTag.skills') }}</span>
      <h2 class="page-title">{{ $t('portfolio.about.solutions.title') }}</h2>
    </div>
    <el-row :gutter="16">
      <el-col
        v-for="(item, index) in solutions"
        :key="item.title"
        :xs="12"
        :sm="12"
        :md="6"
        class="solution-col"
      >
        <div class="solution-card" :style="{ '--delay': `${index * 0.1}s` }">
          <div class="solution-icon-wrapper">
            <span class="solution-icon">{{ item.icon }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  defineOptions({ name: 'PortfolioSolutions' })

  const { t } = useI18n()

  const solutions = computed(() => [
    {
      icon: '🌐',
      title: t('portfolio.about.solutions.items[0].title'),
      desc: t('portfolio.about.solutions.items[0].desc')
    },
    {
      icon: '🛒',
      title: t('portfolio.about.solutions.items[1].title'),
      desc: t('portfolio.about.solutions.items[1].desc')
    },
    {
      icon: '📊',
      title: t('portfolio.about.solutions.items[2].title'),
      desc: t('portfolio.about.solutions.items[2].desc')
    },
    {
      icon: '🤖',
      title: t('portfolio.about.solutions.items[3].title'),
      desc: t('portfolio.about.solutions.items[3].desc')
    },
    {
      icon: '📱',
      title: t('portfolio.about.solutions.items[4].title'),
      desc: t('portfolio.about.solutions.items[4].desc')
    },
    {
      icon: '🔧',
      title: t('portfolio.about.solutions.items[5].title'),
      desc: t('portfolio.about.solutions.items[5].desc')
    },
    {
      icon: '☁️',
      title: t('portfolio.about.solutions.items[6].title'),
      desc: t('portfolio.about.solutions.items[6].desc')
    },
    {
      icon: '🎨',
      title: t('portfolio.about.solutions.items[7].title'),
      desc: t('portfolio.about.solutions.items[7].desc')
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

  .solution-col {
    margin-bottom: 16px;
  }

  .solution-card {
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
    }
  }

  .solution-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background: linear-gradient(
      135deg,
      rgba(var(--el-color-primary-rgb), 0.1),
      rgba(var(--el-color-primary-rgb), 0.05)
    );
    border-radius: 18px;
    margin-bottom: 14px;
  }

  .solution-icon {
    font-size: 2rem;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 1rem;
    color: var(--el-text-color-primary);
    font-weight: 600;
  }

  p {
    color: var(--el-text-color-secondary);
    font-size: 0.8125rem;
    margin: 0;
    line-height: 1.6;
    flex: 1;
  }

  /* ========== 响应式 ========== */
  @media screen and (max-width: 768px) {
    .page {
      padding: 12px 0;
    }

    .page-title {
      font-size: 1.375rem;
    }

    .solution-card {
      padding: 20px 16px;
    }

    .solution-icon-wrapper {
      width: 56px;
      height: 56px;
      border-radius: 16px;
    }

    .solution-icon {
      font-size: 1.75rem;
    }

    h3 {
      font-size: 0.9375rem;
    }
  }

  @media screen and (max-width: 480px) {
    .page-title {
      font-size: 1.25rem;
    }

    .solution-card {
      padding: 18px 14px;
    }

    .solution-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 14px;
    }

    .solution-icon {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 0.875rem;
    }
  }
</style>
