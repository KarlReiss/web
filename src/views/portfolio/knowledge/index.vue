<template>
  <div class="page">
    <div class="page-header">
      <span class="page-tag">{{ $t('portfolio.knowledge.sectionTag') }}</span>
      <h2 class="page-title">{{ $t('portfolio.knowledge.title') }}</h2>
    </div>
    <el-row :gutter="16">
      <el-col
        v-for="(item, index) in articles"
        :key="item.title"
        :xs="24"
        :sm="12"
        :md="8"
        class="article-col"
      >
        <div class="article-card" :style="{ '--delay': `${index * 0.1}s` }">
          <div class="article-meta">
            <el-tag size="small" effect="plain" class="category-tag">{{ item.category }}</el-tag>
            <span class="article-date">{{ item.date }}</span>
          </div>
          <h3 class="article-title">{{ item.title }}</h3>
          <p class="article-desc">{{ item.desc }}</p>
          <div class="article-footer">
            <el-button type="primary" link size="small" class="read-btn">
              <span class="btn-text">{{ $t('portfolio.knowledge.readMore') }}</span>
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

  defineOptions({ name: 'PortfolioKnowledge' })

  const { t } = useI18n()

  const articles = computed(() => [
    {
      title: t('portfolio.knowledge.articles[0].title'),
      category: t('portfolio.knowledge.categories.frontend'),
      desc: t('portfolio.knowledge.articles[0].desc'),
      date: '2026-05-15'
    },
    {
      title: t('portfolio.knowledge.articles[1].title'),
      category: t('portfolio.knowledge.categories.backend'),
      desc: t('portfolio.knowledge.articles[1].desc'),
      date: '2026-05-10'
    },
    {
      title: t('portfolio.knowledge.articles[2].title'),
      category: t('portfolio.knowledge.categories.ai'),
      desc: t('portfolio.knowledge.articles[2].desc'),
      date: '2026-04-28'
    },
    {
      title: t('portfolio.knowledge.articles[3].title'),
      category: t('portfolio.knowledge.categories.ops'),
      desc: t('portfolio.knowledge.articles[3].desc'),
      date: '2026-04-20'
    },
    {
      title: t('portfolio.knowledge.articles[4].title'),
      category: t('portfolio.knowledge.categories.hardware'),
      desc: t('portfolio.knowledge.articles[4].desc'),
      date: '2026-04-15'
    },
    {
      title: t('portfolio.knowledge.articles[5].title'),
      category: t('portfolio.knowledge.categories.frontend'),
      desc: t('portfolio.knowledge.articles[5].desc'),
      date: '2026-04-10'
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

  .article-col {
    margin-bottom: 16px;
  }

  .article-card {
    position: relative;
    height: 100%;
    padding: 20px;
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
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

      .read-btn {
        .el-icon {
          transform: translateX(3px);
        }
      }
    }
  }

  .article-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    gap: 12px;
  }

  .category-tag {
    font-weight: 500;
  }

  .article-date {
    font-size: 0.75rem;
    color: var(--el-text-color-placeholder);
    white-space: nowrap;
  }

  .article-title {
    font-size: 1rem;
    margin: 0 0 10px;
    line-height: 1.4;
    color: var(--el-text-color-primary);
    font-weight: 600;
  }

  .article-desc {
    color: var(--el-text-color-secondary);
    font-size: 0.875rem;
    margin: 0 0 16px;
    flex: 1;
    line-height: 1.7;
  }

  .article-footer {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--el-border-color-lighter);
  }

  .read-btn {
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

    .article-card {
      padding: 18px 16px;
    }

    .article-title {
      font-size: 0.9375rem;
    }
  }

  @media screen and (max-width: 480px) {
    .page-title {
      font-size: 1.25rem;
    }

    .article-card {
      padding: 16px 14px;
    }
  }
</style>
