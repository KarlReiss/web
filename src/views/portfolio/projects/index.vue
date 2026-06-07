<template>
  <div class="page">
    <div class="page-header">
      <span class="page-tag">{{ $t('portfolio.projects.sectionTag') }}</span>
      <h2 class="page-title">{{ $t('portfolio.projects.title') }}</h2>
    </div>
    <el-row :gutter="16">
      <el-col
        v-for="(item, index) in projects"
        :key="item.title"
        :xs="24"
        :sm="12"
        :md="8"
        class="project-col"
      >
        <div class="project-card" :style="{ '--delay': `${index * 0.1}s` }">
          <div class="project-header">
            <div class="project-name-wrapper">
              <span class="project-icon">{{ item.icon }}</span>
              <span class="project-name">{{ item.title }}</span>
            </div>
            <el-tag :type="item.tagType" size="small" class="status-tag">{{ item.tag }}</el-tag>
          </div>
          <p class="project-desc">{{ item.desc }}</p>
          <div class="project-tech">
            <el-tag
              v-for="tech in item.techs"
              :key="tech"
              size="small"
              class="tech-tag"
              effect="plain"
            >
              {{ tech }}
            </el-tag>
          </div>
          <div class="project-footer">
            <el-button type="primary" link size="small" class="view-btn">
              <span class="btn-text">{{ $t('portfolio.projects.viewDetail') }}</span>
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

  defineOptions({ name: 'PortfolioProjects' })

  const { t } = useI18n()

  interface ProjectItem {
    icon: string
    title: string
    tag: string
    tagType: 'primary' | 'success' | 'warning' | 'info' | 'danger'
    desc: string
    techs: string[]
  }

  const projects = computed<ProjectItem[]>(() => [
    {
      icon: '📋',
      title: t('portfolio.projects.items[0].title'),
      tag: t('portfolio.projects.status.completed'),
      tagType: 'success',
      desc: t('portfolio.projects.items[0].desc'),
      techs: ['Vue3', 'NestJS', 'PostgreSQL']
    },
    {
      icon: '📊',
      title: t('portfolio.projects.items[1].title'),
      tag: t('portfolio.projects.status.inProgress'),
      tagType: 'warning',
      desc: t('portfolio.projects.items[1].desc'),
      techs: ['React', 'Python', 'ECharts']
    },
    {
      icon: '🤖',
      title: t('portfolio.projects.items[2].title'),
      tag: t('portfolio.projects.status.completed'),
      tagType: 'success',
      desc: t('portfolio.projects.items[2].desc'),
      techs: ['Vue3', 'Python', 'LangChain']
    },
    {
      icon: '🛒',
      title: t('portfolio.projects.items[3].title'),
      tag: t('portfolio.projects.status.completed'),
      tagType: 'success',
      desc: t('portfolio.projects.items[3].desc'),
      techs: ['UniApp', 'Node.js', 'MySQL']
    },
    {
      icon: '🎮',
      title: t('portfolio.projects.items[4].title'),
      tag: t('portfolio.projects.status.inProgress'),
      tagType: 'warning',
      desc: t('portfolio.projects.items[4].desc'),
      techs: ['Vue3', 'MQTT', 'ESP32']
    },
    {
      icon: '📝',
      title: t('portfolio.projects.items[5].title'),
      tag: t('portfolio.projects.status.completed'),
      tagType: 'success',
      desc: t('portfolio.projects.items[5].desc'),
      techs: ['Nuxt', 'Tailwind', 'MDX']
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

  .project-col {
    margin-bottom: 16px;
  }

  .project-card {
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

      .view-btn {
        .el-icon {
          transform: translateX(3px);
        }
      }
    }
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 14px;
  }

  .project-name-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .project-icon {
    font-size: 1.375rem;
    flex-shrink: 0;
  }

  .project-name {
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--el-text-color-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status-tag {
    flex-shrink: 0;
    font-weight: 500;
  }

  .project-desc {
    color: var(--el-text-color-secondary);
    font-size: 0.875rem;
    margin: 0 0 14px;
    line-height: 1.7;
    flex: 1;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
  }

  .tech-tag {
    margin: 0;
    font-weight: 500;
  }

  .project-footer {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--el-border-color-lighter);
  }

  .view-btn {
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

    .project-card {
      padding: 18px 16px;
    }

    .project-name {
      font-size: 0.875rem;
    }
  }

  @media screen and (max-width: 480px) {
    .page-title {
      font-size: 1.25rem;
    }

    .project-card {
      padding: 16px 14px;
    }
  }
</style>
